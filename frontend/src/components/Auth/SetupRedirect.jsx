import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'
import { apiClient } from '../../utils/apiClient'

const SetupRedirect = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(true)
  const [setupRequired, setSetupRequired] = useState(false)

  useEffect(() => {
    checkSetup()
  }, [])

  const checkSetup = async () => {
    // Don't check if already on setup page
    if (location.pathname === '/setup') {
      setChecking(false)
      return
    }

    // Allow access to certain public pages without redirect
    const allowedPaths = ['/setup', '/about', '/contact']
    if (allowedPaths.includes(location.pathname)) {
      setChecking(false)
      return
    }

    try {
      const response = await apiClient.get('/system/status')
      const required = response.data.system?.setupRequired

      setSetupRequired(required)

      // Redirect to setup if required and not already there
      if (required && location.pathname !== '/setup') {
        navigate('/setup', { replace: true })
      }
    } catch (error) {
      console.error('Setup check failed:', error)
      // On error, allow the page to load (setup endpoint might not exist yet)
      // Only redirect to setup on first load or when accessing admin/protected routes
      const isAdminOrProtected = location.pathname.startsWith('/admin') || 
                                 location.pathname.startsWith('/dashboard') ||
                                 location.pathname === '/'
      
      if (isAdminOrProtected && location.pathname !== '/setup') {
        navigate('/setup', { replace: true })
      }
    } finally {
      setChecking(false)
    }
  }

  if (checking) {
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

  return children
}

export default SetupRedirect
