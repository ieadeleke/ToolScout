import mongoose, { Schema } from 'mongoose'

export interface ISave {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  tool_id: mongoose.Types.ObjectId
  created_at: Date
}

const SaveSchema = new Schema<ISave>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  tool_id: { type: Schema.Types.ObjectId, ref: 'Tool', required: true, index: true },
  created_at: { type: Date, default: Date.now },
})

SaveSchema.index({ user_id: 1, tool_id: 1 }, { unique: true })

export const SaveModel = mongoose.models.Save || mongoose.model<ISave>('Save', SaveSchema)

