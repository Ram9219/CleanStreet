import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Pagination,
  Stack,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import {
  ThumbUp,
  ThumbDown,
  Comment,
  Share,
  LocationOn,
  Category as CategoryIcon,
} from '@mui/icons-material'
import { apiClient } from '../../utils/apiClient'
import { useAuth } from '../../contexts/AuthContext'
import CommentSection from '../../components/Community/CommentSection'
import IssueCard from '../../components/Community/IssueCard'
import AppLoader from '../../components/Feedback/AppLoader'

const Community = () => {
  const { user, loading: authLoading } = useAuth()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  
  // Dialog states
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)

  const getMapUrl = (issue) => {
    if (!issue) return null
    if (issue.latitude && issue.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${issue.latitude},${issue.longitude}`
    }
    if (issue.address) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(issue.address)}`
    }
    return null
  }

  // Fetch issues
  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      const params = {
        page,
        limit: 12,
      }
      
      const response = await apiClient.get('/reports/community/feed', {
        params,
        withCredentials: true
      })

      if (response.data.success) {
        setIssues(response.data.reports)
        setTotalPages(response.data.pagination.pages)
        setTotalCount(response.data.pagination.total)
      } else {
        setError('Failed to load community feed')
      }
    } catch (err) {
      console.error('Fetch issues error:', err)
      setError(err.response?.data?.error || 'Failed to fetch issues')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  const handleOpenDetails = async (issue) => {
    try {
      setCommentsLoading(true)
      const response = await apiClient.get(`/reports/community/post/${issue._id}`, {
        withCredentials: true
      })
      
      if (response.data.success) {
        setSelectedIssue(response.data.report)
        setOpenDetailsDialog(true)
      }
    } catch (err) {
      console.error('Failed to fetch issue details:', err)
      setError('Failed to load issue details')
    } finally {
      setCommentsLoading(false)
    }
  }

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false)
    setSelectedIssue(null)
  }

  const handleRefreshIssues = () => {
    fetchIssues()
  }

  const handleIssueUpdated = (updatedIssue) => {
    setSelectedIssue(updatedIssue)
    fetchIssues()
  }

  const getDesktopGridSize = (count) => {
    if (count <= 1) return 12
    if (count === 2) return 6
    if (count === 4) return 6
    if (count === 3) return 4
    if (count > 4 && count % 4 === 1) return 4
    return 3
  }

  const getMediumGridSize = (count) => {
    if (count <= 1) return 12
    if (count === 2 || count === 4) return 6
    return 4
  }

  const desktopGridSize = getDesktopGridSize(issues.length)
  const mediumGridSize = getMediumGridSize(issues.length)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Login Warning */}
      {!authLoading && !user && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            You're browsing as a guest. <strong>Please log in to like, comment, and interact with issues.</strong>
          </Typography>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {(loading || authLoading) && (
        <AppLoader
          message={authLoading ? 'Loading user' : 'Loading community feed'}
          submessage={authLoading ? 'Almost ready...' : 'Fetching latest issues'}
          minHeight="40vh"
        />
      )}

      {/* Issues Feed */}
      {!loading && !authLoading && issues.length > 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
            {issues.map((issue) => (
              <Grid item xs={12} sm={6} md={mediumGridSize} lg={desktopGridSize} key={issue._id}>
                <IssueCard
                  issue={issue}
                  onOpenDetails={() => handleOpenDetails(issue)}
                  onRefresh={handleRefreshIssues}
                  currentUserId={user?._id || null}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </>
      )}

      {/* No Issues */}
      {!loading && !authLoading && issues.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: 'background.default' }}>
          <Typography variant="h6" color="textSecondary">
            No issues found. Please check back later!
          </Typography>
        </Paper>
      )}

      {/* Issue Details Dialog */}
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {commentsLoading ? (
          <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : selectedIssue ? (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  icon={<CategoryIcon />}
                  label={selectedIssue.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={selectedIssue.status}
                  size="small"
                  color={
                    selectedIssue.status === 'resolved'
                      ? 'success'
                      : selectedIssue.status === 'in-progress'
                      ? 'warning'
                      : 'default'
                  }
                />
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 1 }}>
                {/* Header Info */}
                <Box>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      src={selectedIssue.userId?.profilePicture}
                      alt={selectedIssue.userId?.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box flex={1}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {selectedIssue.userId?.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(selectedIssue.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Title and Description */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {selectedIssue.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedIssue.description}
                  </Typography>
                </Box>

                {/* Location */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocationOn sx={{ width: 20, height: 20, color: 'primary.main' }} />
                  <Typography variant="body2">{selectedIssue.address}</Typography>
                  {getMapUrl(selectedIssue) && (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => window.open(getMapUrl(selectedIssue), '_blank', 'noopener,noreferrer')}
                      sx={{ ml: 1, textTransform: 'none' }}
                    >
                      Open Location
                    </Button>
                  )}
                </Stack>

                {/* Images */}
                {selectedIssue.images && selectedIssue.images.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Images:
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                      {selectedIssue.images.map((image, idx) => (
                        <CardMedia
                          key={idx}
                          component="img"
                          image={image.url}
                          alt={`Issue image ${idx + 1}`}
                          sx={{
                            width: 150,
                            height: 150,
                            borderRadius: 1,
                            flexShrink: 0,
                            objectFit: 'cover',
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Stats */}
                <Stack direction="row" spacing={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <ThumbUp sx={{ width: 18, height: 18 }} />
                    <Typography variant="caption">
                      {selectedIssue.likes?.length || 0} Likes
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Comment sx={{ width: 18, height: 18 }} />
                    <Typography variant="caption">
                      {selectedIssue.comments?.length || 0} Comments
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Share sx={{ width: 18, height: 18 }} />
                    <Typography variant="caption">
                      {selectedIssue.shares || 0} Shares
                    </Typography>
                  </Stack>
                </Stack>

                {/* Comments Section */}
                {user && user._id ? (
                  <CommentSection
                    issueId={selectedIssue._id}
                    comments={selectedIssue.comments}
                    currentUserId={user._id}
                    allowComments={selectedIssue.allowComments}
                    onIssueUpdated={handleIssueUpdated}
                  />
                ) : (
                  <Alert severity="info">
                    {authLoading ? 'Loading user information...' : 'Please log in to comment on this issue.'}
                  </Alert>
                )}
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </Container>
  )
}

export default Community
