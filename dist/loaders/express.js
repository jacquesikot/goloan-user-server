"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("../api"));
const logger_1 = __importDefault(require("../utils/logger"));
exports.default = ({ app }) => {
    app.get('/status', (_req, res) => {
        res.status(200).end();
    });
    app.head('/status', (_req, res) => {
        res.status(200).end();
    });
    app.use(cors_1.default());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.use('/', api_1.default());
    app.use((err, _req, res, _next) => {
        res.status(500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
    process.on('uncaughtException', (exception) => {
        logger_1.default.error(exception);
        process.exit(1);
    });
    process.on('unhandledRejection', (exception) => {
        logger_1.default.error(exception);
        process.exit(1);
    });
};
//# sourceMappingURL=express.js.map