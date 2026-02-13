import React, { memo, useState, useCallback, useMemo } from 'react'
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Button,
  alpha,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Collapse,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Fade,
  Zoom,
  Slide
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import ErrorIcon from '@mui/icons-material/Error'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import ClearIcon from '@mui/icons-material/Clear'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import SettingsIcon from '@mui/icons-material/Settings'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArchiveIcon from '@mui/icons-material/Archive'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import UpdateIcon from '@mui/icons-material/Update'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// ==================== STYLED COMPONENTS ====================

const NotificationItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => !['read', 'typeColor'].includes(prop)
})(({ theme, read, typeColor }) => ({
  padding: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  background: read 
    ? 'transparent' 
    : `linear-gradient(135deg, ${alpha(typeColor || theme.palette.primary.main, 0.05)} 0%, transparent 100%)`,
  borderLeft: read ? 'none' : `3px solid ${typeColor || theme.palette.primary.main}`,
  '&:hover': {
    transform: 'translateX(4px)',
    background: alpha(typeColor || theme.palette.primary.main, 0.08),
    '& .notification-actions': {
      opacity: 1,
      transform: 'translateX(0)',
    },
    '& .notification-time': {
      opacity: 0,
      transform: 'translateX(20px)',
    }
  }
}))

const NotificationActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: '50%',
  transform: 'translateY(-50%) translateX(20px)',
  opacity: 0,
  transition: 'all 0.3s ease',
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2
}))

const TimeBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(2),
  top: '50%',
  transform: 'translateY(-50%)',
  transition: 'all 0.3s ease',
  fontSize: '0.65rem',
  height: 20,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(4px)'
}))

const StyledAvatar = styled(Avatar)(({ theme, typeColor }) => ({
  width: 40,
  height: 40,
  backgroundColor: alpha(typeColor || theme.palette.primary.main, 0.1),
  color: typeColor || theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: alpha(typeColor || theme.palette.primary.main, 0.2),
  }
}))

const FilterChip = styled(Chip)(({ theme, selected, color }) => ({
  margin: theme.spacing(0.5),
  transition: 'all 0.2s ease',
  backgroundColor: selected ? alpha(color || theme.palette.primary.main, 0.1) : 'transparent',
  borderColor: selected ? color || theme.palette.primary.main : alpha(theme.palette.divider, 0.2),
  color: selected ? color || theme.palette.primary.main : theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: alpha(color || theme.palette.primary.main, 0.15),
    transform: 'translateY(-2px)',
  }
}))

// ==================== ANIMATIONS ====================

const pulseKeyframes = {
  '0%, 100%': { transform: 'scale(1)', opacity: 1 },
  '50%': { transform: 'scale(1.2)', opacity: 0.8 }
}

// ==================== MAIN COMPONENT ====================

const NotificationsPanel = memo(({
  notifications = [],
  unreadCount = 0,
  loading = false,
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onNavigate = () => {},
  onClear = () => {},
  onArchive = () => {},
  onDelete = () => {},
  onRefresh = () => {},
  onFilterChange = () => {},
  onSettings = () => {}
}) => {
  const theme = useTheme()
  const [filterAnchor, setFilterAnchor] = useState(null)
  const [settingsAnchor, setSettingsAnchor] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [showRead, setShowRead] = useState(true)
  const [compactMode, setCompactMode] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  // Get icon based on notification type
  const getIcon = useCallback((type) => {
    const iconProps = { sx: { fontSize: 24 } }
    switch (type) {
      case 'success':
        return <CheckCircleIcon {...iconProps} sx={{ ...iconProps.sx, color: '#06D6A0' }} />
      case 'error':
        return <ErrorIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FF6B6B' }} />
      case 'warning':
        return <WarningIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FFD166' }} />
      case 'update':
        return <UpdateIcon {...iconProps} sx={{ ...iconProps.sx, color: '#4ECDC4' }} />
      case 'info':
      default:
        return <InfoIcon {...iconProps} sx={{ ...iconProps.sx, color: '#667eea' }} />
    }
  }, [])

  // Get color based on notification type
  const getTypeColor = useCallback((type) => {
    switch (type) {
      case 'success':
        return '#06D6A0'
      case 'error':
        return '#FF6B6B'
      case 'warning':
        return '#FFD166'
      case 'update':
        return '#4ECDC4'
      case 'info':
      default:
        return '#667eea'
    }
  }, [])

  // Format time with relative timing
  const formatTime = useCallback((date) => {
    if (!date) return 'Just now'
    
    const now = new Date()
    const notifDate = new Date(date)
    const diffInSeconds = Math.floor((now - notifDate) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    
    return notifDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

  // Filter notifications
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications]
    
    if (filterType !== 'all') {
      filtered = filtered.filter(n => n.type === filterType)
    }
    
    if (!showRead) {
      filtered = filtered.filter(n => !n.read)
    }
    
    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [notifications, filterType, showRead])

  // Group notifications by date
  const groupedNotifications = useMemo(() => {
    const groups = {}
    
    filteredNotifications.forEach(notification => {
      const date = new Date(notification.timestamp).toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
    })
    
    return groups
  }, [filteredNotifications])

  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchor(null)
  }

  const handleFilterSelect = (type) => {
    setFilterType(type)
    onFilterChange?.(type)
    handleFilterClose()
  }

  // Handle settings menu
  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget)
  }

  const handleSettingsClose = () => {
    setSettingsAnchor(null)
  }

  // Handle mark as read
  const handleMarkAsRead = useCallback((id) => {
    onMarkAsRead(id)
  }, [onMarkAsRead])

  // Handle mark all as read
  const handleMarkAllAsRead = useCallback(() => {
    onMarkAllAsRead?.()
    handleSettingsClose()
  }, [onMarkAllAsRead])

  // Handle clear all
  const handleClearAll = useCallback(() => {
    onClear?.()
    handleSettingsClose()
  }, [onClear])

  // Filter options
  const filterOptions = [
    { type: 'all', label: 'All', icon: <NotificationsNoneIcon />, color: '#667eea' },
    { type: 'info', label: 'Info', icon: <InfoIcon />, color: '#667eea' },
    { type: 'success', label: 'Success', icon: <CheckCircleIcon />, color: '#06D6A0' },
    { type: 'warning', label: 'Warning', icon: <WarningIcon />, color: '#FFD166' },
    { type: 'error', label: 'Error', icon: <ErrorIcon />, color: '#FF6B6B' },
    { type: 'update', label: 'Updates', icon: <UpdateIcon />, color: '#4ECDC4' }
  ]

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: { xs: '100%', sm: 400 },
        maxHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: 'background.paper',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
      <Box sx={{
        p: 2,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                '@keyframes pulse': pulseKeyframes
              }
            }}
          >
            <NotificationsNoneIcon />
          </Badge>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={onRefresh}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Filter">
            <IconButton size="small" onClick={handleFilterClick}>
              <FilterListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Settings">
            <IconButton size="small" onClick={handleSettingsClick}>
              <SettingsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }
          }}
        >
          {filterOptions.map((option) => (
            <MenuItem
              key={option.type}
              onClick={() => handleFilterSelect(option.type)}
              selected={filterType === option.type}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  bgcolor: alpha(option.color, 0.1)
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                <Box sx={{ color: option.color }}>
                  {option.icon}
                </Box>
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {option.label}
                </Typography>
                {filterType === option.type && (
                  <CheckCircleOutlineIcon sx={{ fontSize: 16, color: 'success.main' }} />
                )}
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Settings Menu */}
        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={handleSettingsClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }
          }}
        >
          <MenuItem onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
            <DoneAllIcon sx={{ mr: 1.5, fontSize: 20 }} />
            <Typography variant="body2">Mark all as read</Typography>
          </MenuItem>
          <MenuItem onClick={handleClearAll} disabled={notifications.length === 0}>
            <DeleteIcon sx={{ mr: 1.5, fontSize: 20 }} />
            <Typography variant="body2">Clear all</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={showRead}
                  onChange={(e) => setShowRead(e.target.checked)}
                />
              }
              label="Show read notifications"
              sx={{ ml: 0 }}
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={compactMode}
                  onChange={(e) => setCompactMode(e.target.checked)}
                />
              }
              label="Compact mode"
              sx={{ ml: 0 }}
            />
          </MenuItem>
        </Menu>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ p: 1, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {filterOptions.slice(1).map((option) => (
            <FilterChip
              key={option.type}
              label={option.label}
              size="small"
              variant="outlined"
              color={option.color}
              selected={filterType === option.type}
              onClick={() => setFilterType(option.type === filterType ? 'all' : option.type)}
              icon={option.icon}
            />
          ))}
        </Box>
      </Box>

      {/* Content */}
      {loading ? (
        <Box sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 300,
          gap: 2
        }}>
          <CircularProgress size={48} />
          <Typography color="text.secondary" variant="body2">
            Loading notifications...
          </Typography>
        </Box>
      ) : filteredNotifications.length === 0 ? (
        <Fade in timeout={500}>
          <Box sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            gap: 2
          }}>
            <Zoom in timeout={500}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <NotificationsNoneIcon sx={{ fontSize: 40, opacity: 0.5 }} />
              </Box>
            </Zoom>
            <Box>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                All caught up!
              </Typography>
              <Typography variant="body2" color="text.disabled">
                {filterType !== 'all' 
                  ? `No ${filterType} notifications` 
                  : 'No new notifications at the moment'}
              </Typography>
            </Box>
            {filterType !== 'all' && (
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => setFilterType('all')}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Show all notifications
              </Button>
            )}
          </Box>
        </Fade>
      ) : (
        <Box sx={{ overflow: 'auto', flex: 1 }}>
          {Object.entries(groupedNotifications).map(([date, items]) => (
            <Box key={date}>
              <Box sx={{ 
                p: 1, 
                px: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
              }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
              <List sx={{ p: 0 }}>
                {items.map((notification, index) => {
                  const typeColor = getTypeColor(notification.type)
                  const isHovered = hoveredId === notification.id
                  
                  return (
                    <Slide 
                      direction="left" 
                      in 
                      timeout={300}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      key={notification.id || index}
                    >
                      <Box>
                        <NotificationItem
                          read={notification.read}
                          typeColor={typeColor}
                          onMouseEnter={() => setHoveredId(notification.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={() => {
                            if (!notification.read) {
                              handleMarkAsRead(notification.id)
                            }
                            if (notification.path) {
                              onNavigate(notification.path)
                            }
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: 2,
                            width: '100%',
                            pr: 8
                          }}>
                            <StyledAvatar typeColor={typeColor}>
                              {getIcon(notification.type)}
                            </StyledAvatar>
                            
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                      fontWeight: notification.read ? 500 : 700,
                                      color: notification.read ? 'text.secondary' : 'text.primary'
                                    }}
                                  >
                                    {notification.title}
                                  </Typography>
                                  {notification.badge && (
                                    <Chip
                                      label={notification.badge}
                                      size="small"
                                      sx={{
                                        height: 18,
                                        fontSize: '0.6rem',
                                        bgcolor: alpha(typeColor, 0.1),
                                        color: typeColor
                                      }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box sx={{ mt: 0.5 }}>
                                  <Typography 
                                    variant="body2" 
                                    color="text.secondary"
                                    sx={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: compactMode ? 1 : 2,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      lineHeight: 1.5
                                    }}
                                  >
                                    {notification.message}
                                  </Typography>
                                  {notification.metadata && (
                                    <Box sx={{ 
                                      display: 'flex', 
                                      gap: 2, 
                                      mt: 1,
                                      flexWrap: 'wrap'
                                    }}>
                                      {notification.metadata.map((meta, i) => (
                                        <Chip
                                          key={i}
                                          label={meta}
                                          size="small"
                                          variant="outlined"
                                          sx={{ 
                                            height: 20,
                                            fontSize: '0.6rem',
                                            borderColor: alpha(typeColor, 0.3)
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              }
                              primaryTypographyProps={{
                                variant: 'body2',
                              }}
                            />
                          </Box>

                          <TimeBadge
                            label={formatTime(notification.timestamp)}
                            size="small"
                            className="notification-time"
                            icon={<AccessTimeIcon sx={{ fontSize: 12 }} />}
                          />

                          <NotificationActions className="notification-actions">
                            {!notification.read && (
                              <Tooltip title="Mark as read">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMarkAsRead(notification.id)
                                  }}
                                  sx={{
                                    bgcolor: alpha(typeColor, 0.1),
                                    '&:hover': {
                                      bgcolor: alpha(typeColor, 0.2),
                                    }
                                  }}
                                >
                                  <DoneAllIcon sx={{ fontSize: 16, color: typeColor }} />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip title="Archive">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onArchive?.(notification.id)
                                }}
                              >
                                <ArchiveIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDelete?.(notification.id)
                                }}
                                sx={{
                                  '&:hover': {
                                    bgcolor: alpha(theme.palette.error.main, 0.1),
                                    color: theme.palette.error.main
                                  }
                                }}
                              >
                                <ClearIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </NotificationActions>
                        </NotificationItem>
                        {index < items.length - 1 && <Divider />}
                      </Box>
                    </Slide>
                  )
                })}
              </List>
            </Box>
          ))}
        </Box>
      )}

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <Box sx={{
          p: 2,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="caption" color="text.secondary">
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </Typography>
          <Button
            size="small"
            endIcon={<DoneAllIcon />}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 600,
              borderRadius: 2
            }}
            onClick={() => onNavigate('/notifications')}
          >
            View All
          </Button>
        </Box>
      )}
    </Paper>
  )
})

NotificationsPanel.displayName = 'NotificationsPanel'

export default NotificationsPanel