import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Alert,
} from '@mui/material'
import {
  ThumbUp,
  ThumbUpOutlined,
  MoreVert,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import axios from 'axios'
import toast from 'react-hot-toast'

const CommentSection = ({
  issueId,
  comments = [],
  currentUserId,
  allowComments = true,
  onIssueUpdated,
}) => {
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [localComments, setLocalComments] = useState(comments)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCommentId, setSelectedCommentId] = useState(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [commentLikes, setCommentLikes] = useState(
    comments.reduce((acc, comment) => {
      acc[comment._id] = {
        likes: comment.likes?.length || 0,
        liked: comment.likes?.some(id => {
          if (typeof id === 'object') return id._id === currentUserId
          return id === currentUserId
        }) || false,
      }
      return acc
    }, {})
  )

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      toast.error('Please enter a comment')
      return
    }

    try {
      setSubmitting(true)
      const response = await axios.post(
        `/api/reports/${issueId}/comment`,
        { text: commentText.trim() },
        { withCredentials: true }
      )

      if (response.data.success) {
        setLocalComments([...localComments, response.data.comment])
        setCommentText('')
        toast.success('Comment added successfully')
        
        // Refresh the main issue to get updated data
        if (onIssueUpdated) {
          const issueResponse = await axios.get(
            `/api/reports/community/post/${issueId}`,
            { withCredentials: true }
          )
          if (issueResponse.data.success) {
            onIssueUpdated(issueResponse.data.report)
          }
        }
      }
    } catch (err) {
      console.error('Add comment error:', err)
      toast.error(err.response?.data?.error || 'Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCommentMenuOpen = (e, commentId) => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
    setSelectedCommentId(commentId)
  }

  const handleMenuClose = (e) => {
    if (e) e.stopPropagation()
    setAnchorEl(null)
    setSelectedCommentId(null)
  }

  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(
        `/api/reports/${issueId}/comment/${selectedCommentId}`,
        { withCredentials: true }
      )

      if (response.data.success) {
        setLocalComments(
          localComments.filter(comment => comment._id !== selectedCommentId)
        )
        toast.success('Comment deleted successfully')
        setDeleteConfirmOpen(false)
        handleMenuClose()

        // Refresh the main issue
        if (onIssueUpdated) {
          const issueResponse = await axios.get(
            `/api/reports/community/post/${issueId}`,
            { withCredentials: true }
          )
          if (issueResponse.data.success) {
            onIssueUpdated(issueResponse.data.report)
          }
        }
      }
    } catch (err) {
      console.error('Delete comment error:', err)
      toast.error(err.response?.data?.error || 'Failed to delete comment')
    }
  }

  const handleLikeComment = async (e, commentId) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }

    if (!currentUserId) {
      toast.error('Please login to like comments')
      return
    }

    try {
      const response = await axios.post(
        `/api/reports/${issueId}/comment/${commentId}/like`,
        {},
        { withCredentials: true }
      )

      if (response.data.success) {
        setCommentLikes({
          ...commentLikes,
          [commentId]: {
            likes: response.data.likesCount || 0,
            liked: response.data.liked,
          },
        })
        toast.success(response.data.message || 'Like updated')
      }
    } catch (err) {
      console.error('Like comment error:', err)
      const errorMsg = err.response?.data?.error || 'Failed to like comment'
      toast.error(errorMsg)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Comments ({localComments.length})
      </Typography>

      {/* Add Comment */}
      {allowComments && currentUserId ? (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
            Add a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
                '&.Mui-focused': {
                  backgroundColor: '#fff',
                },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setCommentText('')}
              disabled={submitting || !commentText.trim()}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              onClick={handleAddComment}
              disabled={submitting || !commentText.trim()}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </Box>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please log in to comment on this issue.
        </Alert>
      )}

      {/* Comments List */}
      <Stack spacing={2}>
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <Paper
              key={comment._id}
              sx={{
                p: 2,
                backgroundColor: 'background.default',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Stack direction="row" spacing={2}>
                {/* Avatar */}
                <Avatar
                  src={comment.userProfilePicture}
                  alt={comment.userName}
                  sx={{ width: 36, height: 36 }}
                />

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {comment.userName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: comment.createdAt &&
                          new Date(comment.createdAt).getFullYear() !==
                            new Date().getFullYear()
                          ? 'numeric'
                          : undefined,
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>
                  </Stack>

                  {/* Comment Text */}
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {comment.text}
                  </Typography>

                  {/* Like Button */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip
                      title={
                        commentLikes[comment._id]?.liked
                          ? 'Unlike'
                          : 'Like'
                      }
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => handleLikeComment(e, comment._id)}
                        color={
                          commentLikes[comment._id]?.liked
                            ? 'primary'
                            : 'default'
                        }
                        sx={{
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'primary.main',
                          },
                        }}
                      >
                        {commentLikes[comment._id]?.liked ? (
                          <ThumbUp sx={{ width: 16, height: 16 }} />
                        ) : (
                          <ThumbUpOutlined sx={{ width: 16, height: 16 }} />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Typography variant="caption" sx={{ minWidth: '16px' }}>
                      {commentLikes[comment._id]?.likes || 0}
                    </Typography>
                  </Stack>
                </Box>

                {/* More Menu */}
                {currentUserId === comment.userId?._id ||
                currentUserId === comment.userId ? (
                  <Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleCommentMenuOpen(e, comment._id)}
                    >
                      <MoreVert sx={{ width: 18, height: 18 }} />
                    </IconButton>
                  </Box>
                ) : null}
              </Stack>
            </Paper>
          ))
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.default' }}>
            <Typography variant="body2" color="textSecondary">
              No comments yet. Be the first to comment!
            </Typography>
          </Paper>
        )}
      </Stack>

      {/* Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setDeleteConfirmOpen(true)
            handleMenuClose()
          }}
        >
          <DeleteIcon sx={{ mr: 1, width: 18, height: 18 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Comment?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this comment? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteComment} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CommentSection
