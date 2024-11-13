import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AppBar, Toolbar, TextField, Button, Box, Typography, Link } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { useCurrentUser } from '@/store/auth'
import useApi from '@/hooks/Api/useApi'
import { UserJWTPayload } from '@/store/auth/types'
import './style.scss'


/**
 * The top navbar component    
 * @returns {React.ReactElement}
 */
const TopNavBar = (): React.ReactElement => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useCurrentUser()
  const { Users } = useApi()

  const { mutate: login } = useMutation({
    mutationFn: () => Users.login(username, password),
    onSuccess: () => {
      const token = Cookies.get('auth')
      if (token) {
        try {
          const decoded = jwtDecode(token) as UserJWTPayload
          setCurrentUser(decoded)
          setUsername('')
          setPassword('')
        } catch (e) {
          console.error('Failed to decode token:', e)
        }
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
    }
  })

  return (
    <AppBar position="fixed" color="primary" className="top-navbar">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" color="inherit" sx={{ textDecoration: 'none' }}>
          <Typography variant="h6">SuperHero Team Builder</Typography>
        </Link>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {currentUser ? (<>
            <Link 
              href="/my-teams" 
              color="inherit" 
              sx={{ 
                textDecoration: 'none',
                borderLeft: '1px solid white',
                borderRight: '1px solid white',
                padding: '20px 10px',
                height: 24,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              My Teams
            </Link>
            <Typography>Logged in as { currentUser.email }</Typography>
          </>) : (<>
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              value={ username }
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              value={ password }
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={ () => login() }
            >
              Login
            </Button>
          </>)}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNavBar
