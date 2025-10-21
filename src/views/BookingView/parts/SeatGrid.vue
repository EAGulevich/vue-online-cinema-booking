<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTableColumns } from './getTableColumns'
import type { SelectedSeat } from './types'

interface Props {
  rows: number
  seatsPerRow: number
  bookedSeats: Set<string>
  onSelectFinish: ({ selectedSeats }: { selectedSeats: SelectedSeat[] }) => void
}

const props = defineProps<Props>()

const selectedSeats = ref<Set<string>>(new Set())

const currentBookedSeats = computed(() => props.bookedSeats)

const columns = computed(() =>
  getTableColumns({
    seatsPerRow: props.seatsPerRow,
    bookedSeats: currentBookedSeats.value,
    onSelect: ({ seat, row }) => {
      const seatFullName = `${row}-${seat}`
      if (!selectedSeats.value.has(seatFullName)) {
        selectedSeats.value.add(seatFullName)
      } else {
        selectedSeats.value.delete(seatFullName)
      }
    },
  }),
)

const dataSource = computed(() =>
  Array.from({ length: props.rows }, (_, rowIndex) => ({
    key: rowIndex,
    rowIndex,
    rowLabel: `Ряд ${rowIndex + 1}`,
    ...Object.fromEntries(
      Array.from({ length: props.seatsPerRow }, (_, seatIndex) => [`seat${seatIndex}`, '_']),
    ),
  })),
)
</script>

<template>
  <a-flex vertical="vertical" gap="large" style="margin-top: 20px">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      bordered
      size="small"
      :scroll="{ x: 'max-content', y: 400 }"
      sticky
    />
    <a-flex justify="center">
      <a-button
        @click="
          () => {
            const selected = Array.from(selectedSeats).map((item): SelectedSeat => {
              const [row, seat] = item.split('-')
              return {
                row: Number(row),
                seat: Number(seat),
              }
            })
            props.onSelectFinish({ selectedSeats: selected })
          }
        "
      >
        Забронировать
      </a-button>
    </a-flex>
  </a-flex>
</template>
