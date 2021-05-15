<template>
    <v-main class="list">
    <div v-show="tambah">
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Karyawan
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
            Tambah Karyawan
          </v-btn>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger " content-class="mt-3">
                <b-tab title="Karyawan Aktif" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="karyawans" :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        <v-icon small color="red" @click="deleteHandler(item.id_karyawan)">mdi-account-key</v-icon>
                    </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Karyawan Non-Aktif" >
                  <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="nonaktifkaryawans" :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        <v-icon small color="green" @click="deleteHandler(item.id_karyawan)">mdi-account-check</v-icon>
                    </template>
                    </v-data-table>
                </b-tab>
            </b-tabs>
        </div>
        
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
                        <p>Nama Karyawan</p>
                        <v-text-field
                            placeholder="nama karyawan"  
                            prepend-inner-icon="mdi-account"
                            :rules="nameRules"
                            v-model="form.nama_karyawan"
                            outlined
                            solo
                            required
                        >
                        </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Jabatan Karyawan</p>
                        <v-select
                            placeholder="jabatan karyawan"  
                            prepend-inner-icon="mdi-account-circle"
                            :rules="jabatanRules"
                            :items="jabatans" 
                            v-model="form.id_role"
                            solo
                            outlined
                            required>
                        </v-select>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Jenis Kelamin</p>
                        <v-select
                            placeholder="jenis kelamin"  
                            prepend-inner-icon="mdi-gender-male-female"
                            :rules="sexRules"
                            :items="sexOption"
                            v-model="form.jenis_kelamin"
                            solo
                            outlined
                            required
                        >
                        </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Nomor Telepon Karyawan</p>
                        <v-text-field
                            placeholder="nomor telepon karyawan"  
                            prepend-inner-icon="mdi-cellphone-android"
                            :rules="teleponRules"
                            v-model="form.telepon_karyawan"
                            outlined
                            solo
                            required
                        >
                        </v-text-field>
                        </v-col>

                        <v-col class="col-md-6 col-sm-12">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="form.tanggal_bergabung"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <p>Tanggal Bergabung</p>
                                <v-text-field
                                    placeholder="YYYY-MM-DD"  
                                    prepend-inner-icon="mdi-calendar"
                                    :rules="tanggalRules"
                                    v-model="form.tanggal_bergabung"
                                    outlined
                                    solo
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    scrollable
                                    :max="today"
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
                                >
                                    Batal
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row v-show="inputType=='Tambah'">
                        <v-col class="col-md-6 col-sm-12">
                            <p>Email Karyawan</p>
                            <v-text-field
                                placeholder="email karyawan"  
                                prepend-inner-icon="mdi-email"
                                :disabled="inputType == 'Ubah'"
                                :rules="emailRules"
                                v-model="form.email_karyawan"
                                outlined
                                solo
                                required
                            >
                            </v-text-field>
                            </v-col>
                            <v-col class="col-md-6 col-sm-12">
                            <p>Password Karyawan</p>
                            <v-text-field
                                placeholder="password karyawan"  
                                prepend-inner-icon="mdi-key"
                                :disabled="inputType == 'Ubah'"
                                :rules="passwordRules"
                                v-model="form.password"
                                type="password"
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

    <v-dialog v-model="dialogConfirm" persistent max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
          <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin mengubah status karyawan ini?</v-card-text>
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
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{
      error_message
    }}</v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "Karyawan",
  data() {
    return {
      titleForm: "",
      token: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      valid: "false",
      color: "",
      modal: "",
      search: "",
      id_role:0,
      tambah: true,
      jabatans:["Operational Manager","Waiter","Cashier","Chef"],
      sexOption: ["Laki-laki","Perempuan"],
      nameRules: [(v) => !!v || "Nama karyawan tidak boleh kosong"],
      jabatanRules: [(v) => !!v || "Pilih jabatan karyawan"],
      sexRules: [(v) => !!v || "Pilih jenis kelamin karyawan"],
      teleponRules: [
            (v) => !!v || "Nomor telepon karyawan tidak boleh kosong",
            (v) =>
                (v && v.length >= 11 && v.length <= 13) || "Nomor telepon karyawan harus 11-13 Digit", 
        ],
      tanggalRules: [(v) => !!v || "Tanggal bergabung tidak boleh kosong"],
      emailRules: [
          (v) => !!v || "Email tidak boleh kosong", 
          (v) => /.+@.+\..+/.test(v) || "Email invalid"
        ],
      passwordRules: [
          (v) => !!v || "Password tidak boleh kosong", 
          (v) => (v && v.length >= 6) || "Password harus minimal 6 karakter"
        ],      
      dialogConfirm: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nama Karyawan",
          align: "center",
          sortable: true,
          value: "nama_karyawan",
        },
        { text: "Jabatan",align: "center", value: "nama_role" },
        { text: "Jenis Kelamin",align: "center", value: "jenis_kelamin" },
        { text: "Email",align: "center", value: "email_karyawan" },
        { text: "No. Telepon", align: "center",value: "telepon_karyawan" },
        { text: "Tanggal Bergabung",align: "center", value: "tanggal_bergabung" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      karyawan: new FormData(),
      karyawans: [],
      nonaktifkaryawans: [],
      form: {
        id_role: null,
        nama_karyawan: null,
        jenis_kelamin: null,
        telepon_karyawan: null,
        email_karyawan: null,
        tanggal_bergabung: null,
        password: null,
      },
      deleteId: "",
      editId: "",
      loading: false,
      today:'',
    };
  },
  methods: {
    getTanggalHariIni(){
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd ;
        this.today = today;
    },
    readData() {
      this.loading = true;
      var url = this.$api + "/karyawan-aktif";
      this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.loading = false;
          this.karyawans = response.data.data;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.loading = false;
        });
    },
    readDataNon() {
      var url = this.$api + "/karyawan-non-aktif";
      this.loading = true;
      this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.nonaktifkaryawans = response.data.data;
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
      this.titleForm = "Tambah Karyawan";
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_karyawan;
      this.form.nama_karyawan = item.nama_karyawan;
      this.id_role = item.id_role;
      if(this.id_role == 2){
          this.form.id_role = "Operational Manager";
      }else if(this.id_role == 3){
          this.form.id_role = "Waiter";
      }else if(this.id_role == 4){
          this.form.id_role = "Cashier";
      }else if(this.id_role == 5){
          this.form.id_role = "Chef";
      }
      this.form.jenis_kelamin = item.jenis_kelamin;
      this.form.telepon_karyawan = item.telepon_karyawan;
      this.form.tanggal_bergabung = item.tanggal_bergabung;
      this.form.email_karyawan = item.email_karyawan;
      this.form.password = item.password;
      this.dialog = true;
      this.tambah = false;
      this.titleForm = "Ubah Karyawan";
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      this.dialogConfirm=false;
      this.loading=true;
      let newData;
      var url = this.$api + "/karyawan-status/" + this.deleteId;
      //data dihapus berdasarkan id
      this.$http
        .put(
          url,newData
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
          this.load = false;
          this.readData();
          this.readDataNon();
          this.resetForm();
          this.inputType = "Tambah";
          this.loading = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
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
        if(this.form.id_role == "Chef"){
            this.id_role = 5;
        }else if(this.form.id_role == "Waiter"){
            this.id_role = 3;
        }else if(this.form.id_role == "Cashier"){
            this.id_role = 4;
        }else if(this.form.id_role == "Operational Manager"){
            this.id_role = 2;
        }
        let newData = {
          id_role: this.id_role,
          nama_karyawan : this.form.nama_karyawan,
          jenis_kelamin : this.form.jenis_kelamin,
          telepon_karyawan : this.form.telepon_karyawan,
          tanggal_bergabung : this.form.tanggal_bergabung,
        };
        var url = this.$api + "/karyawan/" + this.editId;
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
            this.load = false;
            this.readData();
            this.readDataNon();
            this.changePage();
            this.resetForm();
            this.loading = false;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
            this.loading = false;
          });
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        if(this.form.id_role == "Chef"){
            this.id_role = 5;
        }else if(this.form.id_role == "Waiter"){
            this.id_role = 3;
        }else if(this.form.id_role == "Cashier"){
            this.id_role = 4;
        }else if(this.form.id_role == "Operational Manager"){
            this.id_role = 2;
        }
        this.karyawan.append("id_role", this.id_role);
        this.karyawan.append("nama_karyawan", this.form.nama_karyawan);
        this.karyawan.append("jenis_kelamin", this.form.jenis_kelamin);
        this.karyawan.append("telepon_karyawan", this.form.telepon_karyawan);
        this.karyawan.append("email_karyawan", this.form.email_karyawan);
        this.karyawan.append("tanggal_bergabung", this.form.tanggal_bergabung);
        this.karyawan.append("password", this.form.password);

        var url = this.$api + "/karyawan";
        
        this.$http
          .post(
            url,
            this.karyawan
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
            this.load = false;
            this.readData();
            this.changePage();
            this.loading = false;
          })
          .catch((error) => {
            console.log(error.response.data.message)
            this.error_message = "Email harus unik !";
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
    this.readDataNon();
    this.getTanggalHariIni();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;
}
</style>
