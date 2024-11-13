"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const characterController_1 = require("../controllers/characterController");
const router = express_1.default.Router();
router.get('/', characterController_1.getAllCharacters);
router.get('/:id', characterController_1.getCharacterById);
exports.default = router;
