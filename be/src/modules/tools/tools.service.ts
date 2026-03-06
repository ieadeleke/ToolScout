import { toolsRepo } from './tools.repository'

export const toolsService = {
  async list(params: any) {
    return toolsRepo.list(params)
  },
  async trending() {
    return toolsRepo.trending()
  },
  async shelves() {
    const trending = await toolsRepo.trending()
    const designers = await toolsRepo.list({ role: 'designer', limit: 12 })
    const developers = await toolsRepo.list({ role: 'developer', limit: 12 })
    const marketers = await toolsRepo.list({ role: 'marketer', limit: 12 })
    const writers = await toolsRepo.list({ role: 'writer', limit: 12 })
    const writing = await toolsRepo.list({ task: 'writing', limit: 12 })
    const images = await toolsRepo.list({ task: 'images', limit: 12 })
    const summarize = await toolsRepo.list({ task: 'summarize', limit: 12 })
    const nigerian = await toolsRepo.list({ is_nigerian: true, limit: 12 })
    const freemium = await toolsRepo.list({ pricing: ['freemium'], limit: 12 })
    const free = await toolsRepo.list({ pricing: ['free'], limit: 12 })
    return {
      trending: trending.data,
      roles: [
        { key: 'designer', title: 'Best for Designers', data: designers.data },
        { key: 'developer', title: 'Built for Developers', data: developers.data },
        { key: 'marketer', title: 'Marketers Love This', data: marketers.data },
        { key: 'writer', title: 'For Writers', data: writers.data },
      ],
      tasks: [
        { key: 'writing', title: 'Great for Writing Faster', data: writing.data },
        { key: 'images', title: 'Auto-generate Images', data: images.data },
        { key: 'summarize', title: 'Summarise Anything', data: summarize.data },
      ],
      curated: [
        { key: 'nigerian', title: 'Nigerian Spotlight', data: nigerian.data },
        { key: 'freemium', title: 'Freemium Picks', data: freemium.data },
        { key: 'free', title: 'Always Free', data: free.data },
      ],
    }
  },
  async getById(id: string) {
    const tool = await toolsRepo.getById(id)
    if (!tool) throw { status: 404, message: 'not_found' }
    return tool
  },
  async similar(id: string) {
    return toolsRepo.similar(id)
  },
}
