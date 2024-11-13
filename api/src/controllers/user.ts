import { Request, Response } from 'express'
import db from '../models'
import { setAuthCookie } from '../utils/auth'
import { Model } from 'sequelize'

const User = db.User

// Add this interface
interface UserInstance extends Model {
  validatePassword(password: string): Promise<boolean>;
  id: number;
  email: string;
}

/**
 * Controller to signup a user
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })

    // Set the auth cookie after successful signup
    setAuthCookie(res, { id: user.getDataValue('id'), email: user.getDataValue('email') })
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error instanceof Error ? error.message : 'Unknown error' })
  }
}

/**
 * Controller to login a user
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } }) as UserInstance
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' })
    }
    if (!(await user.validatePassword(password))) {
      res.status(401).json({ message: 'Invalid email or password' })
    }

    setAuthCookie(res, { id: user.id, email: user.email })
    res.status(200).json({ message: 'User logged in successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
