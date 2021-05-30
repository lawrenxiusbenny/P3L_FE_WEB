<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Laporan Penjualan Item Menu
      </h1>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger " content-class="mt-3">
                <b-tab title="Laporan Penjualan Item Menu" >
                    <v-container>
                        <v-form v-model="valid" ref="form">
                            <v-row>
                                <v-col class="col-md-4">
                                    <v-autocomplete
                                        v-model="form.bulan"
                                        :items="itemsBulan"
                                        dense
                                        rounded
                                        placeholder="bulan laporan penjualan"
                                        :rules="bulanRules"
                                        solo
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                                <v-col class="col-md-4">
                                    <v-autocomplete
                                        v-model="form.tahun"
                                        :items="itemsTahun"
                                        dense
                                        rounded
                                        placeholder="tahun laporan penjualan"
                                        :rules="tahunRules"
                                        solo
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                                <v-col class="col-md-4 col-sm-12" style=" margin-top:-5px">
                                    <v-btn
                                        class="ma-2"
                                        color="secondary" 
                                        @click="generateLaporan" 
                                        style="padding-left: 30px; padding-right: 30px;"
                                    >
                                        Generate Report
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                    <div>
                        
                        <div id="cetak"  class="d-flex justify-content-center">
                            <v-card  v-show="laporanPenjualan" class="p-3" max-width="850px" outlined>
                                <v-card-title>
                                    <v-row>
                                        <v-col class="col-md-4 col-sm-12">
                                            <img src="../assets/akb.png" alt="Logo Atma BBQ">
                                        </v-col>
                                        <v-col class="col-md-8 col-sm-12">
                                            <h3 class="text-center">ATMA KOREAN BBQ</h3>
                                            <h4 class="text-center mt-2 red--text">FUN PLACE TO GRILL!</h4>
                                            <p class="text-center mt-2 mb-0">Jl. Babarsari No. 43 Yogyakarta</p>
                                            <p class="text-center mt-0 mb-0">552181</p>
                                            <p class="text-center mb-0">Telp. (0274) 487711</p>
                                        </v-col>
                                    </v-row>
                                </v-card-title>
                                <v-card-body>
                                    <v-row>
                                        <p class="font-weight-bold mv-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
                                    </v-row>
                                    <v-row>
                                        <p class="text-center font-weight-bold" style="margin-top:-10px">LAPORAN PENJUALAN ITEM MENU</p>    
                                    </v-row>
                                    <v-row style="margin-top:-10px">
                                        <p>TAHUN: {{this.form.tahun}}</p>
                                    </v-row>
                                    <v-row style="margin-top:-10px">
                                        <p>BULAN: {{this.form.bulan}}</p>
                                    </v-row>

                                    <!-- Makanan -->
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:16px"></v-divider>
                                    <v-row style="margin-top:-10px; margin-left:15px;">
                                        <p class="font-weight-bold">MAKANAN</p>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:0px"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row style="margin-top:-10px">
                                        <t-head>
                                            <tr>
                                                <th width="50px" class="text-center">No</th>
                                                <th width="200px" style="text-align:center;">Item Menu</th>
                                                <th width="100px" style="text-align:center;">Unit</th>
                                                <th width="250px" style="text-align:center;">Penjualan Harian Tertinggi</th>
                                                <th width="200px" style="text-align:center;">Total Penjualan</th>
                                            </tr>
                                        </t-head>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row>
                                        <t-body>
                                            <tr v-for="(item,index) in makanans" :key="index">
                                                <td width="50px" class="text-center">{{item.nomor}}</td>
                                                <td width="200px" style="text-align:center;">{{item.nama_menu}}</td>
                                                <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                                <td width="250px" style="text-align:center;">{{item.penjualanTertinggi.totalJumlah}}</td>
                                                <td width="200px" style="text-align:center;">{{item.totalPenjualan}}</td>
                                            </tr>
                                        </t-body>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>

                                    <!-- SIDE DISH -->
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:25px"></v-divider>
                                    <v-row style="margin-top:-10px; margin-left:15px;">
                                        <p class="font-weight-bold">SIDE DISH</p>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:0px"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row style="margin-top:-10px">
                                        <t-head>
                                            <tr>
                                                <th width="50px" class="text-center">No</th>
                                                <th width="200px" style="text-align:center;">Item Menu</th>
                                                <th width="100px" style="text-align:center;">Unit</th>
                                                <th width="250px" style="text-align:center;">Penjualan Harian Tertinggi</th>
                                                <th width="200px" style="text-align:center;">Total Penjualan</th>
                                            </tr>
                                        </t-head>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row>
                                        <t-body>
                                            <tr v-for="(item,index) in sides" :key="index">
                                                <td width="50px" class="text-center">{{item.nomor}}</td>
                                                <td width="200px" style="text-align:center;">{{item.nama_menu}}</td>
                                                <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                                <td width="250px" style="text-align:center;">{{item.penjualanTertinggi.totalJumlah}}</td>
                                                <td width="200px" style="text-align:center;">{{item.totalPenjualan}}</td>
                                            </tr>
                                        </t-body>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>

                                    <!-- Minuman -->
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:25px"></v-divider>
                                    <v-row style="margin-top:-10px; margin-left:15px;">
                                        <p class="font-weight-bold">MINUMAN</p>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:0px"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row style="margin-top:-10px">
                                        <t-head>
                                            <tr>
                                                <th width="50px" class="text-center">No</th>
                                                <th width="200px" style="text-align:center;">Item Menu</th>
                                                <th width="100px" style="text-align:center;">Unit</th>
                                                <th width="250px" style="text-align:center;">Penjualan Harian Tertinggi</th>
                                                <th width="200px" style="text-align:center;">Total Penjualan</th>
                                            </tr>
                                        </t-head>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row>
                                        <t-body>
                                            <tr v-for="(item,index) in minumans" :key="index">
                                                <td width="50px" class="text-center">{{item.nomor}}</td>
                                                <td width="200px" style="text-align:center;">{{item.nama_menu}}</td>
                                                <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                                <td width="250px" style="text-align:center;">{{item.penjualanTertinggi.totalJumlah}}</td>
                                                <td width="200px" style="text-align:center;">{{item.totalPenjualan}}</td>
                                            </tr>
                                        </t-body>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>

                                    <!-- footer -->
                                    <v-row style="margin-top: 50px">
                                        <p style="text-align: center;">{{this.textPrinted}}</p>
                                    </v-row>
                                    <v-row style="margin-top: -20px">
                                        <p style="text-align: center;">Printed by <span style="text-decoration: underline;">{{this.namaKaryawan}}</span></p>
                                    </v-row>
                                </v-card-body>
                            </v-card>
                        </div>
                        <div class="d-flex justify-content-center">    
                            <v-btn
                                class="ma-2"
                                color="secondary" 
                                v-show="laporanPenjualan"
                                @click="laporanPenjualan = false" 
                                style="padding-left: 30px; padding-right: 30px;"
                            >Tutup</v-btn>
                    
                            <v-btn
                                class="ma-2"
                                color="primary" 
                                @click="cetakLaporan"
                                style="padding-left: 30px; padding-right: 30px;"
                                v-show="laporanPenjualan"
                            >Cetak</v-btn>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
      </v-card>
    </div>
    <v-overlay :value="load">
      <v-progress-circular
        indeterminate
        :size="80" 
        :width="5"
        color="primary">
      </v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" class="text-center" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
  </v-main>
</template>
<script>
import html2PDF from 'jspdf-html2canvas';
export default {
  name: "Laporan-Penjualan",
  data() {
    return {
        snackbar: false,
        error_message: "",    
        color:"",
        itemsTahun:["2019","2020","2021"],
        itemsBulan:["All","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
        textPrinted:"",
        namaKaryawan: "",

        form:{
            bulan:null,
            tahun:null
        },
        laporanPenjualan: false,

        titleForm: "",
        token: "",
        load: false,
        valid: "false",
        id_karyawan:0,
        modal: "",
        search: "",
        makanans:[],
        minumans:[],
        sides:[],
        tahunRules: [(v) => !!v || "Tahun tidak boleh kosong"],
        bulanRules: [(v) => !!v || "Bulan tidak boleh kosong"],
        today:'',
    };
  },
  methods: {
    convertBulan(value){
        let val = 0;
        if(value == "Januari"){
            val = 1;
        }else if(value == "Februari"){
            val = 2;
        }else if(value == "Maret"){
            val = 3;
        }else if(value == "April"){
            val = 4;
        }else if(value == "Mei"){
            val = 5;
        }else if(value == "Juni"){
            val = 6;
        }else if(value == "Juli"){
            val = 7;
        }else if(value == "Agustus"){
            val = 8;
        }else if(value == "September"){
            val = 9;
        }else if(value == "Oktober"){
            val = 10;
        }else if(value == "November"){
            val = 11;
        }else if(value == "Desember"){
            val = 12;
        }else {
            val = 0;
        }
        return val;
    },
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    generateLaporan(){
        if(this.$refs.form.validate()){
            this.laporanPenjualan = false;
            this.getTanggalHariIni();
            this.getDataKaryawan();
            this.getLaporanMakanan();
            this.getLaporanMinuman();
            this.getLaporanSide();
        }
    },
    getLaporanMakanan(){
        this.load = true;
        console.log(this.convertBulan(this.form.bulan));
        var url = this.$api + "/laporan-penjualan/Makanan/"+this.convertBulan(this.form.bulan)+"/"+this.form.tahun;
        this.$http
        .get(url
            ,{
            headers:{
                Authorization: "Bearer " + this.token,
            }
            }
        )
        .then((response) => {
            this.load = false;
            this.makanans = response.data.data;
            this.laporanPenjualan = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    getLaporanMinuman(){
        this.load = true;
        console.log(this.convertBulan(this.form.bulan));
        var url = this.$api + "/laporan-penjualan/Minuman/"+this.convertBulan(this.form.bulan)+"/"+this.form.tahun;
        this.$http
        .get(url
            ,{
            headers:{
                Authorization: "Bearer " + this.token,
            }
            }
        )
        .then((response) => {
            this.load = false;
            this.minumans = response.data.data;
            this.laporanPenjualan = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    getLaporanSide(){
        this.load = true;
        console.log(this.convertBulan(this.form.bulan));
        var url = this.$api + "/laporan-penjualan/Side Dish/"+this.convertBulan(this.form.bulan)+"/"+this.form.tahun;
        this.$http
        .get(url
            ,{
            headers:{
                Authorization: "Bearer " + this.token,
            }
            }
        )
        .then((response) => {
            this.load = false;
            this.sides = response.data.data;
            this.laporanPenjualan = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    cetakLaporan(){
        this.load = true;
        let cetak = document.getElementById("cetak");
        setTimeout(() => this.load = false, 2000);
        setTimeout(() => html2PDF(cetak,{
            jsPDF: {
            format: 'a4',
            },
            imageType: 'image/jpeg',
            html2canvas : {
            scrollX: 0,
            scrollY: -window.scrollY,
            },
            output : "Laporan Penjualan item menu " + this.form.bulan +" "+this.form.tahun+".pdf"
        }), 1000);

    },
    getDataKaryawan(){
        var url = this.$api + "/karyawan/"+this.id_karyawan;
        this.$http
        .get(url
            ,{
            headers:{
                Authorization: "Bearer " + this.token,
            }
            }
        )
        .then((response) => {
            this.namaKaryawan = response.data.data.nama_karyawan;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
        });
    },
    getTanggalHariIni(){
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        var jam = String(today.getHours());
        var menit = String(today.getMinutes());
        var detik = String(today.getSeconds());

        if(jam<10){
            jam = "0"+jam;
        }

        if(menit<10){
            menit = "0"+menit;
        }

        if(detik<10){
            detik = "0"+detik;
        }

        var time="";
        if(jam<12){
            time = "AM";
        }else{
            time= "PM";
        }
        this.textPrinted = "Printed "+ today.toLocaleString('default', { month: 'short' })+" "+dd+", "+yyyy+" "
                            + jam +":"+menit+":"+detik+" "+time;
    },
    cancel() {
      this.changePage();
      this.resetForm();
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
    this.id_karyawan=localStorage.getItem('id_karyawan');
    // this.readData();
    // this.getTanggalHariIni();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;
}
</style>
