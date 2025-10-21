<script setup lang="ts">
import type { ScheduleProps } from '@/components/Schedule.types.ts'

interface Props<T = ScheduleMovieRenderDataType | ScheduleCinemaRenderDataType> {
  data: ScheduleProps<T>['data']
  onSelectSession: ScheduleProps<T>['onSelectSession']
  renderRowLabel: ScheduleProps<T>['renderRowLabel']
}

export type ScheduleCinemaRenderDataType = {
  movieTitle: string
  posterImage: string
}

export type ScheduleMovieRenderDataType = {
  cinemaName: string
}

const props = defineProps<Props>()
</script>

<template>
  <a-divider />
  <a-typography-title :level="2">Расписание</a-typography-title>

  <a-flex vertical="vertical" gap="middle" v-for="item in props.data" :key="item.date">
    <a-divider variant="solid" orientation="left">
      {{ item.date }}
    </a-divider>

    <a-flex vertical gap="large" v-for="row in item.rows" :key="row.key">
      <a-row justify="start" :gutter="20">
        <a-col :span="10" :offset="1">
          <component :is="renderRowLabel(row.renderData)" />
        </a-col>
        <a-col :span="10">
          <a-flex gap="large" wrap="wrap">
            <a-button
              v-for="session in row.sessions"
              :key="session.id"
              @click="props.onSelectSession({ sessionId: session.id })"
            >
              {{ session.startTime }}
            </a-button>
          </a-flex>
        </a-col>
      </a-row>
    </a-flex>
  </a-flex>
</template>
