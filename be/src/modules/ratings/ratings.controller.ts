import { Request, Response } from 'express'
import { z } from 'zod'
import { ratingsService } from './ratings.service'

export const getRatings = async (req: Request, res: Response) => {
  const data = await ratingsService.list(String(req.params.id))
  res.json(data)
}

const rateSchema = z.object({ score: z.number().min(1).max(5), text: z.string().max(1000).optional() })

export const addRating = async (req: Request, res: Response) => {
  const { score, text } = rateSchema.parse(req.body)
  const userId = (req as any).user.sub as string
  await ratingsService.add(userId, String(req.params.id), score, text)
  res.status(201).json({ ok: true })
}
