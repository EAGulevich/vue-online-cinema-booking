<script setup lang="ts">
import { useRouter } from 'vue-router'
import { SmileOutlined } from '@ant-design/icons-vue'
import { useTickets } from './useTickets'
import { computed, h } from 'vue'
import LoadingBlock from '@/components/LoadingBlock.vue'
import TicketView from '@/views/TicketsView/parts/TicketView.vue'

const router = useRouter()
const { groupedBooking, isLoading } = useTickets()
const isEmpty = computed(
  () =>
    !groupedBooking.value.unpaid.length &&
    !groupedBooking.value.past.length &&
    !groupedBooking.value.future.length,
)
</script>

<template>
  <a-row justify="center">
    <a-col>
      <a-typography-title :level="2">Мои билеты</a-typography-title>
    </a-col>
  </a-row>
  <LoadingBlock v-if="isLoading" />
  <a-result
    v-else-if="isEmpty"
    :icon="$slots.icon ? $slots.icon() : h(SmileOutlined, { style: { color: '#fef1dd' } })"
    title="У вас пока нет билетов"
    sub-title="Выбирайте фильм и бронируйте места"
  >
    <a-button type="primary" @click="() => router.push('/movies')"> К фильмам </a-button>
  </a-result>
  <template v-else>
    <a-divider v-if="groupedBooking.unpaid.length">Неоплаченные</a-divider>
    <a-flex vertical="vertical" gap="large">
      <TicketView v-for="item in groupedBooking.unpaid" :key="item.id" :ticket="item" />
    </a-flex>
    <a-divider v-if="groupedBooking.future.length">Будущие</a-divider>
    <a-flex vertical="vertical" gap="large">
      <TicketView v-for="item in groupedBooking.future" :key="item.id" :ticket="item" />
    </a-flex>
    <a-divider v-if="groupedBooking.past.length">Прошедшие</a-divider>
    <a-flex vertical gap="large">
      <TicketView v-for="item in groupedBooking.past" :key="item.id" :ticket="item" />
    </a-flex>
  </template>
</template>
