import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import dayjs from 'dayjs'
import { computed, type ComputedRef } from 'vue'
import { useGetAllCinemas } from '@/composables/useGetAllCinemas.ts'
import {
  useGetMovieSessionsMovieSessionId,
  usePostMovieSessionsMovieSessionIdBookings,
} from '@/generated/movie-sessions/movie-sessions.ts'
import { getErrorMessage } from '@/utils/getErrorMessage.ts'
import { useGetAllMovies } from '@/composables/useGetAllMovies.ts'
import type { SelectedSeat } from '@/views/BookingView/parts/types.ts'

interface UseBookingProps {
  sessionId: ComputedRef<string>
}

export const useBooking = ({ sessionId }: UseBookingProps) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas()
  const { moviesMap, moviesQueryDetails } = useGetAllMovies()
  const router = useRouter()

  const { data: sessionData, isLoading: sessionLoading } = useGetMovieSessionsMovieSessionId(
    +sessionId.value,
    {
      query: {
        staleTime: 0,
      },
    },
  )

  const { mutate: bookingTrigger } = usePostMovieSessionsMovieSessionIdBookings({
    mutation: {
      onSuccess: () => {
        router.push('/tickets')
      },
      onError: (err) => {
        notification.error({
          message: 'Не удалось забронировать',
          description: getErrorMessage(err),
        })
      },
    },
  })

  const isSessionLoading = computed(
    () =>
      cinemasQueryDetails.isLoading.value ||
      moviesQueryDetails.isLoading.value ||
      sessionLoading.value,
  )

  const seats = computed(() => ({
    rows: sessionData.value?.data.seats?.rows || 0,
    seatsPerRow: sessionData.value?.data.seats?.seatsPerRow || 0,
  }))

  const sessionInfo = computed(() => {
    const movieId = sessionData.value?.data.movieId?.toString()
    const cinemaId = sessionData.value?.data.cinemaId?.toString()

    return {
      movieTitle: movieId ? moviesMap.value[movieId]?.title : 'Неизвестный фильм',
      cinemaName: cinemaId ? cinemasMap.value[cinemaId]?.name : 'Неизвестный кинотеатр',
      startTime: sessionData.value?.data.startTime
        ? dayjs(sessionData.value.data.startTime).format('DD.MM, HH:mm')
        : '',
    }
  })

  const bookedSeats = computed(() => {
    const seatsSet = new Set<string>()
    sessionData.value?.data.bookedSeats?.forEach((item) => {
      seatsSet.add(`${item.rowNumber}-${item.seatNumber}`)
    })
    return seatsSet
  })

  const onSelectFinish = ({ selectedSeats }: { selectedSeats: SelectedSeat[] }) => {
    bookingTrigger({
      movieSessionId: +sessionId.value,
      data: {
        seats: selectedSeats.map((seat) => ({
          rowNumber: seat.row,
          seatNumber: seat.seat,
        })),
      },
    })
  }

  return {
    isSessionLoading,
    seats,
    sessionInfo,
    onSelectFinish,
    bookedSeats: bookedSeats,
  }
}
