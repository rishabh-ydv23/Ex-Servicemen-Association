import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export function setToken(token?: string) {
  if (token) localStorage.setItem('admin-token', token)
  else localStorage.removeItem('admin-token')
}

// Default export for compatibility
export default api


