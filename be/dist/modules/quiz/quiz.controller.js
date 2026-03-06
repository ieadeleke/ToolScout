"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuiz = exports.getQuestions = void 0;
const zod_1 = require("zod");
const quiz_repository_1 = require("./quiz.repository");
const getQuestions = async (_req, res) => {
    const data = await quiz_repository_1.quizRepo.getQuestions();
    res.json({ data });
};
exports.getQuestions = getQuestions;
const submitSchema = zod_1.z.object({
    answers: zod_1.z.record(zod_1.z.any()),
});
const submitQuiz = async (req, res) => {
    const { answers } = submitSchema.parse(req.body);
    const userId = req.user?.sub || null;
    await quiz_repository_1.quizRepo.saveResponse(userId, answers);
    if (userId) {
        // naive seed extraction
        const role = answers['role'] || null;
        const task = answers['time_drain'] || null;
        await quiz_repository_1.quizRepo.saveSeeds(userId, role ? [role] : [], task ? [task] : []);
    }
    res.status(201).json({ ok: true });
};
exports.submitQuiz = submitQuiz;
