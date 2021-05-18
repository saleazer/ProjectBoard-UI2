import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../views/Login.vue'
import UserHome from '../views/UserHome.vue'
import ProjectHome from '../views/ProjectHome.vue'
import Register from '../views/Register.vue'
import Backlog from '../views/Backlog.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/project/:id',
    name: 'ProjectHome',
    component: ProjectHome,
    meta: { requiresAuth: true }
  },
  {
    path: '/backlog',
    name: 'Backlog',
    component: Backlog,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: About,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
