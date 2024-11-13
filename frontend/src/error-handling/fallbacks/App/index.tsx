import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { FullSizeCenteredFlexBox } from '@/components/styled'
import { messages } from '@/config'

/**
 * App Error Boundary Fallback
 * @returns {React.ReactElement}
 */
const AppErrorBoundaryFallback = (): React.ReactElement => (
  <Box height={400}>
    <FullSizeCenteredFlexBox>
      <Paper sx={{ p: 5 }}>
        <Typography variant="h5" component="h3">
          {messages.app.crash}
        </Typography>
      </Paper>
    </FullSizeCenteredFlexBox>
  </Box>
)

export default AppErrorBoundaryFallback
