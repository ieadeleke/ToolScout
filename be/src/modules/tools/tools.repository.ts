import { ToolModel, type ITool } from '../../models/tool.model'
import mongoose from 'mongoose'

async function ensureSeed() {
  const count = await ToolModel.estimatedDocumentCount().exec()
  if (count > 0) return
  const seed: Partial<ITool>[] = [
    { name: 'WriteFlow', slug: 'writeflow', short_description: 'AI writing assistant for Nigerian professionals', pricing: 'freemium', origin_country: 'NG', is_nigerian: true, saves_count: 37, avg_rating: 4.4, rating_count: 12, roles: ['writer', 'marketer'], tasks: ['writing', 'summarize'], categories: ['productivity'], tags: ['copywriting'] },
    { name: 'DevSketch', slug: 'devsketch', short_description: 'Generate UI code from sketches', pricing: 'paid', origin_country: 'NG', is_nigerian: true, saves_count: 52, avg_rating: 4.6, rating_count: 21, roles: ['designer', 'developer'], tasks: ['images'], categories: ['design'], tags: ['ui','code'] },
    { name: 'MarketPulse AI', slug: 'marketpulse-ai', short_description: 'Summarize trends and generate briefs', pricing: 'freemium', origin_country: 'NG', is_nigerian: true, saves_count: 18, avg_rating: 4.0, rating_count: 7, roles: ['marketer'], tasks: ['summarize','writing'], categories: ['marketing'], tags: ['briefs'] },
  ]
  await ToolModel.insertMany(seed)
}

export const toolsRepo = {
  async list({ role, task, pricing, q, page = 1, limit = 20, rating_gte, is_nigerian }: any) {
    await ensureSeed()
    const filter: any = {}
    if (role) filter.roles = Array.isArray(role) ? { $in: role } : role
    if (task) filter.tasks = Array.isArray(task) ? { $in: task } : task
    if (pricing) filter.pricing = Array.isArray(pricing) ? { $in: pricing } : pricing
    if (rating_gte) filter.avg_rating = { $gte: Number(rating_gte) }
    if (q) filter.$or = [ { name: { $regex: q, $options: 'i' } }, { short_description: { $regex: q, $options: 'i' } } ]
    if (typeof is_nigerian !== 'undefined') filter.is_nigerian = Boolean(is_nigerian)
    const total = await ToolModel.countDocuments(filter).exec()
    const data = await ToolModel.find(filter).sort({ saves_count: -1 }).skip((page - 1) * limit).limit(limit).lean().exec()
    return { data, page, limit, total }
  },
  async trending() {
    await ensureSeed()
    const data = await ToolModel.find({}).sort({ saves_count: -1 }).limit(20).lean().exec()
    return { data }
  },
  async getById(id: string) {
    if (!mongoose.isValidObjectId(id)) return null
    return ToolModel.findById(id).lean().exec()
  },
  async similar(id: string) {
    const target: any = await ToolModel.findById(id).lean().exec()
    if (!target) return { data: [] as ITool[] }
    const data = await ToolModel.find({ _id: { $ne: id }, $or: [ { roles: { $in: target.roles || [] } }, { tasks: { $in: target.tasks || [] } } ] }).limit(8).lean().exec()
    return { data }
  },
  async incSaves(toolId: string, delta: number) {
    if (!mongoose.isValidObjectId(toolId)) return
    await ToolModel.updateOne({ _id: toolId }, { $inc: { saves_count: delta } }).exec()
  },
  async recomputeRatings(toolId: string, avg: number, count: number) {
    await ToolModel.updateOne({ _id: toolId }, { $set: { avg_rating: avg, rating_count: count } }).exec()
  }
}
