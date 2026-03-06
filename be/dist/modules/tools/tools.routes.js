"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolsRouter = void 0;
const express_1 = require("express");
const tools_controller_1 = require("./tools.controller");
const ratings_controller_1 = require("../ratings/ratings.controller");
const auth_1 = require("../../middleware/auth");
exports.toolsRouter = (0, express_1.Router)();
exports.toolsRouter.get('/', tools_controller_1.listTools);
exports.toolsRouter.get('/trending', tools_controller_1.getTrending);
exports.toolsRouter.get('/shelves', tools_controller_1.getShelves);
exports.toolsRouter.get('/:id', tools_controller_1.getTool);
exports.toolsRouter.get('/:id/similar', tools_controller_1.getSimilar);
// ratings nested under tool per spec
exports.toolsRouter.get('/:id/ratings', ratings_controller_1.getRatings);
exports.toolsRouter.post('/:id/ratings', auth_1.requireAuth, ratings_controller_1.addRating);
