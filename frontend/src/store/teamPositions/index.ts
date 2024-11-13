import { atom, useRecoilState } from 'recoil'
import { TeamPositionsState } from './types'

const initialState: TeamPositionsState = {
  'Visionary Leader': null,
  'Enforcer': null,
  'Swift Operative': null,
  Innovator: null,
}

export const teamPositionsState = atom<TeamPositionsState>({
  key: 'teamPositionsState',
  default: initialState,
})

export const useTeamPositions = () => useRecoilState(teamPositionsState)
