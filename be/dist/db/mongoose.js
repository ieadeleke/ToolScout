"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = connectMongo;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
async function connectMongo() {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/toolscout';
    if (mongoose_1.default.connection.readyState === 1)
        return mongoose_1.default.connection;
    await mongoose_1.default.connect(uri, {
        autoIndex: env_1.env.NODE_ENV !== 'production',
    });
    return mongoose_1.default.connection;
}
