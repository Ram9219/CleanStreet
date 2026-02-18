import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { CircularProgress, Box } from '@mui/material'
import { getScopedPath, isScopedPath, getSubdomain } from '../../utils/subdomain'

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  allowedRoles = null,
  requireVolunteerVerified = false 
}) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth()
  
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    // Determine the correct login path based on current context
    const subdomain = getSubdomain()
    const pathname = window.location.pathname || ''
    
    // Check if we're on admin routes (subdomain or path)
    const isAdminContext = subdomain === 'admin' || pathname.startsWith('/admin')
    // Check if we're on volunteer routes (subdomain or path)
    const isVolunteerContext = subdomain === 'volunteer' || pathname.startsWith('/volunteer')
    
    if (isAdminContext) {
      return <Navigate to={getScopedPath('admin', '/login')} replace />
    }
    
    if (isVolunteerContext) {
      return <Navigate to={getScopedPath('volunteer', '/login')} replace />
    }
    
    // Default to regular user login
    return <Navigate to="/login" replace />
  }

  const currentPath = window.location.pathname || ''
  const subdomain = getSubdomain()
  const isAdminContext = subdomain === 'admin' || currentPath.startsWith('/admin')
  const isChangePasswordPage = currentPath.includes('/change-password')
  const isSuperAdmin = user?.isSuperAdmin === true || user?.role === 'super-admin'

  if (isChangePasswordPage) {
    if (isSuperAdmin) {
      return <Navigate to={isAdminContext ? getScopedPath('admin', '/dashboard') : '/dashboard'} replace />
    }

    if (!user?.requiresPasswordChange) {
      return <Navigate to={isAdminContext ? getScopedPath('admin', '/dashboard') : '/dashboard'} replace />
    }
  }

  // Force password change for admins if required
  if (user?.requiresPasswordChange && isAdmin && !isSuperAdmin && !isChangePasswordPage) {
    if (isAdminContext) {
      return <Navigate to={getScopedPath('admin', '/change-password')} replace />
    }

    return <Navigate to="/change-password" replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user?.role)) {
      return <Navigate to="/dashboard" replace />
    }
  }

  // Check if volunteer verification is required
  if (requireVolunteerVerified && user?.role === 'volunteer') {
    if (isScopedPath('volunteer') && user?.volunteer_status !== 'active') {
      return <Navigate to={getScopedPath('volunteer', '/verification-pending')} replace />
    }
  }

  return children
}

export default ProtectedRoute