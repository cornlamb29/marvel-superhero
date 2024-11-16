"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookie = exports.getUserFromRequest = exports.verifyToken = exports.setAuthCookie = exports.createUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'corn';
const COOKIE_NAME = 'auth';
const createUserToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
};
exports.createUserToken = createUserToken;
const setAuthCookie = (res, user) => {
    const token = (0, exports.createUserToken)(user);
    const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:5173';
    const domain = new URL(webAppUrl).hostname;
    res.cookie(COOKIE_NAME, token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        domain
    });
};
exports.setAuthCookie = setAuthCookie;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const getUserFromRequest = (req) => {
    try {
        const token = req.cookies[COOKIE_NAME];
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
};
exports.getUserFromRequest = getUserFromRequest;
const clearAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME);
};
exports.clearAuthCookie = clearAuthCookie;
