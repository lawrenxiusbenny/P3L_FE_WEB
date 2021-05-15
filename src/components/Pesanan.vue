<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Daftar Pesanan
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
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3" @click="readData()">
                <b-tab title="Daftar Pesanan" class="text">
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="pesanans" :search="search">
                        <template v-slot:[`item.waktu_reservasi`]="{ item }">
                            <v-chip
                                v-if="item.waktu_reservasi == 'sesi 1'"
                                class="ma-2"
                                depressed
                                color="purple"
                                outlined
                                text-color="purple"
                            >
                                Lunch
                            </v-chip>
                            <v-chip 
                                v-else-if="item.waktu_reservasi == 'sesi 2'"
                                class="ma-2"
                                outlined
                                color="primary"
                                text-color="primary"
                            >
                                Dinner
                            </v-chip>
                            <v-chip 
                                v-else
                                class="ma-2"
                                outlined
                                color="green"
                                text-color="green"
                            >
                                Langsung
                            </v-chip>
                        </template>
                        <template v-slot:[`item.status_penyajian`]="{ item }">
                            <v-chip
                                v-if="item.status_penyajian == 'Served'"
                                class="ma-2"
                                depressed
                                color="green"
                                outlined
                                text-color="green"
                            >
                                {{item.status_penyajian}}
                            </v-chip>
                            <v-chip 
                                v-else-if="item.status_penyajian == 'Unserved'"
                                class="ma-2"
                                outlined
                                color="red"
                                text-color="red"
                            >
                                {{item.status_penyajian}}
                            </v-chip>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Cek Daftar Pesanan" class="text">
                    <div class="m-4">
                        <v-form v-model="validInput" ref="formInput">
                            <v-row>
                                <v-col class="col-md-3 col-sm-12">
                                    <v-select
                                        :items="mejaOptions"
                                        :rules="noRules"
                                        v-model="formInput.no_meja"
                                        prepend-inner-icon="mdi-desk"
                                        label="Nomor Meja"
                                        outlined
                                        required
                                        clearable
                                    >
                                    </v-select>
                                </v-col>
                                <v-col class="col-md-3 col-sm-12">
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
                                                outlined
                                                label="Tanggal Reservasi"
                                                prepend-inner-icon="mdi-calendar"
                                                v-bind="attrs"
                                                v-on="on"
                                                readonly
                                                clearable
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
                                    <v-col class="col-md-3 col-sm-12">
                                    
                                    <v-select
                                        :items="sesiOption"
                                        :rules="sesiRules"
                                        v-model="formInput.sesi"
                                        label="Waktu (Sesi)"
                                        prepend-inner-icon="mdi-clock"
                                        outlined
                                        required
                                    >
                                    </v-select>
                                </v-col>
                                <v-col class="col-md-3 col-sm-12">
                                    <v-btn
                                        class="ma-2"
                                        color="secondary" 
                                        @click="cekPesanan" 
                                        style="padding-left: 30px; padding-right: 30px"
                                    >
                                        Cek Pesanan
                                        
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    <v-row  v-if="cekPesanans!=null" v-show="showPesanan">
                        <v-col class="col-md-8 col-sm-12">
                            <v-data-table style="background-color: #fff8f7;" :headers="headers2" :items="cekPesanans" :search="search">
                                <template v-slot:[`item.status_penyajian`]="{ item }">
                                    <v-chip
                                        v-if="item.status_penyajian == 'Served'"
                                        class="ma-2"
                                        depressed
                                        color="green"
                                        outlined
                                        text-color="green"
                                    >
                                        {{item.status_penyajian}}
                                    </v-chip>
                                    <v-chip 
                                        v-else-if="item.status_penyajian == 'Unserved'"
                                        class="ma-2"
                                        outlined
                                        color="red"
                                        text-color="red"
                                    >
                                        {{item.status_penyajian}}
                                    </v-chip>
                                </template>
                                <template v-slot:[`item.gambar_menu`]="{ item }">
                                        <div class="p-2">
                                          <img :src="'http://be.atmabbq.xyz/menus/' + item.gambar_menu" width="150px"/>
                                        </div>
                                </template>
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                                </template>
                            </v-data-table>
                        </v-col>
                        <v-col class="col-md-4 col-sm-12">
                            <v-card style="background-color: #fff8f7">
                                <v-container>
                                    <h4 class="text-center font-weight-bold">Ringkasan Pesanan</h4>
                                    <v-divider></v-divider>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p>Subtotal</p>
                                        </div>
                                        <div style="align: right;" >
                                            Rp {{formatPrice(totalHarga)}}
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p>Pajak (Persentase)</p>
                                        </div>
                                        <div style="align: right;" >
                                            5%
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p>Total Pajak</p>
                                        </div>
                                        <div style="align: right;" >
                                            Rp {{formatPrice(0.05*totalHarga)}}
                                        </div>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="d-flex justify-content-between">
                                        <div >
                                            <h4 class="font-weight-bold">Total</h4>
                                        </div>
                                        <div style="align: right;" >
                                            Rp {{formatPrice((0.05*totalHarga)+totalHarga)}}
                                        </div>
                                    </div>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                    
                    <v-row v-else justify="center" class="my-5">
                        <v-row class="col-md-8 col-sm-12">
                            <v-card  class="col" style="background-color:#f5e4e4; margin-bottom: 50px">
                                <v-card-title class="justify-center">
                                    <v-icon large>mdi-emoticon-sad</v-icon>
                                </v-card-title>
                                <v-card-text class="text-center">
                                    Daftar pesanan masih kosong, silahkan tambah data pesanan terlebih dahulu
                                </v-card-text>
                            </v-card>
                        </v-row>
                    </v-row>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="dialogConfirm" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
          <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin mengubah status penyajian pesanan ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogConfirm = false"
            >Batal</v-btn
          >
          <v-btn color="grey" @click="updateStatus">Ya</v-btn>
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
  name: "Pesanan",
  data() {
    return {
      token: "",
      load: false,
      today: '',
      snackbar: false,
      error_message: "",    
      validInput: "false",
      color: "",
      search: "",
      modal: false,
      dialogConfirm: false,
      headers: [
        {
          text: "Tanggal Reservasi",
          align: "center",
          sortable: true,
          value: "tanggal_reservasi",
        },
        { text: "Waktu Reservasi",align: "center", value: "waktu_reservasi" },
        { text: "Nomor Meja",align: "center", value: "no_meja" },
        { text: "Jenis Pesanan",align: "center", value: "nama_menu" },
        { text: "Jumlah",align: "center", value: "jumlah" },
        { text: "Status Penyajian",align: "center", value: "status_penyajian" },
        { text: "",align: "center", value: "actions" },
      ],
      headers2: [
        {
          text: "Menu",
          align: "start",
          sortable: true,
          value: "gambar_menu",
        },
        { text: "Jenis Pesanan", value: "nama_menu" },
        { text: "Jumlah", value: "jumlah" },
        { text: "Status Penyajian", value: "status_penyajian" },
        { text: "", value: "actions" },
      ],
      pesanans: [],
      cekPesanans: [],
      mejaOptions: [],
      showPesanan: false,
      sesiOption: ["Sesi 1 (11.00-16.00)","Sesi 2 (17.00-21.00)","Langsung"],
      noRules: [(v) => !!v || "Nomor meja tidak boleh kosong"],
      tanggalRules: [(v) => !!v || "Tanggal tidak boleh kosong"],
      sesiRules: [(v) => !!v || "Waktu (sesi) tidak boleh kosong"],
      formInput: {
        tanggal: null,
        sesi: null,
        no_mena: null,
      },
      id_meja:0,
      totalHarga: 0,
      editId: "",
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
    cekPesanan(){
        if(this.$refs.formInput.validate()){
            var url = this.$api + "/meja-no/"+ this.formInput.no_meja;
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
                this.id_meja = response.data.data;
                var sesi = 'Langsung';
                console.log(this.formInput.sesi)
                if(this.formInput.sesi == "Sesi 1 (11.00-16.00)"){
                    sesi = "sesi 1";
                }
                if(this.formInput.sesi == "Sesi 2 (17.00-21.00)"){
                    sesi = "sesi 2";
                }
                
                console.log(this.id_meja)
                console.log(sesi)
                console.log(this.formInput.tanggal)

                console.log(this.id_meja);
                var url = this.$api + "/pesanan-search/"+ this.id_meja + "/" + this.formInput.tanggal + "/" + sesi;
                this.$http
                .get(url
                    ,{
                        headers:{
                            Authorization: "Bearer " + this.token,
                        }
                    }
                )
                .then((response) => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    // this.snackbar = true;
                    this.load = false;
                    this.cekPesanans = response.data.data;
                    this.totalHarga = response.data.total;
                    this.showPesanan = true;
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
    readData() {
      var url = this.$api + "/pesanan";
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
          this.pesanans= response.data.data;
          this.load =false;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    getAllNomor(){
        var url = this.$api + "/meja-nomor";
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.mejaOptions = response.data.data;
          console.log(this.mejaOptions);
        });
    },
    editHandler(item) {
      this.editId = item.id_pesanan;
      this.dialogConfirm = true;
    },
    updateStatus() {
        var url = this.$api + "/pesanan-penyajian/"+this.editId;
        this.dialogConfirm = false;
        this.load = true;
        let newData;
        this.$http
        .put(
            url
            ,newData,{
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
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.readData();
    this.getTanggalHariIni();
    this.getAllNomor();
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
