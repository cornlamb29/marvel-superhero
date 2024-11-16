import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from '@mui/material'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useCurrentUser } from '@/store/auth'
import useApi from '@/hooks/Api/useApi'
import { UserJWTPayload } from '@/store/auth/types'
import { SignupDialogProps } from './props'
import './style.scss'


/**
 * @description The signup dialog component
 * @returns {React.ReactElement}
 */
const SignupDialog = ({ showSignup: initialShowSignup, onClose, onSignup}: SignupDialogProps) => {
  const { Users } = useApi()
  const [showSignup, setShowSignup] = useState(initialShowSignup)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setCurrentUser] = useCurrentUser()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | JSX.Element | null>(null)

  const { mutate: signupMutation, isPending } = useMutation<void, AxiosError, void>({
    mutationFn: () => Users.signup(email, password),
    onSuccess: () => {
      const token = Cookies.get('auth')
      if (token) {
        try {
          const decoded = jwtDecode(token) as UserJWTPayload
          setCurrentUser(decoded)
        } catch (e) {
          console.error('Failed to decode token:', e)
        }
      }
      setShowSignup(false)
      onSignup?.()
      onClose()
      navigate('/my-teams')
    },
    onError: (error: AxiosError) => {
      let message: string | JSX.Element = 'Signup failed. Please try again.'
      if (error?.response?.data && typeof error.response.data === 'object' && ('message' in error.response.data) && ('error' in error.response.data)) {
        message = <>{ error.response.data.message }:<br />{error.response.data.error}</> as JSX.Element
      }
      console.error('Error signing up:', message)
      setErrorMessage(message)
      
    }
  })

  const handleSignup = () => {
    signupMutation()
  }

  useEffect(() => {
    setShowSignup(initialShowSignup)
  }, [initialShowSignup])

  return (<Dialog open={showSignup} onClose={onClose} className="dialog-wrapper">
    <DialogTitle>Create an Account</DialogTitle>
    <DialogContent>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <TextField
        autoFocus
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={handleSignup} disabled={isPending}>
      {isPending ? 'Signing up...' : 'Sign Up'}
      </Button>
    </DialogActions>
  </Dialog>)
}

export default SignupDialog