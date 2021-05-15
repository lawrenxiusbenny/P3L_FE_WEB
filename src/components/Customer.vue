<template>
    <v-main class="list">
    <div v-show="tambah">
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Customer
      </h1>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="light-blue darken-3 rounded" small dark @click="Tambah">
            Tambah Customer
          </v-btn>
        </v-card-title>
        <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="customers" :search="search" >
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                <v-icon small color="red" class="mr-2" @click="deleteHandler(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
      </v-card>
    </div>

    <div v-show="!tambah">
        <div class="cardinput"> 
            <v-card class="m-5" style="background-color:#fff8f7;">
                <v-card-title style="background-color: #a6655e" class="font-weight-medium mb-3 justify-center text-h4 text-center">
                    {{ titleForm }}
                  </v-card-title>
                <v-card-body>
                <v-container>
                  
                    <v-form v-model="valid" ref="form">
                    <v-row>
                        <v-col class="col-12">
                        <p>Nama Customer</p>
                        <v-text-field
                            placeholder="nama customer"  
                            prepend-inner-icon="mdi-account"
                            :rules="nameRules"
                            v-model="form.nama_customer"
                            outlined
                            solo
                            required
                        >
                        </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Nomor Telepon Customer</p>
                        <v-text-field
                            placeholder="nomor telepon customer"  
                            prepend-inner-icon="mdi-cellphone-android"
                            :rules="teleponRules"
                            v-model="form.telepon_customer"
                            outlined
                            solo
                            required
                        >
                        </v-text-field>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Email Customer</p>
                            <v-text-field
                                placeholder="email customer"  
                                prepend-inner-icon="mdi-email"
                                :rules="emailRules"
                                v-model="form.email_customer"
                                outlined
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions class="justify-content-center">
                        <v-btn
                        class="mr-5"
                        depressed
                        color="error"
                        style="padding-left: 30px; padding-right: 30px"
                        @click="cancel"
                        >
                        Batal
                        </v-btn>
                        <v-btn depressed color="primary" @click="setForm" style="padding-left: 30px; padding-right: 30px">
                        Simpan
                        </v-btn>
                    </v-card-actions>
                    </v-form>
                </v-container>
                </v-card-body>
            </v-card>
        </div>
    </div>

    <v-dialog v-model="dialogConfirm" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin menghapus data customer ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary"  @click="dialogConfirm = false"
            >Batal</v-btn
          >
          <v-btn color="grey"  @click="deleteData">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        :size="80" 
        :width="5"
        color="primary">
      </v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "Customer",
  data() {
    return {
      loading: false,
      titleForm: "",
      token: "",
      inputType: "Tambah",
      snackbar: false,
      error_message: "",
      valid: "false",
      color: "",
      search: "",
      id_role:0,
      tambah: true,
      nameRules: [(v) => !!v || "Nama customer tidak boleh kosong"],
      teleponRules: [
            (v) => !!v || "Nomor telepon customer tidak boleh kosong",
            (v) =>
                (v && v.length >= 11 && v.length <= 13) || "Nomor telepon customer harus 11-13 Digit", 
        ],
      emailRules: [
          (v) => !!v || "Email tidak boleh kosong", 
          (v) => /.+@.+\..+/.test(v) || "Email invalid"
        ],
      dialogConfirm: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nama Customer",
          align: "center",
          sortable: true,
          value: "nama_customer",
        },
        { text: "No. Telepon",align: "center", value: "telepon_customer" },
        { text: "Email",align: "center", value: "email_customer" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      customer: new FormData(),
      customers: [],
      form: {
        nama_customer: null,
        telepon_customer: null,
        email_customer: null,
      },
      deleteId: "",
      editId: "",
    };
  },
  methods: {
    readData() {
      var url = this.$api + "/customer";
      this.loading = true
      this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.customers = response.data.data;
          this.loading = false;
          console.log(this.customers);
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.loading = false;
        });

    },
    setForm() {
      if (this.inputType === "Tambah") {
        this.save();
      } else {
        this.update();
      }
    },
    Tambah() {
      this.tambah = false;
      this.titleForm = "Tambah Customer";
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_customer;
      this.form.nama_customer = item.nama_customer;
      this.form.telepon_customer = item.telepon_customer;
      this.form.email_customer = item.email_customer;
      this.dialog = true;
      this.tambah = false;
      this.titleForm = "Ubah Customer";
    },
    deleteHandler(item) {
      this.deleteId = item.id_customer;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      this.dialogConfirm = false;
      this.loading = true;
      let newData;
      var url = this.$api + "/customer-soft/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .put(
          url
          ,newData
          ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";
          this.snackbar = true;
          this.dialogConfirm = false;
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
          this.loading = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.loading = false;
        });
    },
    cancel() {
      this.changePage();
      this.resetForm();
    },
    update() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let newData = {
          nama_customer : this.form.nama_customer,
          telepon_customer : this.form.telepon_customer,
          email_customer : this.form.email_customer,
        };
        var url = this.$api + "/customer/" + this.editId;
        this.$http
          .put(
            url,
            newData
            ,{
                headers:{
                    Authorization: "Bearer " + this.token,
                }
            }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.loading = false;
            this.readData();
            this.changePage();
            this.resetForm();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        this.customer.append("nama_customer", this.form.nama_customer);
        this.customer.append("telepon_customer", this.form.telepon_customer);
        this.customer.append("email_customer", this.form.email_customer);

        var url = this.$api + "/customer";
        this.loading = true;
        this.$http
          .post(
            url,
            this.customer
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.loading = false;
            this.readData();
            this.changePage();
            
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
    changePage() {
      this.tambah = true;
      this.titleForm = "";
      this.inputType = "Tambah";
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.readData();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;
}
</style>
