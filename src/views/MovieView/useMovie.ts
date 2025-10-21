import { useGetMoviesMovieIdSessions } from '@/generated/movies/movies'
import { useGetAllCinemas } from '@/composables/useGetAllCinemas'
import { useGetAllMovies } from '@/composables/useGetAllMovies'
import { computed, type ComputedRef } from 'vue'
import { groupSessions, type ScheduleMovieRenderDataType } from '@/utils/groupSessions.ts'
import type { ScheduleGroupedSession } from '@/components/Schedule.types.ts'

type UseMovieParams = {
  movieId: ComputedRef<string>
}

export const useMovie = ({ movieId }: UseMovieParams) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas()
  const { moviesMap, moviesQueryDetails } = useGetAllMovies()

  const { data, ...queryDetails } = useGetMoviesMovieIdSessions(+movieId.value, {
    query: {
      enabled: !!movieId.value,
    },
  })

  const movieInfo = computed(() => moviesMap.value[movieId.value] || null)

  const sessionsInfo: ComputedRef<ScheduleGroupedSession<ScheduleMovieRenderDataType>[]> = computed(
    () => {
      if (
        moviesQueryDetails.isLoading.value ||
        cinemasQueryDetails.isLoading.value ||
        queryDetails.isLoading.value
      ) {
        return []
      }

      return groupSessions(data.value?.data || [], cinemasMap.value, 'cinema')
    },
  )

  return {
    queryDetails,
    cinemasQueryDetails,
    movieInfo,
    sessionsInfo,
  }
}
