"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    id;
    email;
    password_hash;
    password;
    /**
     * Validates the password against the stored hash
     * @param password - The password to validate
     * @returns true if the password is valid, false otherwise
     */
    async validatePassword(password) {
        return bcrypt_1.default.compare(password, this.password_hash);
    }
}
exports.default = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: sequelize_1.DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password is required'
                },
                len: {
                    args: [6, 100],
                    msg: 'Password must be between 6 and 100 characters'
                }
            },
            set(value) {
                this.setDataValue('password', value);
                // Hash password immediately when set
                if (value) {
                    const salt = bcrypt_1.default.genSaltSync(10);
                    this.setDataValue('password_hash', bcrypt_1.default.hashSync(value, salt));
                }
            }
        },
        password_hash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        schema: 'marvel_app',
        timestamps: false,
    });
    return User;
};
