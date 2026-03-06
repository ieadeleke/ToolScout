"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRepo = void 0;
const user_model_1 = require("../../models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
exports.usersRepo = {
    async findByEmail(email) {
        return user_model_1.UserModel.findOne({ email }).lean().exec();
    },
    async findById(id) {
        if (!mongoose_1.default.isValidObjectId(id))
            return null;
        return user_model_1.UserModel.findById(id).lean().exec();
    },
    async create({ email, password_hash, name }) {
        const doc = await user_model_1.UserModel.create({ email, password_hash, name });
        return doc.toObject();
    },
    async bumpRefreshVersion(id) {
        await user_model_1.UserModel.updateOne({ _id: id }, { $inc: { refresh_version: 1 } }).exec();
    },
};
