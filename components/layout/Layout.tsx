
// // components/layout/Layout.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
// import { RootState } from '../../store';
// import { logout } from '../../store/slices/authSlice';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const [isClient, setIsClient] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push('/auth/login');
//   };

//   const getDashboardPath = () => {
//     if (!user) return '/auth/login';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'recruiter':
//         return '/recruiter/dashboard';
//       case 'candidate':
//         return '/candidate/dashboard';
//       default:
//         return '/auth/login';
//     }
//   };

//   // Mostrar loading hasta que esté en el cliente
//   if (!isClient) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, cursor: 'pointer' }}
//             onClick={() => router.push('/')}
//           >
//             Reserva System
//           </Typography>

//           {isAuthenticated ? (
//             <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//               <Typography variant="body2">
//                 {user?.name} ({user?.role})
//               </Typography>
//               <Button
//                 color="inherit"
//                 onClick={() => router.push(getDashboardPath())}
//               >
//                 Dashboard
//               </Button>
//               <Button color="inherit" onClick={handleLogout}>
//                 Logout
//               </Button>
//             </Box>
//           ) : (
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button color="inherit" onClick={() => router.push('/auth/login')}>
//                 Login
//               </Button>
//               <Button color="inherit" onClick={() => router.push('/auth/register')}>
//                 Register
//               </Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container component="main" sx={{ py: 4 }}>
//         {children}
//       </Container>
//     </Box>
//   );
// };

// export default Layout;



// components/layout/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  AccountCircle,
  ExitToApp,
  Person,
  Business,
  AdminPanelSettings,
  Home,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
    setMobileDrawerOpen(false);
    setMobileMenuAnchor(null);
  };

  const getDashboardPath = () => {
    if (!user) return '/auth/login';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'candidate':
        return '/candidate/dashboard';
      default:
        return '/auth/login';
    }
  };

  const getRoleIcon = () => {
    if (!user) return <Person />;
    switch (user.role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'recruiter':
        return <Business />;
      case 'candidate':
        return <Person />;
      default:
        return <Person />;
    }
  };

  const getRoleColor = () => {
    if (!user) return 'default';
    switch (user.role) {
      case 'admin':
        return 'error';
      case 'recruiter':
        return 'primary';
      case 'candidate':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Dashboard', path: getDashboardPath(), icon: <Dashboard /> },
  ];

  // Mostrar loading hasta que esté en el cliente
  if (!isClient) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f5f7ff 100%)',
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60}
            sx={{
              color: 'primary.main',
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Cargando...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f5f7ff 100%)',
    }}>
      {/* AppBar con estilo macOS */}
      <AppBar 
        position="sticky"
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              mr: { md: 4 },
              cursor: 'pointer',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={() => router.push('/')}
          >
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
              }}
            />
            Reserva
          </Typography>

          {/* Navigation Items - Desktop */}
          {isAuthenticated && !isMobile && (
            <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  startIcon={item.icon}
                  onClick={() => router.push(item.path)}
                  sx={{
                    color: 'text.primary',
                    borderRadius: 3,
                    px: 3,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* User Info & Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                {/* Desktop User Info */}
                {!isMobile && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      icon={getRoleIcon()}
                      label={user?.role}
                      color={getRoleColor()}
                      variant="outlined"
                      size="small"
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        display: { xs: 'none', sm: 'block' }
                      }}
                    >
                      {user?.name}
                    </Typography>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                )}

                {/* Mobile Menu Button */}
                {isMobile ? (
                  <>
                    <IconButton
                      onClick={handleMobileMenuOpen}
                      sx={{
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={mobileMenuAnchor}
                      open={Boolean(mobileMenuAnchor)}
                      onClose={handleMobileMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: 3,
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                          border: '1px solid',
                          borderColor: 'divider',
                          minWidth: 200,
                        },
                      }}
                    >
                      <MenuItem sx={{ pointerEvents: 'none' }}>
                        <ListItemIcon>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                              fontSize: '0.75rem',
                            }}
                          >
                            {user?.name?.charAt(0).toUpperCase()}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary={user?.name}
                          secondary={
                            <Chip
                              icon={getRoleIcon()}
                              label={user?.role}
                              color={getRoleColor()}
                              size="small"
                              sx={{ height: 20, fontSize: '0.7rem' }}
                            />
                          }
                        />
                      </MenuItem>
                      <MenuItem onClick={() => { router.push('/'); handleMobileMenuClose(); }}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Home" />
                      </MenuItem>
                      <MenuItem onClick={() => { router.push(getDashboardPath()); handleMobileMenuClose(); }}>
                        <ListItemIcon><Dashboard /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary="Logout" />
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  // Desktop Logout Button
                  <Button
                    startIcon={<ExitToApp />}
                    onClick={handleLogout}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 3,
                      borderColor: 'divider',
                      color: 'text.secondary',
                      '&:hover': {
                        borderColor: 'error.main',
                        color: 'error.main',
                        backgroundColor: alpha(theme.palette.error.main, 0.04),
                      },
                    }}
                  >
                    Logout
                  </Button>
                )}
              </>
            ) : (
              // Auth Buttons
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  onClick={() => router.push('/auth/login')}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 3,
                    borderColor: 'divider',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push('/auth/register')}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                    boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0, 122, 255, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container 
        component="main" 
        maxWidth="xl"
        sx={{ 
          py: { xs: 3, md: 4 },
          px: { xs: 2, md: 3 },
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <Box
          sx={{
            borderRadius: { xs: 2, md: 3 },
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ fontSize: '0.75rem' }}
          >
            © {new Date().getFullYear()} Reserva System. Elegant interview scheduling.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;