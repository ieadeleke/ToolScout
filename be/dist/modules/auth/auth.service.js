"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const auth_repository_1 = require("./auth.repository");
exports.authService = {
    async register({ email, password, name }) {
        const existing = await auth_repository_1.usersRepo.findByEmail(email);
        if (existing)
            throw { status: 409, message: 'email_taken' };
        const password_hash = await bcryptjs_1.default.hash(password, 10);
        const user = await auth_repository_1.usersRepo.create({ email, password_hash, name: name || email.split('@')[0] });
        const payload = { sub: String(user._id || user.id), email: user.email };
        return { access: (0, jwt_1.signAccessToken)(payload), refresh: (0, jwt_1.signRefreshToken)(payload), user };
    },
    async login({ email, password }) {
        const user = await auth_repository_1.usersRepo.findByEmail(email);
        if (!user)
            throw { status: 401, message: 'invalid_credentials' };
        const ok = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!ok)
            throw { status: 401, message: 'invalid_credentials' };
        const payload = { sub: String(user._id || user.id), email: user.email };
        return { access: (0, jwt_1.signAccessToken)(payload), refresh: (0, jwt_1.signRefreshToken)(payload), user };
    },
    async getMe(userId) {
        const user = await auth_repository_1.usersRepo.findById(userId);
        if (!user)
            throw { status: 404, message: 'not_found' };
        return user;
    },
    async refresh(rt) {
        if (!rt)
            throw { status: 401, message: 'unauthorized' };
        const payload = (0, jwt_1.verifyToken)(rt);
        const user = await auth_repository_1.usersRepo.findById(payload.sub);
        if (!user)
            throw { status: 401, message: 'unauthorized' };
        const newPayload = { sub: String(user._id || user.id), email: user.email };
        return { access: (0, jwt_1.signAccessToken)(newPayload), refresh: (0, jwt_1.signRefreshToken)(newPayload) };
    },
};
