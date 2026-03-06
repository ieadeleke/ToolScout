"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationsRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const recommendations_service_1 = require("./recommendations.service");
exports.recommendationsRouter = (0, express_1.Router)();
exports.recommendationsRouter.get('/home', auth_1.requireAuth, async (req, res) => {
    const userId = req.user.sub;
    const data = await recommendations_service_1.recommendationsService.home(userId);
    res.json(data);
});
