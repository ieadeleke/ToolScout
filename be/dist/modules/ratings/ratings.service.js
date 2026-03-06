"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsService = void 0;
const tools_repository_1 = require("../tools/tools.repository");
const ratings_repository_1 = require("./ratings.repository");
exports.ratingsService = {
    async list(toolId) {
        const tool = await tools_repository_1.toolsRepo.getById(toolId);
        if (!tool)
            throw { status: 404, message: 'tool_not_found' };
        const data = await ratings_repository_1.ratingsRepo.forTool(toolId);
        return { data };
    },
    async add(userId, toolId, score, text) {
        if (score < 1 || score > 5)
            throw { status: 400, message: 'invalid_score' };
        const tool = await tools_repository_1.toolsRepo.getById(toolId);
        if (!tool)
            throw { status: 404, message: 'tool_not_found' };
        await ratings_repository_1.ratingsRepo.add({ userId, toolId, score, text });
        return { ok: true };
    },
};
