"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/', route);
    route.get('/', (_req, res) => {
        return res.send('User Service').status(200);
    });
};
//# sourceMappingURL=home.js.map