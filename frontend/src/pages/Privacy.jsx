import { Box, Container, Typography, Divider, List, ListItem, ListItemText } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'

const Privacy = () => {
  const theme = useTheme()

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Privacy Policy
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Last updated: February 14, 2026
        </Typography>
      </Box>

      {/* Introduction */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Clean Street ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and services (collectively, the "Service").
        </Typography>
        <Typography variant="body1" paragraph>
          Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Information We Collect */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          2. Information We Collect
        </Typography>
        
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
          Personal Data
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Account Registration"
              secondary="Name, email address, phone number, and password"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Profile Information"
              secondary="Profile picture, bio, location, and preferences"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Content You Create"
              secondary="Issue reports, comments, and other user-generated content"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Communication Data"
              secondary="Messages, support tickets, and feedback"
            />
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
          Automatically Collected Data
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Device Information"
              secondary="Device type, operating system, browser type"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Usage Data"
              secondary="Pages visited, time spent, clicks, and interactions"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Location Data"
              secondary="IP address and general geographic location"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Cookies and Tracking"
              secondary="Session cookies and similar tracking technologies"
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* How We Use Your Information */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect for the following purposes:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body2">
              • Provide, maintain, and improve our Service
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Create and manage your account
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Send administrative and promotional communications
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Analyze usage patterns and improve user experience
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Detect and prevent fraud and security issues
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Comply with legal obligations
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Respond to your inquiries and support requests
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Data Sharing */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          4. Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell your personal information. However, we may share your information in the following circumstances:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Service Providers"
              secondary="Third-party service providers who assist in operating our Service"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Legal Requirements"
              secondary="When required by law, court order, or governmental authority"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Business Transfers"
              secondary="In case of merger, acquisition, or sale of assets"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="User Consent"
              secondary="When you explicitly consent to share your information"
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Data Security */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          5. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement industry-standard security measures to protect your personal information, including encryption, firewalls, and secure authentication protocols. However, no method of transmission over the internet is 100% secure.
        </Typography>
        <Typography variant="body1" paragraph>
          You are responsible for maintaining the confidentiality of your account credentials. We are not liable for unauthorized access to your account due to your negligence.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Your Privacy Rights */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          6. Your Privacy Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the right to:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body2">
              • Access your personal information
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Request correction of inaccurate data
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Request deletion of your data
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Opt-out of marketing communications
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Export your data in a portable format
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
          To exercise these rights, please contact us using the information provided at the end of this policy.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Cookies and Tracking */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          7. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to enhance your experience. These may include:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Essential Cookies"
              secondary="Required for basic functionality and security"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Preference Cookies"
              secondary="Remember your settings and preferences"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Analytics Cookies"
              secondary="Help us understand how users interact with our Service"
            />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Data Retention */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          8. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain your personal information for as long as necessary to provide our Service, comply with legal obligations, and resolve disputes. You may request deletion of your data at any time, subject to legal requirements.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Third-Party Links */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          9. Third-Party Links
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service may contain links to third-party websites. We are not responsible for the privacy practices of external websites. We encourage you to review their privacy policies before providing personal information.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Children's Privacy */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          10. Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it immediately.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Policy Updates */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          11. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of the Service constitutes your acceptance of the updated policy.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Contact Us */}
      <Box sx={{ 
        mt: 6, 
        p: 3, 
        borderRadius: 2,
        background: alpha(theme.palette.primary.main, 0.05),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="body2">
          If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          <strong>Email:</strong> privacy@cleanstreet.com
        </Typography>
        <Typography variant="body2">
          <strong>Data Protection Officer:</strong> dpo@cleanstreet.com
        </Typography>
        <Typography variant="body2">
          <strong>Mailing Address:</strong> Clean Street Headquarters, City, Country
        </Typography>
      </Box>
    </Container>
  )
}

export default Privacy
