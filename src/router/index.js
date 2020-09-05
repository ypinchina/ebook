import Vue from 'vue'
import Router from 'vue-router'
import Ebook from '../Ebook'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/ebook',
      name: 'index'
    },
    {
      path: '/ebook',
      component: Ebook,
      name: 'ebook'
    }
  ]
})
