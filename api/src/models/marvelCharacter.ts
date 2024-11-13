import { Model, DataTypes, Sequelize } from 'sequelize'

interface MarvelCharacterAttributes {
  id: number
  name: string
  description?: string
  modified?: Date
  thumbnail?: string
  comics?: object
  series?: object
  stories?: object
  events?: object
  urls?: object
  resource_uri?: string
}

class MarvelCharacter extends Model<MarvelCharacterAttributes> implements MarvelCharacterAttributes {
  public id!: number
  public name!: string
  public description?: string
  public modified?: Date
  public thumbnail?: string
  public comics?: object
  public series?: object
  public stories?: object
  public events?: object
  public urls?: object
  public resource_uri?: string
}

export default (sequelize: Sequelize) => {
  MarvelCharacter.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    modified: DataTypes.DATE,
    thumbnail: DataTypes.STRING,
    comics: DataTypes.JSONB,
    series: DataTypes.JSONB,
    stories: DataTypes.JSONB,
    events: DataTypes.JSONB,
    urls: DataTypes.JSONB,
    resource_uri: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'MarvelCharacter',
    tableName: 'marvel_characters',
    schema: 'marvel_app',
    timestamps: false
  })

  return MarvelCharacter
}
