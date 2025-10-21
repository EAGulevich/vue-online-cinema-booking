import { type CSSProperties, h } from 'vue'
import { Flex, TypographyText } from 'ant-design-vue'
import { LoadingOutlined, WarningOutlined, InboxOutlined } from '@ant-design/icons-vue'

const iconsStyle: CSSProperties = {
  fontSize: '30px',
}

export const getTableLocaleEmptyMessage = ({
  isError,
  isLoading,
}: {
  isError: boolean
  isLoading: boolean
}) => {
  const text = isLoading
    ? 'Загружаем данные'
    : isError
      ? 'Не удалось загрузить данные'
      : 'Здесь пока пусто'

  const icon = isLoading
    ? h(LoadingOutlined, { style: iconsStyle })
    : isError
      ? h(WarningOutlined, { style: iconsStyle })
      : h(InboxOutlined, { style: iconsStyle })

  return {
    emptyText: h(
      Flex,
      {
        gap: 'middle',
        justify: 'center',
        align: 'center',
      },
      {
        default: () => [icon, h(TypographyText, {}, { default: () => text })],
      },
    ),
  }
}
