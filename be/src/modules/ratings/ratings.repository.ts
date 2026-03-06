import mongoose from 'mongoose'
import { RatingModel } from '../../models/rating.model'
import { toolsRepo } from '../tools/tools.repository'

export const ratingsRepo = {
  async forTool(toolId: string) {
    if (!mongoose.isValidObjectId(toolId)) return []
    return RatingModel.find({ tool_id: toolId }).sort({ created_at: -1 }).lean().exec()
  },
  async add({ userId, toolId, score, text }: { userId: string; toolId: string; score: number; text?: string }) {
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(toolId)) throw { status: 400, message: 'invalid_id' }
    const exists = await RatingModel.findOne({ user_id: userId, tool_id: toolId }).lean().exec()
    if (exists) throw { status: 400, message: 'already_rated' }
    await RatingModel.create({ user_id: userId, tool_id: toolId, score, text })
    // recompute aggregates
    const all = await RatingModel.find({ tool_id: toolId }).lean().exec()
    const count = all.length
    const avg = count ? all.reduce((a, b) => a + b.score, 0) / count : 0
    await toolsRepo.recomputeRatings(toolId, Number(avg.toFixed(2)), count)
  },
}
