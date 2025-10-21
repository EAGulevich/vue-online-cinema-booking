import { ref } from 'vue'
import { defineStore } from 'pinia'

const LOCAL_STORAGE_TOKEN_KEY = 'token'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const token = ref<string | null>(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? null)
  const bookingPaymentTimeSeconds = ref<number>(0)

  // Actions
  const setBookingPaymentTimeSeconds = (newValue: number) => {
    bookingPaymentTimeSeconds.value = newValue
  }

  const onLogin = (newToken: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, newToken)
    token.value = newToken
  }

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    token.value = null
  }

  return {
    token,
    bookingPaymentTimeSeconds,

    setBookingPaymentTimeSeconds,
    onLogin,
    onLogout,
  }
})
