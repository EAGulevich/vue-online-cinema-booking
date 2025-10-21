import { useGetMovies } from '@/generated/movies/movies.ts'
import { computed, type ComputedRef } from 'vue'
import type { Movie } from '@/generated/models'

export const useGetAllMovies = () => {
  const { data, isLoading, isError, error } = useGetMovies()

  const moviesMap: ComputedRef<Record<string, Movie | undefined>> = computed(
    () =>
      data.value?.data.reduce<Record<string, Movie | undefined>>((acc, item) => {
        if (item.id) {
          acc[item.id.toString()] = item
        }
        return acc
      }, {}) || {},
  )

  const movies = computed(() => data.value?.data || [])

  return {
    movies,
    moviesMap,
    moviesQueryDetails: {
      isLoading,
      isError,
      error,
    },
  }
}
