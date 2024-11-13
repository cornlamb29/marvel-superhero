import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Provider for react-query
 * @param {PropsWithChildren} children
 */
const QueryProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
