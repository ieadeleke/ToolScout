import mongoose, { Schema } from 'mongoose'

export interface IRecoSeed {
  _id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  roles: string[]
  tasks: string[]
  updated_at: Date
}

const RecoSeedSchema = new Schema<IRecoSeed>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  roles: [String],
  tasks: [String],
  updated_at: { type: Date, default: Date.now },
})

export const RecoSeedModel = mongoose.models.RecoSeed || mongoose.model<IRecoSeed>('RecoSeed', RecoSeedSchema)

