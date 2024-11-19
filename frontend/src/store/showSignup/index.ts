import { atom, useRecoilState } from 'recoil'

export const showSignupState = atom<boolean>({
  key: 'showSignupState',
  default: false
})

export const useShowSignup = () => useRecoilState(showSignupState)
