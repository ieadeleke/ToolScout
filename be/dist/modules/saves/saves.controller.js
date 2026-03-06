"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSave = exports.addSave = exports.getSaves = void 0;
const zod_1 = require("zod");
const saves_service_1 = require("./saves.service");
const getSaves = async (req, res) => {
    const userId = req.user.sub;
    const data = await saves_service_1.savesService.list(userId);
    res.json(data);
};
exports.getSaves = getSaves;
const saveSchema = zod_1.z.object({ toolId: zod_1.z.string().min(1) });
const addSave = async (req, res) => {
    const { toolId } = saveSchema.parse(req.body);
    const userId = req.user.sub;
    await saves_service_1.savesService.save(userId, toolId);
    res.status(201).json({ ok: true });
};
exports.addSave = addSave;
const removeSave = async (req, res) => {
    const userId = req.user.sub;
    await saves_service_1.savesService.remove(userId, String(req.params.toolId));
    res.json({ ok: true });
};
exports.removeSave = removeSave;
