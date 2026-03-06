import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || 500
  const message = status === 500 ? 'internal_error' : err?.message || 'error'
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error('[error]', err)
  }
  res.status(status).json({ error: message })
}

