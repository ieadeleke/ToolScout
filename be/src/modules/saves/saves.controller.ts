import { Request, Response } from 'express'
import { z } from 'zod'
import { savesService } from './saves.service'

export const getSaves = async (req: Request, res: Response) => {
  const userId = (req as any).user.sub as string
  const data = await savesService.list(userId)
  res.json(data)
}

const saveSchema = z.object({ toolId: z.string().min(1) })

export const addSave = async (req: Request, res: Response) => {
  const { toolId } = saveSchema.parse(req.body)
  const userId = (req as any).user.sub as string
  await savesService.save(userId, toolId)
  res.status(201).json({ ok: true })
}

export const removeSave = async (req: Request, res: Response) => {
  const userId = (req as any).user.sub as string
  await savesService.remove(userId, String(req.params.toolId))
  res.json({ ok: true })
}
