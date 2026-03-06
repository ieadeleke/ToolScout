import { api } from '../../lib/api-client'

export const ratingsApi = {
  list: (toolId: string) => api.get(`/tools/${toolId}/ratings`),
  add: (toolId: string, data: { score: number; text?: string }) => api.post(`/tools/${toolId}/ratings`, data),
}

