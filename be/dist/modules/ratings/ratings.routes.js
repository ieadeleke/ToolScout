"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingsRouter = void 0;
const express_1 = require("express");
const ratings_controller_1 = require("./ratings.controller");
const auth_1 = require("../../middleware/auth");
exports.ratingsRouter = (0, express_1.Router)();
exports.ratingsRouter.get('/tool/:id', ratings_controller_1.getRatings);
exports.ratingsRouter.post('/tool/:id', auth_1.requireAuth, ratings_controller_1.addRating);
