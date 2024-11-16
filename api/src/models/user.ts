import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

export interface UserInstance extends Model {
  validatePassword(password: string): Promise<boolean>
  id: number
  email: string
}

interface UserAttributes {
  id: number
  email: string
  password_hash: string | null
  password?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'password_hash'> {
  password: string // Plain password, required on creation but not stored
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserInstance {
  public id!: number
  public email!: string
  public password_hash!: string | null
  public password?: string

  /**
   * Validates the password against the stored hash
   * @param password - The password to validate
   * @returns true if the password is valid, false otherwise
   */
  public async validatePassword(password: string): Promise<boolean> {
    const passwordHash = this.password_hash || this.getDataValue('password_hash')
    return bcrypt.compare(password, passwordHash)
  }
}

export default (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
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
      set(value: string) {
        this.setDataValue('password', value);
        // Hash password immediately when set
        if (value) {
          const salt = bcrypt.genSaltSync(10);
          this.setDataValue('password_hash', bcrypt.hashSync(value, salt));
        }
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    schema: 'marvel_app',
    timestamps: false,
  })

  return User
}
