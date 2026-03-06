"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.app.get('/health', async (_req, res) => {
    const mongoose = await Promise.resolve().then(() => __importStar(require('mongoose')));
    const dbState = mongoose.connection.readyState;
    // 0=disconnected 1=connected 2=connecting 3=disconnecting
    const dbStatus = ['disconnected', 'connected', 'connecting', 'disconnecting'][dbState] ?? 'unknown';
    const ok = dbState === 1;
    res.status(ok ? 200 : 503).json({
        ok,
        status: ok ? 'healthy' : 'degraded',
        db: dbStatus,
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version ?? '0.1.0',
        env: process.env.NODE_ENV ?? 'development',
    });
});
exports.app.use('/api/v1', v1_1.v1Router);
exports.app.use(error_1.errorHandler);
