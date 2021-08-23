import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

/**
 * Vue Formulate 
 * @see https://vueformulate.com/guide/
 */

import VueFormulate from '@braid/vue-formulate'
Vue.use(VueFormulate)


/**
 * Sweet Modal Vue
 * @see https://sweet-modal-vue.adepto.as/
 */

import SweetModal from 'sweet-modal-vue/src/plugin.js'
Vue.use(SweetModal)


/**
 * Vue Unicons
 * @see https://github.com/antonreshetov/vue-unicons
 */

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd'
import {
  uniCar,
  uniUserMd,
  uniUserCircle,
  uniFileMedicalAlt,
  uniSetting,
  uniUser,
  uniMap,
  uniBill,
  uniExchange,
  uniMoneyBill,
  uniSignout,

} from 'vue-unicons/dist/icons'

Unicon.add([uniCar, uniUserMd, uniUserCircle, uniFileMedicalAlt, uniSetting,uniUser,uniMap,uniBill,uniExchange,uniMoneyBill, uniSignout])
Vue.use(Unicon, {
  height: 18,
  width: 18
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')