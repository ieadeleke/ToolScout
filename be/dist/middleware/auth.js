"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, res, next) => {
    const token = req.cookies?.['tc_at'];
    if (!token)
        return res.status(401).json({ error: 'unauthorized' });
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = payload;
        return next();
    }
    catch {
        return res.status(401).json({ error: 'unauthorized' });
    }
};
exports.requireAuth = requireAuth;
