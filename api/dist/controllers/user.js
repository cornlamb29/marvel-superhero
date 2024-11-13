"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const models_1 = __importDefault(require("../models"));
const auth_1 = require("../utils/auth");
const User = models_1.default.User;
/**
 * Controller to signup a user
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        // Set the auth cookie after successful signup
        (0, auth_1.setAuthCookie)(res, { id: user.getDataValue('id'), email: user.getDataValue('email') });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.signup = signup;
/**
 * Controller to login a user
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (!(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        (0, auth_1.setAuthCookie)(res, { id: user.id, email: user.email });
        res.status(200).json({ message: 'User logged in successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.login = login;
