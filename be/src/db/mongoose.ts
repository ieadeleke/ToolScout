import mongoose from 'mongoose'
import { env } from '../config/env'

export async function connectMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/toolscout'
  if (mongoose.connection.readyState === 1) return mongoose.connection
  await mongoose.connect(uri, {
    autoIndex: env.NODE_ENV !== 'production',
  })
  return mongoose.connection
}

