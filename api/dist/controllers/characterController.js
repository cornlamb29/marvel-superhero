"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharacterById = exports.getAllCharacters = void 0;
const models_1 = __importDefault(require("../models"));
const MarvelCharacter = models_1.default.MarvelCharacter;
/**
 * Controller to get all characters
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const getAllCharacters = async (req, res) => {
    try {
        const characters = await MarvelCharacter.findAll();
        res.status(200).json(characters);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving characters', error });
    }
};
exports.getAllCharacters = getAllCharacters;
/**
 * Controller to get a character by id
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const getCharacterById = async (req, res) => {
    try {
        const character = await MarvelCharacter.findByPk(req.params.id);
        if (character) {
            res.status(200).json(character);
        }
        else {
            res.status(404).json({ message: 'Character not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving character', error });
    }
};
exports.getCharacterById = getCharacterById;
