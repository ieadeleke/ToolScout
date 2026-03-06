import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requireAuth } from '../../middleware/auth'
import { addSave, getSaves, removeSave } from './saves.controller'

const savesLimiter = rateLimit({ windowMs: 60 * 1000, limit: 60 })

export const savesRouter = Router()
// All saves endpoints require auth
savesRouter.use(requireAuth)
savesRouter.get('/', getSaves)
savesRouter.post('/', savesLimiter, addSave)
savesRouter.delete('/:toolId', removeSave)

