import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Utama from '../views/Utama'
import Dataanggota from '../components/Dataanggota'
import Datatransaksi from '../components/Datatransaksi'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/utama',
    name: 'Utama',
    component: Utama
  },
  {
    path: '/dataanggota',
    name: 'Dataanggota',
    component: Dataanggota
  },
  {
    path: '/datatransaksi',
    name: 'Datatransaksi',
    component: Datatransaksi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
