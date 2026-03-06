import { api } from '../../lib/api-client'

export const savesApi = {
  list: () => api.get('/saves'),
  add: (toolId: string) => api.post('/saves', { toolId }),
  remove: (toolId: string) => api.del(`/saves/${toolId}`),
}

