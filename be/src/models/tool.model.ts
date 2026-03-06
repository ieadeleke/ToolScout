import mongoose, { Schema } from 'mongoose'

export interface ITool {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  logo_url?: string
  short_description: string
  long_description?: string
  website_url?: string
  pricing: 'free' | 'paid' | 'freemium'
  origin_country?: string
  is_nigerian?: boolean
  saves_count: number
  avg_rating: number
  rating_count: number
  roles: string[]
  tasks: string[]
  categories?: string[]
  tags?: string[]
  created_at: Date
  updated_at: Date
}

const ToolSchema = new Schema<ITool>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  logo_url: String,
  short_description: { type: String, required: true },
  long_description: String,
  website_url: String,
  pricing: { type: String, enum: ['free', 'paid', 'freemium'], required: true },
  origin_country: String,
  is_nigerian: Boolean,
  saves_count: { type: Number, default: 0 },
  avg_rating: { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },
  roles: { type: [String], index: true },
  tasks: { type: [String], index: true },
  categories: [String],
  tags: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

ToolSchema.pre('save', function (next) {
  this.updated_at = new Date()
  next()
})

export const ToolModel = mongoose.models.Tool || mongoose.model<ITool>('Tool', ToolSchema)

