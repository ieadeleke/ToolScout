import { Request, Response } from 'express'
import { toolsService } from './tools.service'

export const listTools = async (req: Request, res: Response) => {
  const { rating_gte, page = '1', limit = '20', q, is_nigerian } = req.query as any
  const role = req.query.role
  const task = req.query.task
  const pricing = req.query.pricing

  const toArray = (v: any) => (Array.isArray(v) ? v : (typeof v === 'string' && v.includes(',') ? v.split(',') : v))

  const data = await toolsService.list({
    role: toArray(role),
    task: toArray(task),
    pricing: toArray(pricing),
    is_nigerian: typeof is_nigerian !== 'undefined' ? is_nigerian === 'true' || is_nigerian === true : undefined,
    rating_gte: rating_gte ? Number(rating_gte) : undefined,
    page: Number(page),
    limit: Number(limit),
    q,
  })
  res.json(data)
}

export const getTrending = async (_req: Request, res: Response) => {
  const data = await toolsService.trending()
  res.json(data)
}

export const getShelves = async (_req: Request, res: Response) => {
  const data = await toolsService.shelves()
  res.json({ data })
}

export const getTool = async (req: Request, res: Response) => {
  const tool = await toolsService.getById(String(req.params.id))
  res.json(tool)
}

export const getSimilar = async (req: Request, res: Response) => {
  const data = await toolsService.similar(String(req.params.id))
  res.json(data)
}
