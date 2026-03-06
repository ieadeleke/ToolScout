"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({ error: 'invalid_request', details: err?.errors });
    }
};
exports.validateBody = validateBody;
