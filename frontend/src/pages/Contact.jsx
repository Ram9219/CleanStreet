// import { Container, Box, Typography, Paper } from '@mui/material'

// function Contact() {
//   return (
//     <Container maxWidth="md" sx={{ py: 6 }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography variant="h3" component="h1" fontWeight={800} color="primary" gutterBottom>
//           Contact Us
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           We’re here to help. Reach out with questions, feedback, or partnership ideas.
//         </Typography>
//       </Box>

//       <Paper variant="outlined" sx={{ p: 3 }}>
//         <Box sx={{ display: 'grid', gap: 2 }}>
//           <Typography variant="h6" fontWeight={700}>General Inquiries</Typography>
//           <Typography variant="body1" color="text.secondary">
//             Email: support@cleanstreet.example
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Phone: +1 (555) 123-4567
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Address: 123 City Lane, Urban District, Metropolis
//           </Typography>
//         </Box>
//       </Paper>

//       <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
//         For urgent public safety issues, please contact local authorities directly.
//       </Typography>
//     </Container>
//   )
// }

// export default Contact







import React, { useState, useCallback } from 'react'
import { 
  Container, Box, Typography, Paper, Grid, TextField, 
  Button, IconButton, Snackbar, Alert, alpha, useTheme,
  useMediaQuery, Fade, Grow, Zoom
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SendIcon from '@mui/icons-material/Send'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ForumIcon from '@mui/icons-material/Forum'
import { motion } from 'framer-motion'
import { buildApiUrl } from '../utils/apiClient'

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  }
}))

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  textAlign: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'default',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
    borderColor: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      transform: 'scale(1.1)',
    }
  }
}))

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-4px)',
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    }
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
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
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

// Contact information data
const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 32 }} />,
    title: 'Email Us',
    content: 'support@cleanstreet.example',
    subcontent: 'We reply within 24 hours',
    color: '#667eea'
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 32 }} />,
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    subcontent: 'Mon-Fri 9am to 6pm EST',
    color: '#764ba2'
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
    title: 'Visit Us',
    content: '123 City Lane',
    subcontent: 'Urban District, Metropolis',
    color: '#48bb78'
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    title: 'Office Hours',
    content: 'Monday - Friday',
    subcontent: '9:00 AM - 6:00 PM',
    color: '#f6ad55'
  }
]

// Social media links
const socialLinks = [
  { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
  { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
  { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
  { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' }
]

// FAQ data
const faqs = [
  {
    question: 'How quickly do you respond to inquiries?',
    answer: 'We aim to respond to all inquiries within 24-48 business hours.'
  },
  {
    question: 'Do you offer support on weekends?',
    answer: 'Our support team is available Monday-Friday. Weekend inquiries will be answered on the next business day.'
  },
  {
    question: 'How can I report a public safety issue?',
    answer: 'For urgent public safety issues, please contact local authorities directly. For non-urgent issues, use our report feature in the app.'
  }
]

function Contact() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required'
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch(buildApiUrl('/contacts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! We\'ll get back to you soon.',
          severity: 'success'
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSnackbar({
          open: true,
          message: data.message || 'Failed to send message. Please try again.',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again later.',
        severity: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 3 }
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Zoom in timeout={800}>
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' }
                  }}
                >
                  Get in Touch
                </Typography>
              </Box>
            </Zoom>
            
            <Grow in timeout={1000}>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ 
                  maxWidth: 600, 
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>
            </Grow>
          </Box>
        </motion.div>

        {/* Contact Info Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ContactCard elevation={0}>
                  <Box sx={{ 
                    color: info.color,
                    mb: 2,
                    transition: 'transform 0.3s ease'
                  }}>
                    {info.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {info.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary" fontWeight={500}>
                    {info.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {info.subcontent}
                  </Typography>
                </ContactCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div variants={itemVariants}>
              <StyledPaper elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <ForumIcon color="primary" />
                  <Typography variant="h5" fontWeight={700}>
                    Send us a Message
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        disabled={isSubmitting}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        disabled={isSubmitting}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!formErrors.subject}
                        helperText={formErrors.subject}
                        disabled={isSubmitting}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                        disabled={isSubmitting}
                        required
                        placeholder="Tell us how we can help..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <GradientButton
                          type="submit"
                          variant="contained"
                          endIcon={<SendIcon />}
                          disabled={isSubmitting}
                          size="large"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </GradientButton>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </StyledPaper>
            </motion.div>
          </Grid>

          {/* Right Column - Map & Social */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              {/* Map/Location Preview */}
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <StyledPaper 
                    elevation={0}
                    sx={{ 
                      p: 0,
                      overflow: 'hidden',
                      height: { xs: 250, md: 300 }
                    }}
                  >
                    <iframe
                      title="Office Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7ae8b%3A0xb39d1126bf5b992a!2sCity%20Hall%20Park!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </StyledPaper>
                </motion.div>
              </Grid>

              {/* Social Links */}
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <StyledPaper elevation={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <SupportAgentIcon color="primary" />
                      <Typography variant="h6" fontWeight={700}>
                        Connect With Us
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <SocialButton
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            {social.icon}
                          </SocialButton>
                        </motion.div>
                      ))}
                    </Box>

                    <Typography variant="body2" color="text.secondary" align="center">
                      Follow us on social media for updates and community news
                    </Typography>
                  </StyledPaper>
                </motion.div>
              </Grid>

              {/* FAQ Preview */}
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <StyledPaper elevation={0}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Quick Answers
                    </Typography>
                    
                    {faqs.map((faq, index) => (
                      <Fade in timeout={1000 + index * 200} key={index}>
                        <Box sx={{ mb: index < faqs.length - 1 ? 2 : 0 }}>
                          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            {faq.question}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {faq.answer}
                          </Typography>
                        </Box>
                      </Fade>
                    ))}
                  </StyledPaper>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer Note */}
        <motion.div
          variants={itemVariants}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box sx={{ 
            mt: 6, 
            p: 3, 
            bgcolor: alpha(theme.palette.warning.main, 0.1),
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
            textAlign: 'center'
          }}>
            <Typography variant="body2" color="warning.dark" fontWeight={500}>
              ⚠️ For urgent public safety issues, please contact local authorities directly.
            </Typography>
          </Box>
        </motion.div>
      </motion.div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Contact