import { Sequelize, Model, ModelStatic } from 'sequelize'
import config from '../config/config'
import MarvelCharacterModel from './marvelCharacter'
import UserModel from './user'
import TeamModel from './team'
import CharacterTeamModel from './characterTeam'

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres'
  }
)

interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  MarvelCharacter: ModelStatic<Model>;
  User: ModelStatic<Model>;
  Team: ModelStatic<Model>;
  CharacterTeam: ModelStatic<Model>;
}

const db: Database = {
  sequelize,
  Sequelize,
  MarvelCharacter: MarvelCharacterModel(sequelize),
  User: UserModel(sequelize),
  Team: TeamModel(sequelize),
  CharacterTeam: CharacterTeamModel(sequelize)
}

// Define associations
db.User.hasMany(db.Team, { foreignKey: 'user_id' })
db.Team.belongsTo(db.User, { foreignKey: 'user_id' })

db.Team.belongsToMany(db.MarvelCharacter, {
  through: db.CharacterTeam,
  foreignKey: 'team_id',
  otherKey: 'character_id',
})

db.MarvelCharacter.belongsToMany(db.Team, {
  through: db.CharacterTeam,
  foreignKey: 'character_id',
  otherKey: 'team_id',
})

export default db