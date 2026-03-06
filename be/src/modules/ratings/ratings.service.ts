import { toolsRepo } from '../tools/tools.repository'
import { ratingsRepo } from './ratings.repository'

export const ratingsService = {
  async list(toolId: string) {
    const tool = await toolsRepo.getById(toolId)
    if (!tool) throw { status: 404, message: 'tool_not_found' }
    const data = await ratingsRepo.forTool(toolId)
    return { data }
  },
  async add(userId: string, toolId: string, score: number, text?: string) {
    if (score < 1 || score > 5) throw { status: 400, message: 'invalid_score' }
    const tool = await toolsRepo.getById(toolId)
    if (!tool) throw { status: 404, message: 'tool_not_found' }
    await ratingsRepo.add({ userId, toolId, score, text })
    return { ok: true }
  },
}
