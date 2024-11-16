import jwt from 'jsonwebtoken'
import { Response, Request } from 'express'

const JWT_SECRET = process.env.JWT_SECRET || 'corn'
const COOKIE_NAME = 'auth'

export interface UserPayload {
  id: number
  email: string
}

export const createUserToken = (user: UserPayload): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export const setAuthCookie = (res: Response, user: UserPayload): void => {
  const token = createUserToken(user)
  const webAppUrl = process.env.WEB_APP_URL || 'http://localhost:5173'
  const domain = new URL(webAppUrl).hostname

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain,
    path: '/'
  })
}

export const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserPayload
  } catch {
    return null
  }
} 

export const getUserFromRequest = (req: Request): UserPayload | null => {
  try {
    const token = req.cookies[COOKIE_NAME]
    return jwt.decode(token) as UserPayload | null
  } catch {
    return null
  }
}

export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(COOKIE_NAME)
}
