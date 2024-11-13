import { atom, selector, useRecoilState } from 'recoil'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { UserJWTPayload } from './types'

// Create a selector to read the JWT from cookies
const userFromToken = selector<UserJWTPayload | null>({
  key: 'userFromToken/selector',
  get: () => {
    const token = Cookies.get('auth')
    if (!token) return null
    
    try {
      return jwtDecode(token) as UserJWTPayload
    } catch (e) {
      console.error('Invalid JWT token:', e)
      return null
    }
  }
})

// Create the atom with the selector as its default
export const currentUserState = atom<UserJWTPayload | null>({
  key: 'currentUserState',
  default: userFromToken,
  effects: [
    // Add an effect to sync with the cookie
    ({ setSelf, trigger }) => {
      if (trigger === 'get') {
        // Read initial value from cookie
        const token = Cookies.get('auth')
        if (token) {
          try {
            const decoded = jwtDecode(token) as UserJWTPayload
            setSelf(decoded)
          } catch (e) {
            console.error('Invalid JWT token:', e)
            setSelf(null)
          }
        }
      }
      
      // Listen for cookie changes
      const cookieListener = () => {
        const token = Cookies.get('auth')
        if (token) {
          try {
            const decoded = jwtDecode(token) as UserJWTPayload
            setSelf(decoded)
          } catch (e) {
            console.error('Invalid JWT token:', e)
            setSelf(null)
          }
        } else {
          setSelf(null)
        }
      }

      window.addEventListener('storage', cookieListener)
      return () => {
        window.removeEventListener('storage', cookieListener)
      }
    }
  ]
})

/**
 * @description A hook to access the current user state
 */
export const useCurrentUser = () => useRecoilState(currentUserState)
