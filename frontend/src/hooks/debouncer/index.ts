import { useRef } from 'react'
import { useDebounceResult } from './types'

/**
 * Hook to debounce a callback
 * @param {useDebounceResult} callback
 * @param {number} delay
 * @returns {useDebounceResult}
 */
const useDebounce = (callback: useDebounceResult, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedCallback = (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  };

  return debouncedCallback
}

export default useDebounce
