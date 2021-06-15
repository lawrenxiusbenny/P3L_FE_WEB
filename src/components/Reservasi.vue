<template>
    <v-main class="list">
    <div v-show="tambah">
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Data Reservasi
      </h1>
      <v-divider></v-divider>
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
          <v-btn class="light-blue error rounded mr-5" small dark @click="reservasiLangsung">
            Reservasi Langsung
          </v-btn>
          <v-btn class="light-blue darken-3 rounded" small dark @click="Tambah">
            Tambah Reservasi
          </v-btn>
        </v-card-title>
        <div>
            <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-danger" content-class="mt-3" @click="readData()">
                <b-tab title="PENDING" class="text">
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="reservasis" :search="search">
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
                    <template v-slot:[`item.status_reservasi`]="{ item }">
                        <v-chip
                            v-if="item.status_reservasi == 'belum datang'"
                            class="ma-2"
                            depressed
                            color="red"
                            outlined
                            text-color="red"
                        >
                            Belum Datang
                        </v-chip>
                        <v-chip 
                            v-else
                            class="ma-2"
                            outlined
                            color="green"
                            text-color="green"
                        >
                            Sudah Datang
                        </v-chip>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <v-icon small class="mr-2" @click="showQR(item)">mdi-qrcode</v-icon>
                        <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        <v-icon small color="red" class="mr-2" @click="deleteHandler(item.id_reservasi)">mdi-delete</v-icon>
                    </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="SELESAI" @click="readDataDatang()">
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="reservasisSudah" :search="search">
                    <template v-slot:[`item.status_reservasi`]="{ item }">
                      <v-chip
                          v-if="item.status_reservasi == 'belum datang'"
                          class="ma-2"
                          depressed
                          color="red"
                          outlined
                          text-color="red"
                      >
                          Belum Datang
                      </v-chip>
                      <v-chip 
                          v-else
                          class="ma-2"
                          outlined
                          color="green"
                          text-color="green"
                      >
                          Sudah Datang
                      </v-chip>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <!-- <v-icon small color="blue" class="mr-2" @click="editHandler(item)">mdi-pencil</v-icon> -->
                        <v-icon small color="red" class="mr-2" @click="deleteHandler(item.id_reservasi)">mdi-delete</v-icon>
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
                        <v-col class="col-md-6 col-sm-12">
                        <p>Nama Customer</p>
                        <v-select
                            placeholder="nama customer"  
                            prepend-inner-icon="mdi-account"
                            :items="customerName"
                            :rules="customerRules"
                            v-model="form.id_customer"
                            outlined
                            solo
                            @change="getDataCustomer"
                            required
                        >
                            <!-- <template v-slot:append-outer>
                                <v-slide-x-reverse-traisition                            
                                >

                                </v-slide-x-reverse-traisition>

                            </template> -->
                        </v-select>
                        </v-col>
                        <v-col class="col-md-6 col-sm-12">
                        <p>Jumlah Customer</p>
                        <v-text-field
                            placeholder="jumlah customer"  
                            prepend-inner-icon="mdi-account-multiple-outline"
                            v-model="form.jumlah_customer"
                            :min="1"
                            :rules="jumlahRules"
                            outlined
                            type="number"
                            solo
                            required
                        >
                        </v-text-field>
                        </v-col>
                    </v-row>

                    <v-card max-width="700px" class="mx-auto mb-5" style=" opacity: 0.9" v-show="showData">
                        <v-row>
                            <v-col align="center" class="col-3" style="background-color:#a6655e; border:2px solid #dddddd; ">
                                <p style="margin-top: 50px;">Data Customer</p>
                            </v-col>
                            <v-col class="col-9">
                                <v-row>
                                    <v-col class="col-md-4 font-weight-bold">
                                        Nama Customer
                                    </v-col>
                                    <v-col >
                                    {{ dataCustomer.nama_customer }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-md-4 font-weight-bold">
                                        Email Customer
                                    </v-col>
                                    <v-col >
                                        {{ dataCustomer.email_customer }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col class="col-md-4 font-weight-bold" >
                                        Telepon Customer
                                    </v-col>
                                    <v-col >
                                        {{ dataCustomer.telepon_customer }}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                    
                    <v-row v-show="langsung == false">
                        <v-col class="col-md-6 col-sm-12">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="form.tanggal_reservasi"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <p>Tanggal Reservasi</p>
                                <v-text-field
                                  placeholder="YYYY-MM-DD"   
                                  prepend-inner-icon="mdi-calendar"
                                    :rules="tanggalRules"
                                    v-model="form.tanggal_reservasi"
                                    outlined
                                    solo
                                    v-bind="attrs"
                                    v-on="on"
                                    readonly
                                    @change="cekMeja"
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
                        <v-col v-if="inputType==='Tambah'" class="col-md-6 col-sm-12">
                        <p>Waktu Reservasi</p>
                        <v-select
                            placeholder="waktu reservasi"  
                            prepend-inner-icon="mdi-clock"
                            :items="sesiOption"
                            :rules="waktuRules"
                            v-model="form.waktu_reservasi"
                            outlined
                            solo
                            required
                            @change="cekMeja2"
                        >
                        </v-select>
                        </v-col>
                        <v-col v-else-if="inputType==='Ubah'" class="col-md-6 col-sm-12">
                        <p>Waktu Reservasi</p>
                        <v-select
                            placeholder="waktu reservasi"  
                            prepend-inner-icon="mdi-clock"
                            :items="sesiEditOption"
                            :rules="waktuRules"
                            v-model="form.waktu_reservasi"
                            outlined
                            solo
                            required
                            @change="cekMeja2"
                        >
                        </v-select>
                        </v-col>
                    </v-row>
                    
                    <v-row v-show="cekEdit">
                      <v-col align="center" class="col-md-3 col-sm-12">
                        <p style="margin-top: 20px; margin-left:50px;">Status Reservasi</p>
                      </v-col>
                      <v-col class="col-md-6 col-sm-12">
                        <v-select
                          v-if="cekEdit"
                          :items="statusOption"
                          value="belum datang"
                          v-model="status_reservasi"
                          outlined
                          solo
                          required
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row v-show="showMeja">
                      <v-col class="col-md-6 col-sm-12">
                        <p class="ml-5">No. Meja </p> <v-chip class="ma-2 position:absolute; left:100px;" color="success" text-color="white">{{this.no_meja}} </v-chip>
                      </v-col>
                    </v-row>
                    <v-divider v-show="showMeja"></v-divider>
                    <v-row v-show="showMeja">
                        <v-col v-for="(item,index) in mejas" :key="index" class="col-2">
                            
                            <v-btn
                                v-if=" mejaFull!=null && mejaFull.includes(item.id_meja) == true"
                                class="ma-2"
                                depressed
                                color="error"
                                text-color="white"
                                @click="dialogTerisi=true"
                            >
                                {{item.no_meja}} 
                            </v-btn>
                            <v-btn 
                                v-else
                                class="ma-2"
                                depressed
                                color="success"
                                text-color="white"
                                @click="pilihMeja(item)"
                            >
                                {{item.no_meja}}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
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
                        <v-btn 
                        depressed color="primary" 
                        @click="setForm"
                        style="padding-left: 30px; padding-right: 30px"
                        >
                        Simpan
                        </v-btn>
                        <v-btn 
                        v-show="showMejaBtn && showMejaBtn2" 
                        depressed 
                        color="success" 
                        @click="cekMeja3"
                        class="ml-5"
                        style="padding-left: 30px; padding-right: 30px">
                        Cek Meja
                        </v-btn>
                    </v-card-actions>
                    </v-form>
                </v-container>
                </v-card-body>
            </v-card>
        </div>
    </div>

    <!-- untuk show -->
    <v-dialog v-model="dialogQR1" persisten max-width="450px">
      <v-card class="p-3" max-width="450px" outlined>
        <v-card-title class="font-weight-medium mb-3 justify-center text-h4 text-center">
          <img width="200px" src="../assets/akb.png" alt="Logo Atma BBQ">
        </v-card-title>
        <v-card-text class="text-center"> 
            <qrcode style="border:5px solid #000000; border-radius:5px" :value="qr.id_reservasi" ref="qr" :options="{ width: 200 }"></qrcode>
            <v-row style="margin-top: 40px">
                <p style="text-align: center; font-weight:bold;">{{this.textPrinted}}</p>
            </v-row>
            <v-row style="margin-top: -10px">
                <p style="text-align: center;">Printed by {{this.namaKaryawan}}</p>
            </v-row>

            <v-row style="margin-top: 50px">
                <p class="font-weight-bold mv-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
            </v-row>
            <v-row style="margin-top: -20px">
                <p style="text-align: center; font-weight:bold;">FUN PLACE TO GRILL</p>
            </v-row>
            <v-row style="margin-top: -20px; margin-bottom:5px;">
                <p class="font-weight-bold mv-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
            </v-row>
        </v-card-text>
      </v-card>
      <div class="d-flex justify-content-center" style="background-color:white;">    
        <v-btn
            class="ma-2"
            color="secondary" 
            @click="dialogQR = false, dialogQR1 = false" 
            style="padding-left: 30px; padding-right: 30px;"
        >Tutup</v-btn>

        <v-btn
            class="ma-2"
            color="primary" 
            @click="cetakQR"
            style="padding-left: 30px; padding-right: 30px;"
        >Cetak</v-btn>
      </div>
    </v-dialog>

    <!-- untuk cetak -->
    <div style="margin-top:250px;">
      <div id="cetakQR" class="d-flex justify-content-center">
        <v-card v-show="dialogQR" class="p-3" max-width="450px" outlined>
          <v-card-title class="font-weight-medium mb-3 justify-center text-h4 text-center">
            <img width="200px" src="../assets/akb.png" alt="Logo Atma BBQ">
          </v-card-title>
          <v-card-text class="text-center"> 
              <qrcode style="border:5px solid #000000; border-radius:5px" :value="qr.id_reservasi" ref="qr" :options="{ width: 200 }"></qrcode>
              <v-row style="margin-top: 40px">
                  <p style="text-align: center; font-weight:bold;">{{this.textPrinted}}</p>
              </v-row>
              <v-row style="margin-top: -10px">
                  <p style="text-align: center;">Printed by {{this.namaKaryawan}}</p>
              </v-row>

              <v-row style="margin-top: 50px">
                  <p class="font-weight-bold mv-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
              </v-row>
              <v-row style="margin-top: -20px">
                  <p style="text-align: center; font-weight:bold;">FUN PLACE TO GRILL</p>
              </v-row>
              <v-row style="margin-top: -20px; margin-bottom:5px;">
                  <p class="font-weight-bold mv-3">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
              </v-row>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-dialog v-model="dialogConfirm" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin menghapus data reservasi ini?</v-card-text>
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
        <v-card-text> Data Customer kosong, silahkan tambah Customer terlebih dahulu !</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialogKosong=false">Tutup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTerisi" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Meja telah terisi, silahkan pilih meja lain</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogTerisi=false">Tutup</v-btn>
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
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>{{error_message}}</v-snackbar>
  </v-main>
</template>
<script>
import html2PDF from 'jspdf-html2canvas';

export default {
  name: "Reservasi",
  data() {
    return {
      titleForm: "",
      showMejaBtn: false,
      showMejaBtn2: false,
      id_role: '',
      langsung: false,
      dialogRole: false,
      showData: false,
      showMeja: false,
      id_karyawan: '',
      token: "",
      inputType: "Tambah",
      load: false,
      snackbar: false,
      error_message: "",
      valid: "false",
      color: "",
      search: "",
      tambah: true,
        modal: false,
      sesiOption: ["Sesi 1 (11.00-16.00)","Sesi 2 (17.00-21.00)"],
      sesiEditOption: ["Sesi 1 (11.00-16.00)","Sesi 2 (17.00-21.00)","Langsung"],
      statusOption: ["belum datang","sudah datang"],
      statusRules: [(v) => !!v || "Status reservasi tidak boleh kosong"],
      customerRules: [(v) => !!v || "Nama Customer tidak boleh kosong"],
      jumlahRules: [(v) => v>0 || "Jumlah Customer harus lebih dari 0"],
      tanggalRules: [(v) => !!v || "Tanggal Reservasi tidak boleh kosong"],
      waktuRules: [(v) => !!v || "Waktu Reservasi tidak boleh kosong"],
      dialogConfirm: false,
      dialogDelete: false,
      dialogTerisi: false,
      dialogKosong: false,
      dialogQR: false,
      dialogQR1: false,
      headers: [
        {
          text: "Tanggal Reservasi",
          align: "center",
          sortable: true,
          value: "tanggal_reservasi",
        },
        { text: "Waktu Reservasi",align: "center", value: "waktu_reservasi" },
        { text: "Nama Customer",align: "center", value: "nama_customer" },
        { text: "Jumlah Customer",align: "center", value: "jumlah_customer" },
        { text: "No. Meja",align: "center", value: "no_meja" },
        { text: "Status Reservasi",align: "center", value: "status_reservasi" },
        { text: "Aksi",align: "center", value: "actions" },
      ],
      reservasi: new FormData(),
      reservasis: [],
      reservasisSudah: [],
      mejas: [],
      mejaFull:[],
      customerName: [],
      dataCustomer:{
          nama_customer: null,
          email_customer: null,
          telepon_customer: null,
      },
      form: {
        id_customer: null,
        id_meja: null,
        // no_meja: null,
        tanggal_reservasi: null,
        waktu_reservasi: null, 
        jumlah_customer: null,
      },
      qr: {
        id_reservasi: null,
        id_customer: null,
        id_meja: null,
        id_karyawan: null,
        tanggal_reservasi: null,
        waktu_reservasi: null, 
        jumlah_customer: null,
      },
      textPrinted:"",
      namaKaryawan:"",
      deleteId: "",
      ubahId: "",
      editId: "",
      status_reservasi: 'belum datang',
      dialogUbah: false,
      no_meja: null,
      cekEdit: false,
      tanggal_sebelum:'',
      today : new Date(),
      sesi: '',
      waktu_sebelum: '',
    };
  },
  methods: {
    cekFull(mejaFull,id){
      // console.log(this.mejaFull)
      // console.log(id)
      if(mejaFull != null){
        mejaFull.forEach(element => {
          // console.log(element)
          // console.log(id);
          if (element==id) {
              // console.log("benar");
              return true;
          }
        });
      }
        return false;
    },
    reservasiLangsung(){
      this.titleForm = "Reservasi Langsung";
      this.tambah = false;
      this.langsung = true;
      this.showMejaBtn = true;
      this.showMejaBtn2= true;
      this.form.tanggal_reservasi = this.today;
      this.form.waktu_reservasi = this.sesi;
      console.log(this.sesi);
    },
    cekMeja(){
        this.showMejaBtn= true;
        var sesi = '';
        if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)"){
            sesi = "sesi 1";
        }else{
            sesi = "sesi 2";
        }

        if(sesi != this.waktu_sebelum || this.form.tanggal_reservasi != this.tanggal_sebelum){
          this.form.id_meja=null
        }
        
    },
    cekMeja2(){
        this.showMejaBtn2 = true;
              var sesi = '';
        if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)"){
            sesi = "sesi 1";
        }else{
            sesi = "sesi 2";
        }

        if(sesi != this.waktu_sebelum || this.form.tanggal_reservasi != this.tanggal_sebelum){
          this.form.id_meja=null
        }
    },
    getMejaFull(){
        var sesi = '';
        console.log(this.form.waktu_reservasi);
        console.log(this.form.tanggal_reservasi);
        if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)" || this.form.waktu_reservasi == "sesi 1"){
            sesi = "sesi 1";
        }else{
            sesi = "sesi 2";
        }
        console.log(sesi);
        var url = this.$api + "/reservasi/"+this.form.tanggal_reservasi+"/"+sesi;
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
          console.log(this.mejaFull);
        });
    },
    ubahStatusMeja(status,id){
        var url = this.$api + "/meja-manual/"+id;
        let newData = {
          status_meja : status,
        };
        this.$http
        .put(url,newData
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
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    cekMeja3(){
        this.getMejaFull(); 
        this.showMeja = true;
        
    },
    pilihMeja(item){
        this.no_meja = item.no_meja;
        this.form.id_meja = item.id_meja;
    },
    getDataMeja(){
        var url = this.$api + "/meja";
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.mejas = response.data.data;
        });
    },
    getDataCustomer(){
        this.showData = true;
        var url = this.$api + "/customer-name/" + this.form.id_customer;
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.dataCustomer = response.data.data;
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
    readData() {
      var url = this.$api + "/reservasi";
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
          this.reservasis = response.data.data;
          this.load = false;
        });
        
    },
    readDataDatang() {
      var url = this.$api + "/reservasi-datang";
      this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.reservasisSudah = response.data.data;
        });
    },
    getCustomerName(){
        var url = this.$api + "/customer-name";
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.customerName = response.data.data;
        });
    },
    getTextPrinted(){
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
    getTanggalHariIni(){
        var sesi = '';
        var today = new Date();

      
        if(today.getHours() < 16 && today.getHours() >= 11){
            sesi = 'sesi 1'
        }else if(today.getHours() <= 21 && today.getHours() >= 17){
            sesi = 'sesi 2'
        }else{
            sesi = 'Langsung';
        }

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd ;
        this.today = today;
        this.sesi = sesi;
        console.log(sesi);
        console.log(today);
    },
    setForm() {
      console.log("test")
      if (this.inputType === "Tambah") {
        console.log("test2")
        if(this.langsung == true){
          
          this.status_reservasi = 'sudah datang';
        }else{
          this.status_reservasi = 'belum datang';
        }
        console.log(this.status_reservasi);
        this.save();
      } else {
        console.log("test3")
        this.update();
      }
    },
    showQR(item){
      this.qr.id_reservasi = item.id_reservasi;
      this.qr.id_customer = item.id_customer;
      this.qr.id_meja = item.id_meja;
      this.qr.id_karyawan = item.id_karyawan;
      this.qr.tanggal_reservasi = item.tanggal_reservasi;
      this.qr.waktu_reservasi = item.waktu_reservasi;
      this.qr.jumlah_customer = item.jumlah_customer;
      this.getTextPrinted();
      this.getDataKaryawan();
      this.dialogQR = true;
      this.dialogQR1 = true;
    },
    cetakQR(){
      this.dialogQR1 =false;
      this.load = true;
      let cetak = document.getElementById("cetakQR");
      setTimeout(() => this.load = false, 2000);
      setTimeout(() => html2PDF(cetak,{
          jsPDF: {
          },
          imageType: 'image/jpeg',
          html2canvas : {
          scrollX: 0,
          scrollY: -window.scrollY,
          },
          output : "QR-Code.pdf"
      }), 1000);
      setTimeout(() => this.dialogQR = false, 2500);
    },
    Tambah() {      
      console.log(this.customerName);
      if(this.customerName == null){
        this.dialogKosong = true;
      }else{
        this.tambah = false;
        this.titleForm = "Tambah Reservasi";
      }
    },
    editHandler(item) {
      this.inputType = "Ubah";
      this.cekEdit = true;
      this.editId = item.id_reservasi;
      this.waktu_sebelum = item.waktu_reservasi;
      this.tanggal_sebelum = item.tanggal_reservasi;
      this.form.no_meja = item.no_meja;
      this.form.id_customer = item.nama_customer;
      this.status_reservasi = item.status_reservasi;

      this.form.jumlah_customer = item.jumlah_customer;
      this.form.tanggal_reservasi = item.tanggal_reservasi;
      this.form.waktu_reservasi = item.waktu_reservasi;
      this.form.id_meja = item.id_meja;
      // this.form.no_meja = null;

        if(item.waktu_reservasi == "sesi 1"){
            this.form.waktu_reservasi = "Sesi 1 (11.00-16.00)";
        }else{
            this.form.waktu_reservasi = "Sesi 2 (17.00-21.00)";
        }

      this.showMejaBtn = true;
      this.showMejaBtn2 = true;
      this.dialog = true;
      this.tambah = false;
      this.titleForm = "Ubah Reservasi";
    },
    deleteHandler(id) {
      this.deleteId = id;
      this.dialogConfirm = true;
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/reservasi-soft/" + this.deleteId;
      //data dihapus berdasarkan id
      let newData;
      this.dialogConfirm = false;
      this.load = true;
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
          this.readDataDatang();
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
      this.showMejaBtn = false;
      this.showMejaBtn2 = false;
      this.showData = false;
      this.showMeja = false;
    },
    update() {
      if (this.$refs.form.validate()) {
         if(this.form.id_meja != null){
            var url = this.$api + "/customer-name/"+this.form.id_customer;
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
                this.form.id_customer = response.data.data.id_customer;
                if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)"){
                    this.form.waktu_reservasi = "sesi 1";
                }else{
                    this.form.waktu_reservasi = "sesi 2";
                }

                let newData = {
                    id_customer: response.data.data.id_customer,
                    id_meja : this.form.id_meja,
                    jumlah_customer: this.form.jumlah_customer,
                    tanggal_reservasi: this.form.tanggal_reservasi,
                    waktu_reservasi: this.form.waktu_reservasi,
                    status_reservasi: this.status_reservasi,
                };

                var url = this.$api + "/reservasi/"+this.editId;
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
        }else{
            this.error_message = "Pilih nomor meja !";
            this.color = "red";
            this.snackbar = true;
        }
      }
    },
    save() {
      console.log('testmasuk')
      console.log(this.form.id_customer)
      console.log(this.form.id_meja)
      console.log(this.form.tanggal_reservasi)
      console.log(this.form.waktu_reservasi)
      console.log(this.form.jumlah_customer)
      console.log(this.status_reservasi)

      if (this.$refs.form.validate()) {
        console.log('berhasil')
        if(this.form.id_meja != null){
            var url = this.$api + "/customer-name/"+this.form.id_customer;
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
                this.form.id_customer = response.data.data.id_customer;
                if(this.form.waktu_reservasi == "Sesi 1 (11.00-16.00)" || this.form.waktu_reservasi == "sesi 1"){
                this.form.waktu_reservasi = "sesi 1";
                }else{
                    this.form.waktu_reservasi = "sesi 2";
                }
                this.reservasi.append("id_customer", response.data.data.id_customer);
                this.reservasi.append("id_meja", this.form.id_meja);
                this.reservasi.append("id_karyawan", this.id_karyawan);
                this.reservasi.append("tanggal_reservasi", this.form.tanggal_reservasi);
                this.reservasi.append("waktu_reservasi", this.form.waktu_reservasi);
                this.reservasi.append("jumlah_customer", this.form.jumlah_customer);
                this.reservasi.append("status_reservasi", this.status_reservasi);

                var url = this.$api + "/reservasi";
                this.$http
                .post(
                    url,
                    this.reservasi
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
                    this.langsung = false;
                    this.readData();
                    this.changePage();
                })
                .catch((error) => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            });
        }else{
            this.error_message = "Pilih nomor meja !";
            this.color = "red";
            this.snackbar = true;
        }
      }
    },
    changePage() {
      this.tambah = true;
      this.titleForm = "";
      this.inputType = "Tambah";
      this.showMejaBtn = false;
      this.showMejaBtn2 = false;
      this.showData = false;
      this.showMeja = false;    
      this.no_meja = '';
      this.form.id_meja = null;
      this.cekEdit = false;
      this.status_reservasi = '';
      this.langsung = false;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    },
    cekTanggal(){
      var url = this.$api + "/reservasi-selesai/"+this.today;
      let newData;
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
          console.log(this.error_message);
      })
      .catch((error) => {
          this.error_message = error.response.data.message;
          console.log(this.error_message);
      });
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.id_karyawan = localStorage.getItem('id_karyawan')
    
      
      this.getCustomerName();
      this.getDataMeja();    
      this.getTanggalHariIni()  ;
      this.cekTanggal();
      this.readData();
      this.readDataDatang();
  },
};
</script>
<style scoped>

.cardinput{
    margin: 50px;   
    /* background-color:blanchedalmond  ;  */
}
</style>
