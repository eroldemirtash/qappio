import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

// Environment configuration
const APP_API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_BASE_URL || 'http://localhost:8000/api'

// Auth token management
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('qappio_admin_token')
  }
  return null
}

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('qappio_admin_token', token)
  }
}

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('qappio_admin_token')
  }
}

// Create axios instance
const appClient: AxiosInstance = axios.create({
  baseURL: APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth
appClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
appClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and show login prompt
          removeAuthToken()
          console.error('Authentication failed. Please login again.')
          break
        case 403:
          // Forbidden - insufficient permissions
          console.error('Access denied. Insufficient permissions.')
          break
        case 404:
          // Not found
          console.error('Resource not found.')
          break
        case 429:
          // Rate limited
          console.error('Rate limit exceeded. Please try again later.')
          break
        case 500:
          // Server error
          console.error('Server error. Please try again later.')
          break
        default:
          console.error(`Request failed with status ${status}`)
      }
    } else if (error.request) {
      // Network error
      console.error('Network error. Please check your connection.')
    } else {
      // Other error
      console.error('Request setup error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  total?: number
  page?: number
  limit?: number
  hasMore?: boolean
}

// Pagination interface
export interface PaginationParams {
  page?: number
  limit?: number
  q?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Error handling utilities
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.response?.status === 401) {
      return 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
    }
    if (error.response?.status === 403) {
      return 'Bu işlem için yetkiniz bulunmuyor.'
    }
    if (error.response?.status === 404) {
      return 'İstenen kaynak bulunamadı.'
    }
    if (error.response?.status === 429) {
      return 'Çok fazla istek gönderildi. Lütfen bekleyin.'
    }
    if (error.response?.status && error.response.status >= 500) {
      return 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.'
    }
    return 'Bir hata oluştu. Lütfen tekrar deneyin.'
  }
  return 'Beklenmeyen bir hata oluştu.'
}

// Export the configured client
export default appClient
