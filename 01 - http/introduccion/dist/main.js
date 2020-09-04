"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require('cookie-parser');
const express = require('express');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser('mySecret'));
    await app.listen(3001);
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
}
bootstrap();
//# sourceMappingURL=main.js.map