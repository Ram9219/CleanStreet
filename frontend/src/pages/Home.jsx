import React, { useState, useCallback, useMemo, memo, lazy, Suspense, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Grid, Paper, 
  Card, CardContent, Fade, Zoom, Grow,
  Avatar, Chip, Stack, Divider, IconButton, alpha,
  useTheme, useMediaQuery, Skeleton, Alert, CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getScopedPath } from '../utils/subdomain';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReportIcon from '@mui/icons-material/Report';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MapIcon from '@mui/icons-material/Map';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

// Assets
import heroVideo from '../assets/hero-background.optimized.mp4';
import { Helmet } from 'react-helmet';
// ==================== STYLED COMPONENTS ====================

const FeatureCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => ({
  borderRadius: 20,
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
    transform: 'translateY(-10px) scale(1.01)',
    boxShadow: `0 24px 48px ${alpha(color || theme.palette.primary.main, 0.22)}`,
    '& .feature-hover': {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    '& .feature-icon': {
      transform: 'scale(1.06) rotate(4deg)',
    }
  }
}));

const StatsCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => ({
  borderRadius: 20,
  background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.1)} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(color || theme.palette.primary.main, 0.2)}`,
  padding: theme.spacing(3),
  height: '100%',
  minHeight: 250,
  width: '100%',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    minHeight: 230,
  },
  [theme.breakpoints.up('md')]: {
    minHeight: 270,
  },
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
}));

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
}));

const CategoryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'active'
})(({ theme, color, active }) => ({
  p: 1.5,
  borderRadius: 999,
  border: `2px solid ${alpha(color, active ? 0.5 : 0.1)}`,
  background: theme.palette.mode === 'dark'
    ? alpha(color, 0.05)
    : alpha(color, 0.03),
  textAlign: 'left',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  width: 'auto',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  transform: active ? 'translateY(-4px)' : 'none',
  boxShadow: active ? `0 20px 40px ${alpha(color, 0.25)}` : 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 40px ${alpha(color, 0.2)}`,
    borderColor: alpha(color, 0.4),
  }
}));

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
}));

// ==================== ANIMATIONS ====================

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
`;

const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ==================== CUSTOM HOOKS ====================

const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isVisible];
};

const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return { isMobile, isTablet, isDesktop };
};

// ==================== ERROR BOUNDARY ====================

class VideoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center', color: 'white' }}>
          <Typography variant="h6">Video failed to load</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

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
));

FloatingBackground.displayName = 'FloatingBackground';

const TrustBadges = memo(() => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 4 }, flexWrap: 'wrap', mt: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#06D6A0', animation: `${pulseAnimation} 2s infinite` }} />
      <Typography variant="body2" sx={{ opacity: 0.9 }}>Do Register and Report Issues</Typography>
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
));

TrustBadges.displayName = 'TrustBadges';

const HeroStats = memo(() => {
  const theme = useTheme();
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
          bgcolor: 'rgba(255,255,255,0.95)',
          color: '#1a1a2e',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          animation: `${pulseAnimation} 2s infinite`,
          '& .MuiChip-icon': { color: theme.palette.warning.dark }
        }}
        icon={<TrendingUpIcon />}
      />
      <Chip 
        label="96% Satisfaction Rate" 
        sx={{ 
          bgcolor: 'rgba(255, 209, 102, 0.95)', 
          color: '#1a1a2e',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,209,102,0.3)',
        }}
      />
    </Box>
  );
});

HeroStats.displayName = 'HeroStats';

const FeatureCardComponent = memo(({ feature, index, onExplore }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { isMobile } = useResponsive();

  return (
    <Grid item xs={12} sm={6} md={6} lg={3} ref={ref}>
      <Grow in={inView} timeout={500} style={{ transitionDelay: `${index * 150}ms` }}>
        <FeatureCard 
          color={feature.color} 
          onClick={() => onExplore(feature)}
          role="button"
          tabIndex={0}
          aria-label={`Learn more about ${feature.title}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onExplore(feature);
            }
          }}
        >
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
          
          <CardContent sx={{ p: { xs: 2.5, md: 3 }, position: 'relative', zIndex: 2, flex: 1 }}>
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, alignItems: 'flex-start' }}>
              <Box 
                className="feature-icon"
                sx={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: 52, sm: 60, md: 68 },
                  height: { xs: 52, sm: 60, md: 68 },
                  borderRadius: '50%',
                  bgcolor: alpha(feature.color, 0.1),
                  color: feature.color,
                  transition: 'all 0.4s ease',
                  animation: `${floatAnimation} 6s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                  flexShrink: 0
                }}
              >
                {feature.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h5" 
                  component="h3"
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1.5, 
                    minHeight: { xs: 'auto', md: 54 },
                    fontSize: { xs: '1.15rem', md: '1.35rem' }
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2.5, 
                    minHeight: { xs: 'auto', md: 60 },
                    fontSize: { xs: '0.85rem', md: '0.95rem' }
                  }}
                >
                  {feature.description}
                </Typography>
                
                <Stack spacing={1.2} sx={{ mb: 2.5 }}>
                  {feature.steps.map((step, stepIndex) => (
                    <Box 
                      key={stepIndex}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.25,
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
                          width: 24, 
                          height: 24, 
                          bgcolor: feature.color,
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          color: 'white'
                        }}
                      >
                        {stepIndex + 1}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
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
                    size={isMobile ? 'medium' : 'small'}
                    aria-label={`Explore ${feature.title}`}
                    sx={{
                      color: feature.color,
                      minWidth: isMobile ? 48 : 40,
                      minHeight: isMobile ? 48 : 40,
                      '& .MuiSvgIcon-root': {
                        fontSize: isMobile ? 24 : 20
                      },
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
              </Box>
            </Box>
          </CardContent>
        </FeatureCard>
      </Grow>
    </Grid>
  );
});

FeatureCardComponent.displayName = 'FeatureCardComponent';

FeatureCardComponent.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stats: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    gradient: PropTypes.string.isRequired,
    path: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  onExplore: PropTypes.func.isRequired
};

const StatCardComponent = memo(({ stat, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Grid item xs={12} sm={6} lg={3} ref={ref} sx={{ display: 'flex', minWidth: 0 }}>
      <Grow in={inView} timeout={500} style={{ transitionDelay: `${index * 150}ms`, width: '100%' }}>
        <StatsCard 
          color={stat.color}
          role="article"
          aria-label={`Statistic: ${stat.label}`}
        >
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
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: { xs: 1.5, md: 3 },
            mb: 2,
            flex: 1
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
            <Box sx={{ width: '100%' }}>
              <Typography 
                variant="h2" 
                component="p"
                sx={{ 
                  fontWeight: 900, 
                  color: stat.color,
                  lineHeight: 1,
                  fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {stat.value}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  fontWeight: 500,
                  minHeight: { xs: 40, sm: 44 },
                  lineHeight: 1.35,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
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
              textAlign: 'center',
              mt: 'auto',
              minHeight: 40,
              width: '100%',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {stat.change}
          </Typography>
        </StatsCard>
      </Grow>
    </Grid>
  );
});

StatCardComponent.displayName = 'StatCardComponent';

StatCardComponent.propTypes = {
  stat: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    change: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

const RecentIssueCard = memo(({ issue }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Grid item xs={12} sm={6} ref={ref}>
      <Zoom in={inView} timeout={400}>
        <IssueCard 
          color={issue.color}
          role="article"
          aria-label={`Resolved issue: ${issue.title}`}
        >
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
              <LocationOnIcon sx={{ fontSize: 14, opacity: 0.6 }} aria-hidden="true" />
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
              <VolunteerActivismIcon sx={{ fontSize: 16, opacity: 0.7 }} aria-hidden="true" />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {issue.votes} supporters
              </Typography>
            </Box>
            <Chip
              label="View Details"
              size="small"
              variant="outlined"
              component={Link}
              to={`/issue/${issue.id}`}
              clickable
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
  );
});

RecentIssueCard.displayName = 'RecentIssueCard';

RecentIssueCard.propTypes = {
  issue: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

// ==================== MAIN COMPONENT ====================

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [activeCategory, setActiveCategory] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized data
  const features = useMemo(() => [
    {
      icon: <ReportIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 } }} />,
      title: 'Report Issues Instantly',
      description: 'Document civic problems with photos, location pins, and detailed descriptions.',
      color: '#FF6B6B',
      stats: '15K+ Issues Reported',
      steps: ['📸 Take Photo', '📍 Pin Location', '📝 Add Details', '🚀 Submit'],
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
  ], []);

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
  ], []);

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
  ], []);

  const categories = useMemo(() => [
    { name: 'Garbage & Waste', icon: '🗑️', count: '15.8K', color: '#FF6B6B' },
    { name: 'Road & Infrastructure', icon: '🛣️', count: '12.5K', color: '#4ECDC4' },
    { name: 'Public Safety', icon: '💡', count: '9.2K', color: '#FFD166' },
    { name: 'Water & Drainage', icon: '🚰', count: '7.9K', color: '#118AB2' },
    { name: 'Parks & Green Spaces', icon: '🌳', count: '6.5K', color: '#06D6A0' },
    { name: 'Public Transport', icon: '🚌', count: '5.7K', color: '#955BA5' },
  ], []);

  // Callbacks
  const handleGetStarted = useCallback(() => {
    navigate('/report-issue');
  }, [navigate]);

  const handleViewMap = useCallback(() => {
    navigate('/map');
  }, [navigate]);

  const handleViewCommunity = useCallback(() => {
    navigate('/community');
  }, [navigate]);

  const handleExploreFeature = useCallback((feature) => {
    if (feature.path) {
      navigate(feature.path);
    }
  }, [navigate]);

  const handleVolunteerClick = useCallback(() => {
    navigate(getScopedPath('volunteer', '/'));
  }, [navigate]);

  const handleVolunteerSignUp = useCallback(() => {
    navigate(getScopedPath('volunteer', '/register'));
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Clean Streets - Better Communities | Civic Engagement Platform</title>
        <meta name="description" content="Join 75,000+ citizens transforming neighborhoods through civic engagement. Report issues, track progress, and collaborate for cleaner, safer spaces." />
        <meta name="keywords" content="civic engagement, community issues, report problems, neighborhood improvement, city services" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Clean Streets - Better Communities" />
        <meta property="og:description" content="Transform your neighborhood through civic engagement" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clean Streets - Better Communities" />
        <meta name="twitter:description" content="Join 75,000+ citizens transforming neighborhoods" />
        <meta name="twitter:image" content="https://example.com/twitter-image.jpg" />
        
        <link rel="canonical" href="https://example.com" />
        <html lang="en" />
      </Helmet>

      <Box sx={{ 
        overflow: 'hidden', 
        bgcolor: 'background.default',
        minHeight: '100vh'
      }}>
        {/* Skip to content link */}
        <Box
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            zIndex: 9999,
            '&:focus': {
              left: 16,
              top: 16,
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 1,
              textDecoration: 'none',
              color: 'text.primary',
              boxShadow: 3
            }
          }}
        >
          Skip to main content
        </Box>

        {/* Hero Section */}
        <HeroSection id="main-content" tabIndex={-1}>
          <VideoErrorBoundary>
            {isClient && !prefersReducedMotion && !videoError && (
              <Box
                component="video"
                autoPlay
                loop
                muted
                playsInline
                src={heroVideo}
                onError={() => setVideoError(true)}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 0,
                  filter: 'saturate(1.1)'
                }}
              />
            )}
          </VideoErrorBoundary>
          
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: theme.palette.mode === 'dark'
                ? 'rgba(0,0,0,0.35)'
                : 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(8px)',
              zIndex: 1
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <FloatingBackground />
            
            <Container maxWidth="xl">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Fade in timeout={1000}>
                    <Box>
                      <HeroStats />
                      
                      <Typography 
                        variant="h1" 
                        component="h1"
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
                        Clean Streets
                        <Box component="span" sx={{ color: '#FFD166', display: 'block' }}>
                          Better Communities
                        </Box>
                      </Typography>
                      
                      <Typography 
                        variant="h5" 
                        component="p"
                        gutterBottom 
                        sx={{ 
                          opacity: 0.9, 
                          mb: 4,
                          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                          maxWidth: '90%',
                          lineHeight: 1.6
                        }}
                      >
                        Be the change in your community. From potholes to park cleanups, connect with neighbors and local authorities to transform your streets into spaces you're proud of
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
                            aria-label="Report an issue"
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
                            aria-label="Explore issues map"
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
                            aria-label="Visit community"
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
                        <Typography variant="h5" component="h2" sx={{ 
                          fontWeight: 700, 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          color: 'white'
                        }}>
                          <span style={{ fontSize: '1.5rem' }} aria-hidden="true">⚡</span> Live Updates
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
                        component={Link}
                        to="/community"
                        aria-label="View all resolved issues"
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
                      >
                        View All Resolved Issues
                      </Button>
                    </Paper>
                  </Grow>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </HeroSection>

        {/* Volunteer CTA Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mt: -4 }}>
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
                    component="h2"
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
                      aria-label="Learn more about volunteering"
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
                      aria-label="Sign up as volunteer"
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
                    <Box sx={{ fontSize: { xs: 60, md: 80 } }} aria-hidden="true"></Box>
                    <Typography variant="h6" component="p" fontWeight="bold">
                      500+ Active Volunteers
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>
        </Container>

        {/* Stats Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h2"
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
              component="p"
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
          
          <Grid container spacing={{ xs: 2, md: 3 }} alignItems="stretch">
            {stats.map((stat, index) => (
              <StatCardComponent key={index} stat={stat} index={index} />
            ))}
          </Grid>
        </Container>

        {/* Features Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h2"
              gutterBottom 
              sx={{ 
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Everything You Need
            </Typography>
            <Typography 
              variant="h5" 
              component="p"
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
        </Container>

        {/* Categories Section */}
        <Box sx={{ 
          py: { xs: 4, md: 6 },
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
        }}>
          <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h2" 
                component="h2"
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
                component="p"
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
            
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                pb: 2,
                px: { xs: 1, sm: 2 },
                scrollSnapType: 'x mandatory',
                scrollPadding: '0 16px',
                '&::-webkit-scrollbar': { 
                  height: 8,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: alpha(theme.palette.divider, 0.1),
                  borderRadius: 999
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: 999,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.5),
                  }
                }
              }}
            >
              {categories.map((category, index) => (
                <Box key={index} sx={{ flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                  <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                    <CategoryCard
                      color={category.color}
                      active={activeCategory === index}
                      onClick={() => setActiveCategory(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${category.name} category with ${category.count} reports`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setActiveCategory(index);
                        }
                      }}
                    >
                      <Box sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' } }} aria-hidden="true">
                        {category.icon}
                      </Box>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          component="h3"
                          sx={{ 
                            fontWeight: 700, 
                            color: category.color,
                            fontSize: { xs: '0.8rem', md: '0.95rem' }
                          }}
                        >
                          {category.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          component="p"
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}
                        >
                          {category.count} reports
                        </Typography>
                      </Box>
                    </CategoryCard>
                  </Zoom>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
          <Zoom in timeout={1000}>
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 6 },
                textAlign: 'center',
                borderRadius: 5,
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
                  component="h2"
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
                  component="p"
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9, 
                    maxWidth: 700, 
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                 Report It. Track It. Fix It. Join 75,000+ citizens transforming neighborhoods—one issue at a time.
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
                    aria-label="Report your first issue"
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
                    aria-label="Watch demo"
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
                    <CheckCircleIcon sx={{ fontSize: 16 }} aria-hidden="true" /> No credit card
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    opacity: 0.8, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    fontSize: { xs: '0.7rem', md: '0.8rem' }
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} aria-hidden="true" /> Takes 2 minutes
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    opacity: 0.8, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    fontSize: { xs: '0.7rem', md: '0.8rem' }
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} aria-hidden="true" /> Free forever
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Zoom>
        </Container>
      </Box>
    </>
  );
};

export default memo(Home);