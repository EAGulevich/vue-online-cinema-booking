<script setup lang="ts">
import { computed, h } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { Flex, notification, Typography } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useSettingsData } from '@/composables/useSettingsData'
import { usePostBookingsBookingIdPayments } from '@/generated/bookings/bookings.ts'
import type { Booking } from '@/generated/models'
import { getErrorMessage } from '@/utils/getErrorMessage.ts'

interface Props {
  ticket: Booking & { isPast: boolean }
}

const props = defineProps<Props>()
const queryClient = useQueryClient()
const settingsData = useSettingsData()

const { mutate } = usePostBookingsBookingIdPayments({
  mutation: {
    onSuccess: (data) => {
      notification.success({
        message: data.data.message,
        description: h(
          Flex,
          { vertical: true },
          {
            default: () => [
              h(Typography.Text, {}, { default: () => `Билет на фильм ` }),
              h(Typography.Text, { type: 'success' }, { default: () => props.ticket.movieTitle }),
              h(Typography.Text, {}, { default: () => ` оплачен. Приятного просмотра!` }),
            ],
          },
        ),
      })
      queryClient.invalidateQueries({ queryKey: ['me', 'bookings'] })
    },
    onError: (err) => {
      notification.error({
        message: getErrorMessage(err),
      })
    },
  },
})

const endTime = computed(() =>
  dayjs(props.ticket.bookedAt)
    .add(settingsData.bookingPaymentTimeSeconds.value, 'second')
    .toISOString(),
)

const onFinish = () => {
  notification.warning({
    message: 'Бронирование отменено',
    description: h(
      Flex,
      { vertical: true },
      {
        default: () => [
          h(Typography.Text, `Время оплаты билета на фильм `),
          h(Typography.Text, { type: 'warning' }, { default: () => props.ticket.movieTitle }),
          h(Typography.Text, ` истекло.`),
        ],
      },
    ),
  })
  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ['me', 'bookings'] })
  }, 1000)
}
</script>

<template>
  <a-card>
    <a-row>
      <a-col :span="6">
        <a-flex vertical="vertical">
          <a-typography-text>{{ ticket.movieTitle }}</a-typography-text>
          <a-typography-text>{{ ticket.cinemaName }}</a-typography-text>
          <a-typography-text>{{
            dayjs(ticket.startTime).format('DD.MM, HH:mm')
          }}</a-typography-text>
        </a-flex>
      </a-col>
      <a-col :span="6">
        <a-flex vertical="vertical">
          <a-typography-text
            v-for="seat in ticket.seats"
            :key="`${seat.rowNumber}-${seat.seatNumber}`"
          >
            Ряд {{ seat.rowNumber }}, место {{ seat.seatNumber }}
          </a-typography-text>
        </a-flex>
      </a-col>
      <a-col :span="6">
        <a-button
          v-if="!ticket.isPaid"
          @click="() => mutate({ bookingId: ticket.id?.toString() || '' })"
        >
          Оплатить
        </a-button>
      </a-col>
      <a-col :span="6">
        <a-statistic-countdown
          v-if="!ticket.isPaid"
          title="Осталось:"
          :value="endTime"
          format="m:ss"
          @finish="onFinish"
        />
      </a-col>
    </a-row>
  </a-card>
</template>
