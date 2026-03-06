"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tool_model_js_1 = require("./models/tool.model.js");
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/toolscout';
// Google's favicon service is free, requires no auth, and works for any domain.
// sz=256 gives a high-res icon that looks great at small display sizes.
function gfavicon(domain) {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
}
const logos = {
    'ChatGPT': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
    'DALL·E 3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
    'Whisper': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png',
    'GitHub Copilot': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    'Midjourney': gfavicon('midjourney.com'),
    'Notion AI': gfavicon('notion.so'),
    'Runway': gfavicon('runwayml.com'),
    'Jasper': gfavicon('jasper.ai'),
    'Perplexity AI': gfavicon('perplexity.ai'),
    'ElevenLabs': gfavicon('elevenlabs.io'),
    'Cursor': gfavicon('cursor.com'),
    'Grammarly': gfavicon('grammarly.com'),
    'Stable Diffusion': gfavicon('stability.ai'),
    'Claude': gfavicon('anthropic.com'),
    'Luma AI': gfavicon('lumalabs.ai'),
    'Descript': gfavicon('descript.com'),
    'Framer AI': gfavicon('framer.com'),
    'Otter.ai': gfavicon('otter.ai'),
    'Pika': gfavicon('pika.art'),
    'Copy.ai': gfavicon('copy.ai'),
};
async function run() {
    console.log('Connecting…');
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected.');
    for (const [name, logo_url] of Object.entries(logos)) {
        const result = await tool_model_js_1.ToolModel.updateOne({ name }, { $set: { logo_url } });
        console.log(`  ${result.modifiedCount ? 'UPDATED' : 'NOT FOUND'} ${name}`);
    }
    console.log('\nDone.');
    await mongoose_1.default.disconnect();
}
run().catch((err) => { console.error(err); process.exit(1); });
