import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getUserFromRequest, UserPayload } from '../utils/auth'

declare module 'express' {
  interface Request {
    user: UserPayload
  }
}

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromRequest(req)
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  req.user = user
  next()
}
