"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middleware/auth");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authLimiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, limit: 20 });
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/register', authLimiter, auth_controller_1.register);
exports.authRouter.post('/login', authLimiter, auth_controller_1.login);
exports.authRouter.post('/logout', auth_controller_1.logout);
exports.authRouter.post('/refresh', auth_controller_1.refresh);
exports.authRouter.get('/me', auth_1.requireAuth, auth_controller_1.me);
