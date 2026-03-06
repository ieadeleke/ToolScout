import { Router } from 'express'
import { getShelves, getSimilar, getTool, getTrending, listTools } from './tools.controller'
import { addRating, getRatings } from '../ratings/ratings.controller'
import { requireAuth } from '../../middleware/auth'

export const toolsRouter = Router()
toolsRouter.get('/', listTools)
toolsRouter.get('/trending', getTrending)
toolsRouter.get('/shelves', getShelves)
toolsRouter.get('/:id', getTool)
toolsRouter.get('/:id/similar', getSimilar)
// ratings nested under tool per spec
toolsRouter.get('/:id/ratings', getRatings)
toolsRouter.post('/:id/ratings', requireAuth, addRating)
