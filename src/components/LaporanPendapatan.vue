<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Laporan Pendapatan
      </h1>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger " content-class="mt-3">
                <b-tab title="Laporan Pendapatan per Bulan" >
                    <v-container>
                        <v-form v-model="valid1" ref="form1">
                            <v-row>
                                <v-col class="col-md-4">
                                    <v-autocomplete
                                        v-model="form1.tahun"
                                        :items="items"
                                        dense
                                        rounded
                                        placeholder="tahun laporan pendapatan"
                                        :rules="tanggalRules"
                                        solo
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                                <v-col class="col-md-2 col-sm-12" style=" margin-top:-5px">
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
                        <div id="cetak1"  class="d-flex justify-content-center">
                            <v-card v-show="laporanPendapatan1" class="p-3" max-width="850px" outlined>
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
                                        <p class="text-center font-weight-bold" style="margin-top:-10px">LAPORAN PENDAPATAN BULANAN</p>    
                                    </v-row>
                                    <v-row style="margin-top:-10px">
                                        <p>TAHUN: {{this.form1.tahun}}</p>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:0px"></v-divider>
                                    <v-row style="margin-top:-10px">
                                        <t-head>
                                            <tr>
                                                <th width="50px" class="text-center">No</th>
                                                <th width="100px" style="text-align:center;">Bulan</th>
                                                <th width="150px" style="text-align:center;">Makanan</th>
                                                <th width="150px" style="text-align:center;">Side Dish</th>
                                                <th width="150px" style="text-align:center;">Minuman</th>
                                                <th width="200px" style="text-align:center;">Total Pendapatan</th>
                                            </tr>
                                        </t-head>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row>
                                        <t-body>
                                            <tr v-for="(item,index) in dataLaporan1" :key="index">
                                                <td width="50px" class="text-center">{{index}}</td>
                                                <td width="100px" style="text-align:start;">{{formatMonth(index)}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.makanan)}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.minuman)}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.side)}}</td>
                                                <td width="200px" style="text-align:center;">Rp {{formatPrice(item.total)}}</td>
                                            </tr>
                                        </t-body>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
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
                                v-show="laporanPendapatan1"
                                @click="laporanPendapatan1 = false" 
                                style="padding-left: 30px; padding-right: 30px;"
                            >Tutup</v-btn>
                    
                            <v-btn
                                class="ma-2"
                                color="primary" 
                                @click="cetakLaporan1"
                                style="padding-left: 30px; padding-right: 30px;"
                                v-show="laporanPendapatan1"
                            >Cetak</v-btn>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="Laporan Pendapatan per Tahun" >
                    <v-container>
                        <v-form v-model="valid2" ref="form2">
                            <v-row>
                                <v-col class="col-md-4">
                                    <v-autocomplete
                                        v-model="form2.tahun1"
                                        :items="items"
                                        dense
                                        rounded
                                        placeholder="tahun awal"
                                        :rules="tanggalRules"
                                        solo
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                                <v-col class="col-md-1 d-flex justify-content-center mb-5" style="margin-left:-25px; margin-right:-25px;">
                                    <v-icon>mdi-minus</v-icon>
                                </v-col>
                                <v-col class="col-md-4">
                                    <v-autocomplete
                                        v-model="form2.tahun2"
                                        :items="items"
                                        dense
                                        rounded
                                        placeholder="tahun akhir"
                                        :rules="tanggalRules"
                                        solo
                                        clearable
                                    ></v-autocomplete>
                                </v-col>
                                <v-col class="col-md-3 col-sm-12" style=" margin-top:-5px">
                                    <v-btn
                                        class="ma-2"
                                        color="secondary" 
                                        @click="generateLaporan2" 
                                        style="padding-left: 30px; padding-right: 30px;"
                                    >
                                        Generate Report
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                    <div>
                        <div id="cetak2"  class="d-flex justify-content-center">
                            <v-card v-show="laporanPendapatan2" class="p-3" max-width="850px" outlined>
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
                                        <p class="text-center font-weight-bold" style="margin-top:-10px">LAPORAN PENDAPATAN TAHUNAN</p>    
                                    </v-row>
                                    <v-row style="margin-top:-10px">
                                        <p>TAHUN: {{this.form2.tahun1}} s/d {{this.form2.tahun2}}</p>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:0px"></v-divider>
                                    <v-row style="margin-top:-10px">
                                        <t-head>
                                            <tr>
                                                <th width="50px" class="text-center">No</th>
                                                <th width="100px">Tahun</th>
                                                <th width="150px" style="text-align:center;">Makanan</th>
                                                <th width="150px" style="text-align:center;">Side Dish</th>
                                                <th width="150px" style="text-align:center;">Minuman</th>
                                                <th width="200px" style="text-align:center;">Total Pendapatan</th>
                                            </tr>
                                        </t-head>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                    <v-row>
                                        <t-body>
                                            <tr v-for="(item,index) in dataLaporan2" :key="index">
                                                <td width="50px" class="text-center">{{item.nomor}}</td>
                                                <td width="100px" style="text-align:start;">{{index}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.makanan)}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.minuman)}}</td>
                                                <td width="150px" style="text-align:center;">Rp {{formatPrice(item.side)}}</td>
                                                <td width="200px" style="text-align:center;">Rp {{formatPrice(item.total)}}</td>
                                            </tr>
                                        </t-body>
                                    </v-row>
                                    <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                    <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
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
                                v-show="laporanPendapatan2"
                                @click="laporanPendapatan2 = false" 
                                style="padding-left: 30px; padding-right: 30px;"
                            >Tutup</v-btn>
                    
                            <v-btn
                                class="ma-2"
                                color="primary" 
                                @click="cetakLaporan2"
                                style="padding-left: 30px; padding-right: 30px;"
                                v-show="laporanPendapatan2"
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
  name: "Laporan-Pendapatan",
  data() {
    return {
        snackbar: false,
        error_message: "",    
        color:"",
        valid1: false,
        items:["2021","2020","2019"],
        textPrinted:"",
        namaKaryawan: "",

        form1:{
            tahun:null
        },
        laporanPendapatan1: false,
        dataLaporan1:[],

        form2:{
            tahun1:null,
            tahun2:null,
        },
        laporanPendapatan2: false,
        dataLaporan2:[],

        titleForm: "",
        token: "",
        load: false,
        valid: "false",
        id_karyawan:0,
        modal: "",
        search: "",
        bahans:[],
        tanggalRules: [(v) => !!v || "Tahun tidak boleh kosong"],
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
        loading: false,
        today:'',
    };
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    formatMonth(value){
        let val = "";
        if(value == 1){
            val = "Januari";
        }
        if(value == 2){
            val = "Februari";
        }
        if(value == 3){
            val = "Maret";
        }
        if(value == 4){
            val = "April";
        }
        if(value == 5){
            val = "Mei";
        }
        if(value == 6){
            val = "Juni";
        }
        if(value == 7){
            val = "Juli";
        }
        if(value == 8){
            val = "Agustus";
        }
        if(value == 9){
            val = "September";
        }
        if(value == 10){
            val = "Oktober";
        }
        if(value == 11){
            val = "November";
        }
        if(value == 12){
            val = "Desember";
        }

        return val.toString();

    },
    generateLaporan(){
        if(this.$refs.form1.validate()){
            this.laporanPendapatan1 = false;
            this.getTanggalHariIni();
            this.getDataKaryawan();
            this.getLaporan1();
        }
    },
    getLaporan1(){
        this.load = true;
        var url = this.$api + "/laporan-pendapatan-1/"+this.form1.tahun;
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
            this.dataLaporan1 = response.data.data;
            this.laporanPendapatan1 = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    cetakLaporan1(){
        this.load = true;
        let cetak = document.getElementById("cetak1");
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
            output : "Laporan pendapatan bulanan tahun " + this.form1.tahun+".pdf"
        }), 1000);

    },
    getLaporan2(){
        this.load = true;
        var url = this.$api + "/laporan-pendapatan-2/"+this.form2.tahun1+"/"+this.form2.tahun2;
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
            this.dataLaporan2 = response.data.data;
            this.laporanPendapatan2 = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    cetakLaporan2(){
        this.load = true;
        let cetak = document.getElementById("cetak2");
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
            output : "Laporan pendapatan bulanan tahun " + this.form2.tahun1+" s/d "+ this.form2.tahun2+".pdf"
        }), 1000);
    },
    generateLaporan2(){
        if(this.$refs.form2.validate()){
            if(this.form2.tahun2<this.form2.tahun1 || this.form2.tahun2==this.form2.tahun1){
                this.error_message = "Invalid rentang tahun, silahkan dicek kembali"
                this.color = "red";
                this.snackbar = true;
            }else{
                this.laporanPendapatan2 = false;
                this.getTanggalHariIni();
                this.getDataKaryawan();
                this.getLaporan2();
            }
        }
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
