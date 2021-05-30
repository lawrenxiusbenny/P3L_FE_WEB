<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Laporan Stok
      </h1>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger " content-class="mt-3">
                <b-tab title="Laporan Stok" >
                    <v-container>
                        <v-form v-model="validMenu" ref="formMenu">
                            <v-row>
                              <v-col class="col-md-5">
                                <v-autocomplete
                                  v-model="formMenu.menu"
                                  :items="itemsMenu"
                                  dense
                                  rounded
                                  placeholder="pilih nama menu"
                                  solo
                                  :rules="menuRules"
                                  @change="cekPilihanMenu"
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                        </v-form>
                        <v-form v-model="valid1" ref="form1">
                          <v-row v-show="format1">
                              <v-col class="col-md-4">
                                <v-dialog
                                  ref="dialog"
                                  v-model="modal"
                                  :return-value.sync="form1.tanggal1"
                                  persistent
                                  width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      placeholder="pilih tanggal awal"   
                                      :rules="tanggalRules"
                                      v-model="form1.tanggal1"
                                      outlined
                                      solo
                                      dense
                                      rounded
                                      v-bind="attrs"
                                      v-on="on"
                                      readonly
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date1"
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
                                          @click="$refs.dialog.save(date1)"
                                      >
                                          OK
                                      </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                              </v-col>
                              <v-col class="col-md-1 d-flex justify-content-center mb-5" style="margin-left:-25px; margin-right:-25px;">
                                  <v-icon>mdi-minus</v-icon>
                              </v-col>
                              <v-col class="col-md-4">
                                  <v-dialog
                                    ref="dialog2"
                                    v-model="modal2"
                                    :return-value.sync="form1.tanggal2"
                                    persistent
                                    width="290px"
                                  >
                                      <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        placeholder="pilih tanggal akhir"   
                                        :rules="tanggalRules"
                                        v-model="form1.tanggal2"
                                        outlined
                                        solo
                                        dense
                                        rounded
                                        v-bind="attrs"
                                        v-on="on"
                                        readonly
                                      ></v-text-field>
                                      </template>
                                      <v-date-picker
                                          v-model="date2"
                                          scrollable
                                          :min="form1.tanggal1"
                                          :max="today"
                                      >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="modal2 = false"
                                        >
                                            Batal
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialog2.save(date2)"
                                        >
                                            OK
                                        </v-btn>
                                      </v-date-picker>
                                  </v-dialog>
                              </v-col>
                              <v-col class="col-md-3 col-sm-12" style=" margin-top:-5px">
                                  <v-btn
                                      class="ma-2"
                                      color="secondary" 
                                      @click="generateLaporan1" 
                                      style="padding-left: 30px; padding-right: 30px;"
                                  >
                                      Generate Report
                                  </v-btn>
                              </v-col>
                          </v-row>
                        </v-form>

                        <!-- format 2 -->
                        <v-form v-model="valid2" ref="form2">
                          <v-row v-show="!format1">
                            <v-col class="col-md-4">
                              <v-autocomplete
                                  v-model="form2.bulan"
                                  :items="itemsBulan"
                                  dense
                                  rounded
                                  placeholder="pilih bulan laporan"
                                  :rules="bulanRules"
                                  solo
                                  clearable
                              ></v-autocomplete>
                            </v-col>
                            <v-col class="col-md-4">
                                <v-autocomplete
                                    v-model="form2.tahun"
                                    :items="itemsTahun"
                                    dense
                                    rounded
                                    placeholder="pilih tahun laporan"
                                    :rules="tahunRules"
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
                      <div id="cetak1"  class="d-flex justify-content-center">
                          <v-card  v-show="laporanstok1" class="p-3" max-width="850px" outlined>
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
                                      <p class="text-center font-weight-bold" style="margin-top:-10px">LAPORAN STOK BAHAN</p>    
                                  </v-row>
                                  <v-row style="margin-top:-10px">
                                      <p>ITEM MENU: {{this.formMenu.menu}}</p>
                                  </v-row>
                                  <v-row style="margin-top:-10px">
                                      <p>PERIODE: {{this.textPeriode}}</p>
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
                                              <th width="150px" style="text-align:center;">Incoming Stock</th>
                                              <th width="150px" style="text-align:center;">Remaining Stock</th>
                                              <th width="150px" style="text-align:center;">Waste Stock</th>
                                          </tr>
                                      </t-head>
                                  </v-row>
                                  <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                  <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                  <v-row>
                                      <t-body>
                                          <tr v-for="(item,index) in dataLaporan1Makanan" :key="index">
                                              <td width="50px" class="text-center">{{item.nomor}}</td>
                                              <td width="200px" style="text-align:center;">{{item.namaMenu}}</td>
                                              <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                              <td width="150px" style="text-align:center;">{{item.incomingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.remainingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.wasteStock}}</td>
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
                                              <th width="150px" style="text-align:center;">Incoming Stock</th>
                                              <th width="150px" style="text-align:center;">Remaining Stock</th>
                                              <th width="150px" style="text-align:center;">Waste Stock</th>
                                          </tr>
                                      </t-head>
                                  </v-row>
                                  <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                  <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                  <v-row>
                                      <t-body>
                                          <tr v-for="(item,index) in dataLaporan1Side" :key="index">
                                              <td width="50px" class="text-center">{{item.nomor}}</td>
                                              <td width="200px" style="text-align:center;">{{item.namaMenu}}</td>
                                              <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                              <td width="150px" style="text-align:center;">{{item.incomingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.remainingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.wasteStock}}</td>
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
                                              <th width="150px" style="text-align:center;">Incoming Stock</th>
                                              <th width="150px" style="text-align:center;">Remaining Stock</th>
                                              <th width="150px" style="text-align:center;">Waste Stock</th>
                                          </tr>
                                      </t-head>
                                  </v-row>
                                  <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                  <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                  <v-row>
                                     <t-body>
                                          <tr v-for="(item,index) in dataLaporan1Minuman" :key="index">
                                              <td width="50px" class="text-center">{{item.nomor}}</td>
                                              <td width="200px" style="text-align:center;">{{item.namaMenu}}</td>
                                              <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                              <td width="150px" style="text-align:center;">{{item.incomingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.remainingStock}}</td>
                                              <td width="150px" style="text-align:center;">{{item.wasteStock}}</td>
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
                              v-show="laporanstok1"
                              @click="laporanstok1 = false" 
                              style="padding-left: 30px; padding-right: 30px;"
                          >Tutup</v-btn>
                  
                          <v-btn
                              class="ma-2"
                              color="primary" 
                              @click="cetakLaporan1"
                              style="padding-left: 30px; padding-right: 30px;"
                              v-show="laporanstok1"
                          >Cetak</v-btn>
                      </div>

                      <div id="cetak2"  class="d-flex justify-content-center">
                          <v-card  v-show="laporanstok2" class="p-3" max-width="1000px" outlined>
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
                                      <p class="text-center font-weight-bold" style="margin-top:-10px">LAPORAN STOK BAHAN</p>    
                                  </v-row>
                                  <v-row style="margin-top:-10px">
                                      <p>ITEM MENU: {{this.formMenu.menu}}</p>
                                  </v-row>
                                  <v-row style="margin-top:-10px">
                                      <p>PERIODE: {{this.form2.bulan}} {{this.form2.tahun}}</p>
                                  </v-row>

                                  <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                  <v-row style="margin-top:-10px">
                                      <t-head>
                                          <tr>
                                              <th width="50px" class="text-center">No</th>
                                              <th width="200px" style="text-align:center;">Tanggal</th>
                                              <th width="100px" style="text-align:center;">Unit</th>
                                              <th width="150px" style="text-align:center;">Incoming Stock</th>
                                              <th width="150px" style="text-align:center;">Remaining Stock</th>
                                              <th width="150px" style="text-align:center;">Waste Stock</th>
                                          </tr>
                                      </t-head>
                                  </v-row>
                                  <v-divider style="margin-left:0px; margin-right:0px;"></v-divider>
                                  <v-divider style="margin-left:0px; margin-right:0px; margin-top:-13px"></v-divider>
                                  <v-row>
                                      <t-body>
                                          <tr v-for="(item,index) in dataLaporan2" :key="index">
                                              <td width="50px" class="text-center">{{item.nomor}}</td>
                                              <td width="200px" style="text-align:center;">{{item.tanggal}}</td>
                                              <td width="100px" style="text-align:center;">{{item.unit}}</td>
                                              <td v-if="item.incomingStock != 0" width="150px" style="text-align:center;">{{item.incomingStock}}</td>
                                              <td v-else width="150px" style="text-align:center;">-</td>
                                              <td v-if="item.remainingStock != 0" width="150px" style="text-align:center;">{{item.remainingStock}}</td>
                                              <td v-else width="150px" style="text-align:center;">-</td>
                                              <td v-if="item.wasteStock != 0" width="150px" style="text-align:center;">{{item.wasteStock}}</td>
                                              <td v-else width="150px" style="text-align:center;">-</td>
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
                              v-show="laporanstok2"
                              @click="laporanstok2 = false" 
                              style="padding-left: 30px; padding-right: 30px;"
                          >Tutup</v-btn>
                  
                          <v-btn
                              class="ma-2"
                              color="primary" 
                              @click="cetakLaporan2"
                              style="padding-left: 30px; padding-right: 30px;"
                              v-show="laporanstok2"
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
  name: "Laporan-Stok",
  data() {
    return {
        snackbar: false,
        error_message: "",    
        color:"",
        itemsMenu:[],
        textPrinted:"",
        namaKaryawan: "",
        itemsBulan:["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
        itemsTahun:["2019","2020","2021"],

        formMenu:{
          menu:null,
        },

        form1:{
            tanggal1: null,
            tanggal2: null,
        },
        laporanstok1:false,
        dataLaporan1Makanan:[],
        dataLaporan1Minuman:[],
        dataLaporan1Side:[],

        form2:{
            bulan: null,
            tahun: null
        },
        laporanstok2:false,
        dataLaporan2:[],

        textPeriode:"",

        format1: true,
        titleForm: "",
        token: "",
        load: false,
        validMenu: "false",
        valid1: "false",
        valid2: "false",
        id_karyawan:0,
        modal: "",
        modal2:'',
        modal3:'',
        search: "",
        bahans:[],
        tanggalRules: [(v) => !!v || "tanggal tidak boleh kosong"],
        menuRules: [(v) => !!v || "Nama menu tidak boleh kosong"],
        tahunRules: [(v) => !!v || "Tahun tidak boleh kosong"],
        bulanRules: [(v) => !!v || "Bulan tidak boleh kosong"],
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
    generateLaporan1(){
      if(this.$refs.formMenu.validate() && this.$refs.form1.validate()){
          if(this.form1.tanggal1 >= this.form1.tanggal2){
            this.error_message = "Invalid periode tanggal, silahkan dicek kembali";
            this.color = "red";
            this.snackbar = true;
          }else{
            this.laporanstok1 = false;
            this.laporanstok2 = false;
            var tanggal = new Date(this.form1.tanggal1);
            var tanggal2 = new Date(this.form1.tanggal2);

            var dd1 = String(tanggal.getDate()).padStart(2, '0');
            var dd2 = String(tanggal2.getDate()).padStart(2, '0');
            var yyyy1 = tanggal.getFullYear();
            var yyyy2 = tanggal2.getFullYear();
            this.textPeriode = "CUSTOM ("+dd1+" "+tanggal.toLocaleString('default', { month: 'short' })+" "+yyyy1+" s/d "
                                         +dd2+" "+tanggal2.toLocaleString('default', { month: 'short' })+" "+yyyy2+")";

            this.getTanggalHariIni();
            this.getDataKaryawan();
            this.getLaporan1Makanan();
            this.getLaporan1Minuman();
            this.getLaporan1Side();
          }
      }
    },
    generateLaporan2(){
      if(this.$refs.formMenu.validate() && this.$refs.form2.validate()){
        this.laporanstok1 = false;
            this.laporanstok2 = false;
        this.getTanggalHariIni();
        this.getDataKaryawan();
        this.getLaporan2();
      }
    },
    getLaporan1Makanan(){
        this.load = true;
        var url = this.$api + "/laporan-stok-1/Makanan/"+this.form1.tanggal1+"/"+this.form1.tanggal2;
        
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
            this.dataLaporan1Makanan = response.data.data;
            this.laporanstok1 = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    getLaporan1Minuman(){
        this.load = true;
        var url = this.$api + "/laporan-stok-1/Minuman/"+this.form1.tanggal1+"/"+this.form1.tanggal2;
        
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
            this.dataLaporan1Minuman = response.data.data;
            this.laporanstok1 = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    getLaporan1Side(){
        this.load = true;
        var url = this.$api + "/laporan-stok-1/Side Dish/"+this.form1.tanggal1+"/"+this.form1.tanggal2;
        
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
            this.dataLaporan1Side = response.data.data;
            this.laporanstok1 = true;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
            this.load = false;
        });
    },
    getLaporan2(){
      this.load = true;
      console.log(this.formMenu.menu)
      var url = this.$api + "/menu-name/"+this.formMenu.menu
      this.$http
      .get(url
          ,{
          headers:{
              Authorization: "Bearer " + this.token,
          }
          }
      )
      .then((response) => {
          console.log(response.data.data.id_menu)
          console.log(this.form2.tahun)
          console.log(this.convertBulan(this.form2.bulan))
          var url = this.$api + "/laporan-stok-2/"+response.data.data.id_menu+"/"+this.convertBulan(this.form2.bulan)+"/"+this.form2.tahun;
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
              this.laporanstok2 = true;
          })
          .catch((error) => {
              this.error_message = error.response.data.message;
              this.color = "red";
              this.laporanstok2 = true;
              this.snackbar = true;
              this.load = false;
          });

      })
      .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.laporanstok2 = true;
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
            output : "Laporan stok custom.pdf"
        }), 1000);

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
            output : "Laporan stok bulan "+this.form2.bulan+" "+this.form2.tahun+".pdf"
        }), 1000);

    },
    cekPilihanMenu(){
      if(this.formMenu.menu == "All"){
        this.format1 = true;
      }else{
        this.format1 = false;
      }
    },
    getDataMenu(){
        var url = this.$api + "/menu-name";
        this.$http
        .get(url
            ,{
            headers:{
                Authorization: "Bearer " + this.token,
            }
            }
        )
        .then((response) => {
            this.itemsMenu = response.data.data;
        })
        .catch((error) => {
            this.error_message = error.response.data.message;
        });
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
    getTanggal(){
        var today = new Date();

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd ;
        this.today = today;
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.id_karyawan=localStorage.getItem('id_karyawan');
    // this.readData();
    this.getTanggal();
    this.getDataMenu();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;
}
</style>

