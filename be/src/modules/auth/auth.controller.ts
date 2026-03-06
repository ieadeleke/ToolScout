import { Request, Response } from 'express'
import { z } from 'zod'
import { authService } from './auth.service'
import { accessCookieOptions, refreshCookieOptions } from '../../config/cookies'

const registerSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(2).optional() })
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) })

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = registerSchema.parse(req.body)
  const { access, refresh, user } = await authService.register({ email, password, name })
  const id = String((user as any)._id || (user as any).id)
  const out = { id, email: (user as any).email, name: (user as any).name }
  res
    .cookie('tc_at', access, accessCookieOptions)
    .cookie('tc_rt', refresh, refreshCookieOptions)
    .status(201)
    .json({ user: out })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body)
  const { access, refresh, user } = await authService.login({ email, password })
  const id = String((user as any)._id || (user as any).id)
  const out = { id, email: (user as any).email, name: (user as any).name }
  res
    .cookie('tc_at', access, accessCookieOptions)
    .cookie('tc_rt', refresh, refreshCookieOptions)
    .json({ user: out })
}

export const me = async (req: Request, res: Response) => {
  const user = await authService.getMe((req as any).user.sub)
  const id = String((user as any)._id || (user as any).id)
  const out = { id, email: (user as any).email, name: (user as any).name }
  res.json({ user: out })
}

export const refresh = async (req: Request, res: Response) => {
  const rt = req.cookies?.['tc_rt']
  const { access, refresh: newRefresh } = await authService.refresh(rt)
  res
    .cookie('tc_at', access, accessCookieOptions)
    .cookie('tc_rt', newRefresh, refreshCookieOptions)
    .json({ ok: true })
}

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie('tc_at', accessCookieOptions).clearCookie('tc_rt', refreshCookieOptions).json({ ok: true })
}
