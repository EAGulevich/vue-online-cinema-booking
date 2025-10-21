<script setup lang="ts">
import { useRoute } from 'vue-router'
import LoadingBlock from '@/components/LoadingBlock.vue'
import { useBooking } from './useBooking'
import { computed } from 'vue'
import SeatGrid from '@/views/BookingView/parts/SeatGrid.vue'

const route = useRoute()
const sessionId = computed(() => route.params.id as string)

const { sessionInfo, seats, isSessionLoading, onSelectFinish, bookedSeats } = useBooking({
  sessionId,
})
</script>

<template>
  <div>
    <template v-if="isSessionLoading">
      <LoadingBlock tip="Загружаем информацию о зале..." />
    </template>

    <template v-else>
      <a-row justify="center">
        <a-col>
          <a-typography-title :level="2">Выбрать места</a-typography-title>
        </a-col>
      </a-row>

      <a-descriptions bordered layout="vertical" style="margin-bottom: 24px">
        <a-descriptions-item label="Фильм">
          <span v-if="sessionInfo.movieTitle">{{ sessionInfo.movieTitle }}</span>
          <a-skeleton v-else />
        </a-descriptions-item>
        <a-descriptions-item label="Кинотеатр">
          <span v-if="sessionInfo.cinemaName">{{ sessionInfo.cinemaName }}</span>
          <a-skeleton v-else />
        </a-descriptions-item>
        <a-descriptions-item label="Время">
          <span v-if="sessionInfo.startTime">{{ sessionInfo.startTime }}</span>
          <a-skeleton v-else />
        </a-descriptions-item>
      </a-descriptions>

      <SeatGrid
        :rows="seats.rows"
        :seats-per-row="seats.seatsPerRow"
        :booked-seats="bookedSeats"
        :on-select-finish="onSelectFinish"
      />
    </template>
  </div>
</template>
