"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Team extends sequelize_1.Model {
    id;
    user_id;
    name;
    created_at;
    updated_at;
}
exports.default = (sequelize) => {
    Team.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Team',
        tableName: 'teams',
        schema: 'marvel_app',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Team;
};
