<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getTableLocaleEmptyMessage } from '@/utils/getTableLocaleEmptyMessage.ts'
import { getColumns } from '@/views/MoviesView/getColumns.ts'
import { useGetAllMovies } from '@/composables/useGetAllMovies.ts'

const { movies, moviesQueryDetails } = useGetAllMovies()

const router = useRouter()

const onGoToFilm = (movieId: number) => {
  router.push(`/movies/${movieId}`)
}

const columns = getColumns({ onGoToFilm })
</script>

<template>
  <a-table
    :dataSource="movies"
    :columns="columns"
    :pagination="false"
    :locale="
      getTableLocaleEmptyMessage({
        isLoading: moviesQueryDetails.isLoading.value,
        isError: moviesQueryDetails.isError.value,
      })
    "
  />
</template>

<style></style>
