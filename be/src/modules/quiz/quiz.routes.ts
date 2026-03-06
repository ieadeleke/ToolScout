import { Router } from 'express'
import { getQuestions, submitQuiz } from './quiz.controller'
import rateLimit from 'express-rate-limit'
import { requireAuth } from '../../middleware/auth'

export const quizRouter = Router()
const quizLimiter = rateLimit({ windowMs: 60 * 1000, limit: 30 })

quizRouter.get('/questions', getQuestions)
// allow both anon and authed; if authed we save seeds
quizRouter.post('/submit', quizLimiter, submitQuiz)

