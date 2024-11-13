"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class MarvelCharacter extends sequelize_1.Model {
    id;
    name;
    description;
    modified;
    thumbnail;
    comics;
    series;
    stories;
    events;
    urls;
    resource_uri;
}
exports.default = (sequelize) => {
    MarvelCharacter.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        description: sequelize_1.DataTypes.TEXT,
        modified: sequelize_1.DataTypes.DATE,
        thumbnail: sequelize_1.DataTypes.STRING,
        comics: sequelize_1.DataTypes.JSONB,
        series: sequelize_1.DataTypes.JSONB,
        stories: sequelize_1.DataTypes.JSONB,
        events: sequelize_1.DataTypes.JSONB,
        urls: sequelize_1.DataTypes.JSONB,
        resource_uri: sequelize_1.DataTypes.STRING
    }, {
        sequelize,
        modelName: 'MarvelCharacter',
        tableName: 'marvel_characters',
        schema: 'marvel_app',
        timestamps: false
    });
    return MarvelCharacter;
};
