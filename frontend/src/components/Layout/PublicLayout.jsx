// import React, { useState, useCallback, useMemo, memo } from 'react'
// import { 
//   AppBar, Toolbar, Typography, Button, Box, Container,
//   IconButton, Drawer, List, ListItem, ListItemText,
//   useTheme, useMediaQuery, alpha, Menu, MenuItem, Avatar
// } from '@mui/material'
// import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
// import MenuIcon from '@mui/icons-material/Menu'
// import CloseIcon from '@mui/icons-material/Close'
// import HomeIcon from '@mui/icons-material/Home'
// import LoginIcon from '@mui/icons-material/Login'
// import ReportProblemIcon from '@mui/icons-material/ReportProblem'
// import PersonIcon from '@mui/icons-material/Person'
// import LogoutIcon from '@mui/icons-material/Logout'
// import { useAuth } from '../../contexts/AuthContext'
// import { getScopedPath, isScopedPath } from '../../utils/subdomain'
// import logoSvg from '../../assets/images/logo.svg'

// // Memoized NavLink component
// const NavLink = memo(({ to, label, icon: Icon, mobile = false, onClick, isActive }) => {
//   const theme = useTheme()

//   if (mobile) {
//     return (
//       <ListItem 
//         component={RouterLink} 
//         to={to}
//         onClick={onClick}
//         sx={{
//           borderRadius: 2,
//           mb: 1,
//           bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
//           '&:hover': {
//             bgcolor: alpha(theme.palette.primary.main, 0.05)
//           }
//         }}
//       >
//         {Icon && (
//           <Icon 
//             sx={{ 
//               mr: 2, 
//               color: isActive ? 'primary.main' : 'text.secondary',
//               fontSize: '1.2rem'
//             }} 
//           />
//         )}
//         <ListItemText 
//           primary={label}
//           primaryTypographyProps={{
//             fontWeight: isActive ? 700 : 500,
//             color: isActive ? 'primary.main' : 'text.primary'
//           }}
//         />
//       </ListItem>
//     )
//   }

//   return (
//     <Button
//       component={RouterLink}
//       to={to}
//       startIcon={Icon && <Icon />}
//       sx={{
//         fontWeight: isActive ? 700 : 500,
//         textTransform: 'none',
//         fontSize: '0.95rem',
//         px: 2,
//         py: 1,
//         borderRadius: 2,
//         transition: 'all 0.2s ease',
//         position: 'relative',
//         overflow: 'hidden',
//         color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
//         '&:after': {
//           content: '""',
//           position: 'absolute',
//           bottom: 0,
//           left: '50%',
//           width: isActive ? '80%' : 0,
//           height: 3,
//           background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//           transform: 'translateX(-50%)',
//           transition: 'width 0.3s ease',
//           borderRadius: 3
//         },
//         '&:hover:not(:disabled)': {
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//           '&:after': {
//             width: '80%'
//           }
//         }
//       }}
//     >
//       {label}
//     </Button>
//   )
// })

// NavLink.displayName = 'NavLink'

// // Memoized Logo component
// const Logo = memo(({ onClick, to = '/' }) => {
//   const theme = useTheme()

//   return (
//     <Box 
//       component={RouterLink} 
//       to={to} 
//       onClick={onClick}
//       sx={{ 
//         display: 'flex', 
//         alignItems: 'center', 
//         gap: 2, 
//         textDecoration: 'none',
//         '&:hover': {
//           '& .logo-icon': {
//             transform: 'rotate(-10deg) scale(1.1)'
//           }
//         }
//       }}
//     >
//       <Box
//         component="img"
//         src={logoSvg}
//         alt="Clean Street"
//         className="logo-icon"
//         sx={{ 
//           height: 40,
//           width: 40,
//           transition: 'transform 0.3s ease'
//         }} 
//       />
//       <Box>
//         <Typography 
//           variant="h5" 
//           color="primary" 
//           sx={{ 
//             fontWeight: 900,
//             lineHeight: 1,
//             letterSpacing: '-0.5px'
//           }}
//         >
//           Clean Street
//         </Typography>
//         <Typography 
//           variant="caption" 
//           color="text.secondary"
//           sx={{ 
//             fontWeight: 500,
//             display: { xs: 'none', sm: 'block' }
//           }}
//         >
//           Making cities better, together
//         </Typography>
//       </Box>
//     </Box>
//   )
// })

// Logo.displayName = 'Logo'

// // Memoized ReportButton component
// const ReportButton = memo(({ onClick, mobile = false, fullWidth = false }) => {
//   const theme = useTheme()

//   return (
//     <Button
//       component={'button'}
//       variant="contained"
//       startIcon={<ReportProblemIcon />}
//       onClick={onClick}
//       fullWidth={fullWidth}
//       sx={{
//         py: mobile ? 1.5 : 1,
//         px: mobile ? 2 : 3,
//         borderRadius: 3,
//         background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//         fontWeight: 700,
//         fontSize: mobile ? '1rem' : '0.95rem',
//         textTransform: 'none',
//         boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
//         },
//         transition: 'all 0.3s ease'
//       }}
//     >
//       Report Issue
//     </Button>
//   )
// })

// // Memoized ProfileMenu component
// const ProfileMenu = memo(({ user, onLogout }) => {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)
//   const theme = useTheme()

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleLogout = () => {
//     handleMenuClose()
//     onLogout()
//   }

//   return (
//     <>
//       <IconButton
//         onClick={handleMenuOpen}
//         sx={{
//           p: 0.5,
//           border: `2px solid ${theme.palette.primary.main}`,
//           '&:hover': {
//             bgcolor: alpha(theme.palette.primary.main, 0.1)
//           }
//         }}
//       >
//         <Avatar
//           src={user?.profilePicture || undefined}
//           sx={{
//             width: 32,
//             height: 32,
//             bgcolor: theme.palette.primary.main,
//             fontSize: '0.9rem',
//             fontWeight: 700
//           }}
//         >
//           {user?.name?.charAt(0).toUpperCase() || 'U'}
//         </Avatar>
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//         PaperProps={{
//           sx: {
//             mt: 1,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             borderRadius: 2,
//             minWidth: 200,
//             bgcolor: 'background.paper',
//             backdropFilter: 'blur(10px)'
//           }
//         }}
//       >
//         <MenuItem
//           component={RouterLink}
//           to="/profile"
//           onClick={handleMenuClose}
//           sx={{
//             py: 1.5,
//             px: 2,
//             '&:hover': {
//               bgcolor: alpha(theme.palette.primary.main, 0.1)
//             }
//           }}
//         >
//           <PersonIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
//           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//             Profile
//           </Typography>
//         </MenuItem>
//         <MenuItem
//           onClick={handleLogout}
//           sx={{
//             py: 1.5,
//             px: 2,
//             color: 'error.main',
//             '&:hover': {
//               bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
//             }
//           }}
//         >
//           <LogoutIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
//           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//             Logout
//           </Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   )
// })

// ProfileMenu.displayName = 'ProfileMenu'

// // Memoized MobileProfileMenu component
// const MobileProfileMenu = memo(({ user, onLogout, onClose }) => {
//   const theme = useTheme()

//   return (
//     <>
//       <ListItem 
//         component={RouterLink} 
//         to="/profile"
//         onClick={onClose}
//         sx={{
//           borderRadius: 2,
//           mb: 1,
//           bgcolor: 'transparent',
//           '&:hover': {
//             bgcolor: alpha(theme.palette.primary.main, 0.05)
//           }
//         }}
//       >
//         <PersonIcon 
//           sx={{ 
//             mr: 2, 
//             color: 'text.secondary',
//             fontSize: '1.2rem'
//           }} 
//         />
//         <ListItemText 
//           primary="Profile"
//           primaryTypographyProps={{
//             fontWeight: 500,
//             color: 'text.primary'
//           }}
//         />
//       </ListItem>
//       <ListItem 
//         onClick={() => {
//           onClose()
//           onLogout()
//         }}
//         sx={{
//           borderRadius: 2,
//           mb: 1,
//           color: 'error.main',
//           cursor: 'pointer',
//           '&:hover': {
//             bgcolor: (theme) => alpha(theme.palette.error.main, 0.05)
//           }
//         }}
//       >
//         <LogoutIcon 
//           sx={{ 
//             mr: 2, 
//             color: 'error.main',
//             fontSize: '1.2rem'
//           }} 
//         />
//         <ListItemText 
//           primary="Logout"
//           primaryTypographyProps={{
//             fontWeight: 500,
//             color: 'error.main'
//           }}
//         />
//       </ListItem>
//     </>
//   )
// })

// MobileProfileMenu.displayName = 'MobileProfileMenu'

// ReportButton.displayName = 'ReportButton'

// // Memoized Footer component
// const Footer = memo(() => {
//   const theme = useTheme()
  
//   const quickLinks = useMemo(() => [
//     { to: '/terms', label: 'Terms' },
//     { to: '/privacy', label: 'Privacy' },
//     { to: '/contact', label: 'Contact' },
//   ], [])

//   return (
//     <Box 
//       component="footer" 
//       sx={{ 
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         borderTop: '1px solid',
//         borderColor: alpha(theme.palette.divider, 0.1),
//         py: 2,
//         background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,255,0.98) 100%)',
//         backdropFilter: 'blur(10px)',
//         zIndex: 1000,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: { xs: 'column', md: 'row' },
//           justifyContent: 'space-between', 
//           alignItems: 'center',
//           gap: { xs: 1, md: 2 }
//         }}>
//           {/* Logo and Tagline */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <Box
//               component="img"
//               src={logoSvg}
//               alt="Clean Street"
//               sx={{ height: 24, width: 24 }}
//             />
//             <Box>
//               <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
//                 Clean Street
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' } }}>
//                 Community-powered city improvement
//               </Typography>
//             </Box>
//           </Box>

//           {/* Quick Links */}
//           <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 } }}>
//             {quickLinks.map((link) => (
//               <Button
//                 key={link.to}
//                 component={RouterLink}
//                 to={link.to}
//                 size="small"
//                 sx={{ 
//                   fontWeight: 500, 
//                   textTransform: 'none',
//                   color: 'text.secondary',
//                   fontSize: '0.875rem',
//                   '&:hover': { color: 'primary.main' }
//                 }}
//               >
//                 {link.label}
//               </Button>
//             ))}
//           </Box>

//           {/* Copyright - Inline on desktop */}
//           <Typography 
//             variant="caption" 
//             color="text.secondary"
//             sx={{ display: { xs: 'none', md: 'block' } }}
//           >
//             © {new Date().getFullYear()} Clean Street
//           </Typography>
//         </Box>

//         {/* Copyright - Mobile only */}
//         <Typography 
//           variant="caption" 
//           color="text.secondary" 
//           align="center"
//           sx={{ 
//             mt: 1,
//             display: { xs: 'block', md: 'none' }
//           }}
//         >
//           © {new Date().getFullYear()} Clean Street
//         </Typography>
//       </Container>
//     </Box>
//   )
// })

// Footer.displayName = 'Footer'

// // Memoized MobileDrawer component
// const MobileDrawer = memo(({ 
//   open, 
//   onClose, 
//   navLinks, 
//   handleReportIssue,
//   showReportButton,
//   theme,
//   isAuthenticated,
//   user,
//   onLogout
// }) => {
//   const location = useLocation()
  
//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onClose}
//       ModalProps={{
//         keepMounted: true,
//       }}
//       sx={{
//         '& .MuiDrawer-paper': {
//           boxSizing: 'border-box',
//           width: 280,
//           borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//           backdropFilter: 'blur(10px)',
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,255,0.98) 100%)'
//         },
//       }}
//     >
//       <Box sx={{ width: 280, p: 2, height: '100%' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, p: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <Box
//               component="img"
//               src={logoSvg}
//               alt="Clean Street"
//               sx={{ height: 32, width: 32 }}
//             />
//             <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
//               Clean Street
//             </Typography>
//           </Box>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
        
//         <List sx={{ px: 1 }}>
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               label={link.label}
//               icon={link.icon}
//               mobile
//               onClick={onClose}
//               isActive={location.pathname === link.to}
//             />
//           ))}
//           {isAuthenticated && (
//             <MobileProfileMenu
//               user={user}
//               onLogout={onLogout}
//               onClose={onClose}
//             />
//           )}
//         </List>
        
//         {showReportButton && (
//           <Box sx={{ p: 2, mt: 2 }}>
//             <ReportButton
//               mobile
//               fullWidth
//               onClick={() => {
//                 onClose()
//                 handleReportIssue()
//               }}
//             />
//           </Box>
//         )}
//       </Box>
//     </Drawer>
//   )
// })

// MobileDrawer.displayName = 'MobileDrawer'

// // Main PublicLayout component
// const PublicLayout = ({ children }) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'))
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { isAuthenticated, user, logout } = useAuth()
//   const isAdminScope = isScopedPath('admin')
//   const isVolunteerScope = isScopedPath('volunteer')
//   const showReportButton = !isAdminScope && !isVolunteerScope
//   const logoTo = isAdminScope
//     ? getScopedPath('admin', '/login')
//     : isVolunteerScope
//       ? getScopedPath('volunteer', '/login')
//       : '/'

//   // Memoized navLinks array - show dashboard if authenticated, login if not
//   const navLinks = useMemo(() => {
//     if (isAdminScope) {
//       const links = []
//       if (isAuthenticated) {
//         links.push({ to: getScopedPath('admin', '/dashboard'), label: 'Dashboard', icon: PersonIcon })
//       }
//       links.push({ to: getScopedPath('admin', '/login'), label: 'Admin Login', icon: LoginIcon })
//       return links
//     }

//     if (isVolunteerScope) {
//       if (!isAuthenticated) {
//         return [
//           { to: getScopedPath('volunteer', '/login'), label: 'Login', icon: LoginIcon },
//           { to: getScopedPath('volunteer', '/register'), label: 'Register', icon: PersonIcon }
//         ]
//       }
//       return [{ to: getScopedPath('volunteer', '/dashboard'), label: 'Dashboard', icon: PersonIcon }]
//     }

//     const links = [
//       { to: '/', label: 'Home', icon: HomeIcon },
//     ]

//     if (!isAuthenticated) {
//       links.push({ to: '/login', label: 'Login', icon: LoginIcon })
//     } else {
//       links.push({ to: '/dashboard', label: 'Dashboard', icon: PersonIcon })
//     }

//     return links
//   }, [isAuthenticated, isAdminScope, isVolunteerScope])

//   // Memoized callbacks
//   const handleDrawerToggle = useCallback(() => {
//     setMobileOpen(prev => !prev)
//   }, [])

//   const handleReportIssue = useCallback(() => {
//     if (isAuthenticated) {
//       navigate('/report-issue')
//     } else {
//       navigate('/login', { state: { from: '/report-issue' } })
//     }
//   }, [navigate, isAuthenticated])

//   const handleLogout = useCallback(() => {
//     logout()
//     navigate('/')
//   }, [logout, navigate])

//   const handleLogoClick = useCallback(() => {
//     if (mobileOpen) {
//       setMobileOpen(false)
//     }
//   }, [mobileOpen])

//   return (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       bgcolor: 'background.default',
//       display: 'flex',
//       flexDirection: 'column',
//       pb: { xs: '130px', md: '60px' }
//     }}>
//       <AppBar 
//         position="sticky" 
//         elevation={0}
//         sx={{ 
//           background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,255,0.95) 100%)',
//           backdropFilter: 'blur(10px)',
//           borderBottom: '1px solid',
//           borderColor: alpha(theme.palette.divider, 0.1),
//           py: 0.5
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
//             {/* Logo */}
//             <Logo onClick={handleLogoClick} to={logoTo} />

//             {/* Desktop Navigation */}
//             {!isMobile ? (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {navLinks.map((link) => (
//                   <NavLink
//                     key={link.to}
//                     to={link.to}
//                     label={link.label}
//                     icon={link.icon}
//                     isActive={location.pathname === link.to}
//                   />
//                 ))}
//                 {isAuthenticated && (
//                   <ProfileMenu
//                     user={user}
//                     onLogout={handleLogout}
//                   />
//                 )}
//                 {showReportButton && <ReportButton onClick={handleReportIssue} />}
//               </Box>
//             ) : (
//               // Mobile Menu Button
//               <IconButton
//                 color="primary"
//                 aria-label="open drawer"
//                 edge="end"
//                 onClick={handleDrawerToggle}
//                 sx={{
//                   border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.05)
//                   }
//                 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <MobileDrawer
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           navLinks={navLinks}
//           handleReportIssue={handleReportIssue}
//           showReportButton={showReportButton}
//           theme={theme}
//           isAuthenticated={isAuthenticated}
//           user={user}
//           onLogout={handleLogout}
//         />
//       )}

//       {/* Main Content */}
//       <Box 
//         component="main" 
//         sx={{ 
//           flex: 1,
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         {children}
//       </Box>

//       {/* Footer */}
//       <Footer />
//     </Box>
//   )
// }

// // Export memoized PublicLayout
// export default memo(PublicLayout)



import React, { useState, useCallback, useMemo, memo } from 'react'
import { 
  AppBar, Toolbar, Typography, Button, Box, Container,
  IconButton, Drawer, List, ListItem, ListItemText,
  useTheme, useMediaQuery, alpha, Menu, MenuItem, Avatar
} from '@mui/material'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import { useAuth } from '../../contexts/AuthContext'
import { getScopedPath, isScopedPath } from '../../utils/subdomain'
import logoSvg from '../../assets/images/logo.svg'

// Memoized NavLink component
const NavLink = memo(({ to, label, icon: Icon, mobile = false, onClick, isActive }) => {
  const theme = useTheme()

  if (mobile) {
    return (
      <ListItem 
        component={RouterLink} 
        to={to}
        onClick={onClick}
        sx={{
          borderRadius: 2,
          mb: 1,
          minHeight: '48px', // Better touch target
          py: 1.5,
          bgcolor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }
        }}
      >
        {Icon && (
          <Icon 
            sx={{ 
              mr: 2, 
              color: isActive ? 'primary.main' : 'text.secondary',
              fontSize: '1.2rem'
            }} 
          />
        )}
        <ListItemText 
          primary={label}
          primaryTypographyProps={{
            fontWeight: isActive ? 700 : 500,
            color: isActive ? 'primary.main' : 'text.primary',
            fontSize: '0.95rem'
          }}
        />
      </ListItem>
    )
  }

  return (
    <Button
      component={RouterLink}
      to={to}
      startIcon={Icon && <Icon />}
      sx={{
        fontWeight: isActive ? 700 : 500,
        textTransform: 'none',
        fontSize: {
          xs: '0.85rem',
          sm: '0.9rem',
          md: '0.95rem'
        },
        px: { xs: 1.5, sm: 2 },
        py: 1,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: isActive ? '80%' : 0,
          height: 3,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          transform: 'translateX(-50%)',
          transition: 'width 0.3s ease',
          borderRadius: 3
        },
        '&:hover:not(:disabled)': {
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          '&:after': {
            width: '80%'
          }
        }
      }}
    >
      {label}
    </Button>
  )
})

NavLink.displayName = 'NavLink'

// More Menu component for tablet view
const MoreMenu = memo(({ navLinks }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const location = useLocation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 1,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            borderRadius: 2,
            minWidth: 180,
            bgcolor: 'background.paper',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        {navLinks.map((link) => (
          <MenuItem
            key={link.to}
            component={RouterLink}
            to={link.to}
            onClick={handleClose}
            sx={{
              py: 1.5,
              px: 2,
              bgcolor: location.pathname === link.to ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            {link.icon && <link.icon sx={{ mr: 1.5, fontSize: '1.2rem' }} />}
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {link.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

MoreMenu.displayName = 'MoreMenu'

// Memoized Logo component
const Logo = memo(({ onClick, to = '/' }) => {
  const theme = useTheme()

  return (
    <Box 
      component={RouterLink} 
      to={to} 
      onClick={onClick}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 2 }, 
        textDecoration: 'none',
        '&:hover': {
          '& .logo-icon': {
            transform: 'rotate(-10deg) scale(1.1)'
          }
        }
      }}
    >
      <Box
        component="img"
        src={logoSvg}
        alt="Clean Street"
        className="logo-icon"
        sx={{ 
          height: { xs: 32, sm: 36, md: 40 },
          width: { xs: 32, sm: 36, md: 40 },
          transition: 'transform 0.3s ease'
        }} 
      />
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography 
          variant="h5" 
          color="primary" 
          sx={{ 
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.5px',
            fontSize: {
              xs: '1.1rem',
              sm: '1.3rem',
              md: '1.5rem'
            }
          }}
        >
          Clean Street
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            fontWeight: 500,
            display: { xs: 'none', md: 'block' }
          }}
        >
          Making cities better, together
        </Typography>
      </Box>
    </Box>
  )
})

Logo.displayName = 'Logo'

// Memoized ReportButton component
const ReportButton = memo(({ onClick, mobile = false, fullWidth = false, size = 'medium' }) => {
  const theme = useTheme()

  return (
    <Button
      component={'button'}
      variant="contained"
      startIcon={<ReportProblemIcon />}
      onClick={onClick}
      fullWidth={fullWidth}
      size={size}
      sx={{
        py: mobile ? 1.5 : { xs: 0.8, sm: 1 },
        px: mobile ? 2 : { xs: 2, sm: 2.5, md: 3 },
        borderRadius: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        fontWeight: 700,
        fontSize: mobile ? '1rem' : { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
        textTransform: 'none',
        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
        minWidth: { xs: 'auto', sm: '120px' },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      Report Issue
    </Button>
  )
})

ReportButton.displayName = 'ReportButton'

// Memoized ProfileMenu component
const ProfileMenu = memo(({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    onLogout()
  }

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        sx={{
          p: 0.5,
          ml: 1,
          border: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.1)
          }
        }}
      >
        <Avatar
          src={user?.profilePicture || undefined}
          sx={{
            width: { xs: 28, sm: 30, md: 32 },
            height: { xs: 28, sm: 30, md: 32 },
            bgcolor: theme.palette.primary.main,
            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
            fontWeight: 700
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            borderRadius: 2,
            minWidth: 200,
            bgcolor: 'background.paper',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <MenuItem
          component={RouterLink}
          to="/profile"
          onClick={handleMenuClose}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          <PersonIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.1)
            }
          }}
        >
          <LogoutIcon sx={{ mr: 1.5, fontSize: '1.2rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
})

ProfileMenu.displayName = 'ProfileMenu'

// Memoized MobileProfileMenu component
const MobileProfileMenu = memo(({ user, onLogout, onClose }) => {
  const theme = useTheme()

  return (
    <>
      <ListItem 
        component={RouterLink} 
        to="/profile"
        onClick={onClose}
        sx={{
          borderRadius: 2,
          mb: 1,
          minHeight: '48px',
          py: 1.5,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.05)
          }
        }}
      >
        <PersonIcon 
          sx={{ 
            mr: 2, 
            color: 'text.secondary',
            fontSize: '1.2rem'
          }} 
        />
        <ListItemText 
          primary="Profile"
          primaryTypographyProps={{
            fontWeight: 500,
            color: 'text.primary',
            fontSize: '0.95rem'
          }}
        />
      </ListItem>
      <ListItem 
        onClick={() => {
          onClose()
          onLogout()
        }}
        sx={{
          borderRadius: 2,
          mb: 1,
          minHeight: '48px',
          py: 1.5,
          color: 'error.main',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.05)
          }
        }}
      >
        <LogoutIcon 
          sx={{ 
            mr: 2, 
            color: 'error.main',
            fontSize: '1.2rem'
          }} 
        />
        <ListItemText 
          primary="Logout"
          primaryTypographyProps={{
            fontWeight: 500,
            color: 'error.main',
            fontSize: '0.95rem'
          }}
        />
      </ListItem>
    </>
  )
})

MobileProfileMenu.displayName = 'MobileProfileMenu'

// Memoized Footer component
const Footer = memo(() => {
  const theme = useTheme()
  
  const quickLinks = useMemo(() => [
    { to: '/terms', label: 'Terms' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/contact', label: 'Contact' },
  ], [])

  return (
    <Box 
      component="footer" 
      sx={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        py: { xs: 1.5, sm: 2 },
        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,255,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 }
        }}>
          {/* Logo and Tagline */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src={logoSvg}
              alt="Clean Street"
              sx={{ height: { xs: 20, sm: 22, md: 24 }, width: 'auto' }}
            />
            <Box>
              <Typography 
                variant="subtitle1" 
                color="primary" 
                sx={{ 
                  fontWeight: 700, 
                  lineHeight: 1.2,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Clean Street
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  display: { xs: 'none', md: 'block' },
                  fontSize: '0.75rem'
                }}
              >
                Community-powered city improvement
              </Typography>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1.5, sm: 2, md: 3 },
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {quickLinks.map((link) => (
              <Button
                key={link.to}
                component={RouterLink}
                to={link.to}
                size="small"
                sx={{ 
                  fontWeight: 500, 
                  textTransform: 'none',
                  color: 'text.secondary',
                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                  minWidth: 'auto',
                  p: { xs: 0.5, sm: 1 },
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Copyright - Desktop */}
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              display: { xs: 'none', md: 'block' },
              fontSize: '0.75rem'
            }}
          >
            © {new Date().getFullYear()} Clean Street
          </Typography>
        </Box>

        {/* Copyright - Mobile/Tablet */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="center"
          sx={{ 
            mt: 1,
            display: { xs: 'block', md: 'none' },
            fontSize: '0.7rem'
          }}
        >
          © {new Date().getFullYear()} Clean Street. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
})

Footer.displayName = 'Footer'

// Memoized MobileDrawer component
const MobileDrawer = memo(({ 
  open, 
  onClose, 
  navLinks, 
  handleReportIssue,
  handleVolunteerRedirect,
  showReportButton,
  theme,
  isAuthenticated,
  user,
  onLogout
}) => {
  const location = useLocation()
  const isLandscape = useMediaQuery('(orientation: landscape)')
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={{
        enter: 300,
        exit: 200
      }}
      SlideProps={{
        direction: 'left',
        timeout: 300
      }}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: 280, sm: 320 },
          height: isLandscape ? '100vh' : 'auto',
          maxHeight: isLandscape ? '100vh' : 'none',
          borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,249,255,0.98) 100%)'
        },
      }}
    >
      <Box sx={{ width: '100%', p: 2, height: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 3, 
          p: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src={logoSvg}
              alt="Clean Street"
              sx={{ height: 32, width: 32 }}
            />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
              Clean Street
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="large">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <List sx={{ px: 1 }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
              mobile
              onClick={onClose}
              isActive={location.pathname === link.to}
            />
          ))}
          {isAuthenticated && (
            <MobileProfileMenu
              user={user}
              onLogout={onLogout}
              onClose={onClose}
            />
          )}
        </List>
        
        {showReportButton && (
          <Box sx={{ p: 2, mt: 2 }}>
            <ReportButton
              mobile
              fullWidth
              onClick={() => {
                onClose()
                handleReportIssue()
              }}
            />
          </Box>
        )}

        <Box sx={{ p: 2, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<VolunteerActivismIcon />}
            onClick={() => {
              onClose()
              handleVolunteerRedirect()
            }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              py: 1.5,
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Join as Volunteer
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
})

MobileDrawer.displayName = 'MobileDrawer'

// Main PublicLayout component
const PublicLayout = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')) // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')) // > 900px
  const isLandscape = useMediaQuery('(orientation: landscape)')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const isAdminScope = isScopedPath('admin')
  const isVolunteerScope = isScopedPath('volunteer')
  const isAdminUser = user?.role === 'admin' || user?.role === 'super-admin'
  const isVolunteerUser = user?.role === 'volunteer'
  const scopedAuth = isAdminScope
    ? isAuthenticated && isAdminUser
    : isVolunteerScope
      ? isAuthenticated && isVolunteerUser
      : isAuthenticated
  const showReportButton = !isAdminScope && !isVolunteerScope
  const logoTo = isAdminScope
    ? getScopedPath('admin', '/login')
    : isVolunteerScope
      ? getScopedPath('volunteer', '/login')
      : '/'

  // Memoized navLinks array
  const navLinks = useMemo(() => {
    if (isAdminScope) {
      const links = []
      if (scopedAuth) {
        links.push({ to: getScopedPath('admin', '/dashboard'), label: 'Dashboard', icon: PersonIcon })
      }
      links.push({ to: getScopedPath('admin', '/login'), label: 'Admin Login', icon: LoginIcon })
      return links
    }

    if (isVolunteerScope) {
      if (!scopedAuth) {
        return [
          { to: getScopedPath('volunteer', '/login'), label: 'Login', icon: LoginIcon },
          { to: getScopedPath('volunteer', '/register'), label: 'Register', icon: PersonIcon }
        ]
      }
      return [{ to: getScopedPath('volunteer', '/dashboard'), label: 'Dashboard', icon: PersonIcon }]
    }

    const links = [
      { to: '/', label: 'Home', icon: HomeIcon },
    ]

    if (!scopedAuth) {
      links.push({ to: '/login', label: 'Login', icon: LoginIcon })
    } else {
      links.push({ to: '/dashboard', label: 'Dashboard', icon: PersonIcon })
    }

    return links
  }, [isAuthenticated, isAdminScope, isVolunteerScope, scopedAuth])

  // Memoized callbacks
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  const handleReportIssue = useCallback(() => {
    if (scopedAuth) {
      navigate('/report-issue')
    } else {
      navigate('/login', { state: { from: '/report-issue' } })
    }
  }, [navigate, scopedAuth])

  const handleLogout = useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])

  const handleVolunteerRedirect = useCallback(() => {
    navigate(getScopedPath('volunteer', '/'))
  }, [navigate])

  const handleLogoClick = useCallback(() => {
    if (mobileOpen) {
      setMobileOpen(false)
    }
  }, [mobileOpen])

  // Calculate footer padding based on screen size
  const footerPadding = useMemo(() => {
    if (isLandscape) {
      return { xs: '90px', sm: '80px', md: '60px' }
    }
    return { xs: '120px', sm: '100px', md: '70px' }
  }, [isLandscape])

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      pb: footerPadding
    }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,255,0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          py: { xs: 0.25, sm: 0.5 }
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            py: { xs: 0.5, sm: 1 },
            minHeight: { xs: '56px', sm: '64px' }
          }}>
            {/* Logo */}
            <Logo onClick={handleLogoClick} to={logoTo} />

            {/* Navigation */}
            {isDesktop ? (
              // Desktop Navigation
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    label={link.label}
                    icon={link.icon}
                    isActive={location.pathname === link.to}
                  />
                ))}
                {scopedAuth && (
                  <ProfileMenu
                    user={user}
                    onLogout={handleLogout}
                  />
                )}
                {showReportButton && <ReportButton onClick={handleReportIssue} />}
                <Button
                  variant="contained"
                  startIcon={<VolunteerActivismIcon />}
                  onClick={handleVolunteerRedirect}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    ml: 1,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Volunteer
                </Button>
              </Box>
            ) : isTablet ? (
              // Tablet Navigation - Condensed
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Show only essential links */}
                <NavLink
                  to="/"
                  label="Home"
                  icon={HomeIcon}
                  isActive={location.pathname === '/'}
                />
                {/* Collapse other links into More menu */}
                {navLinks.length > 1 && (
                  <MoreMenu navLinks={navLinks.slice(1)} />
                )}
                {scopedAuth && (
                  <ProfileMenu
                    user={user}
                    onLogout={handleLogout}
                  />
                )}
                {showReportButton && (
                  <ReportButton 
                    onClick={handleReportIssue} 
                    size="small"
                  />
                )}
                <Button
                  variant="contained"
                  startIcon={<VolunteerActivismIcon />}
                  onClick={handleVolunteerRedirect}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    ml: 1,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Volunteer
                </Button>
              </Box>
            ) : (
              // Mobile Menu Button
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                size="large"
                sx={{
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05)
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <MobileDrawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          navLinks={navLinks}
          handleReportIssue={handleReportIssue}
          handleVolunteerRedirect={handleVolunteerRedirect}
          showReportButton={showReportButton}
          theme={theme}
          isAuthenticated={scopedAuth}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}

// Export memoized PublicLayout
export default memo(PublicLayout)
