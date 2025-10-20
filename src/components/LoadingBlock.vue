<script setup lang="ts">
import 'ant-design-vue/dist/reset.css'

defineProps<{
  tip?: string
}>()
</script>

<template>
  <a-spin :tip="tip || 'Загрузка...'" size="large" :delay="300">
    <div class="content" />
  </a-spin>
</template>

<style scoped>
.content {
  padding: 50px;
  border-radius: 4px;
  height: 200px;
}
</style>
