import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoutes() {
  console.log('ProtectedRoutes')
  const { isAuthenticated, isLoading } = useAuth()
  console.log('ProtectedRoutes, isLoading:', isLoading)
  if (isLoading) {
    return <div></div>
  }
  console.log('ProtectedRoutes, isAuthenticated:', isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to={'/auth/sign-in'} replace />
  }
  console.log('ProtectedRoutes, Outlet')
  return <Outlet />
}
