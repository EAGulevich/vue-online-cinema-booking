import { computed, type ComputedRef } from 'vue'
import { useGetAllCinemas } from '@/composables/useGetAllCinemas.ts'
import { useGetAllMovies } from '@/composables/useGetAllMovies.ts'
import { useGetCinemasCinemaIdSessions } from '@/generated/cinemas/cinemas.ts'
import { groupSessions } from '@/utils/groupSessions.ts'

interface UseCinemaProps {
  cinemaId: ComputedRef<string>
}

export function useCinema({ cinemaId }: UseCinemaProps) {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas()
  const { moviesMap, moviesQueryDetails } = useGetAllMovies()

  const cinemaInfo = computed(() => cinemasMap.value[cinemaId.value || ''])

  const { data, isLoading } = useGetCinemasCinemaIdSessions(+cinemaId.value, {
    query: {
      enabled: !!cinemaId.value,
    },
  })

  const isSessionsLoading = computed(
    () =>
      cinemasQueryDetails.isLoading.value || moviesQueryDetails.isLoading.value || isLoading.value,
  )

  const sessionsInfo = computed(() =>
    isSessionsLoading.value ? [] : groupSessions(data.value?.data || [], moviesMap.value, 'movie'),
  )

  return {
    cinemaInfo,
    sessionsInfo,
    queryDetails: {
      isLoading,
    },
  }
}
