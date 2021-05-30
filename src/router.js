import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            component: importComponent('DashboardLayout'),
            beforeEnter:((to,from,next)=>{
                if(localStorage.getItem('token')==null){
                    next('/login');
                }else{
                    next();
                    // if(localStorage.getItem('id_role')==1 || localStorage.getItem('id_role')==2){
                    //     next('/karyawan');
                    // }else if(localStorage.getItem('id_role')==3){
                    //     next('/customer');
                    // }else if(localStorage.getItem('id_role')==4){
                    //     next('/meja');
                    // }else{
                    //     next('/stok-masuk')
                    // }
                }
            }),
            children:[
                {
                    path: "/",
                    name: "Karyawan",
                    meta: {title: 'Karyawan'},
                    component: importComponent('Karyawan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
                {
                    path: "/karyawan",
                    name: "Karyawan",
                    meta: {title: 'Karyawan'},
                    component: importComponent('Karyawan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
                {
                    path: "/customer",
                    name: "Customer",
                    meta: {title: 'Customer'},
                    component: importComponent('Customer'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==3||localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                        }
                    }),
                },
                {
                    path: "/meja",
                    name: "Meja",
                    meta: {title: 'Meja'},
                    component: importComponent('Meja'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==5){
                            next('/stok-masuk');
                        }else{
                            next();
                        }
                    }),
                },
                {
                    path: "/bahan",
                    name: "Bahan",
                    meta: {title: 'Bahan'},
                    component: importComponent('Bahan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 ||localStorage.getItem('id_role')==5 ||localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }
                        }
                    }),
                },
                {
                    path: "/reservasi",
                    name: "Reservasi",
                    meta: {title: 'Reservasi'},
                    component: importComponent('Reservasi'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==5){
                            next('/stok-masuk');
                        }else{
                            next();
                        }
                    }),
                },
                {
                    path: "/stok-masuk",
                    name: "Stok-Masuk",
                    meta: {title: 'Stok-Masuk'},
                    component: importComponent('StokMasuk'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 ||localStorage.getItem('id_role')==5 ||localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }
                        }
                    }),
                },
                {
                    path: "/stok-keluar",
                    name: "Stok-Keluar",
                    meta: {title: 'Stok-Keluar'},
                    component: importComponent('StokKeluar'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 ||localStorage.getItem('id_role')==5 ||localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }
                        }
                    }),
                },
                {
                    path: "/data-kartu",
                    name: "Data-Kartu",
                    meta: {title: 'Data-Kartu'},
                    component: importComponent('DataKartu'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 ||localStorage.getItem('id_role')==5 ||localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }
                        }
                    }),
                },
                {
                    path: "/menu",
                    name: "Menu",
                    meta: {title: 'Menu'},
                    component: importComponent('Menu'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else if(localStorage.getItem('id_role')==5){
                                next('/stok-masuk');
                            }
                        }
                    }),
                },
                {
                    path: "/pesanan",
                    name: "Pesanan",
                    meta: {title: 'Pesanan'},
                    component: importComponent('Pesanan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==3 || localStorage.getItem('id_role')==5){
                            next();
                        }else{
                            next('/meja');
                        }
                    }),
                },
                {
                    path: "/transaksi",
                    name: "Transaksi",
                    meta: {title: 'Transaksi'},
                    component: importComponent('Transaksi'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==4){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==5){
                                next('/stok-masuk');
                            }
                        }
                    }),
                },
                {
                    path: "/laporan-stok",
                    name: "Laporan-Stok",
                    meta: {title: 'Laporan-Stok'},
                    component: importComponent('LaporanStok'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
                {
                    path: "/laporan-pendapatan",
                    name: "Laporan-Pendapatan",
                    meta: {title: 'Laporan-Pendapatan'},
                    component: importComponent('LaporanPendapatan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
                {
                    path: "/laporan-pengeluaran",
                    name: "Laporan-Pengeluaran",
                    meta: {title: 'Laporan-Pengeluaran'},
                    component: importComponent('LaporanPengeluaran'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
                {
                    path: "/laporan-penjualan",
                    name: "Laporan-Penjualan",
                    meta: {title: 'Laporan-Penjualan'},
                    component: importComponent('LaporanPenjualan'),
                    beforeEnter:((to,from,next)=>{
                        if(localStorage.getItem('id_role')==2 || localStorage.getItem('id_role')==1){
                            next();
                        }else{
                            if(localStorage.getItem('id_role')==3){
                                next('/customer');
                            }else if(localStorage.getItem('id_role')==4){
                                next('/meja');
                            }else{
                                next('/stok-masuk')
                            }
                            
                        }
                    }),
                },
            ]
                
        },
        //login
        {
            path: "/login",
            name: "login",
            meta: {title: 'Login'},
            component: importComponent('Login'),
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

//meng-set judul
router.beforeEach((to, from, next)=>{
    document.title = to.meta.title
    next()
});

export default router;