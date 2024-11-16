import { Request, Response } from 'express'
import db from '../models'
import { Op } from 'sequelize'
import { TeamMemberType } from '../models/characterTeam'
import { JwtPayload } from 'jsonwebtoken'

const MarvelCharacter = db.MarvelCharacter
const Team = db.Team
const CharacterTeam = db.CharacterTeam

interface TeamCreationBody {
  teamName: string
  positions: {
    [key in TeamMemberType]?: number  // character_id for each position
  }
}

// Add this interface
interface UserPayload extends JwtPayload {
  id: number
  email: string
}

// Update AuthRequest to use UserPayload
interface AuthRequest extends Request {
  user: UserPayload
}

/**
 * Controller to get all characters
 * @param {Request} _req - Request object
 * @param {Response} res - Response object
 */
export const getAllCharacters = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await MarvelCharacter.findAll()
    res.status(200).json({data})
  } catch (error) {
    console.error('Error getting all characters', error)
    res.status(500).json({ message: 'Error retrieving characters', error })
  }
}

/**
 * Controller to get a character by id
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const getCharacterById = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await MarvelCharacter.findByPk(req.params.id)
    if (data) {
      res.status(200).json({data})
    } else {
      res.status(404).json({ message: 'Character not found' })
    }
  } catch (error) {
    console.error('Error getting character', error)
    res.status(500).json({ message: 'Error retrieving character', error })
  }
}

/**
 * Controller to get a character by name
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const getCharacterByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await MarvelCharacter.findAll({
      where: { 
        name: {
          [Op.iLike]: `%${req.params.name}%`
        } 
      } 
    })

    if (data) {
      res.status(200).json({data})
    } else {
      res.status(404).json({ message: 'Character not found' })
    }
  } catch (error) {
    console.error('Error retrieving character', error)
    res.status(500).json({ message: 'Error retrieving character', error })
  }
}

/**
 * Controller to create a team with characters
 * @param {AuthRequest} req - Request object with JWT user
 * @param {Response} res - Response object
 */
export const createTeamWithCharacters = async (req: AuthRequest, res: Response): Promise<void> => {
  const { teamName, positions } = req.body as TeamCreationBody
  const userId = req.user?.id  // Get user id from JWT
  try {
    // Use transaction to ensure all operations succeed or none do
    const result = await db.sequelize.transaction(async (t) => {
      // Create the team
      const team = await Team.create({
        name: teamName,
        user_id: userId
      }, { transaction: t })

      // Create character-team associations
      const characterTeamPromises = Object.entries(positions).map(([type, characterId]) => {
        if (!characterId) return null

        return CharacterTeam.create({
          team_id: team.getDataValue('id'),
          character_id: characterId,
          type: type as TeamMemberType
        }, { transaction: t })
      })

      await Promise.all(characterTeamPromises.filter(Boolean))

      return team
    })

    res.status(201).json({
      message: 'Team created successfully',
      data: result
    })

  } catch (error) {
    console.error('Error creating team:', error)
    res.status(500).json({ 
      message: 'Error creating team', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}

/**
 * Controller to get all teams for a user
 * @param {AuthRequest} req - Request object with JWT user
 * @param {Response} res - Response object
 */
export const getUserTeams = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id  // Get user id from JWT

  if (!userId) {
    res.status(400).json({ message: 'User ID is required' })
    return
  }

  try {

    const teams = await Team.findAll({
      where: { user_id: userId },
      include: [{
        model: MarvelCharacter,
        through: {
          // @ts-ignore
          model: CharacterTeam,
          attributes: ['type']
        }
      }]
    })

    res.status(200).json({ data: teams })
  } catch (error) {
    console.error('Error retrieving user teams:', error)
    res.status(500).json({ message: 'Error retrieving user teams', error })
  }
}
