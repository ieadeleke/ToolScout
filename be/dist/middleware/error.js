"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    const status = err?.status || 500;
    const message = status === 500 ? 'internal_error' : err?.message || 'error';
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error('[error]', err);
    }
    res.status(status).json({ error: message });
};
exports.errorHandler = errorHandler;
