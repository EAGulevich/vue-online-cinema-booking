import { APP_CONFIG } from '../../config.ts'

export const getAbsoluteUrl = (relativePath: string) => APP_CONFIG.apiUrl + relativePath
