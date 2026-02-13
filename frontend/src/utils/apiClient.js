import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_URL

export const buildApiUrl = (path) => {
  if (!API_BASE_URL) return path
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})
