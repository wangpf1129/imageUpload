import Vue from 'vue'
import App from './App.vue'
import PfUI from 'pf-ui-wangpf'
import 'pf-ui-wangpf/dist/pf-ui.css'

import 'bootstrap'
import $ from 'jquery'
import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.use(PfUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
