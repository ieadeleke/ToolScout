"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsService = void 0;
const tools_repository_1 = require("./tools.repository");
exports.toolsService = {
    async list(params) {
        return tools_repository_1.toolsRepo.list(params);
    },
    async trending() {
        return tools_repository_1.toolsRepo.trending();
    },
    async shelves() {
        const trending = await tools_repository_1.toolsRepo.trending();
        const designers = await tools_repository_1.toolsRepo.list({ role: 'designer', limit: 12 });
        const developers = await tools_repository_1.toolsRepo.list({ role: 'developer', limit: 12 });
        const marketers = await tools_repository_1.toolsRepo.list({ role: 'marketer', limit: 12 });
        const writers = await tools_repository_1.toolsRepo.list({ role: 'writer', limit: 12 });
        const writing = await tools_repository_1.toolsRepo.list({ task: 'writing', limit: 12 });
        const images = await tools_repository_1.toolsRepo.list({ task: 'images', limit: 12 });
        const summarize = await tools_repository_1.toolsRepo.list({ task: 'summarize', limit: 12 });
        const nigerian = await tools_repository_1.toolsRepo.list({ is_nigerian: true, limit: 12 });
        const freemium = await tools_repository_1.toolsRepo.list({ pricing: ['freemium'], limit: 12 });
        const free = await tools_repository_1.toolsRepo.list({ pricing: ['free'], limit: 12 });
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
        };
    },
    async getById(id) {
        const tool = await tools_repository_1.toolsRepo.getById(id);
        if (!tool)
            throw { status: 404, message: 'not_found' };
        return tool;
    },
    async similar(id) {
        return tools_repository_1.toolsRepo.similar(id);
    },
};
