"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.me = exports.login = exports.register = void 0;
const zod_1 = require("zod");
const auth_service_1 = require("./auth.service");
const cookies_1 = require("../../config/cookies");
const registerSchema = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string().min(8), name: zod_1.z.string().min(2).optional() });
const loginSchema = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string().min(8) });
const register = async (req, res) => {
    const { email, password, name } = registerSchema.parse(req.body);
    const { access, refresh, user } = await auth_service_1.authService.register({ email, password, name });
    const id = String(user._id || user.id);
    const out = { id, email: user.email, name: user.name };
    res
        .cookie('tc_at', access, cookies_1.accessCookieOptions)
        .cookie('tc_rt', refresh, cookies_1.refreshCookieOptions)
        .status(201)
        .json({ user: out });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const { access, refresh, user } = await auth_service_1.authService.login({ email, password });
    const id = String(user._id || user.id);
    const out = { id, email: user.email, name: user.name };
    res
        .cookie('tc_at', access, cookies_1.accessCookieOptions)
        .cookie('tc_rt', refresh, cookies_1.refreshCookieOptions)
        .json({ user: out });
};
exports.login = login;
const me = async (req, res) => {
    const user = await auth_service_1.authService.getMe(req.user.sub);
    const id = String(user._id || user.id);
    const out = { id, email: user.email, name: user.name };
    res.json({ user: out });
};
exports.me = me;
const refresh = async (req, res) => {
    const rt = req.cookies?.['tc_rt'];
    const { access, refresh: newRefresh } = await auth_service_1.authService.refresh(rt);
    res
        .cookie('tc_at', access, cookies_1.accessCookieOptions)
        .cookie('tc_rt', newRefresh, cookies_1.refreshCookieOptions)
        .json({ ok: true });
};
exports.refresh = refresh;
const logout = async (_req, res) => {
    res.clearCookie('tc_at', cookies_1.accessCookieOptions).clearCookie('tc_rt', cookies_1.refreshCookieOptions).json({ ok: true });
};
exports.logout = logout;
