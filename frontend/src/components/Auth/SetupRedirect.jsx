import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { apiClient } from '../../utils/apiClient'
import { getSubdomain } from '../../utils/subdomain'
import AppLoader from '../Feedback/AppLoader'

const SETUP_STATUS_CACHE_KEY = 'setup-status-cache-v1'
const SETUP_STATUS_TTL_MS = 5 * 60 * 1000

const SetupRedirect = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const checkSetup = async () => {
      const pathname = location.pathname || ''
      const subdomain = getSubdomain()
      const isAdminOrVolunteerContext =
        subdomain === 'admin' ||
        subdomain === 'volunteer' ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/volunteer')

      if (!isAdminOrVolunteerContext) {
        setChecking(false)
        return
      }

      // Don't check if already on setup page
      if (pathname === '/setup') {
        setChecking(false)
        return
      }

      // Allow access to certain public pages without redirect
      const allowedPaths = ['/setup', '/about', '/contact']
      if (allowedPaths.includes(pathname)) {
        setChecking(false)
        return
      }

      try {
        const rawCache = sessionStorage.getItem(SETUP_STATUS_CACHE_KEY)
        if (rawCache) {
          const parsedCache = JSON.parse(rawCache)
          const isFresh = Date.now() - (parsedCache?.checkedAt || 0) < SETUP_STATUS_TTL_MS

          if (isFresh && typeof parsedCache?.setupRequired === 'boolean') {
            if (parsedCache.setupRequired && pathname !== '/setup') {
              navigate('/setup', { replace: true })
            }
            setChecking(false)
            return
          }
        }
      } catch (cacheError) {
        sessionStorage.removeItem(SETUP_STATUS_CACHE_KEY)
      }

      setChecking(true)

      try {
        let response
        try {
          response = await apiClient.get('/system/status')
        } catch (primaryError) {
          response = await apiClient.get('/api/system/status')
        }
        const required = response.data.system?.setupRequired

        sessionStorage.setItem(
          SETUP_STATUS_CACHE_KEY,
          JSON.stringify({
            setupRequired: !!required,
            checkedAt: Date.now(),
          })
        )

        // Redirect to setup if required and not already there
        if (required && pathname !== '/setup') {
          navigate('/setup', { replace: true })
        }
      } catch (error) {
        console.error('Setup check failed:', error)
        sessionStorage.removeItem(SETUP_STATUS_CACHE_KEY)

        if (pathname !== '/setup') {
          navigate('/setup', { replace: true })
        }
      } finally {
        setChecking(false)
      }
    }

    checkSetup()
  }, [location.pathname, navigate])

  if (checking) {
    return (
      <AppLoader
        fullScreen
        message="Checking setup"
        submessage="Preparing your portal"
      />
    )
  }

  return children
}

export default SetupRedirect
