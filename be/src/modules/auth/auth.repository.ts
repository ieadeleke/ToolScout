import { UserModel } from '../../models/user.model'
import mongoose from 'mongoose'

export const usersRepo = {
  async findByEmail(email: string) {
    return UserModel.findOne({ email }).lean().exec()
  },
  async findById(id: string) {
    if (!mongoose.isValidObjectId(id)) return null
    return UserModel.findById(id).lean().exec()
  },
  async create({ email, password_hash, name }: { email: string; password_hash: string; name: string }) {
    const doc = await UserModel.create({ email, password_hash, name })
    return doc.toObject()
  },
  async bumpRefreshVersion(id: string) {
    await UserModel.updateOne({ _id: id }, { $inc: { refresh_version: 1 } }).exec()
  },
}
