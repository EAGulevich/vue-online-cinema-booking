import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 минута
      gcTime: 1000 * 60 * 5, // 5 минут
      retry: 2,
    },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
