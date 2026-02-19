import React, { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  alpha,
  Stack,
} from '@mui/material'
import {
  BugReport,
  CheckCircle,
  Comment,
  ThumbUp,
  AccessTime,
  LocationOn,
  Timeline as TimelineIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { apiClient } from '../../utils/apiClient'
import { styled } from '@mui/material/styles'
import AppLoader from '../../components/Feedback/AppLoader'

const ActivityCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
    : `linear-gradient(135deg, ${alpha('#ffffff', 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 12,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
  }
}))

const Activity = () => {
  const { user } = useAuth()
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // kept for future use

  useEffect(() => {
    fetchActivities()
  }, [filter])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      // Fetch user's reports
      const reportsRes = await apiClient.get('/reports/my-reports', {
        withCredentials: true
      })

      // Extract reports array from response
      const reports = reportsRes.data?.reports || reportsRes.data || []

      // Transform reports into activity items
      const reportActivities = reports.map(report => ({
        id: `report-${report._id}`,
        type: 'report',
        action: report.status === 'resolved' ? 'resolved' : 'created',
        title: report.title,
        description: report.description,
        category: report.category,
        status: report.status,
        location: report.address,
        timestamp: report.createdAt,
        icon: report.status === 'resolved' ? CheckCircle : BugReport,
        color: report.status === 'resolved' ? 'success' : 'primary'
      }))

      // Sort by timestamp
      const allActivities = [...reportActivities].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )

      setActivities(allActivities)
    } catch (err) {
      console.error('Failed to fetch activities', err)
      setActivities([])
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (activity) => {
    const IconComponent = activity.icon
    return (
      <Avatar
        sx={{
          bgcolor: alpha(
            activity.color === 'success' ? '#4caf50' : 
            activity.color === 'warning' ? '#ff9800' : '#1976d2',
            0.1
          ),
          color: activity.color === 'success' ? '#4caf50' : 
                 activity.color === 'warning' ? '#ff9800' : '#1976d2',
          width: 48,
          height: 48
        }}
      >
        <IconComponent />
      </Avatar>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      resolved: 'success',
      pending: 'warning',
      'in-progress': 'info',
      open: 'primary'
    }
    return colors[status] || 'default'
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <AppLoader
        message="Loading activity"
        submessage="Fetching your recent updates"
        minHeight="80vh"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        {/* Activity Feed */}
        {activities.length === 0 ? (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
              <TimelineIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No activity yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start reporting issues to see your activity here
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Stack spacing={3} alignItems="center">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                style={{ width: '100%', maxWidth: 600 }}
              >
                <ActivityCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {getActivityIcon(activity)}
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {activity.action === 'created' ? 'Reported Issue' : 'Issue Resolved'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTime sx={{ fontSize: 16 }} />
                              {formatTimestamp(activity.timestamp)}
                            </Typography>
                          </Box>
                          <Chip
                            label={activity.status}
                            color={getStatusColor(activity.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                          />
                        </Box>

                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {activity.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {activity.description?.substring(0, 150)}
                          {activity.description?.length > 150 ? '...' : ''}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          <Chip
                            label={activity.category}
                            size="small"
                            variant="outlined"
                            sx={{ textTransform: 'capitalize' }}
                          />
                          <Chip
                            icon={<LocationOn sx={{ fontSize: 16 }} />}
                            label={activity.location?.substring(0, 30) || 'Location not specified'}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </ActivityCard>
              </motion.div>
            ))}
          </Stack>
        )}
      </Container>
    </motion.div>
  )
}

export default Activity
