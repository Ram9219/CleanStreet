/**
 * Detect the current subdomain
 * Development:
 *   - localhost:3000 → 'main'
 *   - admin.localhost:3000 → 'admin'
 *   - volunteer.localhost:3000 → 'volunteer'
 * 
 * Production:
 *   - cleanstreet.com → 'main'
 *   - admin.cleanstreet.com → 'admin'
 *   - volunteer.cleanstreet.com → 'volunteer'
 */
export const getSubdomain = () => {
  const hostname = window.location.hostname
  
  // For localhost development with subdomains
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'main'
  }

  // For localhost with subdomains (admin.localhost, volunteer.localhost, etc)
  if (hostname.includes('localhost')) {
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      const subdomain = parts[0]
      if (['volunteer', 'admin', 'app', 'www'].includes(subdomain)) {
        if (subdomain === 'www' || subdomain === 'app') return 'main'
        return subdomain
      }
    }
    return 'main'
  }

  // For production domains
  const parts = hostname.split('.')
  
  // Remove TLD (com, co.uk, etc)
  if (parts.length > 2) {
    const subdomain = parts[0]
    
    // Check if it's a valid subdomain
    if (['volunteer', 'admin', 'app', 'www'].includes(subdomain)) {
      if (subdomain === 'www' || subdomain === 'app') return 'main'
      return subdomain
    }
  }
  
  // Default to main
  return 'main'
}

/**
 * Get the appropriate URL for a subdomain
 */
export const getSubdomainUrl = (subdomain = 'main') => {
  const envAdminUrl = import.meta.env.VITE_ADMIN_URL
  const envVolunteerUrl = import.meta.env.VITE_VOLUNTEER_URL
  const envFrontendUrl = import.meta.env.VITE_FRONTEND_URL

  if (subdomain === 'admin' && envAdminUrl) return envAdminUrl
  if (subdomain === 'volunteer' && envVolunteerUrl) return envVolunteerUrl
  if ((subdomain === 'main' || subdomain === 'app') && envFrontendUrl) return envFrontendUrl

  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''
  const protocol = window.location.protocol
  
  // For localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    if (subdomain === 'main' || subdomain === 'app') {
      return `${protocol}//localhost${port}`
    }
    return `${protocol}//${subdomain}.localhost${port}`
  }

  // For production
  // Get base domain (e.g., cleanstreet.com)
  const parts = hostname.split('.')
  const baseDomain = parts.slice(-2).join('.')
  
  if (subdomain === 'main' || subdomain === 'app') {
    return `${protocol}//${baseDomain}${port}`
  }
  
  return `${protocol}//${subdomain}.${baseDomain}${port}`
}

/**
 * Redirect to a specific subdomain
 */
export const redirectToSubdomain = (subdomain = 'main', path = '/') => {
  const url = getSubdomainUrl(subdomain)
  window.location.href = `${url}${path}`
}

export const isScopedPath = (scope = 'main') => {
  if (typeof window === 'undefined') return false
  const currentSubdomain = getSubdomain()
  if (currentSubdomain === scope) return true
  const pathname = window.location.pathname || ''
  return pathname.startsWith(`/${scope}`)
}

export const getScopedPath = (scope = 'main', path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  if (typeof window === 'undefined') return normalizedPath

  const currentSubdomain = getSubdomain()
  if (scope === 'admin' && currentSubdomain !== 'admin') {
    return `/admin${normalizedPath}`
  }
  if (scope === 'volunteer' && currentSubdomain !== 'volunteer') {
    return `/volunteer${normalizedPath}`
  }

  return normalizedPath
}
