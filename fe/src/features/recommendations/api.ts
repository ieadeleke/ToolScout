import { api } from '../../lib/api-client'

export const recommendationsApi = {
  home: () => api.get('/recommendations/home'),
}

