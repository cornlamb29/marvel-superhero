import { Position } from '../positions/types'

export type TeamPositionsState = Record<Position, string | null>;


export type TeamPositionsStore = [
  TeamPositionsState,
  (value: TeamPositionsState | ((prev: TeamPositionsState) => TeamPositionsState)) => void
]
