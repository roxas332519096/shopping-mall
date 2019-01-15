import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  InfiniteScroll
} from 'mint-ui'

//axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://easy-mock.com/mock/5b14e7fd647ea43344eeccef'
Vue.prototype.$axios = axios;

//mint-ui
Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})