import express, { Request, Response } from 'express'
import { login, signup } from '../controllers/user'

const router = express.Router()

router.post('/login', (req: Request, res: Response) => login(req, res))
router.post('/signup', signup)

export default router
