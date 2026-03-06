import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export type JwtPayload = { sub: string; email: string }

export const signAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.ACCESS_TOKEN_TTL_SEC })

export const signRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.REFRESH_TOKEN_TTL_SEC })

export const verifyToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET) as JwtPayload

