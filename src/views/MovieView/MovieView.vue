<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import ScheduleBlock from '@/components/ScheduleBlock.vue'
import { computed, h } from 'vue'

import { formatMinutesToHHmm } from '@/utils/formatMinutesToHHmm'
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl'

import { useMovie } from './useMovie'
import { Typography } from 'ant-design-vue'
import type {
  ScheduleCinemaRenderDataType,
  ScheduleMovieRenderDataType,
} from '@/utils/groupSessions.ts'
import { useHead } from '@unhead/vue'
import LoadingBlock from '@/components/LoadingBlock.vue'

const route = useRoute()
const router = useRouter()

const movieId = computed(() => route.params.id as string)

const { movieInfo, queryDetails, sessionsInfo } = useMovie({ movieId })
const handleBack = () => {
  router.push('/movies')
}

const handleSelectSession = ({ sessionId }: { sessionId: string }) => {
  router.push(`/bookings/${sessionId}`)
}

useHead({
  title: computed(() =>
    movieInfo.value?.title
      ? `${movieInfo.value.title} - Онлайн-бронирование кинотеатра`
      : 'Онлайн-бронирование кинотеатра',
  ),
})

const renderRowLabel = (renderData: ScheduleMovieRenderDataType | ScheduleCinemaRenderDataType) => {
  return h(
    Typography.Title,
    { level: 3 },
    { default: () => ('cinemaName' in renderData ? renderData.cinemaName : '-') },
  )
}
</script>

<template>
  <LoadingBlock v-if="queryDetails.isLoading.value" />
  <div v-else>
    <a-button type="default" shape="circle" @click="handleBack">
      <ArrowLeftOutlined />
    </a-button>

    <a-row justify="center">
      <a-col>
        <a-typography-title :level="2">
          {{ movieInfo?.title }}
        </a-typography-title>
      </a-col>
    </a-row>

    <a-row :gutter="20">
      <a-col>
        <a-image
          :alt="'Обложка фильма'"
          :src="getAbsoluteUrl(movieInfo?.posterImage || '')"
          :preview="false"
        />
      </a-col>
      <a-col :span="18">
        <a-flex vertical gap="large">
          <a-typography-text>
            {{ movieInfo?.description }}
          </a-typography-text>

          <a-descriptions bordered layout="vertical">
            <a-descriptions-item label="Год">{{ movieInfo?.year }}</a-descriptions-item>
            <a-descriptions-item label="Продолжительность">{{
              formatMinutesToHHmm(movieInfo?.lengthMinutes || 0)
            }}</a-descriptions-item>
            <a-descriptions-item label="Рейнтинг">{{ movieInfo?.rating }}</a-descriptions-item>
          </a-descriptions>
        </a-flex>
      </a-col>
    </a-row>

    <ScheduleBlock
      :data="sessionsInfo"
      :onSelectSession="handleSelectSession"
      :renderRowLabel="renderRowLabel"
    />
  </div>
</template>
