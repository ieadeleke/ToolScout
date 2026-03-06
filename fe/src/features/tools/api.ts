import { api } from '../../lib/api-client'

export const toolsApi = {
  trending: () => api.get('/tools/trending'),
  shelves: () => api.get('/tools/shelves'),
  list: (params: URLSearchParams | Record<string, any> | string) => {
    if (typeof params === 'string') return api.get('/tools?' + params)
    if (params instanceof URLSearchParams) return api.get('/tools?' + params.toString())
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((vv) => qs.append(k, String(vv)))
      else if (v != null) qs.set(k, String(v))
    })
    return api.get('/tools?' + qs.toString())
  },
  get: (id: string) => api.get(`/tools/${id}`),
  similar: (id: string) => api.get(`/tools/${id}/similar`),
}
