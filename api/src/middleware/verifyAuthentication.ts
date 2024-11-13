import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getUserFromRequest } from '../utils/auth'

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const user = getUserFromRequest(req)
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  req.user = user
  next()
}
