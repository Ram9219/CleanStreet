import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Stack,
  Avatar
} from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import toast from 'react-hot-toast'
import { buildApiUrl, apiClient } from '../../utils/apiClient'

const AdminSettings = ({ currentMode = 'light', toggleColorMode }) => {
  const { user, refreshUser } = useAuth()
  const [imageUploading, setImageUploading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const fileInputRef = useRef(null)

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    auditLogs: true,
    darkMode: currentMode === 'dark'
  })

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    setPreferences((prev) => ({
      ...prev,
      darkMode: currentMode === 'dark'
    }))
  }, [currentMode])

  const handlePrefToggle = (key) => {
    if (key === 'darkMode') {
      if (typeof toggleColorMode === 'function') {
        toggleColorMode()
      }
      setMessage('Dark mode preference updated locally.')
      return
    }

    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
    setMessage('Preferences updated locally (wire to backend when ready).')
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setMessage('Please fill in all password fields.')
      toast.error('Please fill in all password fields.')
      return
    }
    if (passwords.next !== passwords.confirm) {
      setMessage('New passwords do not match.')
      toast.error('New passwords do not match.')
      return
    }
    if (passwords.next.length < 8) {
      setMessage('New password must be at least 8 characters.')
      toast.error('New password must be at least 8 characters.')
      return
    }

    setPasswordLoading(true)
    try {
      const response = await apiClient.post('/admin/force-password-change', {
        currentPassword: passwords.current,
        newPassword: passwords.next
      })

      if (response.data.success) {
        toast.success('Password changed successfully!')
        setMessage('Password changed successfully!')
        setPasswords({ current: '', next: '', confirm: '' })
        await refreshUser()
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to change password'
      setMessage(errorMsg)
      toast.error(errorMsg)
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleProfileImageChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file')
      return
    }

    setImageUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('image', file)

      const response = await fetch(buildApiUrl('/auth/upload-profile-picture'), {
        method: 'POST',
        body: formDataUpload,
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Profile picture updated')
        refreshUser()
      } else {
        throw new Error(data.error || 'Failed to upload profile picture')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to upload profile picture')
    } finally {
      setImageUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Admin Settings
      </Typography>

      {message && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Profile</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={user?.profilePicture || undefined}
                  sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </Avatar>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageUploading}
                    sx={{ textTransform: 'none' }}
                  >
                    {imageUploading ? 'Uploading...' : 'Change Photo'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{ display: 'none' }}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                value={user?.name || ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                value={user?.email || ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Role"
                value={user?.isSuperAdmin ? 'Super Admin' : user?.role || 'Admin'}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Preferences</Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.emailNotifications}
                  onChange={() => handlePrefToggle('emailNotifications')}
                />
              }
              label="Email notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.auditLogs}
                  onChange={() => handlePrefToggle('auditLogs')}
                />
              }
              label="Audit logging for admin actions"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.darkMode}
                  onChange={() => handlePrefToggle('darkMode')}
                />
              }
              label="Prefer dark mode (local setting)"
            />
          </Stack>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Security</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Change your password for enhanced security.
          </Typography>
          <Box
            component="form"
            onSubmit={handlePasswordSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 420 }}
          >
            <TextField
              type="password"
              label="Current password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              disabled={passwordLoading}
              fullWidth
            />
            <TextField
              type="password"
              label="New password"
              value={passwords.next}
              onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
              disabled={passwordLoading}
              helperText="Must be at least 8 characters"
              fullWidth
            />
            <TextField
              type="password"
              label="Confirm new password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              disabled={passwordLoading}
              fullWidth
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" disabled={passwordLoading}>
                {passwordLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="text"
                onClick={() => setPasswords({ current: '', next: '', confirm: '' })}
                disabled={passwordLoading}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Box>
  )
}

export default AdminSettings
