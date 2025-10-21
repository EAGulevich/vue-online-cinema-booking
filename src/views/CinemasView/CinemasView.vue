<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getTableLocaleEmptyMessage } from '@/utils/getTableLocaleEmptyMessage.ts'
import { getColumns } from '@/views/CinemasView/getColumns.ts'
import { useGetAllCinemas } from '@/composables/useGetAllCinemas.ts'

const { cinemas, cinemasQueryDetails } = useGetAllCinemas()

const router = useRouter()

const onGoToCinema = (cinemaId: number) => {
  router.push(`/cinemas/${cinemaId}`)
}

const columns = getColumns({ onGoToCinema })
</script>

<template>
  <a-table
    :dataSource="cinemas"
    :columns="columns"
    :pagination="false"
    :locale="
      getTableLocaleEmptyMessage({
        isLoading: cinemasQueryDetails.isLoading.value,
        isError: cinemasQueryDetails.isError.value,
      })
    "
  />
</template>

<style></style>
