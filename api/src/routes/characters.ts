import express from 'express'
import { verifyAuthentication } from '../middleware/verifyAuthentication'
import { getAllCharacters, getCharacterById, getCharacterByName, createTeamWithCharacters, getUserTeams } from '../controllers/character'

const router = express.Router()

router.get('/search/:name', getCharacterByName)
router.post('/team', verifyAuthentication, createTeamWithCharacters)
router.get('/teams', verifyAuthentication, getUserTeams)
router.get('/:id', getCharacterById)
router.get('/', getAllCharacters)

export default router
