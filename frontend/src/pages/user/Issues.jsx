import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import axios from 'axios'

const Issues = () => {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/reports', { withCredentials: true })
        if (res.data?.success) {
          setIssues(res.data.reports || [])
        } else {
          setError('Failed to load issues')
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch issues')
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  const getStatusColor = (status) => {
    const colors = {
      open: 'info',
      'in-progress': 'warning',
      resolved: 'success',
      rejected: 'error'
    }
    return colors[status] || 'default'
  }

  const getCategoryLabel = (category) => {
    const labels = {
      garbage: 'Garbage Dump',
      pothole: 'Pothole/Road Damage',
      water: 'Water Leakage',
      streetlight: 'Broken Light',
      park: 'Park Maintenance',
      sewage: 'Sewage Issue',
      vandalism: 'Vandalism',
      other: 'Other'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Issues
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse community-reported issues across the city.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {issues.length === 0 ? (
        <Alert severity="info">No issues found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {issues.map((issue) => (
            <Grid item xs={12} key={issue._id}>
              <Card elevation={0} sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {issue.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {issue.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={getCategoryLabel(issue.category)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={issue.status}
                        size="small"
                        color={getStatusColor(issue.status)}
                        variant="filled"
                      />
                      <Chip
                        label={issue.priority}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {issue.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Issues
