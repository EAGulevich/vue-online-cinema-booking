import { useSettingsStore } from '@/stores/settingsStore.ts'
import { useGetSettings } from '@/generated/settings/settings.ts'
import { toRef, watch } from 'vue'

export const useSettingsData = () => {
  const settingsStore = useSettingsStore()

  const { data } = useGetSettings({
    query: {
      staleTime: Infinity,
    },
  })

  watch(data, (newData) => {
    if (newData?.data.bookingPaymentTimeSeconds !== undefined) {
      settingsStore.setBookingPaymentTimeSeconds(newData.data.bookingPaymentTimeSeconds)
    }
  })

  return {
    token: toRef(settingsStore, 'token'),
    bookingPaymentTimeSeconds: toRef(settingsStore, 'bookingPaymentTimeSeconds'),
    setBookingPaymentTimeSeconds: settingsStore.setBookingPaymentTimeSeconds,
    onLogin: settingsStore.onLogin,
    onLogout: settingsStore.onLogout,
  }
}
