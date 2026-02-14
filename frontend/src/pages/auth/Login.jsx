import React, { useState, useEffect, memo, useCallback, useMemo } from 'react'
import { 
  Container, Paper, TextField, Button, Typography, Box,
  Alert, CircularProgress, Divider, Fade, Zoom,
  InputAdornment, IconButton, alpha, useTheme, useMediaQuery,
  Skeleton
} from '@mui/material'
import { styled } from '@mui/material/styles'
import GoogleIcon from '@mui/icons-material/Google'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SecurityIcon from '@mui/icons-material/Security'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: 24,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 1)} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  }
}))

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 12,
  padding: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
  },
  '&:disabled': {
    background: theme.palette.action.disabledBackground,
  }
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      }
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
    }
  }
}))

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
}

// Benefits data
const benefits = [
  { icon: <AssignmentIcon />, text: 'Real-time issue tracking', color: '#667eea' },
  { icon: <PeopleIcon />, text: 'Community collaboration', color: '#764ba2' },
  { icon: <SecurityIcon />, text: 'Government accountability', color: '#48bb78' },
  { text: 'Cleaner neighborhoods', color: '#f6ad55' }
]

// Memoized Benefits Component
const Benefits = memo(() => {
  const theme = useTheme()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Why join Clean Street?
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 2,
          mt: 3
        }}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 30,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    boxShadow: `0 5px 15px ${alpha(benefit.color || theme.palette.primary.main, 0.2)}`
                  }
                }}
              >
                {benefit.icon && (
                  <Box sx={{ 
                    color: benefit.color || theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {benefit.icon}
                  </Box>
                )}
                {!benefit.icon && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: benefit.color || theme.palette.primary.main
                    }}
                  />
                )}
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: theme.palette.text.primary
                  }}
                >
                  {benefit.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </motion.div>
  )
})

Benefits.displayName = 'Benefits'

// Main Login Component
const Login = () => {
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  // Form validation schema
  const loginSchema = useMemo(() => yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password is too long')
  }), [])

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isDirty },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail')
    if (savedEmail) {
      setValue('email', savedEmail)
      setRememberMe(true)
    }
  }, [setValue])

  // Optimized submit handler
  const onSubmit = useCallback(async (data) => {
    setLoading(true)
    setError('')

    try {
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', data.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      const result = await login(data.email, data.password)
      
      if (!result?.success) {
        setError(result?.error || 'Invalid email or password. Please try again.')
        return
      }

      const redirectTo = location.state?.from || '/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      const message = err?.response?.data?.error || 'An error occurred. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [login, navigate, location.state, rememberMe])

  // Optimized Google login handler
  const handleGoogleLogin = useCallback(() => {
    setGoogleLoading(true)
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
  }, [])

  // Password visibility toggle
  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  // Clear error handler
  const handleClearError = useCallback(() => {
    setError('')
  }, [])

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: { xs: 2, sm: 4, md: 8 }, 
        mb: 8,
        px: { xs: 2, sm: 3 }
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <StyledPaper elevation={0}>
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%)',
              zIndex: 0
            }}
          />
          
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -45, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)',
              zIndex: 0
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header Section */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Typography 
                    variant={isMobile ? "h4" : "h3"} 
                    sx={{ 
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Welcome Back
                  </Typography>
                </motion.div>
                
                <Typography 
                  variant={isMobile ? "body2" : "subtitle1"} 
                  color="text.secondary"
                  sx={{ maxWidth: 400, mx: 'auto' }}
                >
                  Sign in to continue making your community better
                </Typography>
              </Box>
            </motion.div>

            {/* Error Alert with Animation */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'error.light',
                      bgcolor: alpha(theme.palette.error.main, 0.05)
                    }}
                    onClose={handleClearError}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Login Button */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 3 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || loading}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: alpha(theme.palette.divider, 0.3),
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: '#DB4437',
                      bgcolor: alpha('#DB4437', 0.05),
                      transform: 'translateY(-2px)',
                      boxShadow: `0 5px 15px ${alpha('#DB4437', 0.2)}`
                    }
                  }}
                >
                  {googleLoading ? (
                    <CircularProgress size={24} thickness={4} />
                  ) : (
                    'Continue with Google'
                  )}
                </Button>
              </Box>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants}>
              <Divider sx={{ mb: 4 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    px: 2,
                    bgcolor: 'background.paper',
                    fontWeight: 500
                  }}
                >
                  Or continue with email
                </Typography>
              </Divider>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  margin="normal"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={loading}
                  autoComplete="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              </motion.div>
              
              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <StyledTextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loading}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </motion.div>
              
              {/* Options Row */}
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: 2,
                  mt: 2, 
                  mb: 3 
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        width: 18,
                        height: 18,
                        cursor: 'pointer',
                        accentColor: theme.palette.primary.main
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ ml: 1, cursor: 'pointer' }}
                      onClick={() => setRememberMe(prev => !prev)}
                    >
                      Remember me
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link 
                      to="/register"
                      style={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                      Need an account?
                    </Link>
                    
                    <Typography variant="body2" color="text.secondary">•</Typography>
                    
                    <Link 
                      to="/forgot-password"
                      style={{ 
                        textDecoration: 'none',
                        color: theme.palette.text.secondary,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = theme.palette.primary.main
                        e.target.style.textDecoration = 'underline'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = theme.palette.text.secondary
                        e.target.style.textDecoration = 'none'
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </Box>
                </Box>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GradientButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || !isValid || !isDirty}
                >
                  {loading ? (
                    <CircularProgress 
                      size={24} 
                      sx={{ color: 'white' }} 
                      thickness={4}
                    />
                  ) : (
                    'Sign In to Your Account'
                  )}
                </GradientButton>
              </motion.div>
            </form>

            {/* Security Note */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Box sx={{ 
                mt: 4, 
                p: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 1,
                    color: 'text.secondary'
                  }}
                >
                  <SecurityIcon sx={{ fontSize: 16 }} />
                  Your data is protected with end-to-end encryption
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </StyledPaper>

        {/* Benefits Section */}
        <Benefits />
      </motion.div>
    </Container>
  )
}

export default memo(Login)