"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const mongoose_1 = require("./db/mongoose");
async function bootstrap() {
    await (0, mongoose_1.connectMongo)();
    app_1.app.listen(env_1.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`ToolScout API listening on http://localhost:${env_1.env.PORT}`);
    });
}
bootstrap().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
});
