import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { messages } from '@/config'

/**
 * 
 * @returns 
 */
const LoaderErrorBoundaryFallback = (): React.ReactElement => (
  <Box>
    <Typography variant="h5">{messages.loader.fail}</Typography>
  </Box>
)

export default LoaderErrorBoundaryFallback
