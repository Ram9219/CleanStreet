import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { useMemo, useState, useEffect, lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { getSubdomain } from './utils/subdomain'
import AppLoader from './components/Feedback/AppLoader'

// Layout
const MainLayout = lazy(() => import('./components/Layout/MainLayout'))
const PublicLayout = lazy(() => import('./components/Layout/PublicLayout'))
const AdminLayout = lazy(() => import('./components/Layout/AdminLayout'))

// Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'))
const Profile = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/user/Dashboard'))
const Reports = lazy(() => import('./pages/user/Reports'))
const Map = lazy(() => import('./pages/user/Map'))
const History = lazy(() => import('./pages/user/History'))
const AdminHome = lazy(() => import('./pages/admin/Home'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminUsers = lazy(() => import('./pages/admin/Users'))
const AdminVolunteers = lazy(() => import('./pages/admin/Volunteers'))
const AdminReports = lazy(() => import('./pages/admin/Reports'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))
const AdminPendingVolunteers = lazy(() => import('./pages/admin/PendingVolunteers'))
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const ChangePassword = lazy(() => import('./pages/admin/ChangePassword'))
const SetupWizard = lazy(() => import('./components/setup/SetupWizard'))
const ReportIssue = lazy(() => import('./pages/ReportIssue'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Settings = lazy(() => import('./pages/user/Settings'))
const Activity = lazy(() => import('./pages/user/Activity'))
const Analytics = lazy(() => import('./pages/user/Analytics'))
const Community = lazy(() => import('./pages/user/Community'))
const VolunteerLogin = lazy(() => import('./pages/volunteer/Login'))
const VolunteerDashboard = lazy(() => import('./pages/volunteer/Dashboard'))
const VolunteerHome = lazy(() => import('./pages/volunteer/Home'))
const VolunteerProfile = lazy(() => import('./pages/volunteer/Profile'))
const VolunteerReports = lazy(() => import('./pages/volunteer/Reports'))
const VolunteerRegister = lazy(() => import('./pages/volunteer/Register'))
const VolunteerForgotPassword = lazy(() => import('./pages/volunteer/ForgotPassword'))
const VolunteerVerifyEmail = lazy(() => import('./pages/volunteer/VerifyEmail'))
const VolunteerVerificationPending = lazy(() => import('./pages/volunteer/VerificationPending'))
const VolunteerEvents = lazy(() => import('./pages/volunteer/Events'))
const MyEvents = lazy(() => import('./pages/volunteer/MyEvents'))
const CreateEvent = lazy(() => import('./pages/volunteer/CreateEvent'))

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute'
import SetupRedirect from './components/Auth/SetupRedirect'

function App() {
  const [mode, setMode] = useState('light')
  const subdomain = getSubdomain()
  const isVolunteerSubdomain = subdomain === 'volunteer'
  const isAdminSubdomain = subdomain === 'admin'

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#0f1115',
        paper: mode === 'light' ? '#ffffff' : '#141821',
      },
    },
  }), [mode])

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Scroll to top on route change
  const ScrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [location.pathname])
    return null
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <SetupRedirect>
            <Suspense
              fallback={
                <AppLoader
                  fullScreen
                  message="Loading page"
                  submessage="Preparing content"
                />
              }
            >
            <Routes>
              {/* Volunteer Subdomain Routes */}
              {isVolunteerSubdomain && (
                <>
                  <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<PublicLayout><VolunteerLogin /></PublicLayout>} />
                <Route path="/register" element={<PublicLayout><VolunteerRegister /></PublicLayout>} />
                <Route path="/forgot-password" element={<PublicLayout><VolunteerForgotPassword /></PublicLayout>} />
                <Route path="/verify-email" element={<PublicLayout><VolunteerVerifyEmail /></PublicLayout>} />
                <Route path="/verification-pending" element={
                  <ProtectedRoute allowedRoles={["volunteer"]}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerVerificationPending />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/home" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerHome />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/community" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <Community />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerProfile />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/events" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerEvents />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/my-events" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <MyEvents />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/create-event" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <CreateEvent />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                    <MainLayout toggleColorMode={toggleColorMode}>
                      <VolunteerReports />
                    </MainLayout>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}

            {/* Admin Subdomain Routes */}
            {isAdminSubdomain && (
              <>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/setup" element={<SetupWizard />} />
                <Route path="/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />
                <Route path="/change-password" element={
                  <ProtectedRoute adminOnly>
                    <ChangePassword />
                  </ProtectedRoute>
                } />
                <Route path="/home" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminHome />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/users" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminUsers />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/reports" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminReports />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminSettings />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/pending-volunteers" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminPendingVolunteers />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/volunteers" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout>
                      <AdminVolunteers />
                    </AdminLayout>
                  </ProtectedRoute>
                } />
                <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />
                <Route path="*" element={<Navigate to="/home" />} />
              </>
            )}

            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/setup" element={<SetupWizard />} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
            <Route path="/verify-email" element={<PublicLayout><VerifyEmail /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
            <Route path="/community" element={<PublicLayout><Community /></PublicLayout>} />

            {/* Protected User Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <PublicLayout>
                  <Profile />
                </PublicLayout>
              </ProtectedRoute>
            } />
            <Route path="/report-issue" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <ReportIssue />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/issues" element={<Navigate to="/community" replace />} />
            <Route path="/my-reports" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/home" element={
              <ProtectedRoute allowedRoles={["volunteer"]}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerHome />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/map" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Map />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <History />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/activity" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Activity />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            } />

            {/* Volunteer Path Routes */}
            <Route path="/volunteer" element={<Navigate to="/volunteer/login" />} />
            <Route path="/volunteer/login" element={<PublicLayout><VolunteerLogin /></PublicLayout>} />
            <Route path="/volunteer/register" element={<PublicLayout><VolunteerRegister /></PublicLayout>} />
            <Route path="/volunteer/forgot-password" element={<PublicLayout><VolunteerForgotPassword /></PublicLayout>} />
            <Route path="/volunteer/verify-email" element={<PublicLayout><VolunteerVerifyEmail /></PublicLayout>} />
            <Route path="/volunteer/verification-pending" element={
              <ProtectedRoute allowedRoles={["volunteer"]}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerVerificationPending />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/home" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerHome />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/dashboard" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/community" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <Community />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/profile" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerProfile />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/events" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerEvents />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/my-events" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <MyEvents />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/create-event" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <CreateEvent />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/reports" element={
              <ProtectedRoute allowedRoles={["volunteer", "admin", "super-admin"]} requireVolunteerVerified={true}>
                <MainLayout toggleColorMode={toggleColorMode}>
                  <VolunteerReports />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/volunteer/*" element={<Navigate to="/volunteer/login" />} />

            {/* Admin Path Routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" />} />
            <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />
            <Route path="/admin/change-password" element={
              <ProtectedRoute adminOnly>
                <ChangePassword />
              </ProtectedRoute>
            } />
            <Route path="/admin/home" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminHome />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/community" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <Community />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/volunteers" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminVolunteers />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminReports />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/pending-volunteers" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminPendingVolunteers />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute adminOnly>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </Suspense>
          </SetupRedirect>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App