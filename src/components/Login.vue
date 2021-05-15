<template>
  <div id="app" v-show="login">
    <div class="back" >
      <v-container class="login" >
        <v-row align="center" justify="center">
          <v-col class="col-md-5 col-xs-0">
            <v-card style="background-color: white; padding: 30px; opacity: 0.8">
              <v-card-title>
                  <h2 class="text-center" style="text-color: black;">Sign In</h2>
              </v-card-title>
              <v-card-body>
                <v-form v-model="validSignIn" ref="formSignIn">
                  <v-row>
                    <v-col class="col-xs-2">
                      <v-text-field
                        required
                        solo
                        type="email"
                        v-model="email"  
                        :rules="emailRules"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col class="col-xs-2">
                      <!-- <subtitle-1>Password</subtitle-1> -->
                      <v-text-field 
                        required
                        solo
                        type="password"
                        min="8"
                        v-model="password"  
                        :rules="passwordRules"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-btn class="ml-15 grey darken-5 white--text" @click="cancel">Cancel</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn class="mr-15 primary" @click="submit">Sign In</v-btn>
                  </v-card-actions>                  
                </v-form>
              </v-card-body>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-dialog v-model="dialogLogin" persisten max-width="400px">
      <v-card style="background-color:#fff8f7;">
        <v-card-title style="background-color: #a6655e; margin-bottom: 20px">
           <h4 class="text-h4 font-weight-medium mb-1">Warning!</h4>
        </v-card-title>
        <v-card-text> Anda sudah Login, logout terlebih dahulu untuk Login kembali !</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary"  @click="tutupDialog">Tutup</v-btn>
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
    <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom>{{ error_message }}</v-snackbar>
  </div>
</template>

<style scoped>
#app {
  background-image: url(../assets/signIn.jpg);
  background-attachment: fixed;
  background-size: cover;
  position: center;
  height: 100vh;
  background-repeat: no-repeat;
 
}
.login{
    margin-top: 20vh;
 
}
</style>

<script>
export default {
    data(){
      return{
        snackbar : false,
        error_message: '',
        color: '',
        validSignIn: false,
        dialogLogin: false,
        login: true,
        email: '',
        emailRules:[
          (v) => !!v || 'Email tidak boleh kosong',
          (v) => /.+@.+\..+/.test(v) || 'Email invalid'
        ],
        password: '',
        passwordRules:[
          (v)=> !!v || 'Password tidak boleh kosong',
          (v)=> (v && v.length >=6) || 'Password harus minimal 6 karakter'
        ],
        loading: false,
      }
    },
    methods:{
      cancel(){
        this.$refs.formSignIn.reset()
      },
      submit(){
        if(this.$refs.formSignIn.validate()){
            this.loading = true;
            this.$http.post(this.$api + '/login', {
                email_karyawan: this.email,
                password: this.password
            }).then(response=>{
                localStorage.setItem('token', response.data.access_token); //menyimpan auth token
               
                if(response.data.status == "success"){
                    this.error_message = response.data.message;
                    localStorage.setItem('id_karyawan', response.data.karyawan.id_karyawan); //menyimpan id_karyawan
                    localStorage.setItem('id_role',response.data.karyawan.id_role);
                    this.loadSnackbar("green",true)
                    this.cancel();
                    console.log(response.data.karyawan.id_role);
                    if(response.data.karyawan.id_role == 2 || response.data.karyawan.id_role == 1){
                      this.$router.push({
                        name: 'Karyawan'
                      })
                    }
                    if(response.data.karyawan.id_role == 3){
                      this.$router.push({
                        name: 'Customer'
                      })
                    }
                    if(response.data.karyawan.id_role == 4){
                      this.$router.push({
                        name: 'Meja'
                      })
                    }
                    if(response.data.karyawan.id_role == 5){
                      this.$router.push({
                        name: 'Stok-Masuk'
                      })
                    }
                    
                      this.loading = false;
                }else{
                    this.error_message = response.data.message;
                    this.loadSnackbar("red",true)
                    this.loading = false;
                }
                
            }).catch(error => {
                this.error_message = error.response.data.message;
                
                console.log(error);
                this.loadSnackbar("red",true)
                localStorage.removeItem('token')
                this.load = false
                this.loading = false;
            })
        }
      },
      loadSnackbar(color,bool){
        this.color = color;
        this.snackbar = bool;
      },
      cekIsLogin(){
        var token;
        token = localStorage.getItem('token');
        console.log(token)
        if(token != null){
          this.dialogLogin = true;
          this.login = false;
        }
      },
      tutupDialog(){
        this.dialogLogin = false;
        if(localStorage.getItem('id_role') == 2 || localStorage.getItem('id_role') == 1){
          this.$router.push({
            name: 'Karyawan'
          })
        }
        if(localStorage.getItem('id_role') == 3){
          this.$router.push({
            name: 'Customer'
          })
        }
        if(localStorage.getItem('id_role') == 4){
          this.$router.push({
            name: 'Meja'
          })
        }
        if(localStorage.getItem('id_role') == 5){
          this.$router.push({
            name: 'Stok-Masuk'
          })
        }
      }
    },
    mounted(){
      this.cekIsLogin();
    }
}
</script>
