// import React, { useState } from 'react'
// import { 
//   Container, Typography, Button, Box, Grid, Paper, 
//   Card, CardContent, CardActions, Fade, Zoom, Grow,
//   Avatar, Chip, Stack, Divider, IconButton, alpha,
//   useTheme, useMediaQuery
// } from '@mui/material'
// import { Link, useNavigate } from 'react-router-dom'
// import { getScopedPath } from '../utils/subdomain'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
// import ReportIcon from '@mui/icons-material/Report'
// import TrackChangesIcon from '@mui/icons-material/TrackChanges'
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
// import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// import TrendingUpIcon from '@mui/icons-material/TrendingUp'
// import GroupsIcon from '@mui/icons-material/Groups'
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
// import MapIcon from '@mui/icons-material/Map'
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
// import GpsFixedIcon from '@mui/icons-material/GpsFixed'
// import { keyframes } from '@emotion/react'
// import { styled } from '@mui/material/styles'

// // Styled Components
// const FeatureCard = styled(Card)(({ theme, color }) => ({
//   borderRadius: 20,
//   border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
//   background: theme.palette.mode === 'dark'
//     ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
//     : '#ffffff',
//   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//   overflow: 'hidden',
//   position: 'relative',
//   '&:hover': {
//     transform: 'translateY(-12px) scale(1.02)',
//     boxShadow: `0 25px 50px ${alpha(color || theme.palette.primary.main, 0.2)}`,
//     '& .feature-hover': {
//       opacity: 1,
//       transform: 'translateY(0)',
//     }
//   }
// }))

// const StatsCard = styled(Paper)(({ theme, color }) => ({
//   borderRadius: 16,
//   background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.1)} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
//   border: `1px solid ${alpha(color || theme.palette.primary.main, 0.2)}`,
//   padding: theme.spacing(3),
//   height: '100%',
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   '&:hover': {
//     transform: 'translateY(-8px) scale(1.05)',
//     boxShadow: `0 15px 35px ${alpha(color || theme.palette.primary.main, 0.2)}`,
//   }
// }))

// const IssueCard = styled(Paper)(({ theme, color }) => ({
//   borderRadius: 12,
//   padding: theme.spacing(2),
//   background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.08)} 0%, transparent 100%)`,
//   border: `1px solid ${alpha(color || theme.palette.primary.main, 0.15)}`,
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   '&:hover': {
//     transform: 'translateX(10px)',
//     background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.15)} 0%, transparent 100%)`,
//     boxShadow: `0 10px 25px ${alpha(color || theme.palette.primary.main, 0.15)}`,
//   }
// }))

// // Animation keyframes
// const floatAnimation = keyframes`
//   0%, 100% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-20px) rotate(5deg); }
// `

// const pulseAnimation = keyframes`
//   0%, 100% { transform: scale(1); opacity: 1; }
//   50% { transform: scale(1.05); opacity: 0.8; }
// `

// const shimmerAnimation = keyframes`
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// `

// const Home = () => {
//   const theme = useTheme()
//   const navigate = useNavigate()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'))

//   const [activeCategory, setActiveCategory] = useState(0)

//   const features = [
//     {
//       icon: <ReportIcon sx={{ fontSize: 56 }} />,
//       title: 'Report Issues Instantly',
//       description: 'Document civic problems with photos, location pins, and detailed descriptions.',
//       color: '#FF6B6B',
//       stats: '15K+ Issues Reported',
//       steps: ['📸 Snap Photo', '📍 Pin Location', '📝 Add Details', '🚀 Submit'],
//       gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)'
//     },
//     {
//       icon: <TrackChangesIcon sx={{ fontSize: 56 }} />,
//       title: 'Track Real-time Progress',
//       description: 'Follow your report from submission to resolution with live status updates.',
//       color: '#4ECDC4',
//       stats: '92% Resolution Rate',
//       steps: ['📤 Submitted', '👀 Under Review', '🔧 In Progress', '✅ Resolved'],
//       gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6CE6DE 100%)'
//     },
//     {
//       icon: <VolunteerActivismIcon sx={{ fontSize: 56 }} />,
//       title: 'Community Collaboration',
//       description: 'Vote, comment, and work together with neighbors and local authorities.',
//       color: '#FFD166',
//       stats: '75K+ Active Users',
//       steps: ['👍 Upvote Issues', '💬 Join Discussions', '👥 Form Groups', '🎯 Take Action'],
//       gradient: 'linear-gradient(135deg, #FFD166 0%, #FFE194 100%)'
//     },
//     {
//       icon: <LocationOnIcon sx={{ fontSize: 56 }} />,
//       title: 'Smart AI Routing',
//       description: 'Automated assignment to relevant municipal departments for faster resolution.',
//       color: '#06D6A0',
//       stats: '18h Avg. Response',
//       steps: ['📍 Location Analysis', '🏛️ Dept. Matching', '📋 Priority Setting', '⚡ Quick Dispatch'],
//       gradient: 'linear-gradient(135deg, #06D6A0 0%, #2EE8B6 100%)'
//     }
//   ]

//   const recentIssues = [
//     { 
//       id: 1, 
//       title: 'Major Garbage Pile Cleared', 
//       type: 'Sanitation', 
//       location: 'Central Market Area',
//       time: 'Just now', 
//       votes: 156,
//       color: '#FF6B6B',
//       icon: '🗑️'
//     },
//     { 
//       id: 2, 
//       title: 'Road Repair Completed', 
//       type: 'Infrastructure', 
//       location: 'Main Street',
//       time: '3 hours ago', 
//       votes: 89,
//       color: '#4ECDC4',
//       icon: '🛣️'
//     },
//     { 
//       id: 3, 
//       title: 'Street Lights Fixed', 
//       type: 'Public Safety', 
//       location: 'Downtown District',
//       time: '1 day ago', 
//       votes: 67,
//       color: '#FFD166',
//       icon: '💡'
//     },
//     { 
//       id: 4, 
//       title: 'Park Revitalization', 
//       type: 'Public Spaces', 
//       location: 'Green Park',
//       time: '2 days ago', 
//       votes: 124,
//       color: '#06D6A0',
//       icon: '🌳'
//     },
//     { 
//       id: 5, 
//       title: 'Drainage Issue Resolved', 
//       type: 'Flood Control', 
//       location: 'River Side',
//       time: '3 days ago', 
//       votes: 92,
//       color: '#118AB2',
//       icon: '🚰'
//     },
//     { 
//       id: 6, 
//       title: 'Public WiFi Installed', 
//       type: 'Digital Infrastructure', 
//       location: 'Community Center',
//       time: '5 days ago', 
//       votes: 201,
//       color: '#955BA5',
//       icon: '📡'
//     }
//   ]

//   const stats = [
//     { 
//       value: '75,000+', 
//       label: 'Active Citizens', 
//       icon: <GroupsIcon sx={{ fontSize: 40 }} />,
//       change: '+2,500 this week',
//       color: '#667eea'
//     },
//     { 
//       value: '96%', 
//       label: 'Satisfaction Rate', 
//       icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
//       change: 'Highest in category',
//       color: '#764ba2'
//     },
//     { 
//       value: '45', 
//       label: 'Cities Covered', 
//       icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
//       change: 'Across 5 countries',
//       color: '#FF6B6B'
//     },
//     { 
//       value: '2.8M+', 
//       label: 'Issues Resolved', 
//       icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
//       change: 'Since launch',
//       color: '#06D6A0'
//     }
//   ]

//   const categories = [
//     { name: 'Garbage & Waste', icon: '🗑️', count: '15,842', color: '#FF6B6B' },
//     { name: 'Road & Infrastructure', icon: '🛣️', count: '12,456', color: '#4ECDC4' },
//     { name: 'Public Safety', icon: '💡', count: '9,234', color: '#FFD166' },
//     { name: 'Water & Drainage', icon: '🚰', count: '7,891', color: '#118AB2' },
//     { name: 'Parks & Green Spaces', icon: '🌳', count: '6,543', color: '#06D6A0' },
//     { name: 'Public Transport', icon: '🚌', count: '5,678', color: '#955BA5' },
//   ]

//   const handleGetStarted = () => {
//     navigate('/report-issue')
//   }

//   const handleViewMap = () => {
//     navigate('/map')
//   }

//   const handleViewCommunity = () => {
//     navigate('/community')
//   }

//   return (
//     <Box sx={{ overflow: 'hidden', bgcolor: 'background.default' }}>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: theme.palette.mode === 'dark'
//             ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
//             : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           py: { xs: 8, md: 12 },
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//       >
//         {/* Animated background elements */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -100,
//             right: -100,
//             width: 400,
//             height: 400,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.1)',
//             animation: `${floatAnimation} 20s ease-in-out infinite`
//           }}
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: -50,
//             left: -50,
//             width: 300,
//             height: 300,
//             borderRadius: '50%',
//             background: 'rgba(255,255,255,0.05)',
//             animation: `${floatAnimation} 15s ease-in-out infinite reverse`
//           }}
//         />

//         <Container maxWidth="xl">
//           <Grid container spacing={4} alignItems="center">
//             {/* Left Column - Hero Content */}
//             <Grid item xs={12} md={6}>
//               <Fade in timeout={1000}>
//                 <Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
//                     <Chip 
//                       label="Trusted by 75K+ Citizens" 
//                       sx={{ 
//                         bgcolor: 'rgba(255,255,255,0.2)', 
//                         color: 'white',
//                         fontWeight: 600,
//                         animation: `${pulseAnimation} 2s infinite`
//                       }}
//                       icon={<TrendingUpIcon />}
//                     />
//                     <Chip 
//                       label="96% Satisfaction Rate" 
//                       sx={{ 
//                         bgcolor: 'rgba(255, 209, 102, 0.3)', 
//                         color: 'white',
//                         fontWeight: 600
//                       }}
//                     />
//                   </Box>
                  
//                   <Typography 
//                     variant="h1" 
//                     gutterBottom 
//                     sx={{ 
//                       fontWeight: 900,
//                       fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' },
//                       lineHeight: 1.1,
//                       mb: 3
//                     }}
//                   >
//                     Cleaner Streets
//                     <Box component="span" sx={{ color: '#FFD166', display: 'block' }}>
//                       Better Communities
//                     </Box>
//                   </Typography>
                  
//                   <Typography 
//                     variant="h5" 
//                     gutterBottom 
//                     sx={{ 
//                       opacity: 0.9, 
//                       mb: 4,
//                       fontSize: { xs: '1.2rem', md: '1.6rem' },
//                       maxWidth: '90%'
//                     }}
//                   >
//                     Join the movement transforming neighborhoods through civic engagement. 
//                     Report issues, track progress, and collaborate for cleaner, safer spaces.
//                   </Typography>
                  
//                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4 }}>
//                     <Zoom in timeout={1200} style={{ transitionDelay: '200ms' }}>
//                       <Button
//                         variant="contained"
//                         size="large"
//                         onClick={handleGetStarted}
//                         startIcon={<ReportIcon />}
//                         sx={{
//                           bgcolor: '#FFD166',
//                           color: 'black',
//                           px: 6,
//                           py: 2,
//                           borderRadius: 3,
//                           fontWeight: 700,
//                           fontSize: '1.1rem',
//                           position: 'relative',
//                           overflow: 'hidden',
//                           '&::before': {
//                             content: '""',
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
//                             transform: 'translateX(-100%)',
//                           },
//                           '&:hover': { 
//                             bgcolor: '#FFC233',
//                             transform: 'translateY(-3px)',
//                             boxShadow: '0 15px 35px rgba(255, 209, 102, 0.4)',
//                             '&::before': {
//                               animation: `${shimmerAnimation} 1s ease`,
//                             }
//                           },
//                           transition: 'all 0.4s ease'
//                         }}
//                       >
//                         Report an Issue
//                       </Button>
//                     </Zoom>
//                     <Zoom in timeout={1200} style={{ transitionDelay: '400ms' }}>
//                       <Button
//                         variant="outlined"
//                         size="large"
//                         onClick={handleViewMap}
//                         startIcon={<MapIcon />}
//                         sx={{
//                           borderColor: 'rgba(255,255,255,0.3)',
//                           borderWidth: 2,
//                           color: 'white',
//                           px: 6,
//                           py: 2,
//                           borderRadius: 3,
//                           fontWeight: 600,
//                           '&:hover': { 
//                             borderColor: 'white',
//                             bgcolor: 'rgba(255,255,255,0.1)',
//                             transform: 'translateY(-3px)',
//                             borderWidth: 2,
//                           },
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         Explore Issues Map
//                       </Button>
//                     </Zoom>
//                     <Zoom in timeout={1200} style={{ transitionDelay: '600ms' }}>
//                       <Button
//                         variant="outlined"
//                         size="large"
//                         onClick={handleViewCommunity}
//                         startIcon={<GroupsIcon />}
//                         sx={{
//                           borderColor: 'rgba(255,255,255,0.3)',
//                           borderWidth: 2,
//                           color: 'white',
//                           px: 6,
//                           py: 2,
//                           borderRadius: 3,
//                           fontWeight: 600,
//                           '&:hover': { 
//                             borderColor: 'white',
//                             bgcolor: 'rgba(255,255,255,0.1)',
//                             transform: 'translateY(-3px)',
//                             borderWidth: 2,
//                           },
//                           transition: 'all 0.3s ease'
//                         }}
//                       >
//                         Visit Community
//                       </Button>
//                     </Zoom>
//                   </Stack>
                  
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0' }} />
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                         No registration needed
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0' }} />
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                         24/7 Municipal Support
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0' }} />
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                         Real-time Updates
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Fade>
//             </Grid>
            
//             {/* Right Column - Recent Issues */}
//             <Grid item xs={12} md={6}>
//               <Grow in timeout={1500}>
//                 <Paper
//                   sx={{
//                     p: { xs: 3, md: 4 },
//                     bgcolor: 'rgba(255,255,255,0.15)',
//                     backdropFilter: 'blur(20px)',
//                     borderRadius: 4,
//                     border: '1px solid rgba(255,255,255,0.2)',
//                     boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
//                     position: 'relative',
//                     overflow: 'hidden'
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       height: 4,
//                       background: 'linear-gradient(90deg, #FFD166, #06D6A0, #667eea)',
//                       backgroundSize: '200% 100%',
//                       animation: `${shimmerAnimation} 2s infinite linear`
//                     }}
//                   />
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
//                     <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <span style={{ fontSize: '1.5rem' }}>🎯</span> Live Updates
//                     </Typography>
//                     <Chip 
//                       label="Real-time" 
//                       size="small" 
//                       sx={{ bgcolor: 'rgba(6, 214, 160, 0.3)', color: 'white' }}
//                     />
//                   </Box>
                  
//                   <Grid container spacing={2}>
//                     {recentIssues.slice(0, 4).map((issue) => (
//                       <Grid item xs={12} sm={6} key={issue.id}>
//                         <IssueCard color={issue.color}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                             <Avatar sx={{ 
//                               width: 36, 
//                               height: 36, 
//                               bgcolor: alpha(issue.color, 0.2),
//                               color: issue.color,
//                               fontSize: '1.2rem'
//                             }}>
//                               {issue.icon}
//                             </Avatar>
//                             <Box sx={{ flex: 1 }}>
//                               <Chip 
//                                 label={issue.type} 
//                                 size="small" 
//                                 sx={{ 
//                                   bgcolor: alpha(issue.color, 0.2),
//                                   color: issue.color,
//                                   fontWeight: 500,
//                                   height: 20
//                                 }}
//                               />
//                             </Box>
//                           </Box>
//                           <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.95rem' }}>
//                             {issue.title}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                             <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                               {issue.time}
//                             </Typography>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                               <VolunteerActivismIcon sx={{ fontSize: 14, opacity: 0.8 }} />
//                               <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                                 {issue.votes}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </IssueCard>
//                       </Grid>
//                     ))}
//                   </Grid>
                  
//                   <Button
//                     fullWidth
//                     endIcon={<ArrowForwardIcon />}
//                     sx={{
//                       mt: 3,
//                       bgcolor: 'rgba(255,255,255,0.1)',
//                       color: 'white',
//                       py: 1.5,
//                       '&:hover': {
//                         bgcolor: 'rgba(255,255,255,0.2)',
//                       }
//                     }}
//                     component={Link}
//                     to="/community"
//                   >
//                     View All Resolved Issues
//                   </Button>
//                 </Paper>
//               </Grow>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Volunteer CTA Section */}
//       <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
//         <Paper
//           sx={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             border: 'none',
//             borderRadius: 4,
//             p: { xs: 3, md: 6 },
//             mb: 4
//           }}
//         >
//           <Grid container spacing={3} alignItems="center">
//             <Grid item xs={12} md={8}>
//               <Typography variant="h4" fontWeight="bold" gutterBottom>
//                 Make a Bigger Impact - Become a Volunteer!
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
//                 Join our community of volunteers helping to keep our streets clean. Get access to exclusive events, earn badges, and lead cleanup initiatives.
//               </Typography>
//               <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                 <Button 
//                   variant="contained" 
//                   sx={{ 
//                     bgcolor: 'white', 
//                     color: '#667eea',
//                     fontWeight: 600,
//                     '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//                   }}
//                   onClick={() => navigate(getScopedPath('volunteer', '/'))}
//                 >
//                   Learn More
//                 </Button>
//                 <Button 
//                   variant="outlined" 
//                   sx={{ 
//                     borderColor: 'white', 
//                     color: 'white',
//                     fontWeight: 600,
//                     '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
//                   }}
//                   onClick={() => navigate(getScopedPath('volunteer', '/register'))}
//                 >
//                   Sign Up Now
//                 </Button>
//               </Stack>
//             </Grid>
//             <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 gap: 2 
//               }}>
//                 <Box sx={{ fontSize: 80 }}>🙌</Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   Join 500+ Volunteers
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>

//       {/* Stats Section */}
//       <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, mt: -4 }}>
//         <Box sx={{ textAlign: 'center', mb: 6 }}>
//           <Typography variant="h2" gutterBottom sx={{ fontWeight: 900 }}>
//             Making Real Impact
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//             Join thousands of empowered citizens transforming urban spaces
//           </Typography>
//         </Box>
        
//         <Grid container spacing={3}>
//           {stats.map((stat, index) => (
//             <Grid item xs={12} sm={6} lg={3} key={index}>
//               <Grow in timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
//                 <StatsCard color={stat.color}>
//                   <Box sx={{ 
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 3,
//                     mb: 2
//                   }}>
//                     <Box sx={{ 
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       width: 60,
//                       height: 60,
//                       borderRadius: '50%',
//                       bgcolor: alpha(stat.color, 0.1),
//                       color: stat.color,
//                       flexShrink: 0
//                     }}>
//                       {stat.icon}
//                     </Box>
//                     <Box>
//                       <Typography 
//                         variant="h2" 
//                         sx={{ 
//                           fontWeight: 900, 
//                           color: stat.color,
//                           lineHeight: 1
//                         }}
//                       >
//                         {stat.value}
//                       </Typography>
//                       <Typography 
//                         variant="body2" 
//                         color="text.secondary"
//                         sx={{ mt: 0.5 }}
//                       >
//                         {stat.label}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Typography 
//                     variant="caption" 
//                     color={stat.color}
//                     sx={{ 
//                       display: 'block',
//                       fontWeight: 600
//                     }}
//                   >
//                     {stat.change}
//                   </Typography>
//                 </StatsCard>
//               </Grow>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Features Section */}
//       <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
//         <Box sx={{ textAlign: 'center', mb: 8 }}>
//           <Typography variant="h2" gutterBottom sx={{ fontWeight: 900 }}>
//             Everything You Need
//           </Typography>
//           <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
//             A comprehensive platform for civic engagement and issue resolution
//           </Typography>
//         </Box>
        
//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} lg={3} key={index}>
//               <Grow in timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
//                 <FeatureCard color={feature.color}>
//                   {/* Hover overlay */}
//                   <Box
//                     className="feature-hover"
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       background: feature.gradient,
//                       opacity: 0,
//                       transform: 'translateY(20px)',
//                       transition: 'all 0.4s ease',
//                       zIndex: 1,
//                     }}
//                   />
                  
//                   <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
//                     <Box 
//                       sx={{ 
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         width: 80,
//                         height: 80,
//                         borderRadius: '50%',
//                         bgcolor: alpha(feature.color, 0.1),
//                         color: feature.color,
//                         mb: 3,
//                         transition: 'all 0.4s ease',
//                         animation: `${floatAnimation} 6s ease-in-out infinite`,
//                         animationDelay: `${index * 0.5}s`
//                       }}
//                     >
//                       {feature.icon}
//                     </Box>
//                     <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 2, minHeight: 64 }}>
//                       {feature.title}
//                     </Typography>
//                     <Typography color="text.secondary" sx={{ mb: 3, minHeight: 72 }}>
//                       {feature.description}
//                     </Typography>
                    
//                     <Stack spacing={1} sx={{ mb: 3 }}>
//                       {feature.steps.map((step, stepIndex) => (
//                         <Box 
//                           key={stepIndex}
//                           sx={{ 
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 2,
//                             p: 1.5,
//                             borderRadius: 2,
//                             bgcolor: alpha(feature.color, 0.05),
//                             border: `1px solid ${alpha(feature.color, 0.1)}`
//                           }}
//                         >
//                           <Avatar 
//                             sx={{ 
//                               width: 28, 
//                               height: 28, 
//                               bgcolor: feature.color,
//                               fontSize: '0.75rem',
//                               fontWeight: 'bold',
//                               color: 'white'
//                             }}
//                           >
//                             {stepIndex + 1}
//                           </Avatar>
//                           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                             {step}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Stack>
                    
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                       <Chip 
//                         label={feature.stats}
//                         size="small"
//                         sx={{ 
//                           bgcolor: alpha(feature.color, 0.1),
//                           color: feature.color,
//                           fontWeight: 600,
//                           border: `1px solid ${alpha(feature.color, 0.2)}`
//                         }}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           color: feature.color,
//                           '&:hover': {
//                             bgcolor: alpha(feature.color, 0.1)
//                           }
//                         }}
//                       >
//                         <ArrowForwardIcon />
//                       </IconButton>
//                     </Box>
//                   </CardContent>
//                 </FeatureCard>
//               </Grow>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Categories Section */}
//       <Box sx={{ 
//         py: { xs: 6, md: 10 },
//         background: theme.palette.mode === 'dark'
//           ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
//           : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
//       }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: 'center', mb: 8 }}>
//             <Typography variant="h2" gutterBottom sx={{ fontWeight: 900, color: 'white' }}>
//               Popular Categories
//             </Typography>
//             <Typography variant="h6" color={theme.palette.mode === 'dark' ? 'grey.400' : 'text.secondary'} sx={{ maxWidth: 600, mx: 'auto' }}>
//               Most reported issues in your community
//             </Typography>
//           </Box>
          
//           <Grid container spacing={2}>
//             {categories.map((category, index) => (
//               <Grid item xs={6} sm={4} md={2} key={index}>
//                 <Grow in timeout={800} style={{ transitionDelay: `${index * 100}ms` }}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 3,
//                       borderRadius: 3,
//                       border: `2px solid ${alpha(category.color, activeCategory === index ? 0.4 : 0.1)}`,
//                       bgcolor: theme.palette.mode === 'dark'
//                         ? alpha(category.color, 0.05)
//                         : alpha(category.color, 0.03),
//                       textAlign: 'center',
//                       transition: 'all 0.3s ease',
//                       cursor: 'pointer',
//                       transform: activeCategory === index ? 'translateY(-8px)' : 'none',
//                       boxShadow: activeCategory === index ? `0 15px 35px ${alpha(category.color, 0.2)}` : 'none',
//                       '&:hover': {
//                         transform: 'translateY(-8px)',
//                         boxShadow: `0 15px 35px ${alpha(category.color, 0.15)}`,
//                         borderColor: alpha(category.color, 0.3),
//                       }
//                     }}
//                     onClick={() => setActiveCategory(index)}
//                   >
//                     <Typography variant="h2" sx={{ mb: 2, fontSize: '2.5rem' }}>
//                       {category.icon}
//                     </Typography>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: category.color }}>
//                       {category.name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {category.count} reports
//                     </Typography>
//                   </Paper>
//                 </Grow>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
//         <Zoom in timeout={1000}>
//           <Paper 
//             elevation={0}
//             sx={{ 
//               p: { xs: 4, md: 8 },
//               textAlign: 'center',
//               borderRadius: 6,
//               background: theme.palette.mode === 'dark'
//                 ? 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)'
//                 : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               color: 'white',
//               position: 'relative',
//               overflow: 'hidden',
//               boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)',
//             }}
//           >
//             {/* Background pattern */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 20%)',
//                 zIndex: 1,
//               }}
//             />
            
//             <Box sx={{ position: 'relative', zIndex: 2 }}>
//               <Typography variant="h2" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
//                 Ready to Transform Your Neighborhood?
//               </Typography>
//               <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
//                 Join thousands of citizens creating positive change. Together, we can build cleaner, safer, and better communities.
//               </Typography>
              
//               <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 4 }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={handleGetStarted}
//                   startIcon={<PhotoCameraIcon />}
//                   sx={{
//                     bgcolor: '#FFD166',
//                     color: 'black',
//                     px: 6,
//                     py: 1.8,
//                     borderRadius: 3,
//                     fontWeight: 700,
//                     fontSize: '1.1rem',
//                     '&:hover': {
//                       bgcolor: '#FFC233',
//                       transform: 'translateY(-3px)',
//                       boxShadow: '0 15px 35px rgba(255, 209, 102, 0.4)'
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Report Your First Issue
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={handleViewMap}
//                   startIcon={<PlayCircleOutlineIcon />}
//                   sx={{
//                     borderColor: 'rgba(255,255,255,0.3)',
//                     borderWidth: 2,
//                     color: 'white',
//                     px: 6,
//                     py: 1.8,
//                     borderRadius: 3,
//                     fontWeight: 600,
//                     '&:hover': {
//                       borderColor: 'white',
//                       bgcolor: 'rgba(255,255,255,0.1)',
//                       transform: 'translateY(-3px)',
//                       borderWidth: 2,
//                     },
//                     transition: 'all 0.3s ease'
//                   }}
//                 >
//                   Watch Demo
//                 </Button>
//               </Stack>
              
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
//                 <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CheckCircleIcon sx={{ fontSize: 14 }} /> No credit card required
//                 </Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CheckCircleIcon sx={{ fontSize: 14 }} /> Takes 2 minutes
//                 </Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CheckCircleIcon sx={{ fontSize: 14 }} /> Free forever
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Zoom>
//       </Container>
//     </Box>
//   )
// }

// export default Home




import React, { useState, useCallback, useMemo, memo, lazy, Suspense } from 'react'
import { 
  Container, Typography, Button, Box, Grid, Paper, 
  Card, CardContent, Fade, Zoom, Grow,
  Avatar, Chip, Stack, Divider, IconButton, alpha,
  useTheme, useMediaQuery, Skeleton, Container as MuiContainer
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { getScopedPath } from '../utils/subdomain'
import { keyframes } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { useInView } from 'react-intersection-observer'

// Lazy load icons for better performance
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ReportIcon from '@mui/icons-material/Report'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import GroupsIcon from '@mui/icons-material/Groups'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import MapIcon from '@mui/icons-material/Map'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import GpsFixedIcon from '@mui/icons-material/GpsFixed'
import SpeedIcon from '@mui/icons-material/Speed'
import SecurityIcon from '@mui/icons-material/Security'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

// ==================== STYLED COMPONENTS ====================

const FeatureCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => ({
  borderRadius: 24,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
    : '#ffffff',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 30px 60px ${alpha(color || theme.palette.primary.main, 0.25)}`,
    '& .feature-hover': {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    }
  }
}))

const StatsCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => ({
  borderRadius: 20,
  background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.1)} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(color || theme.palette.primary.main, 0.2)}`,
  padding: theme.spacing(3),
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 20px 40px ${alpha(color || theme.palette.primary.main, 0.25)}`,
    '& .stat-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
    '& .stat-shine': {
      transform: 'translateX(100%)',
    }
  }
}))

const IssueCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.08)} 0%, transparent 100%)`,
  border: `1px solid ${alpha(color || theme.palette.primary.main, 0.15)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  '&:hover': {
    transform: 'translateX(10px) translateY(-4px)',
    background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.15)} 0%, transparent 100%)`,
    boxShadow: `0 15px 30px ${alpha(color || theme.palette.primary.main, 0.2)}`,
  }
}))

const CategoryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'active'
})(({ theme, color, active }) => ({
  p: 3,
  borderRadius: 20,
  border: `2px solid ${alpha(color, active ? 0.5 : 0.1)}`,
  background: theme.palette.mode === 'dark'
    ? alpha(color, 0.05)
    : alpha(color, 0.03),
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  transform: active ? 'translateY(-8px)' : 'none',
  boxShadow: active ? `0 20px 40px ${alpha(color, 0.25)}` : 'none',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${alpha(color, 0.2)}`,
    borderColor: alpha(color, 0.4),
  }
}))

const HeroSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  py: { xs: 6, md: 10 },
  position: 'relative',
  overflow: 'hidden',
  minHeight: { xs: 'auto', md: '90vh' },
  display: 'flex',
  alignItems: 'center'
}))

// ==================== ANIMATIONS ====================

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`

const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

// ==================== MEMOIZED COMPONENTS ====================

const FloatingBackground = memo(() => (
  <>
    <Box
      sx={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: { xs: 200, sm: 300, md: 400 },
        height: { xs: 200, sm: 300, md: 400 },
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: `${floatAnimation} 20s ease-in-out infinite`
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: { xs: 150, sm: 200, md: 300 },
        height: { xs: 150, sm: 200, md: 300 },
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        animation: `${floatAnimation} 15s ease-in-out infinite reverse`
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        animation: `${rotateAnimation} 30s linear infinite`
      }}
    />
  </>
))

FloatingBackground.displayName = 'FloatingBackground'

const TrustBadges = memo(() => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', mt: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0', animation: `${pulseAnimation} 2s infinite` }} />
      <Typography variant="body2" sx={{ opacity: 0.9 }}>No registration needed</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0' }} />
      <Typography variant="body2" sx={{ opacity: 0.9 }}>24/7 Support</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0' }} />
      <Typography variant="body2" sx={{ opacity: 0.9 }}>Real-time Updates</Typography>
    </Box>
  </Box>
))

TrustBadges.displayName = 'TrustBadges'

const HeroStats = memo(() => {
  const theme = useTheme()
  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: { xs: 2, sm: 3 }, 
      flexWrap: 'wrap',
      mb: 3 
    }}>
      <Chip 
        label="Trusted by 75K+ Citizens" 
        sx={{ 
          bgcolor: 'rgba(255,255,255,0.15)', 
          color: 'white',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          animation: `${pulseAnimation} 2s infinite`,
          '& .MuiChip-icon': { color: theme.palette.warning.light }
        }}
        icon={<TrendingUpIcon />}
      />
      <Chip 
        label="96% Satisfaction Rate" 
        sx={{ 
          bgcolor: 'rgba(255, 209, 102, 0.2)', 
          color: 'white',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,209,102,0.3)',
        }}
      />
    </Box>
  )
})

HeroStats.displayName = 'HeroStats'

const FeatureCardComponent = memo(({ feature, index, onExplore }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Grid item xs={12} sm={6} lg={3} ref={ref}>
      <Grow in={inView} timeout={500} style={{ transitionDelay: `${index * 150}ms` }}>
        <FeatureCard color={feature.color} onClick={() => onExplore(feature)}>
          <Box
            className="feature-hover"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: feature.gradient,
              opacity: 0,
              transform: 'translateY(20px) scale(0.95)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1,
            }}
          />
          
          <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 2, flex: 1 }}>
            <Box 
              className="feature-icon"
              sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 60, sm: 70, md: 80 },
                height: { xs: 60, sm: 70, md: 80 },
                borderRadius: '50%',
                bgcolor: alpha(feature.color, 0.1),
                color: feature.color,
                mb: 3,
                transition: 'all 0.4s ease',
                animation: `${floatAnimation} 6s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              {feature.icon}
            </Box>
            
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                mb: 2, 
                minHeight: { xs: 'auto', md: 64 },
                fontSize: { xs: '1.25rem', md: '1.5rem' }
              }}
            >
              {feature.title}
            </Typography>
            
            <Typography 
              color="text.secondary" 
              sx={{ 
                mb: 3, 
                minHeight: { xs: 'auto', md: 72 },
                fontSize: { xs: '0.9rem', md: '1rem' }
              }}
            >
              {feature.description}
            </Typography>
            
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {feature.steps.map((step, stepIndex) => (
                <Box 
                  key={stepIndex}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(feature.color, 0.05),
                    border: `1px solid ${alpha(feature.color, 0.1)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha(feature.color, 0.1),
                      transform: 'translateX(4px)',
                    }
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 28, 
                      height: 28, 
                      bgcolor: feature.color,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    {stepIndex + 1}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Chip 
                label={feature.stats}
                size="small"
                sx={{ 
                  bgcolor: alpha(feature.color, 0.1),
                  color: feature.color,
                  fontWeight: 600,
                  border: `1px solid ${alpha(feature.color, 0.2)}`
                }}
              />
              <IconButton
                size="small"
                sx={{
                  color: feature.color,
                  '&:hover': {
                    bgcolor: alpha(feature.color, 0.1),
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </CardContent>
        </FeatureCard>
      </Grow>
    </Grid>
  )
})

FeatureCardComponent.displayName = 'FeatureCardComponent'

const StatCardComponent = memo(({ stat, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Grid item xs={12} sm={6} lg={3} ref={ref}>
      <Grow in={inView} timeout={500} style={{ transitionDelay: `${index * 150}ms` }}>
        <StatsCard color={stat.color}>
          <Box
            className="stat-shine"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.8s ease',
            }}
          />
          
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 3, sm: 2, md: 3 },
            mb: 2
          }}>
            <Box 
              className="stat-icon"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: '50%',
                bgcolor: alpha(stat.color, 0.1),
                color: stat.color,
                flexShrink: 0,
                transition: 'transform 0.3s ease'
              }}
            >
              {stat.icon}
            </Box>
            <Box>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 900, 
                  color: stat.color,
                  lineHeight: 1,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {stat.value}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mt: 0.5, fontWeight: 500 }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              fontWeight: 600,
              color: stat.color,
              bgcolor: alpha(stat.color, 0.1),
              p: 1,
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            {stat.change}
          </Typography>
        </StatsCard>
      </Grow>
    </Grid>
  )
})

StatCardComponent.displayName = 'StatCardComponent'

const RecentIssueCard = memo(({ issue }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Grid item xs={12} sm={6} ref={ref}>
      <Zoom in={inView} timeout={400}>
        <IssueCard color={issue.color}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
            <Avatar sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: alpha(issue.color, 0.15),
              color: issue.color,
              fontSize: '1.3rem'
            }}>
              {issue.icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Chip 
                label={issue.type} 
                size="small" 
                sx={{ 
                  bgcolor: alpha(issue.color, 0.15),
                  color: issue.color,
                  fontWeight: 600,
                  height: 24,
                  '& .MuiChip-label': { px: 1.5 }
                }}
              />
            </Box>
          </Box>
          
          <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: '1rem' }}>
            {issue.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon sx={{ fontSize: 14, opacity: 0.6 }} />
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {issue.location}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {issue.time}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 1.5, opacity: 0.2 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VolunteerActivismIcon sx={{ fontSize: 16, opacity: 0.7 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {issue.votes} supporters
              </Typography>
            </Box>
            <Chip
              label="View Details"
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: alpha(issue.color, 0.3),
                color: issue.color,
                fontSize: '0.7rem',
                '&:hover': {
                  bgcolor: alpha(issue.color, 0.1),
                }
              }}
            />
          </Box>
        </IssueCard>
      </Zoom>
    </Grid>
  )
})

RecentIssueCard.displayName = 'RecentIssueCard'

// ==================== MAIN COMPONENT ====================

const Home = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [activeCategory, setActiveCategory] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Memoized data
  const features = useMemo(() => [
    {
      icon: <ReportIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
      title: 'Report Issues Instantly',
      description: 'Document civic problems with photos, location pins, and detailed descriptions.',
      color: '#FF6B6B',
      stats: '15K+ Issues Reported',
      steps: ['📸 Snap Photo', '📍 Pin Location', '📝 Add Details', '🚀 Submit'],
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      path: '/report-issue'
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
      title: 'Track Real-time Progress',
      description: 'Follow your report from submission to resolution with live status updates.',
      color: '#4ECDC4',
      stats: '92% Resolution Rate',
      steps: ['📤 Submitted', '👀 Under Review', '🔧 In Progress', '✅ Resolved'],
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #6CE6DE 100%)',
      path: '/track'
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
      title: 'Community Collaboration',
      description: 'Vote, comment, and work together with neighbors and local authorities.',
      color: '#FFD166',
      stats: '75K+ Active Users',
      steps: ['👍 Upvote Issues', '💬 Join Discussions', '👥 Form Groups', '🎯 Take Action'],
      gradient: 'linear-gradient(135deg, #FFD166 0%, #FFE194 100%)',
      path: '/community'
    },
    {
      icon: <GpsFixedIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
      title: 'Smart AI Routing',
      description: 'Automated assignment to relevant municipal departments for faster resolution.',
      color: '#06D6A0',
      stats: '18h Avg. Response',
      steps: ['📍 Location Analysis', '🏛️ Dept. Matching', '📋 Priority Setting', '⚡ Quick Dispatch'],
      gradient: 'linear-gradient(135deg, #06D6A0 0%, #2EE8B6 100%)',
      path: '/how-it-works'
    }
  ], [])

  const recentIssues = useMemo(() => [
    { 
      id: 1, 
      title: 'Major Garbage Pile Cleared', 
      type: 'Sanitation', 
      location: 'Central Market Area',
      time: 'Just now', 
      votes: 156,
      color: '#FF6B6B',
      icon: '🗑️'
    },
    { 
      id: 2, 
      title: 'Road Repair Completed', 
      type: 'Infrastructure', 
      location: 'Main Street',
      time: '3 hours ago', 
      votes: 89,
      color: '#4ECDC4',
      icon: '🛣️'
    },
    { 
      id: 3, 
      title: 'Street Lights Fixed', 
      type: 'Public Safety', 
      location: 'Downtown District',
      time: '1 day ago', 
      votes: 67,
      color: '#FFD166',
      icon: '💡'
    },
    { 
      id: 4, 
      title: 'Park Revitalization', 
      type: 'Public Spaces', 
      location: 'Green Park',
      time: '2 days ago', 
      votes: 124,
      color: '#06D6A0',
      icon: '🌳'
    }
  ], [])

  const stats = useMemo(() => [
    { 
      value: '75K+', 
      label: 'Active Citizens', 
      icon: <GroupsIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />,
      change: '+2,500 this week',
      color: '#667eea'
    },
    { 
      value: '96%', 
      label: 'Satisfaction Rate', 
      icon: <EmojiEventsIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />,
      change: 'Highest in category',
      color: '#764ba2'
    },
    { 
      value: '45', 
      label: 'Cities Covered', 
      icon: <LocationOnIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />,
      change: 'Across 5 countries',
      color: '#FF6B6B'
    },
    { 
      value: '2.8M+', 
      label: 'Issues Resolved', 
      icon: <CheckCircleIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />,
      change: 'Since 2020',
      color: '#06D6A0'
    }
  ], [])

  const categories = useMemo(() => [
    { name: 'Garbage & Waste', icon: '🗑️', count: '15.8K', color: '#FF6B6B' },
    { name: 'Road & Infrastructure', icon: '🛣️', count: '12.5K', color: '#4ECDC4' },
    { name: 'Public Safety', icon: '💡', count: '9.2K', color: '#FFD166' },
    { name: 'Water & Drainage', icon: '🚰', count: '7.9K', color: '#118AB2' },
    { name: 'Parks & Green Spaces', icon: '🌳', count: '6.5K', color: '#06D6A0' },
    { name: 'Public Transport', icon: '🚌', count: '5.7K', color: '#955BA5' },
  ], [])

  // Callbacks
  const handleGetStarted = useCallback(() => {
    navigate('/report-issue')
  }, [navigate])

  const handleViewMap = useCallback(() => {
    navigate('/map')
  }, [navigate])

  const handleViewCommunity = useCallback(() => {
    navigate('/community')
  }, [navigate])

  const handleExploreFeature = useCallback((feature) => {
    if (feature.path) {
      navigate(feature.path)
    }
  }, [navigate])

  const handleVolunteerClick = useCallback(() => {
    navigate(getScopedPath('volunteer', '/'))
  }, [navigate])

  const handleVolunteerSignUp = useCallback(() => {
    navigate(getScopedPath('volunteer', '/register'))
  }, [navigate])

  return (
    <Box sx={{ 
      overflow: 'hidden', 
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <HeroSection>
        <FloatingBackground />
        
        <MuiContainer maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <HeroStats />
                  
                  <Typography 
                    variant="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 900,
                      fontSize: { 
                        xs: '2.2rem', 
                        sm: '2.8rem', 
                        md: '3.5rem', 
                        lg: '4rem' 
                      },
                      lineHeight: 1.1,
                      mb: 3
                    }}
                  >
                    Cleaner Streets
                    <Box component="span" sx={{ color: '#FFD166', display: 'block' }}>
                      Better Communities
                    </Box>
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      opacity: 0.9, 
                      mb: 4,
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                      maxWidth: '90%',
                      lineHeight: 1.6
                    }}
                  >
                    Join 75,000+ citizens transforming neighborhoods through civic engagement. 
                    Report issues, track progress, and collaborate for cleaner, safer spaces.
                  </Typography>
                  
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    sx={{ mb: 4 }}
                  >
                    <Zoom in timeout={1200} style={{ transitionDelay: '200ms' }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleGetStarted}
                        startIcon={<PhotoCameraIcon />}
                        fullWidth={isMobile}
                        sx={{
                          bgcolor: '#FFD166',
                          color: 'black',
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': prefersReducedMotion ? {} : {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                            transform: 'translateX(-100%)',
                          },
                          '&:hover': { 
                            bgcolor: '#FFC233',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 15px 35px rgba(255, 209, 102, 0.4)',
                            '&::before': prefersReducedMotion ? {} : {
                              animation: `${shimmerAnimation} 1s ease`,
                            }
                          },
                          transition: 'all 0.4s ease'
                        }}
                      >
                        Report an Issue
                      </Button>
                    </Zoom>
                    <Zoom in timeout={1200} style={{ transitionDelay: '400ms' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleViewMap}
                        startIcon={<MapIcon />}
                        fullWidth={isMobile}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderWidth: 2,
                          color: 'white',
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          borderRadius: 3,
                          fontWeight: 600,
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          '&:hover': { 
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-3px)',
                            borderWidth: 2,
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Explore Map
                      </Button>
                    </Zoom>
                    <Zoom in timeout={1200} style={{ transitionDelay: '600ms' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleViewCommunity}
                        startIcon={<GroupsIcon />}
                        fullWidth={isMobile}
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderWidth: 2,
                          color: 'white',
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          borderRadius: 3,
                          fontWeight: 600,
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          '&:hover': { 
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            transform: 'translateY(-3px)',
                            borderWidth: 2,
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Community
                      </Button>
                    </Zoom>
                  </Stack>
                  
                  <TrustBadges />
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grow in timeout={1500}>
                <Paper
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'linear-gradient(90deg, #FFD166, #06D6A0, #667eea)',
                      backgroundSize: '200% 100%',
                      animation: prefersReducedMotion ? 'none' : `${shimmerAnimation} 2s infinite linear`
                    }}
                  />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    mb: 3 
                  }}>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      color: 'white'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>⚡</span> Live Updates
                    </Typography>
                    <Chip 
                      label="Real-time" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(6, 214, 160, 0.3)', 
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  
                  <Grid container spacing={2}>
                    {recentIssues.map((issue) => (
                      <RecentIssueCard key={issue.id} issue={issue} />
                    ))}
                  </Grid>
                  
                  <Button
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      mt: 3,
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                    component={Link}
                    to="/community"
                  >
                    View All Resolved Issues
                  </Button>
                </Paper>
              </Grow>
            </Grid>
          </Grid>
        </MuiContainer>
      </HeroSection>

      {/* Volunteer CTA Section */}
      <MuiContainer maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mt: -4 }}>
        <Zoom in timeout={800}>
          <Paper
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 4,
              p: { xs: 3, md: 6 },
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                animation: `${floatAnimation} 15s ease-in-out infinite`
              }}
            />
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography 
                  variant="h4" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                  Make a Bigger Impact - Become a Volunteer!
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Join 500+ active volunteers helping to keep our streets clean. Get access to exclusive events, earn badges, and lead cleanup initiatives.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      bgcolor: 'white', 
                      color: '#667eea',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                    }}
                    onClick={handleVolunteerClick}
                  >
                    Learn More
                  </Button>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      '&:hover': { 
                        borderColor: 'white', 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                    onClick={handleVolunteerSignUp}
                  >
                    Sign Up Now
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: 2 
                }}>
                  <Box sx={{ fontSize: { xs: 60, md: 80 } }}>🙌</Box>
                  <Typography variant="h6" fontWeight="bold">
                    500+ Active Volunteers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </MuiContainer>

      {/* Stats Section */}
      <MuiContainer maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }} ref={ref}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Making Real Impact
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Join thousands of empowered citizens transforming urban spaces
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <StatCardComponent key={index} stat={stat} index={index} />
          ))}
        </Grid>
      </MuiContainer>

      {/* Features Section */}
      <MuiContainer maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 900,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Everything You Need
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            A comprehensive platform for civic engagement and issue resolution
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <FeatureCardComponent 
              key={index} 
              feature={feature} 
              index={index} 
              onExplore={handleExploreFeature}
            />
          ))}
        </Grid>
      </MuiContainer>

      {/* Categories Section */}
      <Box sx={{ 
        py: { xs: 4, md: 6 },
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <MuiContainer maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Popular Categories
            </Typography>
            <Typography 
              variant="h6" 
              color={theme.palette.mode === 'dark' ? 'grey.400' : 'text.secondary'} 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              Most reported issues in your community
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                  <CategoryCard
                    color={category.color}
                    active={activeCategory === index}
                    onClick={() => setActiveCategory(index)}
                  >
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        mb: 2, 
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        transition: 'transform 0.3s ease',
                        transform: activeCategory === index ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {category.icon}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 1, 
                        color: category.color,
                        fontSize: { xs: '0.8rem', md: '1rem' }
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                    >
                      {category.count} reports
                    </Typography>
                  </CategoryCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </MuiContainer>
      </Box>

      {/* CTA Section */}
      <MuiContainer maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Zoom in timeout={1000}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #2D3748 0%, #4A5568 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(102, 126, 234, 0.3)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 20%)',
                zIndex: 1,
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 900, 
                  fontSize: { xs: '1.8rem', md: '3rem' },
                  lineHeight: 1.2
                }}
              >
                Ready to Transform Your Neighborhood?
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9, 
                  maxWidth: 700, 
                  mx: 'auto',
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                Join thousands of citizens creating positive change. Together, we can build cleaner, safer, and better communities.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center" 
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  startIcon={<PhotoCameraIcon />}
                  fullWidth={isMobile}
                  sx={{
                    bgcolor: '#FFD166',
                    color: 'black',
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    '&:hover': {
                      bgcolor: '#FFC233',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 15px 35px rgba(255, 209, 102, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Report Your First Issue
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleViewMap}
                  startIcon={<PlayCircleOutlineIcon />}
                  fullWidth={isMobile}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderWidth: 2,
                    color: 'white',
                    px: { xs: 4, md: 6 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                      borderWidth: 2,
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Watch Demo
                </Button>
              </Stack>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: { xs: 2, sm: 4 }, 
                flexWrap: 'wrap' 
              }}>
                <Typography variant="caption" sx={{ 
                  opacity: 0.8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontSize: { xs: '0.7rem', md: '0.8rem' }
                }}>
                  <CheckCircleIcon sx={{ fontSize: 16 }} /> No credit card
                </Typography>
                <Typography variant="caption" sx={{ 
                  opacity: 0.8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontSize: { xs: '0.7rem', md: '0.8rem' }
                }}>
                  <CheckCircleIcon sx={{ fontSize: 16 }} /> Takes 2 minutes
                </Typography>
                <Typography variant="caption" sx={{ 
                  opacity: 0.8, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  fontSize: { xs: '0.7rem', md: '0.8rem' }
                }}>
                  <CheckCircleIcon sx={{ fontSize: 16 }} /> Free forever
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Zoom>
      </MuiContainer>
    </Box>
  )
}

export default memo(Home)