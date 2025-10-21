<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { antdTheme } from '@/theme.ts'
import {
  CarryOutOutlined,
  EnvironmentOutlined,
  LoginOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue'
import { computed, h, onMounted, ref, watch } from 'vue'
import LoadingBlock from '@/components/LoadingBlock.vue'
import { useSettingsData } from '@/composables/useSettingsData.ts'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()

const selectedKeys = ref<string[]>([])

onMounted(() => {
  selectedKeys.value = ['/' + route.path.split('/')[1]]
})

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = ['/' + newPath.split('/')[1]]
  },
)

const isRouteLoading = ref(false)

router.beforeEach(() => {
  isRouteLoading.value = true
})

router.afterEach(() => {
  isRouteLoading.value = false
})

const siderStyle = { backgroundColor: '#141414' }

const settingsData = useSettingsData()
const isAuthorized = computed(() => !!settingsData.token.value)

const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  if (isAuthorized.value && key === '/login') {
    settingsData.onLogout()
    router.push('/movies')
  } else if (!isAuthorized.value && key === '/tickets') {
    router.push('/login')
  } else {
    router.push(key.toString())
  }
}

const menuItems = computed(() => {
  const items: MenuProps['items'] = [
    {
      key: '/movies',
      icon: () => h(VideoCameraOutlined),
      label: 'Фильмы',
    },
    {
      key: '/cinemas',
      icon: () => h(EnvironmentOutlined),
      label: 'Кинотеатры',
    },
    {
      key: '/tickets',
      icon: () => h(CarryOutOutlined),
      label: 'Мои билеты',
    },
    {
      key: '/login',
      icon: () => (isAuthorized.value ? h(LogoutOutlined) : h(LoginOutlined)),
      label: isAuthorized.value ? 'Выход' : 'Вход',
    },
  ]
  return items
})
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <a-layout class="layout">
      <a-layout-sider theme="dark" :style="siderStyle">
        <a-menu
          :selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          :style="siderStyle"
          :items="menuItems"
          @click="handleMenuClick"
        />
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <LoadingBlock v-if="isRouteLoading" tip="Страница загружается" />
        <RouterView v-else />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<style scoped>
.layout {
  height: 100vh;
  max-height: 100vh;
  min-width: 1024px;
  overflow: auto;
}

.layout-content {
  padding: 24px;
  background-image:
    linear-gradient(rgb(256 149 0 / 100%), rgb(256 149 0 / 50%), rgb(0 0 0 / 50%)),
    url('@/assets/bg.jpg');
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  height: 100vh;
  overflow: auto;
}
</style>
