import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { apiClient } from '../utils/apiClient'
import { getSubdomain, getScopedPath } from '../utils/subdomain'

const AuthContext = createContext({})

const authClient = apiClient

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await authClient.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await authClient.post('/auth/login', {
        email,
        password
      })
      
      setUser(response.data.user)
      
      return { success: true, user: response.data.user }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed'
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await authClient.post('/auth/register', userData)
      toast.success('Registration successful! Check your email for verification.')
      return { success: true, data: response.data }
    } catch (error) {
      const message = error.response?.data?.error || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const adminLogin = async (email, password) => {
    try {
      const response = await authClient.post('/admin/login', {
        email,
        password
      })

      const adminUser = response.data.user
      setUser(adminUser)
      toast.success('Admin login successful!')

      // Redirect based on host (subdomain vs path)
      const isAdminSubdomain = typeof window !== 'undefined' && window.location.hostname.startsWith('admin.')
      if (adminUser?.requiresPasswordChange) {
        navigate(isAdminSubdomain ? '/change-password' : '/admin/change-password')
      } else {
        // Verify session is active by checking auth status
        setTimeout(() => checkAuthStatus(), 500)
        navigate(isAdminSubdomain ? '/dashboard' : '/admin/dashboard')
      }

      return { success: true, user: adminUser }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const volunteerLogin = async (email, password) => {
    try {
      const response = await authClient.post('/volunteers/login', {
        email,
        password
      })
      
      setUser(response.data.user)
      
      return { success: true, user: response.data.user }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed'
      throw error
    }
  }

  const refreshVolunteerStatus = async () => {
    try {
      // For volunteers, fetch profile data to get the latest status
      const response = await authClient.get('/volunteers/profile')
      if (response.data.success) {
        // Update user with latest volunteer_status from the volunteer object
        const volunteerData = response.data.volunteer || response.data.user
        if (volunteerData) {
          setUser(prevUser => ({
            ...prevUser,
            volunteer_status: volunteerData.volunteer_status || prevUser?.volunteer_status,
            volunteer_tier: volunteerData.volunteer_tier || prevUser?.volunteer_tier,
            name: volunteerData.name || prevUser?.name,
            email: volunteerData.email || prevUser?.email
          }))
        }
      }
      return { success: true }
    } catch (error) {
      console.log('Failed to refresh volunteer status:', error.message)
      return { success: false, error: error.message }
    }
  }

  const verifyEmail = async (email, otp) => {
    try {
      const response = await authClient.post('/auth/verify-email', {
        email,
        otp
      })
      
      setUser(response.data.user)
      toast.success('Email verified successfully!')
      
      navigate('/dashboard')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Verification failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      await authClient.post('/auth/logout')
      
      // Determine which login page to redirect to based on user role
      const subdomain = getSubdomain()
      const pathname = window.location.pathname
      const isAdminContext = subdomain === 'admin' || pathname.startsWith('/admin')
      const isVolunteerContext = subdomain === 'volunteer' || pathname.startsWith('/volunteer')
      
      setUser(null)
      
      if (isAdminContext) {
        navigate(getScopedPath('admin', '/login'))
      } else if (isVolunteerContext) {
        navigate(getScopedPath('volunteer', '/login'))
      } else {
        navigate('/login')
      }
      
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await authClient.post('/auth/forgot-password', { email })
      toast.success(response.data.message)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to send reset email'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await authClient.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      })
      
      toast.success(response.data.message)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Password reset failed'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const resendVerification = async (email) => {
    try {
      const response = await authClient.post('/auth/resend-verification', { email })
      toast.success(response.data.message)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to resend verification'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.role === 'super-admin',
    isSuperAdmin: user?.isSuperAdmin === true,
    isVolunteer: user?.role === 'volunteer',
    login,
    adminLogin,
    volunteerLogin,
    register,
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword,
    resendVerification,
    refreshUser: checkAuthStatus,
    refreshVolunteerStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}