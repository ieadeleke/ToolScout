import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.routes'
import { toolsRouter } from '../modules/tools/tools.routes'
import { searchRouter } from '../modules/search/search.routes'
import { quizRouter } from '../modules/quiz/quiz.routes'
import { savesRouter } from '../modules/saves/saves.routes'
import { ratingsRouter } from '../modules/ratings/ratings.routes'
import { recommendationsRouter } from '../modules/recommendations/recommendations.routes'

export const v1Router = Router()
v1Router.use('/auth', authRouter)
v1Router.use('/tools', toolsRouter)
v1Router.use('/search', searchRouter)
v1Router.use('/quiz', quizRouter)
v1Router.use('/saves', savesRouter)
v1Router.use('/ratings', ratingsRouter)
v1Router.use('/recommendations', recommendationsRouter)

