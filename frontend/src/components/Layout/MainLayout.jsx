// import React, { useState, useEffect, useCallback } from 'react'
// import { useAuth } from '../../contexts/AuthContext'
// import { buildApiUrl } from '../../utils/apiClient'
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   IconButton,
//   Menu,
//   MenuItem,
//   Avatar,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   useTheme,
//   Badge,
//   Fab,
//   Zoom,
//   CircularProgress,
//   Tooltip,
//   Breadcrumbs,
//   Link,
//   Alert,
//   Snackbar,
//   Paper,
//   Chip,
//   alpha,
//   Fade,
//   Collapse,
//   ListItemButton,
//   LinearProgress
// } from '@mui/material'
// import {
//   Menu as MenuIcon,
//   Home,
//   Person,
//   Logout,
//   Dashboard,
//   Report,
//   Map,
//   Settings,
//   Notifications,
//   KeyboardArrowUp,
//   Brightness4,
//   Brightness7,
//   AdminPanelSettings,
//   History,
//   ChevronLeft,
//   ChevronRight,
//   ExpandLess,
//   ExpandMore,
//   Verified,
//   Security,
//   Timeline,
//   TrendingUp,
//   BugReport,
//   CleanHands,
//   LocationOn,
//   VolunteerActivism as Volunteer,
//   Event,
//   CalendarToday,
//   AssignmentTurnedIn
// } from '@mui/icons-material'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { getScopedPath, isScopedPath } from '../../utils/subdomain'
// import { styled } from '@mui/material/styles'
// import logoSvg from '../../assets/images/logo.svg'

// const drawerWidth = 280

// // Styled Components
// const StyledAppBar = styled(AppBar)(({ theme }) => ({
//   background: theme.palette.mode === 'dark'
//     ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`
//     : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//   backdropFilter: 'blur(20px)',
//   borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//   boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     boxShadow: `0 12px 48px ${alpha(theme.palette.common.black, 0.15)}`,
//   }
// }))

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   '& .MuiDrawer-paper': {
//     background: theme.palette.mode === 'dark'
//       ? `linear-gradient(195deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.dark, 0.05)} 100%)`
//       : `linear-gradient(195deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
//     borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//     backdropFilter: 'blur(10px)',
//   }
// }))

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   borderRadius: 12,
//   margin: '4px 8px',
//   padding: '12px 16px',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.08),
//     transform: 'translateX(4px)',
//   },
//   '&.Mui-selected': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.12),
//     borderLeft: `4px solid ${theme.palette.primary.main}`,
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.primary.main, 0.16),
//     }
//   }
// }))

// const NavButton = styled(Button)(({ theme, selected }) => ({
//   position: 'relative',
//   borderRadius: 12,
//   padding: '10px 20px',
//   margin: '0 4px',
//   fontWeight: selected ? 600 : 500,
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   overflow: 'hidden',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: selected 
//       ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
//       : 'transparent',
//     borderRadius: 12,
//     zIndex: 1,
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: '50%',
//     transform: 'translateX(-50%)',
//     width: selected ? '80%' : '0%',
//     height: 3,
//     background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//     borderRadius: '2px 2px 0 0',
//     transition: 'width 0.3s ease',
//   },
//   '&:hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
//     '&::after': {
//       width: '60%',
//     }
//   },
//   '& .MuiButton-label': {
//     position: 'relative',
//     zIndex: 2,
//   }
// }))

// const MainLayout = ({ children, toggleColorMode }) => {
//   const { user, logout, isAdmin, isSuperAdmin } = useAuth()
//   const [notifications, setNotifications] = useState([])
//   const [unreadCount, setUnreadCount] = useState(0)
//   const navigate = useNavigate()
//   const location = useLocation()
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [loggingOut, setLoggingOut] = useState(false)
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })
//   const [drawerHovered, setDrawerHovered] = useState(false)
//   const [expandedSection, setExpandedSection] = useState(null)
//   const isVolunteerScope = isScopedPath('volunteer')
//   const scopedPath = (path) => (isVolunteerScope ? getScopedPath('volunteer', path) : path)

//   const fetchNotifications = useCallback(async () => {
//     if (!user) return
//     try {
//       const response = await fetch(buildApiUrl('/notifications?limit=20'), {
//         credentials: 'include'
//       })
//       const data = await response.json()
//       if (data.success) {
//         const normalized = (data.notifications || []).map((item) => ({
//           id: item._id,
//           title: item.title,
//           message: item.message,
//           link: item.link,
//           type: item.type,
//           unread: !item.isRead,
//           timestamp: item.createdAt
//         }))
//         setNotifications(normalized)
//         setUnreadCount(data.unreadCount || 0)
//       }
//     } catch (error) {
//       console.error('Notifications fetch error:', error)
//     }
//   }, [user])

//   useEffect(() => {
//     fetchNotifications()
//     const intervalId = setInterval(fetchNotifications, 45000)
//     return () => clearInterval(intervalId)
//   }, [fetchNotifications])

//   const markAsRead = async (id) => {
//     try {
//       await fetch(buildApiUrl(`/notifications/${id}/read`), {
//         method: 'PUT',
//         credentials: 'include'
//       })
//       setNotifications((prev) => prev.map((item) => (
//         item.id === id ? { ...item, unread: false } : item
//       )))
//       setUnreadCount((prev) => Math.max(prev - 1, 0))
//     } catch (error) {
//       console.error('Notification update error:', error)
//     }
//   }

//   // Get breadcrumbs from current path
//   const getBreadcrumbs = useCallback(() => {
//     const pathnames = location.pathname.split('/').filter(x => x)
//     return pathnames.map((value, index) => {
//       const to = `/${pathnames.slice(0, index + 1).join('/')}`
//       const isLast = index === pathnames.length - 1
      
//       const labelMap = {
//         'admin': 'Admin',
//         'profile': 'Profile',
//         'map': 'Map',
//         'reports': 'Reports',
//         'issues': 'Issues',
//         'community': 'Community',
//         'my-reports': 'My Reports',
//         'report-issue': 'Report Issue',
//         'dashboard': 'Dashboard',
//         'settings': 'Settings',
//         'volunteer': 'Volunteer',
//         'events': 'Events',
//         'my-events': 'My Events'
//       }
      
//       const label = labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1)
      
//       return isLast ? (
//         <Typography key={to} color="text.primary" sx={{ fontWeight: 600 }}>
//           {label}
//         </Typography>
//       ) : (
//         <Link 
//           key={to} 
//           href={to}
//           onClick={(e) => {
//             e.preventDefault()
//             navigate(to)
//           }}
//           color="inherit"
//           sx={{ 
//             textDecoration: 'none', 
//             fontWeight: 500,
//             display: 'flex',
//             alignItems: 'center',
//             gap: 0.5,
//             '&:hover': { 
//               textDecoration: 'none',
//               color: 'primary.main',
//               '& .MuiSvgIcon-root': {
//                 transform: 'translateX(2px)',
//               }
//             }
//           }}
//         >
//           {label}
//           <ChevronRight sx={{ fontSize: 16, transition: 'transform 0.2s' }} />
//         </Link>
//       )
//     })
//   }, [location.pathname, navigate])

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleNotificationClick = (event) => {
//     setNotificationAnchorEl(event.currentTarget)
//   }

//   const handleNotificationClose = () => {
//     setNotificationAnchorEl(null)
//   }

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const handleLogout = async () => {
//     setLoggingOut(true)
//     try {
//       await logout()
//       setSnackbar({ open: true, message: 'Logged out successfully', severity: 'success' })
//       navigate(scopedPath('/login'))
//     } catch (error) {
//       console.error('Logout failed:', error)
//       setSnackbar({ open: true, message: 'Logout failed. Please try again.', severity: 'error' })
//     } finally {
//       setLoggingOut(false)
//       handleClose()
//     }
//   }

//   const handleNavigation = (path) => {
//     navigate(path)
//     setMobileOpen(false)
//     handleClose()
//   }

//   const navItems = [
//     {
//       label: 'Home',
//       path: scopedPath('/home'),
//       icon: <Home />, 
//       show: user?.role === 'volunteer',
//       color: 'primary'
//     },
//     {
//       label: 'Dashboard',
//       path: scopedPath('/dashboard'),
//       icon: <Dashboard />, 
//       show: user?.role !== 'volunteer',
//       color: 'primary'
//     },
//     {
//       label: 'Volunteer Dashboard',
//       path: scopedPath('/dashboard'),
//       icon: <Volunteer />, 
//       show: user?.role === 'volunteer',
//       color: 'primary'
//     },
//     {
//       label: 'Community',
//       path: scopedPath('/community'),
//       icon: <LocationOn />, 
//       show: true,
//       color: 'warning'
//     },
//     {
//       label: 'My Reports',
//       path: scopedPath('/my-reports'),
//       icon: <History />, 
//       show: user?.role !== 'volunteer',
//       color: 'info'
//     },
//     {
//       label: 'Volunteer Reports',
//       path: scopedPath('/reports'),
//       icon: <AssignmentTurnedIn />, 
//       show: user?.role === 'volunteer',
//       color: 'success'
//     },
//     {
//       label: 'Events',
//       path: scopedPath('/events'),
//       icon: <Event />, 
//       show: user?.role === 'volunteer',
//       color: 'secondary'
//     },
//     {
//       label: 'My Events',
//       path: scopedPath('/my-events'),
//       icon: <CalendarToday />, 
//       show: user?.role === 'volunteer',
//       color: 'info'
//     },
//     {
//       label: 'Report Issue',
//       path: scopedPath('/report-issue'),
//       icon: <CleanHands />, 
//       show: user?.role !== 'volunteer',
//       color: 'success'
//     },
//     {
//       label: 'Map',
//       path: scopedPath('/map'),
//       icon: <Map />, 
//       show: user?.role !== 'volunteer',
//       color: 'secondary'
//     },
//     {
//       label: 'Activity',
//       path: scopedPath('/activity'),
//       icon: <Timeline />, 
//       show: user?.role !== 'volunteer',
//       color: 'info'
//     },
//     {
//       label: 'Analytics',
//       path: scopedPath('/analytics'),
//       icon: <TrendingUp />, 
//       show: user?.role !== 'volunteer',
//       color: 'warning'
//     },
//     {
//       label: 'Profile',
//       path: scopedPath('/profile'),
//       icon: <Person />, 
//       show: true,
//       color: 'primary'
//     },
//     { 
//       label: 'Admin Dashboard', 
//       path: '/admin', 
//       icon: <AdminPanelSettings />, 
//       show: isAdmin || isSuperAdmin,
//       color: 'error'
//     },
//   ].filter(item => item.show)

//   const drawer = (
//     <Box 
//       sx={{ 
//         width: drawerWidth,
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         background: theme.palette.mode === 'dark'
//           ? `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
//           : `linear-gradient(180deg, ${alpha('#ffffff', 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
//       }}
//       onMouseEnter={() => setDrawerHovered(true)}
//       onMouseLeave={() => setDrawerHovered(false)}
//     >
//       {/* User Profile Section */}
//       <Paper 
//         elevation={0}
//         sx={{ 
//           m: 3, 
//           p: 3, 
//           borderRadius: 4,
//           background: theme.palette.mode === 'dark'
//             ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
//             : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.15)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
//           border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//           transition: 'all 0.3s ease',
//           '&:hover': {
//             transform: 'translateY(-2px)',
//             boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
//           }
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Avatar 
//             src={user?.profilePicture || undefined}
//             sx={{ 
//               width: 64, 
//               height: 64, 
//               border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
//               boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
//               }
//             }}
//           >
//             {user?.name?.charAt(0).toUpperCase()}
//           </Avatar>
//           <Box sx={{ flex: 1, minWidth: 0 }}>
//             <Typography variant="h6" fontWeight="bold" noWrap>
//               {user?.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               {user?.email}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
//               <Chip 
//                 icon={isSuperAdmin ? <Security /> : <Verified />}
//                 label={isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin' : 'Member'}
//                 size="small"
//                 color={isSuperAdmin ? 'warning' : isAdmin ? 'primary' : 'default'}
//                 variant="outlined"
//                 sx={{ 
//                   fontWeight: 600,
//                   borderWidth: 2,
//                   '& .MuiChip-icon': { fontSize: 14 }
//                 }}
//               />
//             </Box>
//           </Box>
//         </Box>
//         <LinearProgress 
//           variant="determinate" 
//           value={75} 
//           sx={{ 
//             mt: 3, 
//             height: 6, 
//             borderRadius: 3,
//             background: alpha(theme.palette.primary.main, 0.1),
//             '& .MuiLinearProgress-bar': {
//               background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               borderRadius: 3,
//             }
//           }}
//         />
//         <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//           Profile completeness: 75%
//         </Typography>
//       </Paper>

//       <Divider sx={{ mx: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />

//       {/* Navigation Items */}
//       <List sx={{ p: 2, flex: 1, overflowY: 'auto', '&::-webkit-scrollbar': { width: 6 } }}>
//         {navItems.map((item) => (
//           <ListItemButton
//             key={item.label}
//             onClick={() => handleNavigation(item.path)}
//             selected={location.pathname === item.path}
//             sx={{
//               borderRadius: 3,
//               mb: 1,
//               px: 2,
//               py: 1.5,
//               transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//               position: 'relative',
//               overflow: 'hidden',
//               '&::before': {
//                 content: '""',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: location.pathname === item.path
//                   ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
//                   : 'transparent',
//                 borderRadius: 3,
//                 zIndex: 1,
//               },
//               '&:hover': {
//                 transform: 'translateX(8px)',
//                 '&::before': {
//                   background: alpha(theme.palette.primary.main, 0.08),
//                 }
//               },
//               '&.Mui-selected': {
//                 borderLeft: `4px solid ${theme.palette[item.color]?.main || theme.palette.primary.main}`,
//                 '&:hover': {
//                   transform: 'translateX(8px)',
//                 }
//               }
//             }}
//           >
//             <ListItemIcon sx={{ 
//               minWidth: 40, 
//               position: 'relative', 
//               zIndex: 2,
//               color: location.pathname === item.path 
//                 ? theme.palette[item.color]?.main || theme.palette.primary.main 
//                 : 'inherit'
//             }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText 
//               primary={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Typography 
//                     variant="body1" 
//                     fontWeight={location.pathname === item.path ? 600 : 500}
//                     sx={{ position: 'relative', zIndex: 2 }}
//                   >
//                     {item.label}
//                   </Typography>
//                   {item.badge && (
//                     <Chip 
//                       label={item.badge}
//                       size="small"
//                       color="primary"
//                       sx={{ 
//                         height: 20, 
//                         fontSize: '0.65rem',
//                         fontWeight: 700,
//                         position: 'relative',
//                         zIndex: 2
//                       }}
//                     />
//                   )}
//                 </Box>
//               } 
//             />
//             {drawerHovered && (
//               <ChevronRight 
//                 sx={{ 
//                   fontSize: 18, 
//                   opacity: 0.6,
//                   position: 'relative',
//                   zIndex: 2,
//                   transition: 'all 0.3s ease',
//                   transform: location.pathname === item.path ? 'translateX(0)' : 'translateX(-4px)'
//                 }} 
//               />
//             )}
//           </ListItemButton>
//         ))}
//       </List>

//       <Divider sx={{ mx: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />

//       {/* Bottom Actions */}
//       <Box sx={{ p: 3 }}>
//         <ListItemButton 
//           onClick={toggleColorMode}
//           sx={{
//             borderRadius: 3,
//             mb: 2,
//             px: 2,
//             py: 1.5,
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               background: alpha(theme.palette.primary.main, 0.08),
//               transform: 'translateY(-2px)',
//             }
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
//           </ListItemIcon>
//           <ListItemText 
//             primary={
//               <Typography variant="body1" fontWeight={500}>
//                 {theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
//               </Typography>
//             } 
//           />
//         </ListItemButton>
        
//         <Button
//           variant="outlined"
//           onClick={handleLogout}
//           disabled={loggingOut}
//           fullWidth
//           startIcon={loggingOut ? <CircularProgress size={20} /> : <Logout />}
//           sx={{
//             borderRadius: 3,
//             py: 1.5,
//             borderWidth: 2,
//             fontWeight: 600,
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               borderWidth: 2,
//               transform: 'translateY(-2px)',
//               boxShadow: `0 8px 24px ${alpha(theme.palette.error.main, 0.2)}`,
//             },
//             '&:disabled': {
//               borderWidth: 2,
//             }
//           }}
//         >
//           {loggingOut ? 'Logging out...' : 'Logout'}
//         </Button>
//       </Box>
//     </Box>
//   )

//   return (
//     <>
//       <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.palette.background.default }}>
//         <StyledAppBar position="fixed">
//           <Toolbar sx={{ py: 1 }}>
//             {isMobile && (
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 edge="start"
//                 onClick={handleDrawerToggle}
//                 sx={{ 
//                   mr: 2,
//                   background: alpha(theme.palette.primary.main, 0.1),
//                   '&:hover': {
//                     background: alpha(theme.palette.primary.main, 0.2),
//                   }
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
            
//             {/* Logo and Brand */}
//             <Box 
//               sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 2, 
//                 flexGrow: 1,
//                 cursor: 'pointer',
//                 transition: 'transform 0.3s ease',
//                 '&:hover': {
//                   transform: 'scale(1.02)',
//                 }
//               }}
//               onClick={() => navigate('/')}
//             >
//               <Box
//                 component="img"
//                 src={logoSvg}
//                 alt="Clean Street Logo"
//                 sx={{ 
//                   height: 44, 
//                   width: 44,
//                   filter: theme.palette.mode === 'dark' 
//                     ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' 
//                     : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'rotate(-5deg) scale(1.1)',
//                   }
//                 }}
//               />
//               <Box>
//                 <Typography 
//                   variant="h6" 
//                   component="div" 
//                   fontWeight="800"
//                   sx={{ 
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     backgroundClip: 'text',
//                     WebkitBackgroundClip: 'text',
//                     color: 'transparent',
//                     letterSpacing: '-0.5px'
//                   }}
//                 >
//                   Clean Street
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: -0.5 }}>
//                   Making cities cleaner
//                 </Typography>
//               </Box>
//             </Box>
            
//             {/* Desktop Navigation */}
//             {!isMobile && (
//               <Box sx={{ 
//                 display: 'flex', 
//                 gap: 1, 
//                 mr: 3,
//                 background: alpha(theme.palette.background.paper, 0.5),
//                 backdropFilter: 'blur(10px)',
//                 borderRadius: 3,
//                 p: 0.5,
//                 border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               }}>
//                 {navItems.slice(0, -2).map((item) => (
//                   <NavButton
//                     key={item.label}
//                     onClick={() => handleNavigation(item.path)}
//                     selected={location.pathname === item.path}
//                     startIcon={item.icon}
//                     sx={{
//                       color: location.pathname === item.path 
//                         ? theme.palette[item.color]?.main || theme.palette.primary.main 
//                         : 'text.primary',
//                     }}
//                   >
//                     {item.label}
//                   </NavButton>
//                 ))}
//               </Box>
//             )}
            
//             {/* Right Side Actions */}
//             {user && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {/* Theme Toggle */}
//                 <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
//                   <IconButton 
//                     onClick={toggleColorMode} 
//                     color="inherit"
//                     sx={{
//                       background: alpha(theme.palette.primary.main, 0.1),
//                       '&:hover': {
//                         background: alpha(theme.palette.primary.main, 0.2),
//                         transform: 'rotate(45deg)',
//                       },
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
//                   </IconButton>
//                 </Tooltip>
                
//                 {/* Notifications */}
//                 <Tooltip title="Notifications">
//                   <IconButton 
//                     color="inherit"
//                     onClick={handleNotificationClick}
//                     sx={{
//                       color: theme.palette.primary.main,
//                       background: alpha(theme.palette.primary.main, 0.18),
//                       '&:hover': {
//                         background: alpha(theme.palette.primary.main, 0.3),
//                         transform: 'scale(1.1)',
//                       },
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     <Badge 
//                       badgeContent={unreadCount} 
//                       color="error"
//                       sx={{
//                         '& .MuiBadge-badge': {
//                           boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//                           animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
//                           '@keyframes pulse': {
//                             '0%': { transform: 'scale(1)' },
//                             '50%': { transform: 'scale(1.2)' },
//                             '100%': { transform: 'scale(1)' },
//                           }
//                         }
//                       }}
//                     >
//                       <Notifications />
//                     </Badge>
//                   </IconButton>
//                 </Tooltip>
                
//                 {/* User Menu */}
//                 <Tooltip title="Account settings">
//                   <IconButton
//                     onClick={isMobile ? handleDrawerToggle : handleMenu}
//                     sx={{
//                       p: 0.5,
//                       background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
//                       border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'scale(1.05)',
//                         borderColor: alpha(theme.palette.primary.main, 0.6),
//                         boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
//                       }
//                     }}
//                   >
//                     <Avatar 
//                       src={user?.profilePicture || undefined}
//                       sx={{ 
//                         width: 40, 
//                         height: 40,
//                         border: `2px solid ${theme.palette.background.paper}`,
//                       }}
//                     >
//                       {user.name?.charAt(0).toUpperCase()}
//                     </Avatar>
//                   </IconButton>
//                 </Tooltip>
                
//                 {/* Desktop User Menu */}
//                 {!isMobile && (
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={handleClose}
//                     transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                     anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                     PaperProps={{
//                       sx: {
//                         mt: 1.5,
//                         minWidth: 200,
//                         borderRadius: 3,
//                         background: theme.palette.background.paper,
//                         border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                         boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
//                         overflow: 'visible',
//                         '&:before': {
//                           content: '""',
//                           display: 'block',
//                           position: 'absolute',
//                           top: 0,
//                           right: 14,
//                           width: 10,
//                           height: 10,
//                           bgcolor: 'background.paper',
//                           transform: 'translateY(-50%) rotate(45deg)',
//                           zIndex: 0,
//                           borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                           borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                         }
//                       }
//                     }}
//                   >
//                     <MenuItem 
//                       onClick={() => handleNavigation(scopedPath('/profile'))}
//                       sx={{ 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         gap: 2,
//                         py: 2,
//                         px: 2,
//                       }}
//                     >
//                       <Avatar
//                         src={user?.profilePicture || undefined}
//                         sx={{ width: 36, height: 36 }}
//                       >
//                         {user.name?.charAt(0).toUpperCase()}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="subtitle2" fontWeight="bold">
//                           {user.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           View profile
//                         </Typography>
//                       </Box>
//                     </MenuItem>
//                     <Divider />
//                     <StyledMenuItem onClick={toggleColorMode}>
//                       {theme.palette.mode === 'dark' ? (
//                         <>
//                           <Brightness7 sx={{ mr: 1.5 }} /> Light Mode
//                         </>
//                       ) : (
//                         <>
//                           <Brightness4 sx={{ mr: 1.5 }} /> Dark Mode
//                         </>
//                       )}
//                     </StyledMenuItem>
//                     <StyledMenuItem onClick={handleLogout} disabled={loggingOut}>
//                       {loggingOut ? (
//                         <CircularProgress size={20} sx={{ mr: 1.5 }} />
//                       ) : (
//                         <Logout sx={{ mr: 1.5 }} />
//                       )}
//                       {loggingOut ? 'Logging out...' : 'Logout'}
//                     </StyledMenuItem>
//                   </Menu>
//                 )}
//               </Box>
//             )}
//           </Toolbar>
//         </StyledAppBar>

//         {/* Notifications Menu */}
//         <Menu
//           anchorEl={notificationAnchorEl}
//           open={Boolean(notificationAnchorEl)}
//           onClose={handleNotificationClose}
//           PaperProps={{
//             sx: { 
//               width: 360, 
//               maxHeight: 500,
//               borderRadius: 3,
//               mt: 1,
//               border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
//               overflow: 'visible',
//               '&:before': {
//                 content: '""',
//                 display: 'block',
//                 position: 'absolute',
//                 top: 0,
//                 right: 14,
//                 width: 10,
//                 height: 10,
//                 bgcolor: 'background.paper',
//                 transform: 'translateY(-50%) rotate(45deg)',
//                 zIndex: 0,
//                 borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//                 borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//               }
//             }
//           }}
//         >
//           <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
//             <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Notifications fontSize="small" />
//               Notifications
//               <Chip 
//                 label={unreadCount}
//                 size="small"
//                 color="primary"
//                 sx={{ ml: 1, height: 20, fontSize: '0.75rem', fontWeight: 'bold' }}
//               />
//             </Typography>
//           </Box>
//           <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
//             {notifications.length > 0 ? (
//               notifications.map((notification) => (
//                 <MenuItem 
//                   key={notification.id}
//                   onClick={() => {
//                     markAsRead(notification.id)
//                     if (notification.link) navigate(notification.link)
//                     handleNotificationClose()
//                   }}
//                   sx={{
//                     p: 2,
//                     borderLeft: notification.unread ? `3px solid ${theme.palette.primary.main}` : 'none',
//                     transition: 'all 0.2s ease',
//                     '&:hover': {
//                       background: alpha(theme.palette.primary.main, 0.04),
//                     }
//                   }}
//                 >
//                   <Box sx={{ width: '100%' }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
//                       <Typography 
//                         variant="subtitle2" 
//                         fontWeight={notification.unread ? 'bold' : 'normal'}
//                         sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                       >
//                         {notification.title}
//                         {notification.unread && (
//                           <Box 
//                             sx={{ 
//                               width: 8, 
//                               height: 8, 
//                               borderRadius: '50%',
//                               background: theme.palette.primary.main,
//                               animation: 'pulse 1.5s infinite',
//                             }} 
//                           />
//                         )}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" paragraph>
//                       {notification.message}
//                     </Typography>
//                     {notification.type && (
//                       <Chip 
//                         label={notification.type}
//                         size="small"
//                         variant="outlined"
//                         sx={{ mt: 1 }}
//                       />
//                     )}
//                   </Box>
//                 </MenuItem>
//               ))
//             ) : (
//               <Box sx={{ p: 4, textAlign: 'center' }}>
//                 <Notifications sx={{ fontSize: 48, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
//                 <Typography variant="body1" color="text.secondary" gutterBottom>
//                   No notifications yet
//                 </Typography>
//                 <Typography variant="body2" color="text.disabled">
//                   You're all caught up!
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         </Menu>

//         {/* Navigation Drawer */}
//         {isMobile && (
//           <StyledDrawer
//             variant="temporary"
//             anchor="left"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{ keepMounted: true }}
//             sx={{
//               '& .MuiDrawer-paper': { 
//                 width: drawerWidth,
//                 boxShadow: `0 0 60px ${alpha(theme.palette.common.black, 0.3)}`,
//               },
//             }}
//           >
//             {drawer}
//           </StyledDrawer>
//         )}

//         {/* Main Content */}
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             width: '100%',
//             ml: 0,
//             mt: '76px',
//             minHeight: 'calc(100vh - 76px)',
//             display: 'flex',
//             flexDirection: 'column',
//             position: 'relative',
//             background: theme.palette.background.default,
//           }}
//         >
//           {/* Animated Background Elements */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: 300,
//               background: theme.palette.mode === 'dark'
//                 ? `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.dark, 0.2)} 0%, transparent 70%)`
//                 : `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 70%)`,
//               pointerEvents: 'none',
//               zIndex: 0,
//             }}
//           />
          
//           <Container 
//             maxWidth={false}
//             disableGutters
//             sx={{ 
//               flexGrow: 1, 
//               py: { xs: 2, md: 3 },
//               px: { xs: 2, md: 3 },
//               position: 'relative',
//               zIndex: 1,
//             }}
//           >
//             {/* Page Content with subtle animation */}
//             <Fade in timeout={500}>
//               <Box>
//                 {children}
//               </Box>
//             </Fade>
//           </Container>


//         </Box>

//         {/* Scroll to Top Button */}
//         <ScrollTop />
//       </Box>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         TransitionComponent={Fade}
//       >
//         <Alert 
//           onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
//           severity={snackbar.severity}
//           variant="filled"
//           sx={{ 
//             width: '100%',
//             borderRadius: 3,
//             boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
//             alignItems: 'center',
//             '& .MuiAlert-icon': {
//               alignItems: 'center',
//             }
//           }}
//           iconMapping={{
//             success: <Verified />,
//             error: <BugReport />,
//             warning: <Settings />,
//             info: <Notifications />
//           }}
//         >
//           <Typography variant="body2" fontWeight="medium">
//             {snackbar.message}
//           </Typography>
//         </Alert>
//       </Snackbar>
//     </>
//   )
// }

// // Enhanced ScrollTop Component
// const ScrollTop = () => {
//   const [visible, setVisible] = useState(false)
//   const theme = useTheme()

//   const toggleVisibility = useCallback(() => {
//     if (window.pageYOffset > 300) {
//       setVisible(true)
//     } else {
//       setVisible(false)
//     }
//   }, [])

//   const scrollToTop = useCallback(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     })
//   }, [])

//   useEffect(() => {
//     window.addEventListener('scroll', toggleVisibility)
//     return () => window.removeEventListener('scroll', toggleVisibility)
//   }, [toggleVisibility])

//   return (
//     <Zoom in={visible}>
//       <Fab
//         onClick={scrollToTop}
//         sx={{
//           position: 'fixed',
//           bottom: 32,
//           right: 32,
//           width: 56,
//           height: 56,
//           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//           color: 'white',
//           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//           boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
//           '&:hover': {
//             transform: 'translateY(-4px) scale(1.05)',
//             boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
//             background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
//           },
//           '&:active': {
//             transform: 'translateY(-2px) scale(0.98)',
//           }
//         }}
//         aria-label="scroll back to top"
//       >
//         <KeyboardArrowUp sx={{ fontSize: 32 }} />
//       </Fab>
//     </Zoom>
//   )
// }

// export default MainLayout

import React, { useState, useEffect, useCallback, useMemo, memo, lazy, Suspense } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { buildApiUrl } from '../../utils/apiClient'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Badge,
  Fab,
  Zoom,
  CircularProgress,
  Tooltip,
  Breadcrumbs,
  Link,
  Alert,
  Snackbar,
  Paper,
  Chip,
  alpha,
  Fade,
  Collapse,
  ListItemButton,
  LinearProgress,
  Skeleton,
  Stack,
  useScrollTrigger,
  Slide,
  Grow
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home,
  Person,
  Logout,
  Dashboard,
  Report,
  Map,
  Settings,
  Notifications,
  KeyboardArrowUp,
  Brightness4,
  Brightness7,
  AdminPanelSettings,
  History,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Verified,
  Security,
  Timeline,
  TrendingUp,
  BugReport,
  CleanHands,
  LocationOn,
  VolunteerActivism as Volunteer,
  Event,
  CalendarToday,
  AssignmentTurnedIn,
  Search,
  FilterList,
  MenuBook,
  Star,
  WorkspacePremium,
  EmojiEvents,
  MoreVert
} from '@mui/icons-material'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { getScopedPath, isScopedPath } from '../../utils/subdomain'
import { styled } from '@mui/material/styles'
import logoSvg from '../../assets/images/logo.svg'

const drawerWidth = 300
const miniDrawerWidth = 80
const collapsedDrawerWidth = 120

// Lazy load components for better performance
const NotificationsPanel = lazy(() => import('../Notifications/NotificationsPanel'))
const UserMenu = lazy(() => import('./UserMenu'))
const SearchBar = lazy(() => import('./SearchBar'))

// ==================== STYLED COMPONENTS ====================

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled' && prop !== 'drawerOpen'
})(({ theme, scrolled, drawerOpen }) => ({
  background: scrolled
    ? theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.dark, 0.95)} 100%)`
      : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.light, 0.95)} 100%)`
    : theme.palette.mode === 'dark'
      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.85)} 0%, ${alpha(theme.palette.background.paper, 0.85)} 100%)`
      : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.85)} 0%, ${alpha(theme.palette.background.paper, 0.85)} 100%)`,
  backdropFilter: 'blur(20px) saturate(180%)',
  borderBottom: scrolled ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: scrolled 
    ? `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`
    : `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
}))

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'variant'
})(({ theme, open, variant }) => ({
  width: open ? drawerWidth : miniDrawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : miniDrawerWidth,
    background: theme.palette.mode === 'dark'
      ? `linear-gradient(195deg, ${alpha(theme.palette.background.default, 0.98)} 0%, ${alpha(theme.palette.primary.dark, 0.1)} 100%)`
      : `linear-gradient(195deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
    borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    backdropFilter: 'blur(20px)',
    overflowX: 'hidden',
    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
    boxShadow: open 
      ? `4px 0 20px ${alpha(theme.palette.common.black, 0.1)}`
      : 'none',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: alpha(theme.palette.primary.main, 0.05),
    },
    '&::-webkit-scrollbar-thumb': {
      background: alpha(theme.palette.primary.main, 0.2),
      borderRadius: '8px',
      '&:hover': {
        background: alpha(theme.palette.primary.main, 0.3),
      }
    }
  }
}))

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'color'
})(({ theme, selected, color = 'primary' }) => ({
  position: 'relative',
  borderRadius: 12,
  padding: '8px 16px',
  margin: '0 4px',
  fontWeight: selected ? 600 : 500,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  minWidth: 'auto',
  color: selected 
    ? theme.palette[color]?.main || theme.palette.primary.main
    : theme.palette.text.primary,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: selected 
      ? `linear-gradient(135deg, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
      : 'transparent',
    borderRadius: 12,
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: selected ? '70%' : '0%',
    height: 3,
    background: `linear-gradient(90deg, ${theme.palette[color]?.main || theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: '3px 3px 0 0',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 20px ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.2)}`,
    '&::after': {
      width: '50%',
    },
    '&::before': {
      background: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.08),
    }
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    '& svg': {
      fontSize: 20,
    }
  },
  [theme.breakpoints.down('lg')]: {
    padding: '8px 12px',
    fontSize: '0.9rem',
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(0.5),
    }
  }
}))

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'color' && prop !== 'drawerOpen'
})(({ theme, selected, color = 'primary', drawerOpen }) => ({
  borderRadius: 12,
  margin: '4px 8px',
  padding: drawerOpen ? '12px 16px' : '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  justifyContent: drawerOpen ? 'flex-start' : 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: selected
      ? `linear-gradient(135deg, ${alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
      : 'transparent',
    borderRadius: 12,
    zIndex: 1,
  },
  '&:hover': {
    transform: drawerOpen ? 'translateX(4px)' : 'scale(1.05)',
    '&::before': {
      background: alpha(theme.palette[color]?.main || theme.palette.primary.main, 0.08),
    }
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    borderLeft: selected && drawerOpen ? `4px solid ${theme.palette[color]?.main || theme.palette.primary.main}` : 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
}))

const AnimatedBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 300,
  background: theme.palette.mode === 'dark'
    ? `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.dark, 0.2)} 0%, transparent 70%)`
    : `radial-gradient(ellipse at top, ${alpha(theme.palette.primary.light, 0.1)} 0%, transparent 70%)`,
  pointerEvents: 'none',
  zIndex: 0,
  animation: 'pulse 10s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 },
  }
}))

const FloatingShape = styled(Box)(({ theme, delay, size, position }) => ({
  position: 'absolute',
  width: size || 100,
  height: size || 100,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: '50%',
  filter: 'blur(40px)',
  animation: `float 15s ease-in-out ${delay || 0}s infinite`,
  zIndex: 0,
  ...position,
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
    '25%': { transform: 'translateY(-20px) translateX(10px)' },
    '50%': { transform: 'translateY(-10px) translateX(-10px)' },
    '75%': { transform: 'translateY(10px) translateX(-20px)' },
  }
}))

// ==================== MEMOIZED COMPONENTS ====================

const UserProfileSection = memo(({ user, isSuperAdmin, isAdmin, drawerOpen }) => {
  const theme = useTheme()
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        m: 2, 
        p: drawerOpen ? 2 : 1.5, 
        borderRadius: 4,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.15)} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
          : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.12)} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: drawerOpen ? 2 : 1,
        flexDirection: drawerOpen ? 'row' : 'column'
      }}>
        <Avatar 
          src={user?.profilePicture || undefined}
          sx={{ 
            width: drawerOpen ? 56 : 48, 
            height: drawerOpen ? 56 : 48, 
            border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        
        {drawerOpen && (
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <Chip 
                icon={isSuperAdmin ? <Security sx={{ fontSize: 14 }} /> : <Verified sx={{ fontSize: 14 }} />}
                label={isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin' : 'Member'}
                size="small"
                color={isSuperAdmin ? 'warning' : isAdmin ? 'primary' : 'default'}
                variant="outlined"
                sx={{ 
                  height: 22,
                  '& .MuiChip-label': { px: 1, fontSize: '0.65rem', fontWeight: 600 },
                  '& .MuiChip-icon': { ml: 0.5 }
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
      
      {drawerOpen && (
        <>
          <LinearProgress 
            variant="determinate" 
            value={75} 
            sx={{ 
              mt: 2, 
              height: 4, 
              borderRadius: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: 2,
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            Profile: 75%
          </Typography>
        </>
      )}
    </Paper>
  )
})

const NavItem = memo(({ item, location, drawerOpen, onNavigate, drawerHovered }) => {
  const theme = useTheme()
  const selected = location.pathname === item.path
  
  return (
    <Tooltip 
      title={!drawerOpen ? item.label : ''} 
      placement="right"
      arrow
      disableHoverListener={drawerOpen}
    >
      <StyledListItemButton
        onClick={() => onNavigate(item.path)}
        selected={selected}
        color={item.color}
        drawerOpen={drawerOpen}
      >
        <ListItemIcon sx={{ 
          minWidth: drawerOpen ? 40 : 'auto',
          justifyContent: 'center',
          color: selected 
            ? theme.palette[item.color]?.main || theme.palette.primary.main 
            : 'inherit',
          transition: 'color 0.2s ease',
          mr: drawerOpen ? 1 : 0
        }}>
          {item.icon}
        </ListItemIcon>
        
        {drawerOpen && (
          <>
            <ListItemText 
              primary={
                <Typography 
                  variant="body2" 
                  fontWeight={selected ? 600 : 500}
                  sx={{ 
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                </Typography>
              } 
            />
            {drawerHovered && (
              <ChevronRight 
                sx={{ 
                  fontSize: 18, 
                  opacity: 0.6,
                  transition: 'all 0.3s ease',
                  transform: selected ? 'translateX(0)' : 'translateX(-4px)'
                }} 
              />
            )}
          </>
        )}
      </StyledListItemButton>
    </Tooltip>
  )
})

const ScrollTop = memo(() => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  })

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    setVisible(trigger)
  }, [trigger])

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          width: 48,
          height: 48,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
          },
          [theme.breakpoints.down('sm')]: {
            bottom: 16,
            right: 16,
            width: 40,
            height: 40,
          }
        }}
        aria-label="scroll back to top"
      >
        <KeyboardArrowUp sx={{ fontSize: { xs: 24, sm: 28 } }} />
      </Fab>
    </Zoom>
  )
})

// ==================== MAIN COMPONENT ====================

const MainLayout = ({ children, toggleColorMode }) => {
  const { user, logout, isAdmin, isSuperAdmin } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  
  // State management
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(isDesktop)
  const [drawerHovered, setDrawerHovered] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const isVolunteerScope = useMemo(() => isScopedPath('volunteer'), [])
  const scopedPath = useCallback((path) => 
    isVolunteerScope ? getScopedPath('volunteer', path) : path, 
  [isVolunteerScope])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close drawer on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }, [location.pathname, isMobile])

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)
      const response = await fetch(buildApiUrl('/notifications?limit=20'), {
        credentials: 'include'
      })
      const data = await response.json()
      if (data.success) {
        const normalized = (data.notifications || []).map((item) => ({
          id: item._id,
          title: item.title,
          message: item.message,
          link: item.link,
          type: item.type,
          unread: !item.isRead,
          timestamp: item.createdAt
        }))
        setNotifications(normalized)
        setUnreadCount(data.unreadCount || 0)
      }
    } catch (error) {
      console.error('Notifications fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchNotifications()
    const intervalId = setInterval(fetchNotifications, 45000)
    return () => clearInterval(intervalId)
  }, [fetchNotifications])

  const markAsRead = async (id) => {
    try {
      await fetch(buildApiUrl(`/notifications/${id}/read`), {
        method: 'PUT',
        credentials: 'include'
      })
      setNotifications((prev) => prev.map((item) => (
        item.id === id ? { ...item, unread: false } : item
      )))
      setUnreadCount((prev) => Math.max(prev - 1, 0))
    } catch (error) {
      console.error('Notification update error:', error)
    }
  }

  // Handle navigation
  const handleNavigation = useCallback((path) => {
    navigate(path)
    if (isMobile) {
      setMobileOpen(false)
    }
    setAnchorEl(null)
    setNotificationAnchorEl(null)
  }, [navigate, isMobile])

  // Handle logout
  const handleLogout = useCallback(async () => {
    setLoggingOut(true)
    try {
      await logout()
      setSnackbar({ open: true, message: 'Logged out successfully', severity: 'success' })
      navigate(scopedPath('/login'))
    } catch (error) {
      console.error('Logout failed:', error)
      setSnackbar({ open: true, message: 'Logout failed. Please try again.', severity: 'error' })
    } finally {
      setLoggingOut(false)
      setAnchorEl(null)
    }
  }, [logout, navigate, scopedPath])

  // Memoized navigation items
  const navItems = useMemo(() => [
    {
      label: 'Home',
      path: scopedPath('/home'),
      icon: <Home />, 
      show: user?.role === 'volunteer',
      color: 'primary'
    },
    {
      label: 'Dashboard',
      path: scopedPath('/dashboard'),
      icon: <Dashboard />, 
      show: user?.role !== 'volunteer',
      color: 'primary'
    },
    {
      label: 'Volunteer',
      path: scopedPath('/dashboard'),
      icon: <Volunteer />, 
      show: user?.role === 'volunteer',
      color: 'primary',
      badge: 'Active'
    },
    {
      label: 'Community',
      path: scopedPath('/community'),
      icon: <LocationOn />, 
      show: true,
      color: 'warning'
    },
    {
      label: 'Reports',
      path: user?.role === 'volunteer' ? scopedPath('/reports') : scopedPath('/my-reports'),
      icon: user?.role === 'volunteer' ? <AssignmentTurnedIn /> : <History />, 
      show: true,
      color: 'info'
    },
    {
      label: 'Events',
      path: scopedPath('/events'),
      icon: <Event />, 
      show: user?.role === 'volunteer',
      color: 'secondary'
    },
    {
      label: 'Map',
      path: scopedPath('/map'),
      icon: <Map />, 
      show: user?.role !== 'volunteer',
      color: 'secondary'
    },
    {
      label: 'Profile',
      path: scopedPath('/profile'),
      icon: <Person />, 
      show: true,
      color: 'primary'
    },
    { 
      label: 'Admin', 
      path: '/admin', 
      icon: <AdminPanelSettings />, 
      show: isAdmin || isSuperAdmin,
      color: 'error'
    },
  ].filter(item => item.show), [user?.role, scopedPath, isAdmin, isSuperAdmin])

  // Memoized breadcrumbs
  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split('/').filter(x => x)
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`
      const isLast = index === pathnames.length - 1
      
      const labelMap = {
        'admin': 'Admin',
        'profile': 'Profile',
        'map': 'Map',
        'reports': 'Reports',
        'community': 'Community',
        'my-reports': 'My Reports',
        'report-issue': 'Report Issue',
        'dashboard': 'Dashboard',
        'settings': 'Settings',
        'volunteer': 'Volunteer',
        'events': 'Events',
        'my-events': 'My Events'
      }
      
      const label = labelMap[value] || value.charAt(0).toUpperCase() + value.slice(1)
      
      return {
        label,
        to,
        isLast
      }
    })
  }, [location.pathname])

  // Drawer content
  const drawerContent = useMemo(() => (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setDrawerHovered(true)}
      onMouseLeave={() => setDrawerHovered(false)}
    >
      {/* Drawer Header */}
      <Box sx={{ 
        p: drawerOpen ? 2 : 1.5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: drawerOpen ? 'space-between' : 'center'
      }}>
        {drawerOpen ? (
          <>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              <Box
                component="img"
                src={logoSvg}
                alt="Logo"
                sx={{ 
                  height: 32, 
                  width: 32,
                  filter: theme.palette.mode === 'dark' 
                    ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' 
                    : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                }}
              />
              <Typography 
                variant="h6" 
                fontWeight="800"
                sx={{ 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '1.1rem'
                }}
              >
                Clean Street
              </Typography>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <ChevronLeft />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)} size="small">
            <ChevronRight />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mx: 2, borderColor: alpha(theme.palette.divider, 0.1) }} />

      {/* User Profile */}
      <UserProfileSection 
        user={user} 
        isSuperAdmin={isSuperAdmin} 
        isAdmin={isAdmin} 
        drawerOpen={drawerOpen} 
      />

      {/* Navigation Items */}
      <List sx={{ 
        p: 1, 
        flex: 1, 
        overflowY: 'auto',
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '4px',
        }
      }}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            location={location}
            drawerOpen={drawerOpen}
            drawerHovered={drawerHovered}
            onNavigate={handleNavigation}
          />
        ))}
      </List>

      <Divider sx={{ mx: 2, borderColor: alpha(theme.palette.divider, 0.1) }} />

      {/* Bottom Actions */}
      <Box sx={{ p: drawerOpen ? 2 : 1 }}>
        <Tooltip title={!drawerOpen ? 'Toggle Theme' : ''} placement="right">
          <StyledListItemButton
            onClick={toggleColorMode}
            drawerOpen={drawerOpen}
            sx={{ mb: 1 }}
          >
            <ListItemIcon sx={{ 
              minWidth: drawerOpen ? 40 : 'auto',
              justifyContent: 'center',
              mr: drawerOpen ? 1 : 0
            }}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            {drawerOpen && (
              <ListItemText primary={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} />
            )}
          </StyledListItemButton>
        </Tooltip>
        
        <Tooltip title={!drawerOpen ? 'Logout' : ''} placement="right">
          <StyledListItemButton
            onClick={handleLogout}
            disabled={loggingOut}
            drawerOpen={drawerOpen}
            sx={{
              color: 'error.main',
              '&:hover': {
                bgcolor: alpha(theme.palette.error.main, 0.1),
              }
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: drawerOpen ? 40 : 'auto',
              justifyContent: 'center',
              color: 'error.main',
              mr: drawerOpen ? 1 : 0
            }}>
              {loggingOut ? <CircularProgress size={20} color="error" /> : <Logout />}
            </ListItemIcon>
            {drawerOpen && (
              <ListItemText primary={loggingOut ? 'Logging out...' : 'Logout'} />
            )}
          </StyledListItemButton>
        </Tooltip>
      </Box>
    </Box>
  ), [user, isSuperAdmin, isAdmin, drawerOpen, drawerHovered, navItems, location, handleNavigation, toggleColorMode, handleLogout, loggingOut, theme])

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      bgcolor: theme.palette.background.default,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <AnimatedBackground />
      <FloatingShape delay={0} size={300} position={{ top: '10%', right: '-5%' }} />
      <FloatingShape delay={5} size={200} position={{ bottom: '20%', left: '-5%' }} />
      <FloatingShape delay={2} size={250} position={{ top: '40%', left: '10%' }} />

      {/* App Bar */}
      <StyledAppBar 
        position="fixed" 
        scrolled={scrolled}
        drawerOpen={drawerOpen}
      >
        <Toolbar sx={{ 
          minHeight: { xs: 64, sm: 70, md: 76 },
          px: { xs: 1, sm: 2, md: 3 }
        }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setMobileOpen(true)}
              sx={{ 
                mr: 1,
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Drawer Toggle */}
          {!isMobile && isDesktop && (
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ 
                mr: 2,
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          )}
          
          {/* Logo and Brand */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 2 }, 
              flexGrow: 1,
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src={logoSvg}
              alt="Clean Street Logo"
              sx={{ 
                height: { xs: 36, sm: 40, md: 44 }, 
                width: { xs: 36, sm: 40, md: 44 },
                filter: theme.palette.mode === 'dark' 
                  ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' 
                  : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography 
                variant="h6" 
                component="div" 
                fontWeight="800"
                sx={{ 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '-0.5px',
                  fontSize: { sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Clean Street
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' }, mt: -0.5 }}>
                Making cities cleaner
              </Typography>
            </Box>
          </Box>
          
          {/* Desktop Navigation */}
          {!isMobile && isDesktop && drawerOpen === false && (
            <Slide direction="down" in={!scrolled}>
              <Box sx={{ 
                display: 'flex', 
                gap: 0.5, 
                mr: 3,
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                p: 0.5,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}>
                {navItems.slice(0, 5).map((item) => (
                  <NavButton
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    selected={location.pathname === item.path}
                    color={item.color}
                    startIcon={item.icon}
                    size="small"
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>
            </Slide>
          )}
          
          {/* Right Side Actions */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              {/* Search Button - Mobile */}
              {isMobile && (
                <Tooltip title="Search">
                  <IconButton 
                    onClick={() => setSearchOpen(!searchOpen)}
                    color="inherit"
                    sx={{
                      background: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
              )}
              
              {/* Theme Toggle - Desktop */}
              {!isMobile && (
                <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
                  <IconButton 
                    onClick={toggleColorMode} 
                    color="inherit"
                    sx={{
                      background: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': {
                        background: alpha(theme.palette.primary.main, 0.2),
                        transform: 'rotate(45deg)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                </Tooltip>
              )}
              
              {/* Notifications */}
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit"
                  onClick={(e) => setNotificationAnchorEl(e.currentTarget)}
                  sx={{
                    color: theme.palette.primary.main,
                    background: alpha(theme.palette.primary.main, 0.18),
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.3),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Badge 
                    badgeContent={unreadCount} 
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                        animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.2)' },
                          '100%': { transform: 'scale(1)' },
                        }
                      }
                    }}
                  >
                    <Notifications />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              {/* User Menu */}
              <Tooltip title="Account">
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{
                    p: 0.5,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      borderColor: alpha(theme.palette.primary.main, 0.6),
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Avatar 
                    src={user?.profilePicture || undefined}
                    sx={{ 
                      width: { xs: 32, sm: 36, md: 40 }, 
                      height: { xs: 32, sm: 36, md: 40 },
                      border: `2px solid ${theme.palette.background.paper}`,
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
        
        {/* Mobile Search Bar */}
        {isMobile && searchOpen && (
          <Collapse in={searchOpen}>
            <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.95) }}>
              <Suspense fallback={<Skeleton height={40} />}>
                <SearchBar />
              </Suspense>
            </Box>
          </Collapse>
        )}
      </StyledAppBar>

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: drawerWidth,
              boxShadow: `0 0 60px ${alpha(theme.palette.common.black, 0.3)}`,
            },
          }}
        >
          {drawerContent}
        </StyledDrawer>
      )}

      {/* Desktop Persistent Drawer */}
      {!isMobile && (
        <StyledDrawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerOpen ? drawerWidth : miniDrawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerOpen ? drawerWidth : miniDrawerWidth,
              mt: '76px',
              height: 'calc(100% - 76px)',
            },
          }}
        >
          {drawerContent}
        </StyledDrawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          ml: { md: drawerOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px` },
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          mt: { xs: '64px', sm: '70px', md: '76px' },
          minHeight: { xs: 'calc(100vh - 64px)', sm: 'calc(100vh - 70px)', md: 'calc(100vh - 76px)' },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          bgcolor: theme.palette.background.default,
        }}
      >
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Container maxWidth="xl" sx={{ py: 2, px: { xs: 2, md: 3 } }}>
            <Breadcrumbs 
              separator={<ChevronRight sx={{ fontSize: 16 }} />}
              aria-label="breadcrumb"
            >
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/')
                }}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                <Home sx={{ fontSize: 18 }} />
                Home
              </Link>
              {breadcrumbs.map((crumb) => (
                crumb.isLast ? (
                  <Typography 
                    key={crumb.to}
                    color="text.primary" 
                    sx={{ 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={crumb.to}
                    href={crumb.to}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(crumb.to)
                    }}
                    sx={{ 
                      textDecoration: 'none',
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {crumb.label}
                  </Link>
                )
              ))}
            </Breadcrumbs>
          </Container>
        )}
        
        {/* Page Content */}
        <Container 
          maxWidth="xl"
          sx={{ 
            flexGrow: 1, 
            py: { xs: 2, md: 3 },
            px: { xs: 2, md: 3 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Grow in timeout={300}>
            <Box>
              {children}
            </Box>
          </Grow>
        </Container>
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={() => setNotificationAnchorEl(null)}
        PaperProps={{
          sx: { 
            width: { xs: '90vw', sm: 360 }, 
            maxHeight: 500,
            borderRadius: 3,
            mt: 1,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
            overflow: 'hidden',
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Suspense fallback={<Box sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Box>}>
          <NotificationsPanel
            notifications={notifications}
            unreadCount={unreadCount}
            loading={loading}
            onMarkAsRead={markAsRead}
            onNavigate={(path) => {
              navigate(path)
              setNotificationAnchorEl(null)
            }}
          />
        </Suspense>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 3,
            background: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
            overflow: 'visible',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }
          }
        }}
      >
        <Suspense fallback={<Box sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Box>}>
          <UserMenu
            user={user}
            isSuperAdmin={isSuperAdmin}
            isAdmin={isAdmin}
            theme={theme}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
            onToggleTheme={toggleColorMode}
            loggingOut={loggingOut}
          />
        </Suspense>
      </Menu>

      {/* Scroll to Top Button */}
      <ScrollTop />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={Fade}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 3,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.2)}`,
            alignItems: 'center',
            '& .MuiAlert-icon': {
              alignItems: 'center',
            }
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            {snackbar.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default memo(MainLayout)