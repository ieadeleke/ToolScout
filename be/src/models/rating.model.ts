import mongoose, { Schema } from 'mongoose'

export interface IRating {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  tool_id: mongoose.Types.ObjectId
  score: number
  text?: string
  created_at: Date
}

const RatingSchema = new Schema<IRating>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tool_id: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true },
  score: { type: Number, min: 1, max: 5, required: true },
  text: { type: String },
  created_at: { type: Date, default: Date.now },
})

RatingSchema.index({ user_id: 1, tool_id: 1 }, { unique: true })

export const RatingModel = mongoose.models.Rating || mongoose.model<IRating>('Rating', RatingSchema)

