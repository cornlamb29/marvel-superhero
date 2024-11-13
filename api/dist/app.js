"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const characters_1 = __importDefault(require("./routes/characters"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.WEB_APP_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/characters', characters_1.default);
app.use('/api/users', users_1.default);
exports.default = app;
