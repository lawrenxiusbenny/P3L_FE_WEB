<template>
    <v-main class="list">
    <div v-show="tambah">
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Menu
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
            Tambah Menu
          </v-btn>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger " content-class="mt-3">
                <b-tab title="Semua Menu" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="menus" :search="search">
                        <template v-slot:[`item.harga_menu`]="{ item }">
                            <span v-if="item.harga_menu != 0">Rp {{formatPrice(item.harga_menu)}}</span>
                            <span v-else>Free</span>
                            <!-- <money-format
                              :value="item.harga_menu"
                              locale="ID"
                              currency-code="IDR"
                            ></money-format> -->
                        </template>
                        <template v-slot:[`item.serving_size`]="{ item }">
                            {{item.serving_size}} {{item.satuan_bahan}}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small color="green" class="mr-2" @click="showImage(item)">mdi-image</v-icon>
                            <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                            <v-icon small color="red" class="mr-2" @click="deleteHandler(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Makanan" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers2" :items="makanans" :search="search">
                        <template v-slot:[`item.harga_menu`]="{ item }">
                            Rp. {{item.harga_menu.toString()}}
                        </template>
                        <template v-slot:[`item.serving_size`]="{ item }">
                            {{item.serving_size}} {{item.satuan_bahan}}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteHandler(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Minuman" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers2" :items="minumans" :search="search">
                        <template v-slot:[`item.harga_menu`]="{ item }">
                            Rp. {{item.harga_menu}}
                        </template>
                        <template v-slot:[`item.serving_size`]="{ item }">
                            {{item.serving_size}} {{item.satuan_bahan}}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteHandler(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Side Dish" >
                    <v-data-table style="background-color: #fff8f7;" :headers="headers2" :items="sideDishs" :search="search">
                        <template v-slot:[`item.harga_menu`]="{ item }">
                            Rp. {{item.harga_menu}}
                        </template>
                        <template v-slot:[`item.serving_size`]="{ item }">
                            {{item.serving_size}} {{item.satuan_bahan}}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                            <v-icon small color="red" @click="deleteHandler(item)">mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
            </b-tabs>
        </div>
      </v-card>
    </div>

    <div v-show="!tambah">
        <div class="cardinput"> 
            <v-card style="background-color:#fff8f7;">
                <v-card-title id="titleCard" class="font-weight-medium mb-3 justify-center text-h4 text-center">
                    {{ titleForm }}
                </v-card-title>
                <v-card-body>
                <v-container>
                    <v-form v-model="valid" ref="form">
                    <v-row>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Nama Menu</p>
                            <v-text-field
                                prepend-inner-icon="mdi-food"
                                placeholder="nama menu"
                                :rules="namaMenuRules"
                                v-model="form.nama_menu"
                                outlined
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Nama Bahan</p>
                            <v-select
                                :items="daftarBahan"
                                placeholder="nama bahan"
                                prepend-inner-icon="mdi-food-fork-drink"
                                :rules="namaBahanRules"
                                v-model="form.nama_bahan"
                                outlined
                                solo
                                required
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-12">
                            <p>Deskripsi Menu</p>
                            <v-textarea
                                :rules="deskripsiRules"
                                v-model="form.deskripsi_menu"
                                placeholder="deskripsi menu"
                                :no-resize="false"
                                :outlined="true"
                                :rows="4"
                                required
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-4 col-sm-12">
                            <p>Jenis Menu</p>
                            <v-select
                                placeholder="jenis menu"
                                :rules="jenisMenuRules"
                                v-model="form.jenis_menu"
                                outlined
                                prepend-inner-icon="mdi-format-list-bulleted"
                                :items="jenisMenuOptions"
                                solo
                                required
                            >
                            </v-select>
                        </v-col>
                        <v-col class="col-md-4 col-sm-12">
                            <p>Harga Menu</p>
                            <v-text-field
                                placeholder="harga menu"
                                prefix="Rp. "
                                :rules="hargaRules"
                                v-model="form.harga_menu"
                                :min="0"
                                outlined
                                type="number"
                                solo
                                
                                required
                            >
                            </v-text-field>
                        </v-col>
                        <v-col class="col-md-4 col-sm-12">
                            <p>Serving Size</p>
                            <v-text-field
                                placeholder="serving size"
                                :rules="servingRules"
                                prepend-inner-icon="mdi-package-up"
                                v-model="form.serving_size"
                                outlined
                                type="number"
                                solo
                                required
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="col-md-5 col-sm-12">
                            <div class="image-preview"  v-if="this.inputType == 'Ubah'">
                                <img  :src="imagePathEdit" />
                            </div>
                            <div class="image-preview" v-if="this.inputType == 'Tambah'">
                                <p v-if="imagePathCreate==null">Image Preview</p>
                                <img v-else :src="imagePathCreate" />
                            </div>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                            <p>Gambar Menu</p>
                            <v-file-input
                              :rules="gambarRules"
                              @change="getImage"
                              v-model="form.gambar_menu"
                              accept="image/png, image/jpeg, image/bmp"
                              placeholder="pilih gambar menu"
                              prepend-icon="mdi-camera"
                            >
                            </v-file-input>
                        </v-col>
                    </v-row>
                    <v-card-actions class="justify-content-center mt-5">
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
          <v-btn color="secondary" @click="dialogKosong=false">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogImage" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px" class="font-weight-medium mb-3 justify-center text-h4 text-center">
          Gambar Menu
        </v-card-title>
        <v-card-text align='center'> 
          <img :src="imageUrlShow" alt="" style="max-width:350px" class="p-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogImage=false">Tutup</v-btn>
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
  name: "Menu",
  data() {
    return {
        imagePathEdit: null,
        imagePathCreate: null,
        fileInput: "",
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
      tambah: true,
      cekEditImage: 0,

      namaBahanRules: [(v) => !!v || "Nama Bahan tidak boleh kosong"],
      namaMenuRules: [(v) => !!v || "Nama Menu tidak boleh kosong"],
      jenisMenuRules: [(v) => !!v|| "Jenis Menu tidak boleh kosong"],
      hargaRules: [(v) => v>-1 || "Harga Menu tidak boleh negatif"],
      servingRules: [(v) => v>0 || "Serving Size harus lebih dari 0"],
      deskripsiRules: [(v) => !!v || "Deskripsi Menu tidak boleh kosong"],
      gambarRules: [(v) => !!v || "Pilih Gambar Menu"],

      jenisMenuOptions:["Makanan","Side Dish","Minuman"],
      dialogConfirm: false,
      dialogDelete: false,
      dialogKosong: false,

      headers: [
        {
          text: "Nama Menu",
          align: "center",
          sortable: true,
          value: "nama_menu",
        },
        { text: "Jenis Menu",align: "center", value: "jenis_menu" },
        { text: "Nama Bahan",align: "center", value: "nama_bahan" },
        { text: "Harga Menu",align: "center", value: "harga_menu" },
        { text: "Serving Size",align: "center", value: "serving_size" },
        // { text: "Deskripsi Menu",align: "center", value: "deskripsi_menu" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      headers2: [
        {
          text: "Nama Menu",
          align: "center",
          sortable: true,
          value: "nama_menu",
        },
        { text: "Nama Bahan",align: "center", value: "nama_bahan" },
        { text: "Harga Menu",align: "center", value: "harga_menu" },
        { text: "Serving Size",align: "center", value: "serving_size" },
        // { text: "Deskripsi Menu",align: "center", value: "deskripsi_menu" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      dataMenu: new FormData(),
      daftarBahan: [],
      menus: [],
      makanans:[],
      sideDishs:[],
      minumans:[],
      form: {
        nama_bahan: null,
        id_bahan : null,
        nama_menu: null,
        harga_menu: null,
        deskripsi_menu: null,
        jenis_menu: null,
        serving_size: null,
        gambar_menu: null,
      },
      deleteId: "", 
      editId: "",
      idBahanDelete:"",
      dialogImage: false,
      imageUrlShow: '',
    };
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
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
    showImage(item){
      this.imageUrlShow = this.$url + "menus/" + item.gambar_menu;
      this.dialogImage = true;
    },
    getImage() {
      var reader = new FileReader();
      reader.readAsDataURL(this.form.gambar_menu);
      reader.onload = () => {
        if (this.inputType == "Ubah"){
          this.imagePathEdit = reader.result;
          this.cekEditImage = 1;
        }
        this.imagePathCreate = reader.result;
      };
    },
    uploadImage() {
      let image = new FormData();
      image.append("gambar_menu", this.form.gambar_menu);
      var url = this.$api + "/menu/upload-image/" + this.editId;
      this.imagePathEdit = this.imagePathCreate;
      this.$http
        .post(
          url,
          image
          ,{
                    headers:{
                        Authorization: "Bearer " + this.token,
                    }
            }
        )
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "green";

        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    readData() {
      var url = this.$api + "/menu";
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
          this.menus= response.data.data;
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
    readDataMakanan() {
      var url = this.$api + "/menu-makanan";
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
          this.makanans= response.data.data;
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
    readDataMinuman() {
      var url = this.$api + "/menu-minuman";
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
          this.minumans= response.data.data;
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
    readDataSide() {
      var url = this.$api + "/menu-side";
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
          this.sideDishs= response.data.data;
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
            this.tambah = false;
            this.titleForm = "Tambah Data Menu";
        }
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.editId = item.id_menu;

      this.form.nama_bahan = item.nama_bahan;
      console.log(item.gambar_menu);
      this.form.nama_menu = item.nama_menu;
      this.form.harga_menu = item.harga_menu;
      this.form.deskripsi_menu = item.deskripsi_menu;
      this.form.jenis_menu = item.jenis_menu;
      this.form.serving_size = item.serving_size;
      this.form.gambar_menu = item.gambar_menu;

      this.imagePathEdit = this.$url + "menus/" + item.gambar_menu;

      console.log(this.imagePathEdit);

      this.tambah = false;
      this.titleForm = "Ubah Data Menu";
    },
    deleteHandler(item) {
      this.deleteId = item.id_menu;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/menu-soft/" + this.deleteId;
      console.log(this.deleteId);
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
            this.readDataMakanan();
            this.readDataMinuman();
            this.readDataSide();
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
        if(this.cekEditImage == 1){
          this.uploadImage();
        }
        var url = this.$api + "/bahan-name/"+this.form.nama_bahan;
        console.log(this.form.nama_bahan);
        this.tambah = true;
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
          let newData = {
            id_bahan: response.data.data.id_bahan,
            nama_menu: this.form.nama_menu,
            harga_menu: this.form.harga_menu,
            deskripsi_menu: this.form.deskripsi_menu,
            jenis_menu: this.form.jenis_menu,
            serving_size: this.form.serving_size,
          };
          var url = this.$api + "/menu/"+this.editId;
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
              this.readDataMakanan();
              this.readDataMinuman();
              this.readDataSide();
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

                this.dataMenu.append("id_bahan", this.form.id_bahan);
                this.dataMenu.append("nama_menu", this.form.nama_menu);
                this.dataMenu.append("harga_menu", this.form.harga_menu);
                this.dataMenu.append("deskripsi_menu", this.form.deskripsi_menu);
                this.dataMenu.append("jenis_menu", this.form.jenis_menu);
                this.dataMenu.append("serving_size", this.form.serving_size);
                this.dataMenu.append("gambar_menu", this.form.gambar_menu);
                var url = this.$api + "/menu";
                this.$http
                .post(
                    url,
                    this.dataMenu
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
                    this.readData();
                    this.readDataMakanan();
                    this.readDataMinuman();
                    this.readDataSide();
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
      }
    },
    changePage() {
      this.tambah = true;
      this.titleForm = "";
      this.inputType = "Tambah";
       this.imagePathEdit = null;
      this.imagePathCreate = null;
      this.cekEditImage= 0;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
      this.$refs.fileInput.value = null;
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.readData();
    this.readDataMakanan();
    this.readDataMinuman();
    this.readDataSide();
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

.image-preview{
  margin-left: 50px;
  width:300px; 
  border:2px solid #dddddd; 
  min-height: 300px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #dddddd;
}
</style>
