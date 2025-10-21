import type { Cinema, Movie } from '@/generated/models'
import type { VNode } from 'vue'

export type ScheduleGroupedSession<T> = {
  date: string
  fullDate: string
  rows: {
    key: string
    renderData: T
    sessions: {
      id: string
      cinemaId: Cinema['id']
      movieId: Movie['id']
      startTime: string
    }[]
  }[]
}

export type ScheduleProps<T> = {
  data: ScheduleGroupedSession<T>[]
  renderRowLabel: (data: T) => VNode | string
  onSelectSession: (sessionInfo: { sessionId: string }) => void
}
