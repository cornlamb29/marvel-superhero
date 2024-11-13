import { Model, DataTypes, Sequelize } from 'sequelize'

interface TeamAttributes {
  id: number
  user_id: number
  name: string
  created_at: Date
  updated_at: Date
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public id!: number
  public user_id!: number
  public name!: string
  public created_at!: Date
  public updated_at!: Date
}

export default (sequelize: Sequelize) => {
  Team.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
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
  })

  return Team
}
