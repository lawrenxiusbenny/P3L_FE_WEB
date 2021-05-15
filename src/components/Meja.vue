<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Meja
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
            Tambah Meja
          </v-btn>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3">
                <b-tab title="On The Spot" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="mejas" :search="search">
                        <template v-slot:[`item.status_meja`]="{ item }">
                            <v-chip
                                v-if="mejaFull != null && mejaFull.includes(item.id_meja)"
                                class="ma-2"
                                depressed
                                color="red"
                                text-color="white"
                            >
                                TERISI
                            </v-chip>
                            <v-chip 
                                v-else
                                class="ma-2"
                                depressed
                                color="success"
                                text-color="white"
                            >
                                TERSEDIA
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                          <v-icon small color="red" class="mr-2" @click="deleteHandler(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Cek Ketersediaan Meja" >
                  <v-container>
                    <v-form v-model="validInput" ref="formInput">
                    <v-row>
                      <v-col class="col-md-4 col-sm-12">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="formInput.tanggal"
                                persistent
                                
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    :rules="tanggalRules"
                                    v-model="formInput.tanggal"
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    label="Tanggal"
                                    v-bind="attrs"
                                    v-on="on"
                                    readonly
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    scrollable
                                    
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
                        <v-col class="col-md-4 col-sm-12">
                        
                        <v-select
                            :items="sesiOption"
                            :rules="sesiRules"
                            prepend-inner-icon="mdi-clock"
                            v-model="formInput.sesi"
                            label="Waktu (Sesi)"
                            outlined
                            required
                        >
                        </v-select>
                      </v-col>
                      <v-col class="col-md-4 col-sm-12">
                          <v-btn
                            class="ma-2"
                            color="secondary" 
                            @click="cekMeja" 
                            style="padding-left: 30px; padding-right: 30px"
                          >
                            Cek Meja
                            
                          </v-btn>
                      </v-col>
                    </v-row>
                    <v-divider v-show="showMeja"></v-divider>
                    <v-card v-show="showMeja" class="mx-auto my-5" style="background-color:#fff8f7;" max-width="760px">
                      <v-card-title style="background-color: #a6655e;" class="justify-center">
                          <span class="headline">Daftar Meja</span>
                      </v-card-title>
                      <v-row>
                        <v-col v-for="(item,index) in mejas" :key="index" class="ma-2 col-2">
                            <v-chip
                                v-if="cekMejas != null && cekMejas.includes(item.id_meja)"
                                class="ma-2"
                                depressed
                                color="error"
                                text-color="white"
                                style="padding-left: 60px; padding-right: 70px"
                                @click="dialogTerisi=true"
                            >
                                {{item.no_meja}}
                            </v-chip>
                            <v-chip 
                                v-else
                                class="ma-2"
                                depressed
                                color="success"
                                text-color="white"
                                style="padding-left: 60px; padding-right: 70px"
                                @click="pilihMeja(item)"
                            >
                                {{item.no_meja}}
                            </v-chip>
                        </v-col>
                        </v-row>
                    </v-card>
                    </v-form>
                  </v-container>
                </b-tab>
            </b-tabs>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="tambah" max-width="400px">
        <!-- <div class="cardinput">  -->
            <v-card style="background-color:#fff8f7;">
                <v-card-title id="titleCard" class="font-weight-medium mb-3 justify-center text-h4 text-center">
                    {{ titleForm }}
                </v-card-title>
                <v-card-body>
                <v-container>
                    <v-form v-model="valid" ref="form">
                    <v-row>
                        <v-col class="col-12">
                        <p>Nomor Meja</p>
                        <v-text-field
                            placeholder="nomor meja"  
                            prepend-inner-icon="mdi-format-list-bulleted"
                            :rules="noRules"
                            v-model="form.no_meja"
                            outlined
                            type="number"
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
        <!-- </div> -->
    </v-dialog>

    <v-dialog v-model="dialogConfirm" persisten max-width="400px">
       <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
          <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin menghapus meja ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogConfirm = false"
            >Batal</v-btn
          >
          <v-btn color="grey"  @click="deleteData">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRole" persisten max-width="400px">
     <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
          <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Anda tidak memiliki hak untuk mengakses ini !</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogRole = false"
            >Tutup</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="load">
      <v-progress-circular
        indeterminate
        :size="80" 
        :width="5"
        color="primary">
      </v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{ error_message }}</v-snackbar>
  </v-main>
</template>
<script>
export default {
  name: "Meja",
  data() {
    return {
      titleForm: "",
      token: "",
      id_mejaReservasi: '',
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      valid: "false",
      validInput: "false",
      color: "",
      search: "",
      modal: false,
      id_role:0,
      tambah: false,
      noRules: [(v) => !!v || "Nomor meja tidak boleh kosong"],
      tanggalRules: [(v) => !!v || "Tanggal tidak boleh kosong"],
      sesiRules: [(v) => !!v || "Waktu (sesi) tidak boleh kosong"],
      dialogConfirm: false,
      dialogDelete: false,
      dialogRole: false,
      headers: [
        {
          text: "Nomor Meja",
          align: "center",
          sortable: true,
          value: "no_meja",
        },
        { text: "Status Meja",align: "center", value: "status_meja" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      Datameja: new FormData(),
      mejaFull: [],
      mejas: [],
      sesiOption: ["Sesi 1 (11.00-16.00)","Sesi 2 (17.00-21.00)"],
      cekMejas: [],
      form: {
        status_meja: null,
        no_meja: null,
      },
      formInput: {
        tanggal: null,
        sesi: null,
      },
      deleteId: "",
      editId: "",
      showMeja: false,
    };
  },
  methods: {
    readData() {
      var url = this.$api + "/meja";
      this.load = true;
      this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.mejas= response.data.data;
          this.load = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    getMejaFull(){
        var sesi = '';
        var today = new Date();

      
        if(today.getHours() < 16 && today.getHours() >= 11){
            sesi = 'sesi 1'
        }else if(today.getHours() <= 21 && today.getHours() >= 17){
            sesi = 'sesi 2'
        }else{
            sesi = '';
        }

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd ;
        console.log(sesi);
        console.log(today);

        var url = this.$api + "/reservasi/"+today+"/"+sesi;
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.mejaFull = response.data.data;
        });
    },
    getMejaCek(){
      var sesi = '';
        if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)"){
            sesi = "sesi 1";
        }else{
            sesi = "sesi 2";
        }
      var url = this.$api + "/reservasi/"+this.formInput.tanggal+"/"+sesi;
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.cekMejas = response.data.data;
          console.log(response.data.data);
        });
    },
    cekMeja(){
      if (this.$refs.formInput.validate()) {
          this.getMejaCek();
          this.showMeja = true;
      }
    },
    setForm() {
      if (this.inputType === "Tambah") {
        this.save();
      } else {
        this.update();
      }
    },
    Tambah() {
      if(this.id_role == 3 || this.id_role == 4){
        this.dialogRole = true;
      }else{
        this.tambah = true;
        this.titleForm = "Tambah Meja";
      }
    },
    editHandler(item) {
      if(this.id_role == 3 || this.id_role == 4){
        this.dialogRole = true;
      }else{
        this.inputType = "Ubah";
        this.editId = item.id_meja;
        this.form.status_meja = item.status_meja;
        this.form.no_meja = item.no_meja;
        this.dialog = true;
        this.tambah = true;
        this.titleForm = "Ubah Meja";
      }
      
    },
    deleteHandler(item) {
      if(this.id_role == 3 || this.id_role == 4){
        this.dialogRole = true;
      }else{
        this.deleteId = item.id_meja;
        this.dialogConfirm = true;
      }
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/meja-soft/" + this.deleteId;
      let newData;
      this.dialogConfirm = false;
      this.load = true;
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
          this.load = false;
          this.dialogConfirm = false;
          this.readData();
          this.resetForm();
          this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    cancel() {
      this.changePage();
      this.resetForm();
    },
    update() {
      if (this.$refs.form.validate()) {
        let newData = {
          status_meja : this.form.status_meja,
          no_meja : this.form.no_meja,
        };
        var url = this.$api + "/meja/" + this.editId;
        this.tambah = false;
        this.load = true;
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
          })
          .catch((error) => {
            console.log(error.response.data.message)
            this.error_message = "Nomor Meja harus unik !";
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        this.Datameja.append("no_meja", this.form.no_meja);
        var url = this.$api + "/meja";
        this.tambah = false;
        this.load = true;
        this.$http
          .post(
            url,
            this.Datameja
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
          })
          .catch((error) => {
            console.log(error.response.data.message)
            this.error_message = "Nomor Meja harus unik !";
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    changePage() {
      this.tambah = false;
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
    this.id_role = localStorage.getItem('id_role')
    this.readData();
    this.getMejaFull();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 20px;
}

#titleCard{
    text-align: center;
    background-color: #a6655e;    
}
</style>
