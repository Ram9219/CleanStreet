import React from 'react'
import { Box, CircularProgress, Paper, Stack, Typography, alpha, useTheme } from '@mui/material'

const AppLoader = ({
  message = 'Loading...',
  submessage = 'Please wait a moment',
  fullScreen = false,
  minHeight = '60vh',
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        minHeight: fullScreen ? '100vh' : minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 3, sm: 4 },
          borderRadius: 3,
          textAlign: 'center',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.06)} 100%)`,
          width: '100%',
          maxWidth: 420,
        }}
      >
        <Stack spacing={1.5} alignItems="center">
          <CircularProgress size={52} thickness={4.5} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {submessage}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default AppLoader
