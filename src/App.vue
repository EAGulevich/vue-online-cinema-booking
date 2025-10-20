<script setup lang="ts">
import { RouterView } from 'vue-router'
import { antdTheme } from '@/theme.ts'
import {
  EnvironmentOutlined,
  CarryOutOutlined,
  VideoCameraOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue'
import { ref } from 'vue'

const selectedKeys = ref<string[]>(['1'])
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <a-layout class="layout">
      <a-layout-sider>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <video-camera-outlined />
            <span>Фильмы</span>
          </a-menu-item>
          <a-menu-item key="2">
            <environment-outlined />
            <span>Кинотеатры</span>
          </a-menu-item>
          <a-menu-item key="3">
            <carry-out-outlined />
            <span>Мои билеты</span>
          </a-menu-item>
          <a-menu-item key="4">
            <login-outlined />
            <span>Вход</span>
          </a-menu-item>
          <a-menu-item key="5">
            <logout-outlined />
            <span>Выход</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <RouterView />
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
