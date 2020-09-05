import Vue from 'vue'
import './stylus/index.styl'
import App from './App.vue'
import router from './router/index'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
