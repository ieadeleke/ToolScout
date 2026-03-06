import mongoose from 'mongoose'
import { SaveModel } from '../../models/save.model'

export const savesRepo = {
  async getForUser(userId: string) {
    if (!mongoose.isValidObjectId(userId)) return []
    const rows = await SaveModel.find({ user_id: userId }).lean().exec()
    return rows.map((r) => String(r.tool_id))
  },
  async add(userId: string, toolId: string) {
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(toolId)) throw { status: 400, message: 'invalid_id' }
    await SaveModel.updateOne({ user_id: userId, tool_id: toolId }, { $setOnInsert: { created_at: new Date() } }, { upsert: true }).exec()
  },
  async remove(userId: string, toolId: string) {
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(toolId)) throw { status: 400, message: 'invalid_id' }
    await SaveModel.deleteOne({ user_id: userId, tool_id: toolId }).exec()
  },
}
