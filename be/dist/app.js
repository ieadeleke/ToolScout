"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const error_1 = require("./middleware/error");
const v1_1 = require("./routes/v1");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
exports.app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
exports.app.use(express_1.default.json({ limit: '1mb' }));
exports.app.use((0, cookie_parser_1.default)());
const origins = (env_1.env.CLIENT_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
const corsOptions = {
    origin: origins.length > 1 ? origins : origins[0] || true,
    credentials: true,
};
exports.app.use((0, cors_1.default)(corsOptions));
// Generic rate limiter
exports.app.use((0, express_rate_limit_1.default)({ windowMs: 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
exports.app.get('/health', (_req, res) => res.json({ ok: true }));
exports.app.use('/api/v1', v1_1.v1Router);
exports.app.use(error_1.errorHandler);
