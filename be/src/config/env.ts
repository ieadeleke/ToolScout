export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-me',
  ACCESS_TOKEN_TTL_SEC: Number(process.env.ACCESS_TOKEN_TTL_SEC || 900),
  REFRESH_TOKEN_TTL_SEC: Number(process.env.REFRESH_TOKEN_TTL_SEC || 60 * 60 * 24 * 7),
  SECURE_COOKIES: process.env.SECURE_COOKIES === 'true' || process.env.NODE_ENV === 'production',
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
  COOKIE_SAMESITE: (process.env.COOKIE_SAMESITE as 'lax'|'strict'|'none'|undefined) || 'lax',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/toolscout',
}
