<script setup lang="ts">
import { computed, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Col, Image, Row, Typography } from 'ant-design-vue'
import { useHead } from '@unhead/vue'
import { useCinema } from '@/views/CinemaView/useCinema.ts'
import type {
  ScheduleCinemaRenderDataType,
  ScheduleMovieRenderDataType,
} from '@/utils/groupSessions.ts'
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl.ts'
import LoadingBlock from '@/components/LoadingBlock.vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import ScheduleBlock from '@/components/ScheduleBlock.vue'

const router = useRouter()
const route = useRoute()

const cinemaId = computed(() => route.params.id as string)

const { cinemaInfo, sessionsInfo, queryDetails } = useCinema({ cinemaId: cinemaId })
const handleBack = () => {
  router.push('/cinemas')
}

const handleSelectSession = ({ sessionId }: { sessionId: string }) => {
  router.push(`/bookings/${sessionId}`)
}

useHead({
  title: computed(() =>
    cinemaInfo.value?.name
      ? `${cinemaInfo.value.name} - Онлайн-бронирование кинотеатра`
      : 'Онлайн-бронирование кинотеатра',
  ),
})

const renderRowLabel = (renderData: ScheduleMovieRenderDataType | ScheduleCinemaRenderDataType) => {
  return h(
    Row,
    {
      align: 'middle',
      gutter: 20,
    },
    {
      default: () => [
        'posterImage' in renderData &&
          h(
            Col,
            {},
            {
              default: () =>
                h(Image, {
                  width: 80,
                  alt: 'Обложка фильма',
                  src: getAbsoluteUrl(renderData.posterImage || ''),
                  preview: false,
                }),
            },
          ),
        h(
          Col,
          { span: 12 },
          {
            default: () =>
              h(
                Typography.Title,
                { level: 3 },
                {
                  default: () => ('movieTitle' in renderData ? renderData.movieTitle : '-'),
                },
              ),
          },
        ),
      ],
    },
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
          {{ cinemaInfo?.name }}
        </a-typography-title>
      </a-col>
    </a-row>

    <ScheduleBlock
      :data="sessionsInfo"
      :onSelectSession="handleSelectSession"
      :renderRowLabel="renderRowLabel"
    />
  </div>
</template>

<style scoped>
div {
  padding: 16px;
}
</style>
