"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRepo = void 0;
const questions = [
    {
        id: 'q1',
        key: 'role',
        text: 'What best describes your role?',
        order: 1,
        options: [
            { id: 'r1', key: 'designer', text: 'Designer' },
            { id: 'r2', key: 'developer', text: 'Developer' },
            { id: 'r3', key: 'marketer', text: 'Marketer' },
            { id: 'r4', key: 'writer', text: 'Writer' },
        ],
    },
    {
        id: 'q2',
        key: 'time_drain',
        text: 'What is your biggest time drain?',
        order: 2,
        options: [
            { id: 't1', key: 'writing', text: 'Writing long content' },
            { id: 't2', key: 'images', text: 'Creating images' },
            { id: 't3', key: 'summarize', text: 'Summarizing documents' },
            { id: 't4', key: 'code', text: 'Coding boilerplate' },
        ],
    },
    {
        id: 'q3',
        key: 'used_tools',
        text: 'Which tools do you already use?',
        order: 3,
        options: [
            { id: 'u1', key: 'chatgpt', text: 'ChatGPT' },
            { id: 'u2', key: 'midjourney', text: 'Midjourney' },
            { id: 'u3', key: 'notion-ai', text: 'Notion AI' },
        ],
    },
];
const recoSeed_model_1 = require("../../models/recoSeed.model");
const responses = new Map(); // userId -> answers (optional persistence for MVP)
exports.quizRepo = {
    async getQuestions() {
        return questions;
    },
    async saveResponse(userId, answers) {
        if (userId)
            responses.set(userId, { answers, created_at: new Date() });
    },
    async saveSeeds(userId, roles, tasks) {
        await recoSeed_model_1.RecoSeedModel.updateOne({ user_id: userId }, { $set: { roles, tasks, updated_at: new Date() } }, { upsert: true }).exec();
    },
    async getSeeds(userId) {
        const doc = await recoSeed_model_1.RecoSeedModel.findOne({ user_id: userId }).lean().exec();
        if (!doc)
            return null;
        return { roles: doc.roles || [], tasks: doc.tasks || [], updated_at: doc.updated_at };
    },
};
