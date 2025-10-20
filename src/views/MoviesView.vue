<script setup lang="ts">
import { useGetMovies } from '@/generated/movies/movies.ts'

const { data } = useGetMovies()
</script>

<template>
  <h1>Фильмы</h1>
  {{ data }}
</template>

<style></style>
