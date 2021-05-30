<template>
    <div class="dashboard">
        <v-navigation-drawer

            class="fullheight" 
            width="250px" 
            v-model="drawer"
            app
            style="background-color: #782c26"
        >
            <v-list-item style="background-color:#822f28">
                <v-list-content class="title">
                    <div class="logo" >
                        <v-list-item-title>
                            <img src="../assets/akb.png" alt="">
                        </v-list-item-title>

                    </div>
                </v-list-content>
            </v-list-item>

            <v-list rounded v-if="id_role==1" dense>
                <!-- Data Master -->
                <v-list-group
                    v-model="selectedItem"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-3"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Master</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsOwner"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Laporan -->
                <v-list-group
                    v-model="selectedItem4"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Laporan</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsLaporan"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>

            <v-list rounded v-if="id_role==2" dense>
                <!-- Data Master -->
                <v-list-group
                    v-model="selectedItem"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-3"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Master</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsMaster"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Bahan -->
                <v-list-group
                    v-model="selectedItem2"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Bahan</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsBahan"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Transaksi -->
                <v-list-group
                    v-model="selectedItem3"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Transaksi</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsTransaksi"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Laporan -->
                <v-list-group
                    v-model="selectedItem4"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Laporan</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsLaporan"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>

            <v-list rounded v-if="id_role==3" dense nav>
                <v-list-group
                    v-model="selectedItem"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-6"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='text-sm-left' style="color:#E79C9D; text-decoration:none;">Data Master</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsWaiter"
                        :key="item.title"
                        link
                        active-class="pink--text"
                        class="text-decoration-none ml-5"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="color:#E79C9D; text-decoration:none;" >{{ item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Transaksi -->
                <v-list-group
                    v-model="selectedItem2"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Transaksi</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsWaiter2"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>

            <v-list rounded v-if="id_role==4" dense nav>
                <v-list-group
                    v-model="selectedItem"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-6"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='text-sm-left' style="color:#E79C9D; text-decoration:none;">Data Master</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsCashier"
                        :key="item.title"
                        link
                        active-class="pink--text"
                        class="text-decoration-none ml-5"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="color:#E79C9D; text-decoration:none;" >{{ item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

                <!-- Data Transaksi -->
                <v-list-group
                    v-model="selectedItem2"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Transaksi</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsCashier2"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>

            <v-list rounded v-if="id_role==5" dense nav>
                <v-list-group
                    v-model="selectedItem"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-6"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='text-sm-left' style="color:#E79C9D; text-decoration:none;">Data Bahan</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsBahan"
                        :key="item.title"
                        link
                        active-class="pink--text"
                        class="text-decoration-none ml-5"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title style="color:#E79C9D; text-decoration:none;" >{{ item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group> 

                 <!-- Data Transaksi -->
                <v-list-group
                    v-model="selectedItem2"
                    :value="true"
                    color="#E79C9D"
                    prepend-icon="mdi-folder"
                    class="mt-4"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title class='' style="color:#E79C9D;">Data Transaksi</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item
                        v-for="item in itemsWaiter2"
                        :key="item.title"
                        class="text-decoration-none ml-5"
                        link
                        active-class="pink--text"
                        router-link
                        :to="item.to"
                    >
                        <v-list-item-icon>
                            <v-icon small color="#E79C9D">{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title" style="color:#E79C9D;" ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
            
            <!-- <v-list v-if="id_role==3" dense nav>
                
                <v-list-item
                    v-for="item in itemsWaiter"
                    :key="item.title"
                    link
                    active-class="pink--text"
                    router-link
                    :to="item.to"
                >
                
                    <v-list-item-content>
                        <v-list-item-title style="color:#E79C9D; text-decoration:none;" ><v-icon small color="white">{{item.icon}}</v-icon> {{ item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> -->
            <!-- <v-list v-if="id_role==4" dense nav>
                <v-list-item
                    v-for="item in itemsCashier"
                    :key="item.title"
                    link
                    active-class="pink--text"
                    router-link
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title style="color:#E79C9D; text-decoration:none;" ><v-icon small color="white">{{item.icon}}</v-icon> {{ item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> -->
            <!-- <v-list v-if="id_role==5" dense nav>
                <v-list-item
                    
                    v-for="item in itemsChef"
                    :key="item.title"
                    link
                    active-class="pink--text"
                    router-link
                    :to="item.to"
                >
                    <v-list-item-content>
                        <v-list-item-title style="color:#E79C9D; text-decoration:none;" ><v-icon small color="white">{{item.icon}}</v-icon> {{ item.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> -->
        </v-navigation-drawer>
        <v-app-bar 
            height="75px"
            absolute 
            app
            elevate-on-scroll
            color="#782c26">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer/>
            <v-divider vertical></v-divider>
            <v-toolbar-title class="ma-2" color="white--text"> Date: {{today}}</v-toolbar-title>
            <v-divider vertical></v-divider>
            <v-toolbar-title class="ma-2" color="#fff8f7"> Login as {{nama_role}}</v-toolbar-title>
            <p class="ma-2" style="color: #fff8f7"></p>
            <v-divider vertical></v-divider>
            <v-toolbar-items>
                <v-btn text router @click="logout"><v-icon>mdi-power</v-icon></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5" style="background-color: #fff8f7">
            <router-view></router-view>
        </div>

        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-card style="background-color:#fff8f7;">
                <v-card-title style="background-color: #a6655e;">
                    <h4 class="text-h4 font-weight-medium mb-1">Warning !</h4>
                </v-card-title>
                <v-card-text class="mt-5">Anda yakin ingin keluar dari akun ini?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="cancelLogout" class="mr-3 mb-5">Tidak</v-btn>
                    <v-btn color="grey" @click="logoutConfirm" class="mr-3 mb-5">Ya</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                :size="80" 
                :width="5"
                color="primary">
            </v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
export default{
    name: "Dashboard",
    data(){
        return{
            dialog: false,
            lockSelection: false,
            loading: false,
            id_role:'',
            nama_role: '',
            drawer: true,
            today:'',
            Karyawan: '',
            selectedItem: false,
            selectedItem2: false,
            selectedItem3: false,
            selectedItem4: false,
            itemsOwner:[
                { title: "Karyawan", to: "/karyawan", icon: "mdi-account"},
            ],
            itemsLaporan:[
                {title: "Laporan Stok", to:"/laporan-stok",icon:"mdi-file-document"},
                {title: "Laporan Pendapatan", to:"/laporan-pendapatan",icon:"mdi-file-import"},
                {title: "Laporan Pengeluaran", to:"/laporan-pengeluaran",icon:"mdi-file-export"},
                {title: "Laporan Penjualan", to:"/laporan-penjualan",icon:"mdi-file-check"}
            ],
            itemsMaster:[
                { title: "Karyawan", to: "/karyawan", icon: "mdi-account"},
                { title: "Customer", to: "/customer", icon: "mdi-account-multiple"},
                { title: "Meja", to: "/meja", icon: "mdi-desk"},
                { title: "Reservasi", to: "/reservasi",icon: "mdi-calendar"},
                { title: "Menu", to: "/menu",icon: "mdi-food"},
            ],
            itemsBahan:[
                { title: "Stok Masuk", to: "/stok-masuk", icon: "mdi-package-down"},
                { title: "Bahan", to: "/bahan", icon: "mdi-food-fork-drink"},
                { title: "Stok Keluar", to: "/stok-keluar", icon: "mdi-package-up"},
            ],
            itemsTransaksi:[
                { title: "Daftar Pesanan", to: "/pesanan", icon: "mdi-format-list-bulleted"},
                { title: "Data Kartu", to: "/data-kartu", icon: "mdi-credit-card-multiple"},
                { title: "Transaksi", to: "/transaksi", icon: "mdi-cash-multiple"},
            ],
            itemsWaiter:[
                { title: "Customer", to: "/customer", icon: "mdi-account-multiple"},
                { title: "Meja", to: "/meja", icon: "mdi-desk"},
                { title: "Reservasi", to: "/reservasi", icon: "mdi-calendar"},
            ],
            itemsWaiter2:[
                { title: "Daftar Pesanan", to: "/pesanan", icon: "mdi-format-list-bulleted"},
            ],
            itemsCashier:[
                { title: "Meja", to: "/meja", icon: "mdi-desk"},
                { title: "Reservasi", to: "/reservasi", icon: "mdi-calendar"},
            ],
            itemsCashier2:[
                { title: "Transaksi", to: "/transaksi", icon: "mdi-cash-multiple"},
            ],
            itemsChef:[
                { title: "Stok Masuk", to: "/stok-masuk", icon: "mdi-package-down"},
                { title: "Bahan", to: "/bahan", icon: "mdi-food-fork-drink"},
                { title: "Stok Keluar", to: "/stok-keluar", icon: "mdi-package-up"},
            ],
        };
    },
    methods:{
        getTanggalHariIni(){
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
        this.today = today;
        console.log(sesi);
        console.log(today);
    },
        logout() {
        this.dialog = true;
        },
        logoutConfirm() {
            this.loading = true;
            this.dialog = false;
            
            localStorage.removeItem("token");
            localStorage.removeItem("id_karyawan");
            localStorage.removeItem("id_role");
            //   localStorage.removeItem("nama_karyawan");
            console.log(localStorage.getItem("token"));
            setTimeout(() => this.loading = false, 1000);
            setTimeout(() => this.$router.push("/login"), 1000);
        },
        cancelLogout() {
            this.dialog = false;
        },
    },
    mounted(){
        this.id_role = localStorage.getItem('id_role');
        if(this.id_role == 1){
            this.nama_role = 'Owner';
        }
        if(this.id_role == 2){
            this.nama_role = 'Operational Manager';
        }
        if(this.id_role == 3){
            this.nama_role = 'Waiter';
        }
        if(this.id_role == 4){
            this.nama_role = 'Cashier';
        }
        if(this.id_role == 5){
            this.nama_role = 'Chef';
        }
        console.log(this.id_role)
        this.getTanggalHariIni();
    }
};
</script>
<style scoped>
.fullheight{
    min-height: 100vh !important;
}
.title{
    height: 220px;
    margin: auto;
}
.logo{
    margin:auto;
}
</style>