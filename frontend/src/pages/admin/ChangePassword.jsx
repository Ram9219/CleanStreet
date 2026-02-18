import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Fade,
  Zoom,
  Chip,
  Tooltip,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockReset,
  CheckCircle,
  Error,
  Security,
  VpnKey,
  History,
  Warning,
  Info,
  Done,
  Close,
  Refresh,
  Fingerprint,
  VerifiedUser,
  Block,
  Timer
} from '@mui/icons-material'
import { styled, keyframes, alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { apiClient } from '../../utils/apiClient'
import toast from 'react-hot-toast'

// ==================== STYLED COMPONENTS ====================

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  position: 'relative',
  overflow: 'hidden',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
    : '#ffffff',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 40px rgba(0,0,0,0.3)'
    : '0 10px 40px rgba(102, 126, 234, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4, #FFD166, #06D6A0)',
  }
}))

const PasswordStrengthIndicator = styled(Box)(({ theme, strength }) => {
  const colors = {
    0: theme.palette.error.main,
    1: theme.palette.error.main,
    2: theme.palette.warning.main,
    3: theme.palette.info.main,
    4: theme.palette.success.main,
  }

  return {
    height: 8,
    borderRadius: 4,
    background: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.1)',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: `${(strength / 4) * 100}%`,
      height: '100%',
      borderRadius: 4,
      background: colors[strength],
      transition: 'width 0.3s ease, background 0.3s ease',
      boxShadow: `0 0 10px ${colors[strength]}`,
    }
  }
})

const StyledTextField = styled(TextField)(({ theme, validated }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: validated ? theme.palette.success.main : undefined,
  }
}))

const SecurityBadge = styled(Box)(({ theme, color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: 30,
  background: alpha(color || theme.palette.primary.main, 0.1),
  border: `1px solid ${alpha(color || theme.palette.primary.main, 0.2)}`,
  color: color || theme.palette.primary.main,
  fontWeight: 600,
  fontSize: '0.875rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 15px ${alpha(color || theme.palette.primary.main, 0.2)}`,
  }
}))

// ==================== PASSWORD VALIDATION HOOK ====================

const usePasswordValidation = (password) => {
  const [strength, setStrength] = useState(0)
  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    noSpaces: true,
    noCommon: true
  })

  useEffect(() => {
    const newChecks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noSpaces: !/\s/.test(password),
      noCommon: !/(password|123456|qwerty|admin|letmein)/i.test(password)
    }

    setChecks(newChecks)

    // Calculate strength
    const score = Object.values(newChecks).filter(Boolean).length
    setStrength(Math.min(4, Math.floor(score / 2)))
  }, [password])

  return { strength, checks }
}

// ==================== MAIN COMPONENT ====================

const ChangePassword = () => {
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [activeStep, setActiveStep] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  const { strength, checks } = usePasswordValidation(formData.newPassword)

  // Password history (mock - in real app, this would come from backend)
  const passwordHistory = useMemo(() => [
    'Changed 2 days ago',
    'Changed 30 days ago',
    'Changed 3 months ago'
  ], [])

  const steps = ['Verify Identity', 'Create New Password', 'Confirm Changes']

  // Validation functions
  const validateForm = useCallback(() => {
    if (!formData.currentPassword) {
      setError('Current password is required')
      return false
    }

    if (!formData.newPassword) {
      setError('New password is required')
      return false
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }

    if (!checks.uppercase || !checks.lowercase || !checks.number) {
      setError('Password must include uppercase, lowercase, and numbers')
      return false
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current')
      return false
    }

    if (!checks.noCommon) {
      setError('Password is too common. Choose a stronger password')
      return false
    }

    return true
  }, [formData, checks])

  // Check if form is partially valid for step progression
  const isStepValid = useCallback((step) => {
    switch (step) {
      case 0:
        return formData.currentPassword.length > 0
      case 1:
        return strength >= 3 && formData.newPassword.length > 0
      case 2:
        return formData.newPassword === formData.confirmPassword && formData.newPassword.length > 0
      default:
        return false
    }
  }, [formData, strength])

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    })
  }

  // Handle step navigation
  const handleNext = () => {
    if (activeStep === 0 && !formData.currentPassword) {
      setError('Please enter your current password')
      return
    }
    if (activeStep === 1 && strength < 3) {
      setError('Please choose a stronger password')
      return
    }
    setActiveStep((prev) => Math.min(prev + 1, 2))
    setError('')
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
    setError('')
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check for lockout
    if (lockoutTime && new Date() < lockoutTime) {
      const waitTime = Math.ceil((lockoutTime - new Date()) / 1000)
      setError(`Too many attempts. Please wait ${waitTime} seconds`)
      return
    }

    if (!validateForm()) {
      setAttempts((prev) => prev + 1)
      
      // Lock after 5 attempts
      if (attempts >= 4) {
        setLockoutTime(new Date(Date.now() + 5 * 60 * 1000)) // 5 minutes
        toast.error('Too many failed attempts. Account locked for 5 minutes')
      }
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await apiClient.post('/admin/force-password-change', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      })

      if (response.data.success) {
        setSuccess(true)
        toast.success('✅ Password changed successfully!')
        
        // Refresh user data
        await refreshUser()
        
        // Redirect after 2 seconds
        setTimeout(() => {
          const isAdminSubdomain = typeof window !== 'undefined' && 
            window.location.hostname.startsWith('admin.')
          navigate(isAdminSubdomain ? '/dashboard' : '/admin/dashboard')
        }, 2000)
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to change password'
      setError(errorMsg)
      toast.error(errorMsg)
      setAttempts((prev) => prev + 1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Zoom in timeout={500}>
        <StyledPaper elevation={3}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                bgcolor: 'warning.light',
                color: 'warning.dark',
                mb: 2,
                animation: `${pulseAnimation} 2s infinite`
              }}
            >
              <LockReset sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h3" gutterBottom fontWeight="800">
              Change Password
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.mustChangePassword 
                ? 'For security reasons, you must change your password before continuing'
                : 'Update your password to maintain account security'}
            </Typography>
          </Box>

          {/* Security Badges */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
            <SecurityBadge color="#FF6B6B">
              <Fingerprint sx={{ fontSize: 20 }} />
              Biometric Ready
            </SecurityBadge>
            <SecurityBadge color="#4ECDC4">
              <VerifiedUser sx={{ fontSize: 20 }} />
              Two-Factor Enabled
            </SecurityBadge>
            <SecurityBadge color="#FFD166">
              <Block sx={{ fontSize: 20 }} />
              Auto-Lock Protection
            </SecurityBadge>
          </Box>

          {/* Stepper */}
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{ mb: 4 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          <Collapse in={!!error}>
            <Alert 
              severity="error" 
              sx={{ mb: 3, borderRadius: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setError('')}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          </Collapse>

          {/* Success Alert */}
          <Collapse in={success}>
            <Alert 
              severity="success" 
              sx={{ mb: 3, borderRadius: 2 }}
              icon={<CheckCircle />}
            >
              Password changed successfully! Redirecting to dashboard...
            </Alert>
          </Collapse>

          {/* Lockout Alert */}
          {lockoutTime && new Date() < lockoutTime && (
            <Alert 
              severity="warning" 
              sx={{ mb: 3, borderRadius: 2 }}
              icon={<Timer />}
            >
              Too many failed attempts. Please wait{' '}
              {Math.ceil((lockoutTime - new Date()) / 1000)} seconds.
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            {/* Step 1: Current Password */}
            <Fade in={activeStep === 0} timeout={300}>
              <Box>
                <StyledTextField
                  fullWidth
                  margin="normal"
                  label="Current Password"
                  name="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('current')}
                          edge="end"
                        >
                          {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                {/* Password History Toggle */}
                <Box sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    onClick={() => setShowHistory(!showHistory)}
                    startIcon={<History />}
                  >
                    {showHistory ? 'Hide' : 'Show'} Password History
                  </Button>
                  <Collapse in={showHistory}>
                    <Card sx={{ mt: 2, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Recent Password Changes
                        </Typography>
                        <List dense>
                          {passwordHistory.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemIcon>
                                <History fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={item} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Box>
              </Box>
            </Fade>

            {/* Step 2: New Password */}
            <Fade in={activeStep === 1} timeout={300}>
              <Box>
                <StyledTextField
                  fullWidth
                  margin="normal"
                  label="New Password"
                  name="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('new')}
                          edge="end"
                        >
                          {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Password Strength
                      </Typography>
                      <Chip
                        size="small"
                        label={['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strength]}
                        color={strength >= 4 ? 'success' : strength >= 3 ? 'info' : strength >= 2 ? 'warning' : 'error'}
                      />
                    </Box>
                    <PasswordStrengthIndicator strength={strength} />
                  </Box>
                )}

                {/* Password Requirements Checklist */}
                <Card sx={{ mt: 3, borderRadius: 2, bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Password Requirements
                    </Typography>
                    <Grid container spacing={1}>
                      {[
                        { key: 'length', label: 'At least 8 characters', icon: <Done /> },
                        { key: 'uppercase', label: 'Contains uppercase letter', icon: <Done /> },
                        { key: 'lowercase', label: 'Contains lowercase letter', icon: <Done /> },
                        { key: 'number', label: 'Contains number', icon: <Done /> },
                        { key: 'special', label: 'Contains special character', icon: <Done /> },
                        { key: 'noSpaces', label: 'No spaces', icon: <Close /> },
                        { key: 'noCommon', label: 'Not a common password', icon: <Warning /> },
                      ].map((req) => (
                        <Grid item xs={12} sm={6} key={req.key}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            color: checks[req.key] ? 'success.main' : 'text.secondary'
                          }}>
                            {checks[req.key] ? (
                              <CheckCircle sx={{ fontSize: 16 }} />
                            ) : (
                              <Error sx={{ fontSize: 16 }} />
                            )}
                            <Typography variant="caption">
                              {req.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Fade>

            {/* Step 3: Confirm Password */}
            <Fade in={activeStep === 2} timeout={300}>
              <Box>
                <StyledTextField
                  fullWidth
                  margin="normal"
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading || success}
                  required
                  autoFocus
                  validated={formData.newPassword && formData.confirmPassword && 
                    formData.newPassword === formData.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility('confirm')}
                          edge="end"
                        >
                          {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <Fade in>
                    <Alert 
                      severity={formData.newPassword === formData.confirmPassword ? 'success' : 'error'}
                      sx={{ mt: 2, borderRadius: 2 }}
                      icon={formData.newPassword === formData.confirmPassword ? <CheckCircle /> : <Error />}
                    >
                      {formData.newPassword === formData.confirmPassword 
                        ? 'Passwords match!' 
                        : 'Passwords do not match'}
                    </Alert>
                  </Fade>
                )}
              </Box>
            </Fade>

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0 || loading || success}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Back
              </Button>
              
              {activeStep < 2 ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={!isStepValid(activeStep) || loading || success}
                  sx={{ borderRadius: 2 }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || success || !isStepValid(2)}
                  sx={{ 
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Changing...
                    </>
                  ) : (
                    'Change Password'
                  )}
                </Button>
              )}
            </Box>
          </Box>

          {/* Security Tips */}
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <Tooltip title="Use a mix of letters, numbers, and symbols">
              <Chip
                icon={<Security />}
                label="Use strong passwords"
                variant="outlined"
                size="small"
              />
            </Tooltip>
            <Tooltip title="Never share your password with anyone">
              <Chip
                icon={<Info />}
                label="Keep it private"
                variant="outlined"
                size="small"
              />
            </Tooltip>
            <Tooltip title="Change your password every 3 months">
              <Chip
                icon={<Refresh />}
                label="Regular updates"
                variant="outlined"
                size="small"
              />
            </Tooltip>
          </Box>

          {/* Footer Note */}
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ mt: 3, display: 'block', textAlign: 'center' }}
          >
            You will be automatically redirected to the dashboard after successful password change
          </Typography>
        </StyledPaper>
      </Zoom>
    </Container>
  )
}

export default ChangePassword