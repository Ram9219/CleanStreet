import React, { memo, useState } from 'react'
import {
  TextField,
  InputAdornment,
  Box,
  alpha
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const SearchBar = memo(({ onSearch = () => {}, placeholder = 'Search...' }) => {
  const theme = useTheme()
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchValue('')
    onSearch('')
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <CloseIcon
                sx={{
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 }
                }}
                onClick={handleClear}
              />
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.2)
            },
            '&.Mui-focused': {
              bgcolor: theme.palette.background.paper,
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
            }
          }
        }}
      />
    </Box>
  )
})

SearchBar.displayName = 'SearchBar'

export default SearchBar
