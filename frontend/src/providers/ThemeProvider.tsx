import React, { PropsWithChildren } from 'react'
import { createTheme, ThemeProvider as CustomThemeProvider } from '@mui/material/styles'
import themes from '@/theme/themes'


/**
 * CustomThemeProvider component - wraps the theme provider to handle the theme functionality
 * @param {PropsWithChildren} children
 * @returns {React.ReactElement}
 */
const ThemeProvider = ({ children }: PropsWithChildren): React.ReactElement => (
  <CustomThemeProvider theme={createTheme(themes)}>{children}</CustomThemeProvider>
)


export default ThemeProvider
