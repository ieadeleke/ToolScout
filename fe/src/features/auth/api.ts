import { api } from '../../lib/api-client'

export const authApi = {
  me: () => api.get('/auth/me'),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { email: string; password: string; name: string }) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout', {}),
}

