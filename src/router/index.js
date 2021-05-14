import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import UserHome from '../views/UserHome.vue'
import ProjectPage from '../views/ProjectPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import Backlog from '../views/Backlog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHome
  },
  {
    path: '/project/:id',
    name: 'ProjectPage',
    component: ProjectPage
  },
  {
    path: '/backlog',
    name: 'Backlog',
    component: Backlog
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/about',
    name: 'AboutPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== LoginPage && !store.getters.isAuthenticated) {
    next({ name: LoginPage })
  } else next()
})

export default router
