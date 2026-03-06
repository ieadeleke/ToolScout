import mongoose, { Schema } from 'mongoose'

export interface IUser {
  _id: mongoose.Types.ObjectId
  email: string
  name: string
  password_hash: string
  refresh_version: number
  created_at: Date
  updated_at: Date
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, index: true },
  name: { type: String, required: true },
  password_hash: { type: String, required: true },
  refresh_version: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})

UserSchema.pre('save', function (next) {
  this.updated_at = new Date()
  next()
})

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

