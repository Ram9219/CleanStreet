import { Box, Container, Typography, Divider, List, ListItem, ListItemText } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'

const Terms = () => {
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
          Terms of Service
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
          Welcome to Clean Street ("we," "us," "our," or "Company"). These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and services (collectively, the "Service"). By accessing or using Clean Street, you agree to be bound by these Terms.
        </Typography>
        <Typography variant="body1" paragraph>
          If you do not agree with any part of these Terms, you may not use our Service. We reserve the right to modify these Terms at any time. Your continued use of the Service after any modifications means you accept the updated Terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* User Accounts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          2. User Accounts
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Registration"
              secondary="You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Accurate Information"
              secondary="You agree to provide accurate, current, and complete information during registration and keep this information updated."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Account Responsibility"
              secondary="You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use."
            />
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Use License */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          3. Use License
        </Typography>
        <Typography variant="body1" paragraph>
          We grant you a limited, non-exclusive, non-transferable license to access and use the Service for lawful purposes only. You agree not to:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body2">
              • Violate any applicable laws or regulations
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Infringe on intellectual property rights
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Transmit malware, viruses, or harmful code
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Attempt to gain unauthorized access to our systems
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Harass, abuse, or harm other users
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              • Submit false or misleading information
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* User Generated Content */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          4. User Generated Content
        </Typography>
        <Typography variant="body1" paragraph>
          You retain ownership of any content you submit, but you grant us a worldwide, royalty-free license to use, reproduce, modify, and distribute such content. You represent that all content you submit is original and does not violate any third-party rights.
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to remove or modify content that violates these Terms or applicable laws.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Disclaimer of Warranties */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          5. Disclaimer of Warranties
        </Typography>
        <Typography variant="body1" paragraph>
          The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement.
        </Typography>
        <Typography variant="body1" paragraph>
          We do not warrant that the Service will be uninterrupted, error-free, or secure.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Limitation of Liability */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          6. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the maximum extent permitted by law, in no event shall Clean Street, its owners, or operators be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Indemnification */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          7. Indemnification
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to indemnify and hold harmless Clean Street and its officers, directors, employees, and agents from any claims, damages, or losses arising from your use of the Service or violation of these Terms.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Termination */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          8. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate or suspend your account and access to the Service at any time, for any reason, without prior notice or liability if you violate these Terms or applicable laws.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Governing Law */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          9. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Clean Street is located, without regard to its conflict of law provisions.
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
          Questions About Our Terms?
        </Typography>
        <Typography variant="body2">
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </Typography>
        <Typography variant="body2" sx={{ mt: 1.5 }}>
          <strong>Email:</strong> support@cleanstreet.com
        </Typography>
        <Typography variant="body2">
          <strong>Address:</strong> Clean Street Headquarters, City, Country
        </Typography>
      </Box>
    </Container>
  )
}

export default Terms
