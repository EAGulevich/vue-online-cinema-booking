<script setup lang="ts">
import { useGetMovies } from '@/generated/movies/movies.ts'
import { useRouter } from 'vue-router'
import { getTableLocaleEmptyMessage } from '@/utils/getTableLocaleEmptyMessage.ts'
import { getColumns } from '@/views/MoviesView/getColumns.ts'

const { data, isLoading, isError } = useGetMovies()

const router = useRouter()

const onGoToFilm = (movieId: number) => {
  router.push(`/movies/${movieId}`)
}

const columns = getColumns({ onGoToFilm })
</script>

<template>
  <a-table
    :dataSource="data?.data"
    :columns="columns"
    :pagination="false"
    :locale="getTableLocaleEmptyMessage({ isLoading: isLoading, isError: isError })"
  />
</template>

<style></style>
