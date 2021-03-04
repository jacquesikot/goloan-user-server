"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("./routes");
exports.default = () => {
    const app = express_1.Router();
    routes_1.home(app);
    return app;
};
//# sourceMappingURL=index.js.map