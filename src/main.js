import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import swiper from 'swiper'

Vue.config.productionTip = false
Vue.$axios = axios;
Vue.$swiper = swiper;

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})

