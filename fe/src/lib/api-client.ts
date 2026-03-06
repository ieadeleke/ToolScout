export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (res.status === 401) {
    const refreshed = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' })
    if (refreshed.ok) {
      const retry = await fetch(`${API_URL}${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
      })
      if (!retry.ok) throw new Error(await retry.text())
      return retry
    }
  }
  if (!res.ok) throw new Error(await res.text())
  return res
}

export const api = {
  get: (p: string) => request(p).then((r) => r.json()),
  post: (p: string, body: any) => request(p, { method: 'POST', body: JSON.stringify(body) }).then((r) => r.json()),
  del: (p: string) => request(p, { method: 'DELETE' }).then((r) => r.json()),
}

