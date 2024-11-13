import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'
import { Position, SelectedPositionResult } from './types'

export const selectedPositionState = atom<Position>({
  key: 'positionState',
  default: Position.Leader, // Default position
})

/**
 * usePosition hook
 * @returns {SelectedPositionResult}
 */
export const usePosition = (): SelectedPositionResult => {
  const [currentPosition, setCurrentPosition] = useRecoilState(selectedPositionState)

  const setSelectedPosition = useCallback((position: Position) => {
    setCurrentPosition(position)
  }, [setCurrentPosition])

  return [currentPosition, setSelectedPosition]
}