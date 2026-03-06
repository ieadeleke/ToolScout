import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.['tc_at']
  if (!token) return res.status(401).json({ error: 'unauthorized' })
  try {
    const payload = verifyToken(token)
    ;(req as any).user = payload
    return next()
  } catch {
    return res.status(401).json({ error: 'unauthorized' })
  }
}

