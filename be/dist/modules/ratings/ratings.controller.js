"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRating = exports.getRatings = void 0;
const zod_1 = require("zod");
const ratings_service_1 = require("./ratings.service");
const getRatings = async (req, res) => {
    const data = await ratings_service_1.ratingsService.list(String(req.params.id));
    res.json(data);
};
exports.getRatings = getRatings;
const rateSchema = zod_1.z.object({ score: zod_1.z.number().min(1).max(5), text: zod_1.z.string().max(1000).optional() });
const addRating = async (req, res) => {
    const { score, text } = rateSchema.parse(req.body);
    const userId = req.user.sub;
    await ratings_service_1.ratingsService.add(userId, String(req.params.id), score, text);
    res.status(201).json({ ok: true });
};
exports.addRating = addRating;
