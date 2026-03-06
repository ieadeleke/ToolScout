"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savesRouter = void 0;
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = require("../../middleware/auth");
const saves_controller_1 = require("./saves.controller");
const savesLimiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, limit: 60 });
exports.savesRouter = (0, express_1.Router)();
// All saves endpoints require auth
exports.savesRouter.use(auth_1.requireAuth);
exports.savesRouter.get('/', saves_controller_1.getSaves);
exports.savesRouter.post('/', savesLimiter, saves_controller_1.addSave);
exports.savesRouter.delete('/:toolId', saves_controller_1.removeSave);
