// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Search_Home from '../components/Search_Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/Search_Home', component: Search_Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router