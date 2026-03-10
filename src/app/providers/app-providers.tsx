import type { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/app/providers/ui/theme-provider'
import { queryClient } from '@/shared/config/query-client'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
