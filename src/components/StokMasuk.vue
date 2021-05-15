<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Stok Masuk
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
            Tambah Stok Masuk
          </v-btn>
        </v-card-title>
        <div>
          <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="bahans" :search="search">
            <template v-slot:[`item.jumlah_stok_masuk`]="{ item }">
                {{formatRibuan(item.jumlah_stok_masuk)}} {{item.satuan_bahan}}
            </template>
             <template v-slot:[`item.harga_stok_masuk`]="{ item }">
               Rp {{formatPrice(item.harga_stok_masuk)}}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                <v-icon small color="red" class="mr-2" @click="deleteHandler(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="tambah" max-width="600px">
        <!-- <div class="cardinput">  -->
            <v-card style="background-color:#fff8f7;">
                <v-card-title id="titleCard" class="font-weight-medium mb-3 justify-center text-h4 text-center">
                    {{ titleForm }}
                </v-card-title>
                <v-card-body>
                <v-container>
                    <v-form v-model="valid" ref="form">
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Nama Bahan</p>
                            <v-select
                                :items="daftarBahan"
                                placeholder="nama bahan"
                                prepend-inner-icon="mdi-food-fork-drink"
                                :rules="namaRules"
                                v-model="form.nama_bahan"
                                outlined
                                solo
                                required
                            >
                            </v-select>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Jumlah Stok Masuk</p>
                            <v-text-field
                                prepend-inner-icon="mdi-package-down"
                                placeholder="jumlah stok masuk"
                                :rules="stokRules"
                                v-model="form.jumlah_stok_masuk"
                                outlined
                                solo
                                type="number"
                                required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Harga Stok Masuk</p>
                            <v-text-field
                                placeholder="harga stok masuk"
                                prefix="Rp. "
                                :rules="hargaRules"
                                v-model="form.harga_stok_masuk"
                                outlined
                                type="number"
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="form.tanggal_masuk"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <p>Tanggal Masuk</p>
                                <v-text-field
                                    :rules="tanggalRules"
                                    prepend-inner-icon="mdi-calendar"
                                    v-model="form.tanggal_masuk"
                                    placeholder="YYYY-MM-DD"
                                    outlined
                                    solo
                                    v-bind="attrs"
                                    v-on="on"
                                    readonly
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
        <v-card-text> Apakah anda yakin ingin menghapus data stok masuk ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogConfirm = false"
            >Batal</v-btn
          >
          <v-btn color="grey" @click="deleteData">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogKosong" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
          <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Data Bahan kosong, silahkan tambah bahan terlebih dahulu !</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialogKosong=false">Tutup</v-btn>
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
  name: "Stok-Masuk",

  data() {
    return {
      titleForm: "",
      token: "",
      inputType: "Tambah",
      load: false,
      today: '',
      snackbar: false,
      error_message: "",    
      valid: "false",
      color: "",
      modal: false,
      search: "",
      tambah: false,
      namaRules: [(v) => !!v || "Nama Bahan tidak boleh kosong"],
      stokRules: [(v) => v>0 || "Stok Bahan harus lebih dari 0"],
      hargaRules: [(v) => v>0 || "Harga Stok Masuk harus lebih dari 0"],
      tanggalRules: [(v) => !!v || "Tanggal Stok Masuk tidak boleh kosong"],
      
      dialogConfirm: false,
      dialogDelete: false,
      dialogKosong: false,

      headers: [
        {
          text: "Nama Bahan",
          align: "center",
          sortable: true,
          value: "nama_bahan",
        },
        // { text: "Tipe Bahan", value: "tipe_bahan" },
        { text: "Jumlah Stok Masuk", align: "center",value: "jumlah_stok_masuk" },
        { text: "Harga Stok Masuk",align: "center", value: "harga_stok_masuk" },
        { text: "Tanggal Masuk", align: "center",value: "tanggal_masuk" },
        { text: "Aksi", align: "center",value: "actions" },
      ],
      // headers2: [
      //   {
      //     text: "Nama Bahan",
      //     align: "start",
      //     sortable: true,
      //     value: "nama_bahan",
      //   },
      //   { text: "Jumlah Stok Masuk", value: "jumlah_stok_masuk" },
      //   { text: "Harga Stok Masuk", value: "harga_stok_masuk" },
      //   { text: "Tanggal Masuk", value: "tanggal_masuk" },
      //   { text: "Aksi", value: "actions" },
      // ],
      dataStokMasuk: new FormData(),
      daftarBahan: [],
      bahans: [],
      // bahanMakanans: [],
      stok_sebelum: "",
      stok_sesudah: "",
      // bahanSides: [],
      // bahanMinumans: [],
      form: {
        nama_bahan: null,
        id_bahan : null,
        tipe_bahan: null,
        jumlah_stok_masuk: null,
        harga_stok_masuk: null,
        tanggal_masuk: null,
      },
      deleteId: "", 
      editId: "",
      idBahanDelete:"",
      id_sebelum: "",
      id_sesudah: "",
    };
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatRibuan(value) {
        let val = (value/1).toFixed(0).replace('.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    getTanggalHariIni(){
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd ;
        this.today = today;
    },
    readData() {
      var url = this.$api + "/stok";
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
          console.log(response.data.data)
          this.bahans= response.data.data;
          this.load =false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
          this.loading = false;
        });
    },
    // readDataMakanan() {
    //   var url = this.$api + "/stok-makanan";
    //   this.load = true;
    //   this.$http
    //     .get(url
    //         ,{
    //           headers:{
    //               Authorization: "Bearer " + this.token,
    //           }
    //         }
    //     )
    //     .then((response) => {
    //       this.bahanMakanans= response.data.data;
    //       this.load = false;
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //     });
    // },
    // readDataSide() {
    //   var url = this.$api + "/stok-side";
    //   this.load = true;
    //   this.$http
    //     .get(url
    //         ,{
    //           headers:{
    //               Authorization: "Bearer " + this.token,
    //           }
    //         }
    //     )
    //     .then((response) => {
    //       this.bahanSides= response.data.data;
    //       this.load = false;
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //     });
    // },
    // readDataMinuman() {
    //   var url = this.$api + "/stok-minuman";
    //   this.load = true;
    //   this.$http
    //     .get(url
    //         ,{
    //           headers:{
    //               Authorization: "Bearer " + this.token,
    //           }
    //         }
    //     )
    //     .then((response) => {
    //       this.load = false;
    //       this.bahanMinumans= response.data.data;
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //     });
    // },
    //untuk dropdown input
    getNamaBahan(){
        var url = this.$api + "/bahan-name";
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.daftarBahan = response.data.data;
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
        if(this.daftarBahan == null){
            this.dialogKosong = true;
        }else{
            this.tambah = true;
            this.titleForm = "Tambah Stok Masuk";
        }
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.stok_sebelum = item.jumlah_stok_masuk;
      this.editId = item.id_stok_masuk;
      this.id_sebelum = item.id_bahan;
      this.form.nama_bahan = item.nama_bahan;
      this.form.jumlah_stok_masuk = item.jumlah_stok_masuk;
      this.form.harga_stok_masuk = item.harga_stok_masuk;
      this.form.tanggal_masuk = item.tanggal_masuk;

      this.dialog = true;
      this.tambah = true;
      this.titleForm = "Ubah Stok Masuk";
    },
    deleteHandler(item) {
      this.deleteId = item.id_stok_masuk;
      this.idBahanDelete = item.id_bahan;
      this.stok_sebelum = item.jumlah_stok_masuk;
      this.dialogConfirm = true;
    },
    updateStokBahan(baru,lama,id){
        let newData={
            stok_bahan_baru: baru,
            stok_bahan_lama: lama, 
        };
    var url = this.$api + "/bahan-stok/" + id;
      //data dihapus berdasarkan id
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
            this.dialogConfirm = false;
            // this.readData();
            // this.readDataMakanan();
            // this.readDataSide();
            // this.readDataMinuman();
            // this.resetForm();
            // this.inputType = "Tambah";
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/stok-soft/" + this.deleteId;
      let newData;
      this.load = true;
      this.dialogConfirm = false;
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
            this.updateStokBahan(0,this.stok_sebelum,this.idBahanDelete);
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
        var url = this.$api + "/bahan-name/"+this.form.nama_bahan;
        console.log(this.form.nama_bahan);
        this.tambah = false;
        this.load = true;
        this.$http
        .get(
            url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
            console.log(response.data.data.id_bahan);
            let newData = {
                id_bahan: response.data.data.id_bahan,
                jumlah_stok_masuk : this.form.jumlah_stok_masuk,
                harga_stok_masuk : this.form.harga_stok_masuk,
                tanggal_masuk : this.form.tanggal_masuk,
            };
            this.form.id_bahan = response.data.data.id_bahan;
            this.id_sesudah = response.data.data.id_bahan;
            this.stok_sesudah = this.form.jumlah_stok_masuk;
            console.log(this.editId);
            var url = this.$api + "/stok/"+this.editId;
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
                this.showData = false;
                if(this.id_sebelum == this.id_sesudah){
                    this.updateStokBahan(this.stok_sesudah,this.stok_sebelum,this.form.id_bahan);
                }else{
                    this.updateStokBahan(this.stok_sesudah,0,this.id_sesudah);
                    this.updateStokBahan(0,this.stok_sebelum,this.id_sebelum);
                }
                
                this.readData();
                this.changePage();
                this.resetForm();
            })
            .catch((error) => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        });

      }
    },
    save() {
      if (this.$refs.form.validate()) {
        
        var url = this.$api + "/bahan-name/"+this.form.nama_bahan;
        this.tambah= false;
        this.load = true;
        this.$http
          .get(
            url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
          )
          .then((response) => {
              this.form.id_bahan = response.data.data.id_bahan;
                this.dataStokMasuk.append("id_bahan", response.data.data.id_bahan);
                this.dataStokMasuk.append("jumlah_stok_masuk", this.form.jumlah_stok_masuk);
                this.dataStokMasuk.append("harga_stok_masuk", this.form.harga_stok_masuk);
                this.dataStokMasuk.append("tanggal_masuk", this.form.tanggal_masuk);
                var url = this.$api + "/stok";
                this.$http
                .post(
                    url,
                    this.dataStokMasuk
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
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
          this.readData();
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
    this.readData();
    this.getNamaBahan();
    this.getTanggalHariIni();
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
