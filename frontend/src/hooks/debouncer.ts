import { useRef, useCallback } from 'react'
import { UseDebounceResult } from './types'

/**
 * Hook to debounce a callback
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
const useDebounce: UseDebounceResult = (callback, delay) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}

export default useDebounce 