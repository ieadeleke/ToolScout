import { Request, Response } from 'express'
import { z } from 'zod'
import { quizRepo } from './quiz.repository'

export const getQuestions = async (_req: Request, res: Response) => {
  const data = await quizRepo.getQuestions()
  res.json({ data })
}

const submitSchema = z.object({
  answers: z.record(z.any()),
})

export const submitQuiz = async (req: Request, res: Response) => {
  const { answers } = submitSchema.parse(req.body)
  const userId: string | null = (req as any).user?.sub || null
  await quizRepo.saveResponse(userId, answers)
  if (userId) {
    // naive seed extraction
    const role = answers['role'] || null
    const task = answers['time_drain'] || null
    await quizRepo.saveSeeds(userId, role ? [role] : [], task ? [task] : [])
  }
  res.status(201).json({ ok: true })
}

