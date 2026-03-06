import express from 'express'
import helmet from 'helmet'
import cors, { CorsOptions } from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import { errorHandler } from './middleware/error'
import { v1Router } from './routes/v1'

export const app = express()

app.use(helmet())
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
const origins = (env.CLIENT_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean)
const corsOptions: CorsOptions = {
  // origin: origins.length > 1 ? origins : origins[0] || true,
  origin: '*',
  credentials: true,
}
app.use(cors(corsOptions))

// Generic rate limiter
app.use(
  rateLimit({ windowMs: 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false })
)

app.get('/health', async (_req, res) => {
  const mongoose = await import('mongoose')
  const dbState = mongoose.connection.readyState
  // 0=disconnected 1=connected 2=connecting 3=disconnecting
  const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] ?? 'unknown'
  const ok = dbState === 1
  res.status(ok ? 200 : 503).json({
    ok,
    status: ok ? 'healthy' : 'degraded',
    db: dbStatus,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? '0.1.0',
    env: process.env.NODE_ENV ?? 'development',
  })
})
app.use('/api/v1', v1Router)
app.use(errorHandler)
