"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsRepo = void 0;
const tool_model_1 = require("../../models/tool.model");
const mongoose_1 = __importDefault(require("mongoose"));
async function ensureSeed() {
    const count = await tool_model_1.ToolModel.estimatedDocumentCount().exec();
    if (count > 0)
        return;
    const seed = [
        { name: 'WriteFlow', slug: 'writeflow', short_description: 'AI writing assistant for Nigerian professionals', pricing: 'freemium', origin_country: 'NG', is_nigerian: true, saves_count: 37, avg_rating: 4.4, rating_count: 12, roles: ['writer', 'marketer'], tasks: ['writing', 'summarize'], categories: ['productivity'], tags: ['copywriting'] },
        { name: 'DevSketch', slug: 'devsketch', short_description: 'Generate UI code from sketches', pricing: 'paid', origin_country: 'NG', is_nigerian: true, saves_count: 52, avg_rating: 4.6, rating_count: 21, roles: ['designer', 'developer'], tasks: ['images'], categories: ['design'], tags: ['ui', 'code'] },
        { name: 'MarketPulse AI', slug: 'marketpulse-ai', short_description: 'Summarize trends and generate briefs', pricing: 'freemium', origin_country: 'NG', is_nigerian: true, saves_count: 18, avg_rating: 4.0, rating_count: 7, roles: ['marketer'], tasks: ['summarize', 'writing'], categories: ['marketing'], tags: ['briefs'] },
    ];
    await tool_model_1.ToolModel.insertMany(seed);
}
exports.toolsRepo = {
    async list({ role, task, pricing, q, page = 1, limit = 20, rating_gte, is_nigerian }) {
        await ensureSeed();
        const filter = {};
        if (role)
            filter.roles = Array.isArray(role) ? { $in: role } : role;
        if (task)
            filter.tasks = Array.isArray(task) ? { $in: task } : task;
        if (pricing)
            filter.pricing = Array.isArray(pricing) ? { $in: pricing } : pricing;
        if (rating_gte)
            filter.avg_rating = { $gte: Number(rating_gte) };
        if (q)
            filter.$or = [{ name: { $regex: q, $options: 'i' } }, { short_description: { $regex: q, $options: 'i' } }];
        if (typeof is_nigerian !== 'undefined')
            filter.is_nigerian = Boolean(is_nigerian);
        const total = await tool_model_1.ToolModel.countDocuments(filter).exec();
        const data = await tool_model_1.ToolModel.find(filter).sort({ saves_count: -1 }).skip((page - 1) * limit).limit(limit).lean().exec();
        return { data, page, limit, total };
    },
    async trending() {
        await ensureSeed();
        const data = await tool_model_1.ToolModel.find({}).sort({ saves_count: -1 }).limit(20).lean().exec();
        return { data };
    },
    async getById(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            return null;
        return tool_model_1.ToolModel.findById(id).lean().exec();
    },
    async similar(id) {
        const target = await tool_model_1.ToolModel.findById(id).lean().exec();
        if (!target)
            return { data: [] };
        const data = await tool_model_1.ToolModel.find({ _id: { $ne: id }, $or: [{ roles: { $in: target.roles || [] } }, { tasks: { $in: target.tasks || [] } }] }).limit(8).lean().exec();
        return { data };
    },
    async incSaves(toolId, delta) {
        if (!mongoose_1.default.isValidObjectId(toolId))
            return;
        await tool_model_1.ToolModel.updateOne({ _id: toolId }, { $inc: { saves_count: delta } }).exec();
    },
    async recomputeRatings(toolId, avg, count) {
        await tool_model_1.ToolModel.updateOne({ _id: toolId }, { $set: { avg_rating: avg, rating_count: count } }).exec();
    }
};
