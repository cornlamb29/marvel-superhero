import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import characterRoutes from './routes/characters'
import userRoutes from './routes/users'

const app: Application = express()

// Middleware
app.use(cors({
  origin: process.env.WEB_APP_URL,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes
app.use('/api/characters', characterRoutes)
app.use('/api/users', userRoutes)
export default app
