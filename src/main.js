import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
//import Validator from 'vue-validator'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './styles/reset.css'
import './styles/global.scss'
import store from './store'
import lodash from 'lodash'

import './permission';
import './icons'

import AlertDialog from '@/components/AlertDialog';
import DialogEl from '@/components/ConsoleDialog'

Vue.prototype._ = lodash;
Vue.config.productionTip = false
Vue.prototype.$dialog = DialogEl;

Vue.use(ElementUI);
//Vue.use(Validator);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
