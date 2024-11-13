"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuthentication_1 = require("../middleware/verifyAuthentication");
const character_1 = require("../controllers/character");
const router = express_1.default.Router();
router.get('/search/:name', character_1.getCharacterByName);
router.post('/team', verifyAuthentication_1.verifyAuthentication, character_1.createTeamWithCharacters);
router.get('/teams', verifyAuthentication_1.verifyAuthentication, character_1.getUserTeams);
router.get('/:id', character_1.getCharacterById);
router.get('/', character_1.getAllCharacters);
exports.default = router;
