import { Model, DataTypes, Sequelize } from 'sequelize'

// Define the enum type
export enum TeamMemberType {
  LEADER = 'leader',
  ENFORCER = 'enforcer',
  OPERATIVE = 'operative',
  INNOVATOR = 'innovator'
}

interface CharacterTeamAttributes {
  id: number
  team_id: number
  character_id: number
  type: TeamMemberType
}

class CharacterTeam extends Model<CharacterTeamAttributes> implements CharacterTeamAttributes {
  public id!: number
  public team_id!: number
  public character_id!: number
  public type!: TeamMemberType
}

export default (sequelize: Sequelize) => {
  CharacterTeam.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TeamMemberType)),
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
  })

  return CharacterTeam
}
