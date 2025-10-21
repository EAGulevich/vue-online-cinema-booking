import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/movies',
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('@/views/MoviesView/MoviesView.vue'),
      meta: {
        title: 'Фильмы - Онлайн-бронирование кинотеатра',
      },
    },
    {
      path: '/movies/:id',
      name: 'movie',
      component: () => import('@/views/MovieView/MovieView.vue'),
    },
    {
      path: '/cinemas',
      name: 'cinemas',
      component: () => import('@/views/CinemasView/CinemasView.vue'),
      meta: {
        title: 'Кинотеатры - Онлайн-бронирование кинотеатра',
      },
    },
    {
      path: '/cinemas/:id',
      name: 'cinema',
      component: () => import('@/views/CinemaView/CinemaView.vue'),
    },
    {
      path: '/bookings/:id',
      name: 'bookings',
      component: () => import('@/views/BookingView/BookingView.vue'),
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('@/views/TicketsView/TicketsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView/LoginView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // document.title = (to.meta.title as string) ?? 'Онлайн-бронирование кинотеатра'

  next()
})

export default router
