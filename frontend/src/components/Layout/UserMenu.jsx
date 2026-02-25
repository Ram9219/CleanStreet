import React, { memo } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  alpha,
  CircularProgress
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { getScopedPath } from '../../utils/subdomain'

const UserMenu = memo(({
  user = {},
  isSuperAdmin = false,
  isAdmin = false,
  theme,
  onNavigate = () => {},
  onLogout = () => {},
  onToggleTheme = () => {},
  loggingOut = false
}) => {
  const isDarkMode = theme.palette.mode === 'dark'

  const getInitials = (name) => {
    if (!name) return '?'
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const menuItems = [
    {
      icon: <PersonIcon fontSize="small" />,
      label: 'My Profile',
      action: () => onNavigate('/profile'),
      divider: true
    },
    ...(isAdmin ? [
      {
        icon: <AdminPanelSettingsIcon fontSize="small" />,
        label: 'Admin Dashboard',
        action: () => onNavigate(getScopedPath('admin', '/dashboard')),
        divider: false
      }
    ] : []),
    {
      icon: <SettingsIcon fontSize="small" />,
      label: 'Settings',
      action: () => onNavigate('/settings'),
      divider: false
    },
    {
      icon: isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />,
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      action: onToggleTheme,
      divider: true
    },
    {
      icon: <LogoutIcon fontSize="small" />,
      label: 'Logout',
      action: onLogout,
      isLogout: true
    }
  ]

  return (
    <Box sx={{ width: 280 }}>
      {/* User Info Header */}
      <Box sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
      }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: 'primary.main',
            color: 'white',
            fontWeight: 700,
            fontSize: '1rem'
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user?.name || 'User'}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'block'
            }}
          >
            {user?.email || 'user@example.com'}
          </Typography>
          {isAdmin && (
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
              {isSuperAdmin ? 'Super Admin' : 'Admin'}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Menu Items */}
      <List sx={{ py: 1 }}>
        {menuItems.map((item, index) => (
          <Box key={index}>
            <ListItemButton
              onClick={item.action}
              disabled={loggingOut && item.isLogout}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                },
                ...(item.isLogout && {
                  color: 'error.main'
                })
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: item.isLogout ? 'error.main' : 'inherit'
                }}
              >
                {loggingOut && item.isLogout ? (
                  <CircularProgress size={20} />
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { fontWeight: 500 }
                }}
              />
            </ListItemButton>
            {item.divider && <Divider sx={{ my: 0.5 }} />}
          </Box>
        ))}
      </List>
    </Box>
  )
})

UserMenu.displayName = 'UserMenu'

export default UserMenu
