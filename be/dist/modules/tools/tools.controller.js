"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimilar = exports.getTool = exports.getShelves = exports.getTrending = exports.listTools = void 0;
const tools_service_1 = require("./tools.service");
const listTools = async (req, res) => {
    const { rating_gte, page = '1', limit = '20', q, is_nigerian } = req.query;
    const role = req.query.role;
    const task = req.query.task;
    const pricing = req.query.pricing;
    const toArray = (v) => (Array.isArray(v) ? v : (typeof v === 'string' && v.includes(',') ? v.split(',') : v));
    const data = await tools_service_1.toolsService.list({
        role: toArray(role),
        task: toArray(task),
        pricing: toArray(pricing),
        is_nigerian: typeof is_nigerian !== 'undefined' ? is_nigerian === 'true' || is_nigerian === true : undefined,
        rating_gte: rating_gte ? Number(rating_gte) : undefined,
        page: Number(page),
        limit: Number(limit),
        q,
    });
    res.json(data);
};
exports.listTools = listTools;
const getTrending = async (_req, res) => {
    const data = await tools_service_1.toolsService.trending();
    res.json(data);
};
exports.getTrending = getTrending;
const getShelves = async (_req, res) => {
    const data = await tools_service_1.toolsService.shelves();
    res.json({ data });
};
exports.getShelves = getShelves;
const getTool = async (req, res) => {
    const tool = await tools_service_1.toolsService.getById(String(req.params.id));
    res.json(tool);
};
exports.getTool = getTool;
const getSimilar = async (req, res) => {
    const data = await tools_service_1.toolsService.similar(String(req.params.id));
    res.json(data);
};
exports.getSimilar = getSimilar;
