import { createRouter, createWebHistory } from 'vue-router'
import OldHomeView from '@/views/old/OldHomeView.vue'
import TestView from '@/views/old/TestView.vue'
import MoviesView from '@/views/MoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "movies",
      component: MoviesView
    },
    {
      path: '/old-home',
      name: 'old-home',
      component: OldHomeView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/old/AboutView.vue'),
    },
  ],
})

export default router
