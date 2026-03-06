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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ToolSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo_url: String,
    short_description: { type: String, required: true },
    long_description: String,
    website_url: String,
    pricing: { type: String, enum: ['free', 'paid', 'freemium'], required: true },
    origin_country: String,
    is_nigerian: Boolean,
    saves_count: { type: Number, default: 0 },
    avg_rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    roles: { type: [String], index: true },
    tasks: { type: [String], index: true },
    categories: [String],
    tags: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
ToolSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});
exports.ToolModel = mongoose_1.default.models.Tool || mongoose_1.default.model('Tool', ToolSchema);
