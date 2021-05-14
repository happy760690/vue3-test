import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// 登录
const Login = () => import("@/views/Login.vue");
// const Recommend = () => import('@/views/recommend'/* webpackChunkName: "recommend" */)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
      path: '/',
      redirect: '/login'
  },
  {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
          tit: "登录",
      },
  },
  // {
  //   path: '/',
  //   redirect: '/recommend'
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
