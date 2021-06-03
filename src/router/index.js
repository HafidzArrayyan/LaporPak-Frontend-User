import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/layouts/Register.vue'
import Header from '../views/layouts/Header.vue'
import pengaduanMasy from '../views/layouts/pengaduanMasy.vue'
import Lapor from '../views/layouts/Lapor.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login, footer: Footer}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register, footer: Footer}
  },
  {
    path: '/',
    name: 'home',
    components: {default: Home, header: Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pengaduanMasy',
    name: 'pengaduanMasy',
    components: {default: pengaduanMasy, header:Header},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/lapor',
    name: 'lapor',
    components: {default: Lapor, header:Header},
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
