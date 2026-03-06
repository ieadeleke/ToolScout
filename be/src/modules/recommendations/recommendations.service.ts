import { quizRepo } from '../quiz/quiz.repository'
import { toolsRepo } from '../tools/tools.repository'

export const recommendationsService = {
  async home(userId: string) {
    const seeds = await quizRepo.getSeeds(userId)
    if (!seeds) {
      // fallback to trending
      const trending = await toolsRepo.trending()
      return { data: { trending: trending.data, personalized: [] as any[] } }
    }
    // naive: list by first role/task seed
    const role = seeds.roles?.[0]
    const task = seeds.tasks?.[0]
    const roleShelf = role ? (await toolsRepo.list({ role, limit: 12 })).data : []
    const taskShelf = task ? (await toolsRepo.list({ task, limit: 12 })).data : []
    return { data: { role, task, roleShelf, taskShelf } }
  },
}
