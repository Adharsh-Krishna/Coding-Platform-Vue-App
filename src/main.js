
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSession from 'vue-session'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




