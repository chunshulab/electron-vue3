import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/imageGallery',
    name: 'imageGallery',
    component: () => import("@/views/ImageGallery.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router