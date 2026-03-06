"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCookieOptions = exports.accessCookieOptions = void 0;
const env_1 = require("./env");
const sameSite = env_1.env.COOKIE_SAMESITE;
exports.accessCookieOptions = {
    httpOnly: true,
    secure: env_1.env.SECURE_COOKIES || sameSite === 'none',
    sameSite,
    path: '/',
    domain: env_1.env.COOKIE_DOMAIN,
};
exports.refreshCookieOptions = {
    ...exports.accessCookieOptions,
    path: '/api/v1/auth',
};
