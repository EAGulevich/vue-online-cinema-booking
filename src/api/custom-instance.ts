import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { APP_CONFIG } from '../../config.ts'

export const customInstance = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  const instance = axios.create({
    baseURL: `${APP_CONFIG.apiUrl}`,
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        // TODO: взять из переменной путь /login
        if (!window.location.href.includes('/login')) {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    },
  )

  return instance(config)
}

export default customInstance
