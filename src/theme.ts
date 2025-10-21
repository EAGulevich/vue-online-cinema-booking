import { theme, type ConfigProviderProps } from 'ant-design-vue'

export const antdTheme: ConfigProviderProps['theme'] = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#ff9500',
    colorBgLayout: '#fff9e6', // Общий фон layout
  },
  components: {
    Card: {
      colorBgContainer: '#141414e6',
      colorBorderSecondary: 'transparent',
    },
    Divider: {
      lineWidth: 3,
    },
    Layout: {
      colorBgBody: '#fff9e6', // Фон основного контента
      colorBgContainer: '#fff3cd', // Фон контейнеров
    },
    Menu: {
      colorBgContainer: 'transparent', // Фон всего меню
    },
  },
}
