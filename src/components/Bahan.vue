<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Bahan
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
            Tambah Bahan
          </v-btn>
        </v-card-title>
        <div>
          <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="bahans" :search="search">
            <template v-slot:[`item.stok_bahan`]="{ item }">
                {{formatRibuan(item.stok_bahan)}}
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
                            <p>Nama bahan</p>
                            <v-text-field
                                placeholder="nama bahan"
                                prepend-inner-icon="mdi-food-fork-drink"
                                :rules="namaRules"
                                v-model="form.nama_bahan"
                                outlined
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Satuan bahan</p>
                            <v-select
                                placeholder="satuan bahan"
                                prepend-inner-icon="mdi-map-marker"
                                :items="satuanOptions"
                                :rules="satuanRules"
                                v-model="form.satuan_bahan"
                                outlined
                                solo
                                required
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Tipe bahan</p>
                            <v-select
                                placeholder="tipe bahan"
                                prepend-inner-icon="mdi-format-list-bulleted"
                                :items="tipeOptions"
                                :rules="tipeRules"
                                v-model="form.tipe_bahan"
                                outlined
                                solo
                                required
                            >
                            </v-select>
                        </v-col>
                        
                    </v-row> -->
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
        <v-card-text> Apakah anda yakin ingin menghapus bahan ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogConfirm = false"
            >Batal</v-btn
          >
          <v-btn color="grey" @click="deleteData">Ya</v-btn>
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
  name: "Bahan",
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
      search: "",
      tambah: false,
      namaRules: [(v) => !!v || "Nama Bahan tidak boleh kosong"],
      satuanRules: [(v) => !!v || "Satuan Bahan tidak boleh kosong"],
      // tipeRules: [(v) => !!v || "Tipe Bahan tidak boleh kosong"],
      stokRules: [(v) => v>0 || "Stok Bahan harus lebih dari 0"],
      dialogConfirm: false,
      dialogDelete: false,
      headers: [
        {
          text: "Nama Bahan",
          align: "center",
          sortable: true,
          value: "nama_bahan",
        },
        { text: "Stok Bahan",align: "center", value: "stok_bahan" },
        { text: "Satuan Bahan",align: "center", value: "satuan_bahan" },
        // { text: "Tipe Bahan", value: "tipe_bahan" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      // headers2: [
      //   {
      //     text: "Nama Bahan",
      //     align: "start",
      //     sortable: true,
      //     value: "nama_bahan",
      //   },
      //   { text: "Stok Bahan", value: "stok_bahan" },
      //   { text: "Satuan Bahan", value: "satuan_bahan" },
      //   { text: "Aksi", value: "actions" },
      // ],
      // tipeOptions: ["Makanan","Side Dish","Minuman"],
      satuanOptions: ["gram","ml"],
      dataBahan: new FormData(),
      bahans: [],
      // bahanMakanans: [],
      // bahanSides: [],
      // bahanMinumans: [],
      form: {
        nama_bahan: null,
        stok_bahan: null,
        satuan_bahan: null,
        // tipe_bahan: null,
      },
      deleteId: "", 
      editId: "",
    };
  },
  methods: {
    formatRibuan(value) {
        let val = (value/1).toFixed(0).replace('.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    readData() {
      var url = this.$api + "/bahan";
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
          this.bahans= response.data.data;
          this.load = false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    // readDataMakanan() {
    //   var url = this.$api + "/bahan-makanan";
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
    //   var url = this.$api + "/bahan-side";
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
    //   var url = this.$api + "/bahan-minuman";
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
    //       this.bahanMinumans= response.data.data;
    //       this.load = false;
    //     })
    //     .catch((error) => {
    //       this.error_message = error.response.data.message;
    //       this.color = "red";
    //       this.snackbar = true;
    //       this.load = false;
    //     });
    // },
    setForm() {
      if (this.inputType === "Tambah") {
        this.save();
      } else {
        this.update();
      }
    },
    Tambah() {
      this.tambah = true;
      this.titleForm = "Tambah Bahan";
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_bahan;
      this.form.nama_bahan = item.nama_bahan;
      this.form.stok_bahan = item.stok_bahan;
      this.form.satuan_bahan = item.satuan_bahan;
      // this.form.tipe_bahan = item.tipe_bahan;
      this.dialog = true;
      this.tambah = true;
      this.titleForm = "Ubah Bahan";
    },
    deleteHandler(item) {
      this.deleteId = item.id_bahan;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/bahan-soft/" + this.deleteId;
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
            this.readData();
            // this.readDataMakanan();
            // this.readDataSide();
            // this.readDataMinuman();
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
          nama_bahan : this.form.nama_bahan,
          stok_bahan : this.form.stok_bahan,
          satuan_bahan : this.form.satuan_bahan,
          // tipe_bahan : this.form.tipe_bahan,
        };
        var url = this.$api + "/bahan/" + this.editId;
        this.load = true;
        this.tambah = false;
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
            // this.readDataMakanan();
            // this.readDataSide();
            // this.readDataMinuman();
            this.changePage();
            this.resetForm();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
          });
      }
    },
    save() {
      if (this.$refs.form.validate()) {
        
        
        this.dataBahan.append("nama_bahan", this.form.nama_bahan);
        this.dataBahan.append("stok_bahan", 0);
        this.dataBahan.append("satuan_bahan", this.form.satuan_bahan);
        // this.dataBahan.append("tipe_bahan", this.form.tipe_bahan);
        var url = this.$api + "/bahan";
        this.tambah = false;
        this.load = true;
        this.$http
          .post(
            url,
            this.dataBahan
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
            // this.readDataMakanan();
            // this.readDataSide();
            // this.readDataMinuman();
            this.changePage();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
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
    this.readData();
    // this.readDataMakanan();
    // this.readDataSide();
    // this.readDataMinuman();
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
    /* background-color: burlywood; */
}
</style>
