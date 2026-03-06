import { Navigate, useLocation } from 'react-router-dom'
import { useMe } from '../features/auth/useMe'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useMe()
  const loc = useLocation()
  if (isLoading) return null
  if (!data?.user) return <Navigate to="/login" state={{ from: loc }} replace />
  return <>{children}</>
}

