import { useGetCinemas } from '@/generated/cinemas/cinemas.ts'
import { computed, type ComputedRef } from 'vue'
import type { Cinema } from '@/generated/models'

export const useGetAllCinemas = () => {
  const { data, isLoading, isError, error } = useGetCinemas()

  const cinemasMap: ComputedRef<Record<string, Cinema | undefined>> = computed(
    () =>
      data.value?.data.reduce<Record<string, Cinema | undefined>>((acc, item) => {
        if (item.id) {
          acc[item.id.toString()] = item
        }
        return acc
      }, {}) || {},
  )

  const cinemas = computed(() => data.value?.data || [])

  return {
    cinemas,
    cinemasMap,
    cinemasQueryDetails: {
      isLoading,
      isError,
      error,
    },
  }
}
