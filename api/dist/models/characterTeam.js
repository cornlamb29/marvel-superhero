"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberType = void 0;
const sequelize_1 = require("sequelize");
// Define the enum type
var TeamMemberType;
(function (TeamMemberType) {
    TeamMemberType["LEADER"] = "leader";
    TeamMemberType["ENFORCER"] = "enforcer";
    TeamMemberType["OPERATIVE"] = "operative";
    TeamMemberType["INNOVATOR"] = "innovator";
})(TeamMemberType || (exports.TeamMemberType = TeamMemberType = {}));
class CharacterTeam extends sequelize_1.Model {
    id;
    team_id;
    character_id;
    type;
}
exports.default = (sequelize) => {
    CharacterTeam.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        character_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.ENUM(...Object.values(TeamMemberType)),
            allowNull: false,
            validate: {
                isIn: [Object.values(TeamMemberType)]
            }
        }
    }, {
        sequelize,
        modelName: 'CharacterTeam',
        tableName: 'character_teams',
        schema: 'marvel_app',
        timestamps: false
    });
    return CharacterTeam;
};
