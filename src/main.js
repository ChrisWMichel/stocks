import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//import router from './router/router'
import store from './store/store'

import { BootstrapVue, IconsPlugin, LayoutPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/plugins/echarts"
import unirest from 'unirest'

Vue.use(BootstrapVue, LayoutPlugin, IconsPlugin);
Vue.use(unirest);

Vue.config.productionTip = false

new Vue({
 // router,
  store,
  render: h => h(App)
}).$mount('#app')
