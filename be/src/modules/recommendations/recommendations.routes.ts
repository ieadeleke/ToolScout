import { Router } from 'express'
import { requireAuth } from '../../middleware/auth'
import { recommendationsService } from './recommendations.service'

export const recommendationsRouter = Router()

recommendationsRouter.get('/home', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string
  const data = await recommendationsService.home(userId)
  res.json(data)
})

