<script setup lang="ts">
import 'ant-design-vue/dist/reset.css'
import type { CSSProperties } from 'vue'

defineProps<{
  tip?: string
}>()
const style: CSSProperties = { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '4px' }
</script>

<template>
  <a-spin :tip="tip || 'Загрузка...'" size="large" :delay="300" :style>
    <div class="content" />
  </a-spin>
</template>

<style scoped>
.content {
  padding: 50px;
  height: 200px;
}
</style>
