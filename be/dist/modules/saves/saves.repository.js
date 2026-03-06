"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savesRepo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const save_model_1 = require("../../models/save.model");
exports.savesRepo = {
    async getForUser(userId) {
        if (!mongoose_1.default.isValidObjectId(userId))
            return [];
        const rows = await save_model_1.SaveModel.find({ user_id: userId }).lean().exec();
        return rows.map((r) => String(r.tool_id));
    },
    async add(userId, toolId) {
        if (!mongoose_1.default.isValidObjectId(userId) || !mongoose_1.default.isValidObjectId(toolId))
            throw { status: 400, message: 'invalid_id' };
        await save_model_1.SaveModel.updateOne({ user_id: userId, tool_id: toolId }, { $setOnInsert: { created_at: new Date() } }, { upsert: true }).exec();
    },
    async remove(userId, toolId) {
        if (!mongoose_1.default.isValidObjectId(userId) || !mongoose_1.default.isValidObjectId(toolId))
            throw { status: 400, message: 'invalid_id' };
        await save_model_1.SaveModel.deleteOne({ user_id: userId, tool_id: toolId }).exec();
    },
};
