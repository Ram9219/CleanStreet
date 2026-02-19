import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Stack,
  Skeleton,
  Fade,
  Zoom,
  Badge,
  useMediaQuery
} from '@mui/material'
import Grid from '@mui/material/GridLegacy'
import { styled } from '@mui/material/styles'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../utils/apiClient'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// Icons
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import BadgeIcon from '@mui/icons-material/Badge'
import SaveIcon from '@mui/icons-material/Save'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SecurityIcon from '@mui/icons-material/Security'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import VerifiedIcon from '@mui/icons-material/Verified'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import RefreshIcon from '@mui/icons-material/Refresh'

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  borderRadius: 24,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}))

const ProfileHeaderCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: 20,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  }
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.15)}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    width: 100,
    height: 100,
  }
}))

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.1)}`,
    borderColor: alpha(theme.palette.primary.main, 0.3),
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

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: 12,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
  },
  '&:disabled': {
    background: theme.palette.action.disabledBackground,
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

const Profile = () => {
  const theme = useTheme()
  const { user, isAuthenticated, refreshUser } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  
  // Responsive hooks
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  
  // State management
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [profilePicture, setProfilePicture] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  })

  // Memoized values
  const roleColors = useMemo(() => ({
    citizen: { bg: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main, label: 'Citizen' },
    volunteer: { bg: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main, label: 'Volunteer' },
    admin: { bg: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main, label: 'Admin' },
    'super-admin': { bg: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main, label: 'Super Admin' }
  }), [theme])

  const phoneValidation = useMemo(() => ({
    pattern: /^(\+91)?[6-9][0-9]{9}$/,
    message: 'Enter valid Indian mobile number (10 digits starting 6-9, optional +91)',
    maxLength: 13
  }), [])

  // Effects
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (user) {
      setProfilePicture(user.profilePicture || '')
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || ''
      })
    }
  }, [user])

  // Handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const normalized = value.replace(/[^0-9+]/g, '')
      setFormData(prev => ({ ...prev, phone: normalized }))
      return
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const isPhoneValid = useCallback((phone) => {
    if (!phone) return true
    return phoneValidation.pattern.test(phone)
  }, [phoneValidation])

  const phoneHasError = useMemo(() => 
    !isPhoneValid(formData.phone) && formData.phone !== '',
    [formData.phone, isPhoneValid]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await apiClient.put(
        '/auth/profile',
        {
          name: formData.name,
          phone: formData.phone
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        }
      )

      if (response.data.success) {
        toast.success('Profile updated successfully!')
        if (response.data.user) {
          setFormData({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            phone: response.data.user.phone || '',
            role: response.data.user.role || ''
          })
          setProfilePicture(response.data.user.profilePicture || '')
        }
        refreshUser()
        setEditMode(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setImageUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('image', file)

      const response = await apiClient.post('/auth/upload-profile-picture', formDataUpload, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        setProfilePicture(response.data.image.url)
        toast.success('Profile picture updated')
        refreshUser()
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload profile picture')
    } finally {
      setImageUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleCopyUserId = useCallback(() => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id)
      setCopied(true)
      toast.success('User ID copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    }
  }, [user?.id])

  const handleCancelEdit = useCallback(() => {
    setEditMode(false)
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || ''
    })
  }, [user])

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} key={item}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 }
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Title */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              My Profile
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your personal information and account settings
            </Typography>
          </Box>
        </motion.div>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Left Column - Profile Summary */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <StyledPaper>
                <Box sx={{ textAlign: 'center' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Tooltip title="Change profile picture">
                        <IconButton
                          size="small"
                          onClick={() => fileInputRef.current?.click()}
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            '&:hover': { bgcolor: theme.palette.primary.dark },
                            width: 32,
                            height: 32
                          }}
                        >
                          <PhotoCamera sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <StyledAvatar
                      src={profilePicture || undefined}
                      sx={{
                        width: { xs: 100, sm: 120 },
                        height: { xs: 100, sm: 120 },
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </StyledAvatar>
                  </Badge>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{ display: 'none' }}
                  />

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {user.name}
                  </Typography>
                  
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    justifyContent="center" 
                    sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
                  >
                    <Chip
                      icon={<VerifiedIcon />}
                      label={roleColors[user.role]?.label || 'User'}
                      sx={{
                        bgcolor: roleColors[user.role]?.bg,
                        color: roleColors[user.role]?.color,
                        fontWeight: 600,
                        '& .MuiChip-icon': { color: 'inherit' }
                      }}
                    />
                    {user.isSuperAdmin && (
                      <Chip
                        icon={<SecurityIcon />}
                        label="Super Admin"
                        sx={{
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.main,
                          fontWeight: 600
                        }}
                      />
                    )}
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <InfoCard>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Account Statistics
                      </Typography>
                      
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                              24
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Reports
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                              12
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Resolved
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </InfoCard>
                </Box>
              </StyledPaper>
            </motion.div>
          </Grid>

          {/* Right Column - Profile Details */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <StyledPaper>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Personal Information
                  </Typography>
                  {!editMode ? (
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      sx={{ borderRadius: 2, textTransform: 'none' }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelEdit}
                        sx={{ borderRadius: 2, textTransform: 'none' }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  )}
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editMode || loading}
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        disabled
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        helperText="Email cannot be changed"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={phoneHasError}
                        helperText={phoneHasError ? phoneValidation.message : 'Optional: +91XXXXXXXXXX or 10 digits'}
                        disabled={!editMode || loading}
                        InputProps={{
                          startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        inputProps={{
                          inputMode: 'tel',
                          maxLength: phoneValidation.maxLength
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Role"
                        name="role"
                        value={roleColors[formData.role]?.label || 'User'}
                        disabled
                        InputProps={{
                          startAdornment: <BadgeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                        helperText="Role cannot be changed"
                      />
                    </Grid>

                    {editMode && (
                      <Grid item xs={12}>
                        <Alert 
                          severity="info" 
                          sx={{ 
                            mb: 2, 
                            borderRadius: 2,
                            '& .MuiAlert-message': { width: '100%' }
                          }}
                        >
                          <Typography variant="body2">
                            Only your name and phone number can be updated. 
                            To change your password, use the forgot password option on the login page.
                          </Typography>
                        </Alert>
                      </Grid>
                    )}

                    {editMode && (
                      <Grid item xs={12}>
                        <GradientButton
                          fullWidth
                          type="submit"
                          disabled={loading || phoneHasError}
                          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                          sx={{ mt: 2 }}
                        >
                          {loading ? 'Saving Changes...' : 'Save Changes'}
                        </GradientButton>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Account Details Section */}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Account Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InfoCard>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <FingerprintIcon color="primary" />
                          <Typography variant="subtitle2" color="text.secondary">
                            User ID
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                          p: 1,
                          borderRadius: 1
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontFamily: 'monospace',
                              fontSize: { xs: '0.7rem', sm: '0.8rem' },
                              wordBreak: 'break-all'
                            }}
                          >
                            {user.id}
                          </Typography>
                          <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                            <IconButton size="small" onClick={handleCopyUserId}>
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </InfoCard>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InfoCard>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <CheckCircleIcon color="success" />
                          <Typography variant="subtitle2" color="text.secondary">
                            Account Status
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1,
                          bgcolor: alpha(theme.palette.success.main, 0.05),
                          p: 2,
                          borderRadius: 1
                        }}>
                          <Box sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: 'success.main',
                            animation: 'pulse 2s infinite'
                          }} />
                          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                            Active
                          </Typography>
                        </Box>
                      </CardContent>
                    </InfoCard>
                  </Grid>

                  <Grid item xs={12}>
                    <InfoCard>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <CalendarTodayIcon color="info" />
                          <Typography variant="subtitle2" color="text.secondary">
                            Recent Activity
                          </Typography>
                        </Box>
                        <Stack spacing={1}>
                          <Typography variant="body2">
                            • Last login: Today at 9:30 AM
                          </Typography>
                          <Typography variant="body2">
                            • Profile updated: {new Date(user.updatedAt || Date.now()).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2">
                            • Account created: {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                </Grid>

                {/* Security Section */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Security Settings
                  </Typography>
                  <InfoCard>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                          <Typography variant="subtitle2" gutterBottom>
                            Two-Factor Authentication
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add an extra layer of security to your account
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                          >
                            Enable 2FA
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </InfoCard>
                </Box>

                {/* Activity Timeline */}
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Recent Reports
                  </Typography>
                  <InfoCard>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle2">Pothole on Main Street</Typography>
                            <Typography variant="caption" color="text.secondary">2 days ago • In Progress</Typography>
                          </Box>
                          <Chip label="Active" size="small" color="warning" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle2">Broken Street Light</Typography>
                            <Typography variant="caption" color="text.secondary">5 days ago • Resolved</Typography>
                          </Box>
                          <Chip label="Resolved" size="small" color="success" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="subtitle2">Garbage Collection</Typography>
                            <Typography variant="caption" color="text.secondary">1 week ago • Completed</Typography>
                          </Box>
                          <Chip label="Completed" size="small" color="success" />
                        </Box>
                      </Stack>
                    </CardContent>
                  </InfoCard>
                </Box>
              </StyledPaper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </Container>
  )
}

export default Profile