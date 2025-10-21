import { Button, type TableColumnsType } from 'ant-design-vue'
import type { Cinema, Movie } from '@/generated/models'
import { h } from 'vue'

type GetColumnsProps = {
  onGoToCinema: (movieId: Required<Movie>['id']) => void
}

export const getColumns = ({
  onGoToCinema,
}: GetColumnsProps): TableColumnsType<Required<Cinema>> => [
  {
    title: 'Кинотеатр',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Адрес',
    key: 'address',
    dataIndex: 'address',
  },
  {
    width: 200,
    align: 'center',
    title: '',
    key: 'view',
    customRender: ({ record }) => {
      return h(
        Button,
        {
          onClick: () => onGoToCinema(record.id),
        },
        { default: () => 'Посмотреть сеансы' },
      )
    },
  },
]
