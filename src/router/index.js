import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/error-pages/NotFound'
import CarList from '@/components/car/CarList'
import CarCreate from '@/components/car/CarCreate'
import CarUpdate from '@/components/car/CarUpdate'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cars',
      name: 'CarList',
      component: CarList
    },
    {
      path: '/car/update/:id',
      name: 'CarUpdate',
      component: CarUpdate
    },
    {
      path: '/car/create',
      name: 'CarCreate',
      component: CarCreate
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
