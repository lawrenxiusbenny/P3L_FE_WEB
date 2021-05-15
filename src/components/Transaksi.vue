<template>
    <v-main class="list">
    <div>
      <h1 class="font-weight-medium mb-5 font-weight-black">
        Daftar Transaksi
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
                <b-tab title="Daftar Transaksi" class="text">
                    <v-data-table style="background-color: #fff8f7;" :headers="headers" :items="transaksis" :search="search">
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
                        <template v-slot:[`item.total_harga`]="{ item }">
                          Rp {{formatPrice(item.total_harga)}}
                        </template>
                        <template v-slot:[`item.metode_pembayaran`]="{ item }">
                            <v-chip
                                v-if="item.metode_pembayaran == 'Cash'"
                                class="ma-2"
                                depressed
                                color="green"
                                outlined
                                text-color="green"
                            >
                                {{item.metode_pembayaran}}
                            </v-chip>
                            <v-chip 
                                v-else
                                class="ma-2"
                                outlined
                                color="primary"
                                text-color="primary"
                            >
                                {{item.metode_pembayaran}}
                            </v-chip>
                        </template>
                    </v-data-table>
                </b-tab>
                <b-tab title="Pembayaran" class="text">

                  <div class="m-4" v-show="!showStepper">
                    <v-form v-model="validInput" ref="formInput">
                        <v-row>
                            <v-col class="col-md-3 col-sm-12">
                                <v-select
                                    :items="mejas"
                                    :rules="noRules"
                                    v-model="formInput.no_meja"
                                    label="Nomor Meja"
                                    outlined
                                    required
                                    prepend-inner-icon="mdi-desk"
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
                                            v-bind="attrs"
                                            v-on="on"
                                            readonly
                                            clearable
                                            prepend-inner-icon="mdi-calendar"
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
                                    prepend-inner-icon="mdi-clock"
                                    v-model="formInput.sesi"
                                    label="Waktu (Sesi)"
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

                     <v-row v-if="cekPesanans == null" justify="center" class="my-5">
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
                  
                  <v-stepper v-model="e1" v-show="showStepper" >
                    <v-stepper-header>
                      <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                      >
                        Detil Pesanan
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                      >
                        Transaksi Pembayaran
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step step="3">
                        Notifikasi Berhasil
                      </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                      <v-stepper-content step="1">
                          <v-row v-show="showPesanan">
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
                                        <v-icon small color="red" class="mr-2" @click="deleteHandler(item)">mdi-delete</v-icon>
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

                        <v-divider class="my-5"></v-divider>

                        <v-btn color="primary" @click="e1 = 2" class="mr-5">Continue</v-btn>
                        <v-btn color="secondary" @click="closeStepper">Cancel</v-btn>
                      </v-stepper-content>

                      <v-stepper-content step="2">
                            <v-container>
                              <div class="font-weight-medium mb-3 justify-center text-h4 text-center">
                                Data Transaksi Pembayaran
                              </div>
                              <v-divider></v-divider>
                                <v-container>
                                    <v-form v-model="validTransaksi" ref="formTransaksi">
                                    <v-row>
                                        <v-col class="col-md-3 col-sm-12">
                                          <p>ID Reservasi</p>
                                          <v-text-field
                                              prepend-inner-icon="mdi-account"
                                              v-model="form.id_reservasi"
                                              outlined
                                              disabled
                                              solo
                                              required
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col class="col-md-9 col-sm-12 d-flex" style="background-color:#fff8f7; border:2px solid #dddddd; ">
                                          <div style="width:50%;">
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Nama Customer
                                                </v-col>
                                                <v-col style="width:50%;">
                                                    {{dataReservasi.nama_customer}}
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Jumlah Customer
                                                </v-col>
                                                <v-col style="width:50%;">
                                                    {{dataReservasi.jumlah_customer}}
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Nomor Meja
                                                </v-col>
                                                <v-col style="width:50%;">
                                                    {{dataReservasi.no_meja}}
                                                </v-col>
                                            </v-row>
                                          </div>
                                          <div style="width:50%;">
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Tanggal Reservasi
                                                </v-col>
                                                <v-col style="width:50%;">
                                                  {{dataReservasi.tanggal_reservasi}}
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Waktu Reservasi
                                                </v-col>
                                                <v-col style="width:50%;">
                                                    {{dataReservasi.waktu_reservasi}}
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col style="width:50%;" class="font-weight-bold">
                                                    Karyawan PIC
                                                </v-col>
                                                <v-col style="width:50%;">
                                                    {{dataReservasi.nama_karyawan}}
                                                </v-col>
                                            </v-row>
                                          </div>
                                      </v-col>
                                    </v-row>
                                    <v-divider style="margin-top:50px"></v-divider>
                                    
                                    <v-row>
                                      <v-col class="col-md-4 col-sm-12">
                                        <p style="font-size:30px; font-weight: medium;">Metode Pembayaran</p>
                                      </v-col>
                                      <v-col class="d-flex justify-content-center col-md-3 col-sm-12" style="margin-top:-8px; margin-left:-30px">
                                          <v-radio-group v-model="form.metode_pembayaran" row>
                                            <v-radio
                                              color="success"
                                              label="Cash" 
                                              value="Cash"
                                              @click="showKartu=false,form.nomor_data_kartu=null,dataKartu=null"
                                            ></v-radio>
                                            <v-radio
                                              color="success"
                                              label="Non-Cash"
                                              value="Non-Cash"
                                            ></v-radio>
                                          </v-radio-group>
                                      </v-col>
                                      <v-col v-if="form.metode_pembayaran=='Non-Cash'" class="col-md-4 col-sm-12">
                                          <v-select
                                              placeholder="XXXX XXXX XXXX XXXX"  
                                              prepend-inner-icon="mdi-numeric"
                                              v-mask="'#### #### #### ####'"
                                              :rules="nomorRules"
                                              :items="kartus" 
                                              v-model="form.nomor_data_kartu"
                                              @change="showDataKartu"
                                              solo
                                              outlined
                                              required>
                                          </v-select>
                                      </v-col>
                                    </v-row>
                                    <v-row v-if="showKartu" class="d-flex justify-content-center">
                                      <v-col  class="col-10 d-flex" style="background-color:#fff8f7; border:2px solid #dddddd; ">
                                        <div style="width:50%;">
                                          <v-row>
                                              <v-col style="width:50%;" class="font-weight-bold">
                                                  Nomor Kartu
                                              </v-col>
                                              <v-col style="width:50%;">
                                                  {{dataKartu.nomor_kartu}}
                                              </v-col>
                                          </v-row>
                                          <v-row>
                                              <v-col style="width:50%;" class="font-weight-bold">
                                                  Nama Pemilik Kartu
                                              </v-col>
                                              <v-col style="width:50%;">
                                                  {{dataKartu.nama_pemilik_kartu}}
                                              </v-col>
                                          </v-row>
                                          <v-row>
                                              <v-col style="width:50%;" class="font-weight-bold">
                                                  Kode Verifikasi
                                              </v-col>
                                              <v-col style="width:50%;">
                                                  {{dataKartu.kode_verifikasi}}
                                              </v-col>
                                          </v-row>
                                        </div>
                                        <div style="width:50%;">
                                          <v-row>
                                              <v-col style="width:50%;" class="font-weight-bold">
                                                  Jenis Kartu
                                              </v-col>
                                              <v-col style="width:50%;">
                                                {{dataKartu.jenis_kartu}}
                                              </v-col>
                                          </v-row>
                                          <v-row>
                                              <v-col style="width:50%;" class="font-weight-bold">
                                                  Expired Date Kartu
                                              </v-col>
                                              <v-col style="width:50%;">
                                                  {{dataKartu.expired_date}}
                                              </v-col>
                                          </v-row>
                                        </div>
                                      </v-col>
                                    </v-row>
                                  </v-form>
                                </v-container>
                            </v-container>
                          <v-divider class="my-5"></v-divider>
                        <v-btn @click="e1 = 1" class="mr-5">Back</v-btn>
                        <v-btn color="primary" @click="save" class="mr-5">Continue</v-btn>
                        <v-btn color="secondary" @click="closeStepper">Cancel</v-btn>
                      </v-stepper-content>

                      <v-stepper-content step="3">
                        <template>
                          
                            <div class="text-center">
                              <sweetalert-icon icon="success"/>
                              <transition name="fade">
                                <h4>Berhasil Menambah Data Transaksi Pembayaran</h4>
                              </transition>
                            </div>
                          
                        </template>
                        <v-btn color="secondary" @click="closeStepper">Close</v-btn>
                      </v-stepper-content>
                    </v-stepper-items>
                  </v-stepper>

                </b-tab>
            </b-tabs>
        </div>
      </v-card>
    </div>

    <v-dialog transition="dialog-top-transition" v-model="dialogEdit" max-width="600px">
      <v-card style="background-color:#fff8f7;">
          <v-card-title id="titleCard" class="font-weight-medium mb-3 justify-center text-h4 text-center">
              Edit Pesanan
          </v-card-title>
          <v-card-body>
          <v-container>
              <v-form v-model="valid" ref="form">
              <v-row>
                  <v-col class="col-md-6 col-sm-12">
                      <p>Nama Menu</p>
                      <v-text-field
                          placeholder="nama bahan"
                          prepend-inner-icon="mdi-food-fork-drink"
                          v-model="namaMenuEdit"
                          outlined
                          disabled
                          solo
                          required
                      >
                      </v-text-field>
                  </v-col>
                  <v-col class="col-md-6 col-sm-12">
                      <p>Jumlah Pesanan</p>
                      <v-text-field
                          type="number"
                          :min="1"
                          placeholder="jumlah pesanan"
                          prepend-inner-icon="mdi-map-marker"
                          :rules="jumlahRules"
                          v-model="jumlahEdit"
                          outlined
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
                  @click="dialogEdit = false"
                  >
                  Batal
                  </v-btn>
                  <v-btn depressed color="primary" @click="update" style="padding-left: 30px; padding-right: 30px">
                  Simpan
                  </v-btn>
              </v-card-actions>
              </v-form>
          </v-container>
          </v-card-body>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Apakah anda yakin ingin menghapus pesanan ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogDelete = false"
            >Batal</v-btn
          >
          <v-btn color="grey" @click="deleteData">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSave" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Konfirmasi Transaksi</h4>
        </v-card-title>
        <v-card-text>Apakah anda yakin ingin menambah data transaksi? ketika memilih ya, maka data transaksi tidak akan bisa diubah lagi.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="dialogSave = false"
            >Batal</v-btn
          >
          <v-btn color="grey" @click="saveData">Ya</v-btn>
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
import SweetalertIcon from 'vue-sweetalert-icons';
export default {
  name: "Transaksi",
   components: {
    SweetalertIcon,
    },
  data() {
    return {
      token: "",
      e1: 1,
      load: false,
      today: '',
      showStepper: false,
      jamSekarang:'',
      sesi:'',
      snackbar: false,
      error_message: "",    
      validInput: "false",
      valid: "false",
      color: "",
      search: "",
      modal: false,

      dialogDelete: false,
      headers: [
        {
          text: "Kode Transaksi",
          align: "center",
          sortable: true,
          value: "id_transaksi",
        },
        { text: "Nama Customer", value: "nama_customer", align: "center", },
        { text: "Tanggal Reservasi", value: "tanggal_reservasi", align: "center", },
        { text: "Waktu Reservasi", value: "waktu_reservasi", align: "center", },
        { text: "ID Reservasi", value: "id_reservasi", align: "center", },
        { text: "Total Harga", value: "total_harga", align: "center", },
        { text: "Metode Pembayaran", value: "metode_pembayaran", align: "center", },
      ],
      headers2: [
        {
          text: "Menu",
          align: "center",
          sortable: true,
          value: "gambar_menu",
        },
        { text: "Jenis Pesanan",align: "center", value: "nama_menu" },
        { text: "Jumlah", align: "center",value: "jumlah" },
        { text: "Status Penyajian", align: "center",value: "status_penyajian" },
        { text: "",align: "center", value: "actions" },
      ],
      transaksis: [],
      cekPesanans: [],
      mejas: [],
      showPesanan: false,
      sesiOption: ["Sesi 1 (11.00-16.00)","Sesi 2 (17.00-21.00)","Langsung"],
      noRules: [(v) => !!v || "Nomor meja tidak boleh kosong"],
      nomorRules: [(v) => !!v || "Nomor kartu tidak boleh kosong"],
      tanggalRules: [(v) => !!v || "Tanggal tidak boleh kosong"],
      sesiRules: [(v) => !!v || "Waktu (sesi) tidak boleh kosong"],
      formInput: {
        tanggal: null,
        sesi: null,
        no_mena: null,
      },
      form:{
        nomor_data_kartu: null,
        id_karyawan: null,
        id_reservasi: null,
        total_harga: null,
        tanggal_pembayaran: null,
        waktu_pembayaran: null,
        metode_pembayaran: 'Cash',
      },
      reservasi:[],
      dataReservasi:{
        nama_customer: null,
        jumlah_customer: null,
        no_meja: null,
        tanggal_reservasi: null,
        waktu_reservasi: null,
        nama_karyawan: null,
      },
      dataKartu:{
        id_data_kartu: null,
        nomor_kartu: null,
        kode_verifikasi: null,
        nama_pemilik_kartu: null,
        jenis_kartu: null,
        expired_date: null,
      },
      kartus:[],
      jumlahRules: [(v) => !!v || "Jumlah pesanan tidak boleh kosong"],
      id_meja:0,
      editId: 0,
      deleteId: 0,
      jumlahEdit: 0,
      namaMenuEdit: "",
      dialogEdit: false,
      showKartu: false,
      validTransaksi: "false",
      dialogSave: false,
      totalHarga: 0,
    };
  },
  methods: {
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    closeStepper(){
      this.showStepper = false;
      this.e1 = 1;
    },
    getTanggalHariIni(){
        var today = new Date();
        var sesi = '';
        var jamSekarang= '';
        
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

        var jam = String(today.getHours());
        var menit = String(today.getMinutes());
        var detik = String(today.getSeconds());

        today = yyyy + '-' + mm + '-' + dd ;
        jamSekarang = jam + ':' + menit + ':' + detik ;
        
        this.today = today;
        this.jamSekarang = jamSekarang;
        this.sesi = sesi;
    },
    deleteHandler(item) {
      this.deleteId = item.id_pesanan;
      this.dialogDelete = true;
    },
    deleteData() {
      //menghapus data
      var url = this.$api + "/pesanan-soft/" + this.deleteId;
      //data dihapus berdasarkan id
      let newData;
      this.dialogDelete = false;
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
          this.cekPesanan();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
    },
    save(){
      if(this.$refs.formTransaksi.validate()){
          this.dialogSave = true;
      }
    },
    saveData(){
      var url = this.$api + "/transaksi";
      this.getTanggalHariIni();
      //data dihapus berdasarkan id
      let newData={
        id_data_kartu: this.dataKartu.id_data_kartu,
        id_karyawan: localStorage.getItem('id_karyawan'),
        id_reservasi: this.form.id_reservasi,
        total_harga: this.totalHarga,
        tanggal_pembayaran: this.today,
        waktu_pembayaran: this.jamSekarang,
        metode_pembayaran: this.form.metode_pembayaran
      };
      this.dialogSave = false;
      this.load = true;
      this.$http
        .post(
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
          this.e1 = 3;
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
          this.load = false;
        });
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
                    console.log(response.data.data);
                    console.log(this.cekPesanans);
                    console.log(this.id_meja);
                    console.log(this.today);
                    console.log(sesi);
                    this.form.id_reservasi = this.cekPesanans[0].id_reservasi;
                    if(this.cekPesanans != null){
                      this.showStepper = true;
                    }
                    this.totalHarga = response.data.total;
                    this.getDataReservasi();
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
    getNomorKartu(){
        var url = this.$api + "/kartu-nomor";
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.kartus = response.data.data;
        });
    },
    getDataReservasi(){
      var url = this.$api + "/reservasi/"+this.form.id_reservasi;
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.reservasi = response.data.data;

          console.log(this.reservasi[0].nama_customer)
          this.dataReservasi.nama_customer = this.reservasi[0].nama_customer;
          this.dataReservasi.jumlah_customer = this.reservasi[0].jumlah_customer;
          this.dataReservasi.no_meja = this.reservasi[0].no_meja;
          this.dataReservasi.tanggal_reservasi = this.reservasi[0].tanggal_reservasi;
          this.dataReservasi.waktu_reservasi = this.reservasi[0].waktu_reservasi;
          this.dataReservasi.nama_karyawan = this.reservasi[0].nama_karyawan;
        });
    },
    showDataKartu(){
      console.log(this.form.nomor_data_kartu);
      var url = this.$api + "/kartu/"+this.form.nomor_data_kartu;
        this.$http
        .get(url
            ,{
              headers:{
                  Authorization: "Bearer " + this.token,
              }
            }
        )
        .then((response) => {
          this.dataKartu = response.data.data;
          console.log(response.data.data);
          this.showKartu = true;
        });
    },
    editHandler(item){
      this.editId = item.id_pesanan;
      this.jumlahEdit = item.jumlah;
      this.namaMenuEdit= item.nama_menu;
      this.dialogEdit = true;
    },
    update(){
      if (this.$refs.form.validate()) {
        let newData = {
          jumlah: this.jumlahEdit
        };
        var url = this.$api + "/pesanan/" + this.editId;
        this.load = true;
        this.dialogEdit = false;
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
            this.cekPesanan();
            this.editId = 0;
            this.namaMenuEdit = "";
            this.jumlahEdit = 0;
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
      var url = this.$api + "/transaksi";
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
          this.transaksis= response.data.data;
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
          this.mejas = response.data.data;
        });
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.readData();
    this.getTanggalHariIni();
    this.getAllNomor();
    this.getNomorKartu();
    this.formInput.tanggal = this.today;

    if(this.sesi == 'sesi 1'){
      this.formInput.sesi = 'Sesi 1 (11.00-16.00)';
    }else if(this.sesi == 'sesi 2'){
      this.formInput.sesi = 'Sesi 2 (17.00-21.00)';
    }else {
      this.formInput.sesi = this.sesi;
    }
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

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
