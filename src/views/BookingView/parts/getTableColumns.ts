import { Checkbox } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'

import type { SeatsTableDataType, SelectedSeat } from './types'
import { h } from 'vue'

interface GetTableColumnsParams {
  seatsPerRow: number
  onSelect: (selectedSeat: SelectedSeat) => void
  bookedSeats: Set<string>
}

export const getTableColumns = ({
  seatsPerRow,
  onSelect,
  bookedSeats,
}: GetTableColumnsParams): TableColumnsType<SeatsTableDataType> => {
  return [
    {
      key: 'rowLabel',
      dataIndex: 'rowLabel',
      fixed: 'left',
      align: 'center',
      width: 100,
    },
    ...Array.from(
      { length: seatsPerRow },
      (_, index): TableColumnsType<SeatsTableDataType>[number] => {
        const inxNumber = index + 1
        return {
          key: `seat${inxNumber}`,
          title: inxNumber.toString(),
          width: 40,
          align: 'center',
          customRender: ({ record }) => {
            const rowNumber = record.rowIndex + 1
            const isDisabled = bookedSeats.has(`${rowNumber}-${inxNumber}`)
            return h(Checkbox, {
              disabled: isDisabled,
              indeterminate: isDisabled,
              title: `Ряд ${rowNumber}, Место ${inxNumber}`,
              onChange: () =>
                onSelect({
                  row: rowNumber,
                  seat: inxNumber,
                }),
            })
          },
        }
      },
    ),
  ]
}
