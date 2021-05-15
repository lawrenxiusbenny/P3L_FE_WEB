<template>
    <v-main class="list">
    <div v-show="tambah">
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Kartu
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
            Tambah Data Kartu
          </v-btn>
        </v-card-title>
        <div>
            <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="kartus" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                    <v-icon small color="red" @click="deleteHandler(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
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
                            <p>Nama Pemilik Kartu</p>
                            <v-text-field
                                placeholder="nama pemilik kartu"  
                                prepend-inner-icon="mdi-account"
                                :rules="nameRules"
                                v-model="form.nama_pemilik_kartu"
                                outlined
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Nomor Kartu</p>
                            <v-text-field
                                v-model="form.nomor_kartu"
                                placeholder="XXXX XXXX XXXX XXXX"  
                                prepend-inner-icon="mdi-numeric"
                                :rules="nomorRules"
                                outlined
                                solo
                                v-mask="'#### #### #### ####'"
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Jenis Kartu</p>
                            <v-select
                                placeholder="Jenis Kartu"  
                                prepend-inner-icon="mdi-credit-card"
                                :rules="kartuRules"
                                :items="kartuOption" 
                                v-model="form.jenis_kartu"
                                solo
                                outlined
                                required>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Kode Verifikasi Kartu</p>
                        <v-text-field
                            placeholder="XXXXXX"  
                            v-mask="'######'"
                            prepend-inner-icon="mdi-checkbox-marked-circle-outline"
                            :rules="verifikasiRules"
                            v-model="form.kode_verifikasi"
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
                                :return-value.sync="form.expired_date"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <p>Expired Date</p>
                                <v-text-field
                                    placeholder="YYYY-MM-DD"  
                                    prepend-inner-icon="mdi-calendar"
                                    :rules="tanggalRules"
                                    v-model="form.expired_date"
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
                                    :min="today"
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
  name: "Data-Kartu",
  data() {
    return {
      titleForm: "",
      token: "",
      inputType: "Tambah",
      load: false,
      maskNomor: "####-####-####-####",
      snackbar: false,
      error_message: "",
      valid: "false",
      color: "",
      modal: "",
      search: "",
      id_role:0,
      tambah: true,
      kartuOption:["Credit Card","Debit Card"],
      nameRules: [(v) => !!v || "Nama Pemilik Kartu tidak boleh kosong"],
      dateRules: [(v) => !!v || "Expired Date Kartu tidak boleh kosong"],
      kartuRules: [(v) => !!v || "Jenis Kartu tidak boleh kosong"],
      verifikasiRules: [
            (v) => !!v || "Nomor Verifikasi Kartu tidak boleh kosong",
            (v) => (v && v.length == 6) || "Nomor Verifikasi Kartu harus 6 digit", 
        ],
      nomorRules: [
            (v) => !!v || "Nomor Kartu tidak boleh kosong",
            (v) => (v && v.length == 19) || "Nomor kartu harus 16 Digit", 
        ],
      tanggalRules: [(v) => !!v || "Expired Date tidak boleh kosong"],
      dialogConfirm: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nomor Kartu",
          align: "center",
          sortable: true,
          value: "nomor_kartu",
        },
        { text: "Nama Pemilik Kartu",align: "center", value: "nama_pemilik_kartu" },
        { text: "Jenis Kartu",align: "center", value: "jenis_kartu" },
        { text: "Kode Verifikasi",align: "center", value: "kode_verifikasi" },
        { text: "Expired Date",align: "center", value: "expired_date" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      kartu: new FormData(),
      kartus: [],
      form: {
        nomor_kartu: null,
        nama_pemilik_kartu: null,
        kode_verifikasi: null,
        jenis_kartu: null,
        expired_date: null,
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
      var url = this.$api + "/kartu";
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
          this.kartus = response.data.data;
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
      this.titleForm = "Tambah Data Kartu";
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_data_kartu;

      this.form.nama_pemilik_kartu = item.nama_pemilik_kartu;
      this.form.nomor_kartu = item.nomor_kartu;
      this.form.jenis_kartu = item.jenis_kartu;
      this.form.kode_verifikasi = item.kode_verifikasi;
      this.form.expired_date = item.expired_date;
      
      this.dialog = true;
      this.tambah = false;
      this.titleForm = "Ubah Data Kartu";
    },
    deleteHandler(item) {
      this.deleteId = item.id_data_kartu;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      this.dialogConfirm=false;
      this.loading=true;
      let newData;
      var url = this.$api + "/kartu-soft/" + this.deleteId;
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
        let newData = {
          nama_pemilik_kartu: this.form.nama_pemilik_kartu,
          nomor_kartu : this.form.nomor_kartu,
          jenis_kartu : this.form.jenis_kartu,
          kode_verifikasi : this.form.kode_verifikasi,
          expired_date : this.form.expired_date,
        };
        var url = this.$api + "/kartu/" + this.editId;
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
            this.changePage();
            this.resetForm();
            this.loading = false;
          })
          .catch((error) => {
            this.error_message = "Nomor Kartu sudah terdaftar";
            console.log(error.response.data.message)
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
        this.kartu.append("nama_pemilik_kartu", this.form.nama_pemilik_kartu);
        this.kartu.append("nomor_kartu", this.form.nomor_kartu);
        this.kartu.append("jenis_kartu", this.form.jenis_kartu);
        this.kartu.append("kode_verifikasi", this.form.kode_verifikasi);
        this.kartu.append("expired_date", this.form.expired_date);

        var url = this.$api + "/kartu";
        
        this.$http
          .post(
            url,
            this.kartu
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
            this.error_message = "Nomor Kartu sudah terdaftar";
            console.log(error.response.data.message)
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
    this.getTanggalHariIni();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;
}
</style>
