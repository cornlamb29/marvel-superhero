import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { FullSizeCenteredFlexBox } from '../styled'

/**
 * Loading component
 * @returns {React.ReactElement}
 */
const Loading = (): React.ReactElement => (
  <FullSizeCenteredFlexBox>
    <CircularProgress />
  </FullSizeCenteredFlexBox>
)

export default Loading;
