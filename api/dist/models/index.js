"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const marvelCharacter_1 = __importDefault(require("./marvelCharacter"));
const user_1 = __importDefault(require("./user"));
const team_1 = __importDefault(require("./team"));
const characterTeam_1 = __importDefault(require("./characterTeam"));
const sequelize = new sequelize_1.Sequelize(config_1.default.development.database, config_1.default.development.username, config_1.default.development.password, {
    host: config_1.default.development.host,
    dialect: 'postgres'
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    MarvelCharacter: (0, marvelCharacter_1.default)(sequelize),
    User: (0, user_1.default)(sequelize),
    Team: (0, team_1.default)(sequelize),
    CharacterTeam: (0, characterTeam_1.default)(sequelize)
};
// Define associations
db.User.hasMany(db.Team, { foreignKey: 'user_id' });
db.Team.belongsTo(db.User, { foreignKey: 'user_id' });
db.Team.belongsToMany(db.MarvelCharacter, {
    through: db.CharacterTeam,
    foreignKey: 'team_id',
    otherKey: 'character_id',
});
db.MarvelCharacter.belongsToMany(db.Team, {
    through: db.CharacterTeam,
    foreignKey: 'character_id',
    otherKey: 'team_id',
});
exports.default = db;
