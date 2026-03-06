import { CookieOptions } from 'express'
import { env } from './env'

const sameSite: CookieOptions['sameSite'] = env.COOKIE_SAMESITE

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.SECURE_COOKIES || sameSite === 'none',
  sameSite,
  path: '/',
  domain: env.COOKIE_DOMAIN,
}

export const refreshCookieOptions: CookieOptions = {
  ...accessCookieOptions,
  path: '/api/v1/auth',
}
