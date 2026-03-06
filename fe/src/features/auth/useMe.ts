import { useQuery } from '@tanstack/react-query'
import { authApi } from './api'

export function useMe() {
  return useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: false })
}

