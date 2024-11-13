"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthentication = void 0;
const auth_1 = require("../utils/auth");
const verifyAuthentication = (req, res, next) => {
    const user = (0, auth_1.getUserFromRequest)(req);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    req.user = user;
    next();
};
exports.verifyAuthentication = verifyAuthentication;
