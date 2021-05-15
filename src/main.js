import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SweetAlertIcons from 'vue-sweetalert-icons';
import Transitions from 'vue2-transitions'

Vue.use(Transitions)

Vue.use(SweetAlertIcons);

//qr code
import VueQrcode from '@chenfengyuan/vue-qrcode'

//v-mask
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.component(VueQrcode.name, VueQrcode)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
 
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://be.atmabbq.xyz/api';
Vue.prototype.$url = 'http://be.atmabbq.xyz/';

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

