import mongoose from 'mongoose'
import { toolsRepo } from '../tools/tools.repository'
import { savesRepo } from './saves.repository'
import { ToolModel } from '../../models/tool.model'

export const savesService = {
  async list(userId: string) {
    const ids = await savesRepo.getForUser(userId)
    const objectIds = ids.filter((id) => mongoose.isValidObjectId(id)).map((id) => new mongoose.Types.ObjectId(id))
    const tools = await ToolModel.find({ _id: { $in: objectIds } }).lean().exec()
    return { data: tools }
  },
  async save(userId: string, toolId: string) {
    const tool = await toolsRepo.getById(toolId)
    if (!tool) throw { status: 404, message: 'tool_not_found' }
    await savesRepo.add(userId, toolId)
    await toolsRepo.incSaves(toolId, 1)
    return { ok: true }
  },
  async remove(userId: string, toolId: string) {
    await savesRepo.remove(userId, toolId)
    await toolsRepo.incSaves(toolId, -1)
    return { ok: true }
  },
}
