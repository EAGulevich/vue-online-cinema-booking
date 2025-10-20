import { Button, Image, type TableColumnsType, Tag, Typography } from 'ant-design-vue'
import type { Movie } from '@/generated/models'
import { h } from 'vue'
import { getAbsoluteUrl } from '@/utils/getAbsoluteUrl.ts'
import { formatMinutesToHHmm } from '@/utils/formatMinutesToHHmm.ts'

type GetColumnsProps = {
  onGoToFilm: (movieId: Required<Movie>['id']) => void
}

export const getColumns = ({ onGoToFilm }: GetColumnsProps): TableColumnsType<Required<Movie>> => [
  {
    width: 100,
    title: '',
    key: 'posterImage',
    customRender: ({ record }) => {
      return h(Image, {
        placeholder: true,
        height: 100,
        alt: `Обложка фильма ${record.title}`,
        src: getAbsoluteUrl(record.posterImage),
        preview: false,
      })
    },
  },
  {
    title: 'Название',
    key: 'title',
    customRender: ({ record }) => {
      return h(Typography.Text, {
        strong: true,
        content: record.title,
        style: {
          fontSize: '18px',
        },
      })
    },
  },
  {
    title: 'Продолжительность',
    key: 'lengthMinutes',
    align: 'center',
    customRender: ({ record }) => formatMinutesToHHmm(record.lengthMinutes),
  },
  {
    align: 'center',
    title: 'Рейтинг',
    key: 'rating',
    defaultSortOrder: 'descend',
    sorter: (a, b) => (a.rating && b.rating ? a.rating - b.rating : 0),
    customRender: ({ record }) =>
      h(
        Tag,
        {
          color: record.rating > 9 ? 'gold' : undefined,
        },
        `${record.rating}.0`.slice(0, 3),
      ),
  },
  {
    width: 200,
    align: 'center',
    title: '',
    key: 'view',
    customRender: ({ record }) =>
      h(
        Button,
        {
          onClick: () => onGoToFilm(record.id),
        },
        'Посмотреть сеансы',
      ),
  },
]
