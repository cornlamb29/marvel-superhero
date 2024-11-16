"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTeams = exports.createTeamWithCharacters = exports.getCharacterByName = exports.getCharacterById = exports.getAllCharacters = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const MarvelCharacter = models_1.default.MarvelCharacter;
const Team = models_1.default.Team;
const CharacterTeam = models_1.default.CharacterTeam;
/**
 * Controller to get all characters
 * @param {Request} _req - Request object
 * @param {Response} res - Response object
 */
const getAllCharacters = async (_req, res) => {
    try {
        const data = await MarvelCharacter.findAll();
        res.status(200).json({ data });
    }
    catch (error) {
        console.error('Error getting all characters', error);
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
        const data = await MarvelCharacter.findByPk(req.params.id);
        if (data) {
            res.status(200).json({ data });
        }
        else {
            res.status(404).json({ message: 'Character not found' });
        }
    }
    catch (error) {
        console.error('Error getting character', error);
        res.status(500).json({ message: 'Error retrieving character', error });
    }
};
exports.getCharacterById = getCharacterById;
/**
 * Controller to get a character by name
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
const getCharacterByName = async (req, res) => {
    try {
        const data = await MarvelCharacter.findAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: `%${req.params.name}%`
                }
            }
        });
        if (data) {
            res.status(200).json({ data });
        }
        else {
            res.status(404).json({ message: 'Character not found' });
        }
    }
    catch (error) {
        console.error('Error retrieving character', error);
        res.status(500).json({ message: 'Error retrieving character', error });
    }
};
exports.getCharacterByName = getCharacterByName;
/**
 * Controller to create a team with characters
 * @param {AuthRequest} req - Request object with JWT user
 * @param {Response} res - Response object
 */
const createTeamWithCharacters = async (req, res) => {
    const { teamName, positions } = req.body;
    const userId = req.user?.id; // Get user id from JWT
    try {
        // Use transaction to ensure all operations succeed or none do
        const result = await models_1.default.sequelize.transaction(async (t) => {
            // Create the team
            const team = await Team.create({
                name: teamName,
                user_id: userId
            }, { transaction: t });
            // Create character-team associations
            const characterTeamPromises = Object.entries(positions).map(([type, characterId]) => {
                if (!characterId)
                    return null;
                return CharacterTeam.create({
                    team_id: team.getDataValue('id'),
                    character_id: characterId,
                    type: type
                }, { transaction: t });
            });
            await Promise.all(characterTeamPromises.filter(Boolean));
            return team;
        });
        res.status(201).json({
            message: 'Team created successfully',
            data: result
        });
    }
    catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({
            message: 'Error creating team',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createTeamWithCharacters = createTeamWithCharacters;
/**
 * Controller to get all teams for a user
 * @param {AuthRequest} req - Request object with JWT user
 * @param {Response} res - Response object
 */
const getUserTeams = async (req, res) => {
    const userId = req.user?.id; // Get user id from JWT
    if (!userId) {
        res.status(400).json({ message: 'User ID is required' });
        return;
    }
    try {
        const teams = await Team.findAll({
            where: { user_id: userId },
            include: [{
                    model: MarvelCharacter,
                    through: {
                        // @ts-ignore
                        model: CharacterTeam,
                        attributes: ['type']
                    }
                }]
        });
        res.status(200).json({ data: teams });
    }
    catch (error) {
        console.error('Error retrieving user teams:', error);
        res.status(500).json({ message: 'Error retrieving user teams', error });
    }
};
exports.getUserTeams = getUserTeams;
