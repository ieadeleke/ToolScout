import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </QueryClientProvider>
  )
}
