"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = require("express");
const quiz_controller_1 = require("./quiz.controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.quizRouter = (0, express_1.Router)();
const quizLimiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, limit: 30 });
exports.quizRouter.get('/questions', quiz_controller_1.getQuestions);
// allow both anon and authed; if authed we save seeds
exports.quizRouter.post('/submit', quizLimiter, quiz_controller_1.submitQuiz);
