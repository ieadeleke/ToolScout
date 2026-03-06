import { Router } from 'express'
import { toolsRepo } from '../tools/tools.repository'

export const searchRouter = Router()

searchRouter.get('/suggestions', async (req, res) => {
  const q = String(req.query.q || '').toLowerCase()
  if (!q) return res.json({ suggestions: [] })
  const { data } = await toolsRepo.list({ q, limit: 10 })
  const suggestions = data.map((t: any) => ({ id: String(t._id || t.id), name: t.name, slug: t.slug }))
  res.json({ suggestions })
})

searchRouter.get('/', async (req, res) => {
  const { role, task, pricing, rating_gte, page = '1', limit = '20', q } = req.query as any
  const data = await toolsRepo.list({ role, task, pricing, rating_gte: Number(rating_gte), page: Number(page), limit: Number(limit), q })
  res.json(data)
})
