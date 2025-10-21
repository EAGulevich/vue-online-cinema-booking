import { computed } from 'vue'
import dayjs from 'dayjs'
import { useGetMeBookings } from '@/generated/users/users.ts'
import type { Booking } from '@/generated/models'

export const useTickets = () => {
  const { data, isLoading } = useGetMeBookings({
    query: {
      staleTime: 0,
    },
  })

  const booking = computed(
    () =>
      data?.value?.data.map((item) => ({
        ...item,
        isPast: dayjs(item.startTime)
          .add(item.minutesLength || 0, 'minute')
          .isBefore(dayjs()),
      })) || [],
  )

  interface GroupedBooking {
    future: (Booking & { isPast: boolean })[]
    past: (Booking & { isPast: boolean })[]
    unpaid: (Booking & { isPast: boolean })[]
  }

  const groupedBooking = computed(() =>
    booking.value.reduce<GroupedBooking>(
      (acc, item) => {
        if (!item.isPaid) {
          acc.unpaid.push(item)
        } else if (item.isPast) {
          acc.past.push(item)
        } else {
          acc.future.push(item)
        }
        return acc
      },
      {
        future: [],
        past: [],
        unpaid: [],
      },
    ),
  )

  return { groupedBooking, isLoading }
}
