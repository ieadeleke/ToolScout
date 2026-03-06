import { Router } from 'express'
import { addRating, getRatings } from './ratings.controller'
import { requireAuth } from '../../middleware/auth'

export const ratingsRouter = Router()

ratingsRouter.get('/tool/:id', getRatings)
ratingsRouter.post('/tool/:id', requireAuth, addRating)

