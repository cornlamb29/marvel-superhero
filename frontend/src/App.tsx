import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { withErrorHandler } from '@/error-handling'
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App'
import ThemeProvider from '@/providers/ThemeProvider'
import QueryProvider from '@/providers/QueryProvider'
import Background from './components/Background'
import TopNavbar from './components/TopNavbar'
import Pages from './routes/Pages'

function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <BrowserRouter>
          <QueryProvider>
            <Background />
            <TopNavbar />
            <main>
              <Pages />
            </main>
          </QueryProvider>
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default withErrorHandler(App, AppErrorBoundaryFallback)
