"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = require("express");
const tools_repository_1 = require("../tools/tools.repository");
exports.searchRouter = (0, express_1.Router)();
exports.searchRouter.get('/suggestions', async (req, res) => {
    const q = String(req.query.q || '').toLowerCase();
    if (!q)
        return res.json({ suggestions: [] });
    const { data } = await tools_repository_1.toolsRepo.list({ q, limit: 10 });
    const suggestions = data.map((t) => ({ id: String(t._id || t.id), name: t.name, slug: t.slug }));
    res.json({ suggestions });
});
exports.searchRouter.get('/', async (req, res) => {
    const { role, task, pricing, rating_gte, page = '1', limit = '20', q } = req.query;
    const data = await tools_repository_1.toolsRepo.list({ role, task, pricing, rating_gte: Number(rating_gte), page: Number(page), limit: Number(limit), q });
    res.json(data);
});
