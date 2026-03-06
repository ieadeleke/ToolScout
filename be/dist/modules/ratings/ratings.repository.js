"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsRepo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rating_model_1 = require("../../models/rating.model");
const tools_repository_1 = require("../tools/tools.repository");
exports.ratingsRepo = {
    async forTool(toolId) {
        if (!mongoose_1.default.isValidObjectId(toolId))
            return [];
        return rating_model_1.RatingModel.find({ tool_id: toolId }).sort({ created_at: -1 }).lean().exec();
    },
    async add({ userId, toolId, score, text }) {
        if (!mongoose_1.default.isValidObjectId(userId) || !mongoose_1.default.isValidObjectId(toolId))
            throw { status: 400, message: 'invalid_id' };
        const exists = await rating_model_1.RatingModel.findOne({ user_id: userId, tool_id: toolId }).lean().exec();
        if (exists)
            throw { status: 400, message: 'already_rated' };
        await rating_model_1.RatingModel.create({ user_id: userId, tool_id: toolId, score, text });
        // recompute aggregates
        const all = await rating_model_1.RatingModel.find({ tool_id: toolId }).lean().exec();
        const count = all.length;
        const avg = count ? all.reduce((a, b) => a + b.score, 0) / count : 0;
        await tools_repository_1.toolsRepo.recomputeRatings(toolId, Number(avg.toFixed(2)), count);
    },
};
