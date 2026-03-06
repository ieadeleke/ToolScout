"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationsService = void 0;
const quiz_repository_1 = require("../quiz/quiz.repository");
const tools_repository_1 = require("../tools/tools.repository");
exports.recommendationsService = {
    async home(userId) {
        const seeds = await quiz_repository_1.quizRepo.getSeeds(userId);
        if (!seeds) {
            // fallback to trending
            const trending = await tools_repository_1.toolsRepo.trending();
            return { data: { trending: trending.data, personalized: [] } };
        }
        // naive: list by first role/task seed
        const role = seeds.roles?.[0];
        const task = seeds.tasks?.[0];
        const roleShelf = role ? (await tools_repository_1.toolsRepo.list({ role, limit: 12 })).data : [];
        const taskShelf = task ? (await tools_repository_1.toolsRepo.list({ task, limit: 12 })).data : [];
        return { data: { role, task, roleShelf, taskShelf } };
    },
};
