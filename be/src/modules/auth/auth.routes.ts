import { Router } from 'express'
import { login, logout, me, refresh, register } from './auth.controller'
import { requireAuth } from '../../middleware/auth'
import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({ windowMs: 60 * 1000, limit: 20 })

export const authRouter = Router()
authRouter.post('/register', authLimiter, register)
authRouter.post('/login', authLimiter, login)
authRouter.post('/logout', logout)
authRouter.post('/refresh', refresh)
authRouter.get('/me', requireAuth, me)

