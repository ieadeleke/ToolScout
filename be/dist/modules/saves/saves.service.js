"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tools_repository_1 = require("../tools/tools.repository");
const saves_repository_1 = require("./saves.repository");
const tool_model_1 = require("../../models/tool.model");
exports.savesService = {
    async list(userId) {
        const ids = await saves_repository_1.savesRepo.getForUser(userId);
        const objectIds = ids.filter((id) => mongoose_1.default.isValidObjectId(id)).map((id) => new mongoose_1.default.Types.ObjectId(id));
        const tools = await tool_model_1.ToolModel.find({ _id: { $in: objectIds } }).lean().exec();
        return { data: tools };
    },
    async save(userId, toolId) {
        const tool = await tools_repository_1.toolsRepo.getById(toolId);
        if (!tool)
            throw { status: 404, message: 'tool_not_found' };
        await saves_repository_1.savesRepo.add(userId, toolId);
        await tools_repository_1.toolsRepo.incSaves(toolId, 1);
        return { ok: true };
    },
    async remove(userId, toolId) {
        await saves_repository_1.savesRepo.remove(userId, toolId);
        await tools_repository_1.toolsRepo.incSaves(toolId, -1);
        return { ok: true };
    },
};
