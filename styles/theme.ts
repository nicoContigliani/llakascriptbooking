import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#007AFF', // Azul macOS
      light: '#4DA3FF',
      dark: '#0056CC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc143c', // Rojo carmesí
      light: '#e3334d',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FF3B30',
      light: '#FF6960',
      dark: '#D70015',
    },
    warning: {
      main: '#FF9500',
      light: '#FFB140',
      dark: '#CC7700',
    },
    info: {
      main: '#007AFF',
      light: '#4DA3FF',
      dark: '#0056CC',
    },
    success: {
      main: '#34C759',
      light: '#65D787',
      dark: '#00A32E',
    },
    background: {
      default: '#F5F5F7', // Gris claro macOS
      paper: '#FFFFFF',   // Blanco puro
    },
    text: {
      primary: '#1D1D1F',
      secondary: '#86868B',
      disabled: '#CECED2',
    },
    divider: '#E5E5EA',
    grey: {
      50: '#F5F5F7',
      100: '#E5E5EA',
      200: '#D1D1D6',
      300: '#C7C7CC',
      400: '#AEAEB2',
      500: '#8E8E93',
      600: '#636366',
      700: '#48484A',
      800: '#3A3A3C',
      900: '#1D1D1F',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.022em',
      color: '#1D1D1F',
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.018em',
      color: '#1D1D1F',
      lineHeight: 1.15,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      letterSpacing: '-0.014em',
      color: '#1D1D1F',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      letterSpacing: '-0.011em',
      color: '#1D1D1F',
      lineHeight: 1.25,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      letterSpacing: '-0.008em',
      color: '#1D1D1F',
      lineHeight: 1.3,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      letterSpacing: '-0.006em',
      color: '#1D1D1F',
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '-0.011em',
      color: '#1D1D1F',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
      letterSpacing: '-0.006em',
      color: '#86868B',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#636366',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#636366',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '-0.011em',
      textTransform: 'none',
      fontSize: '0.9375rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#86868B',
      letterSpacing: '0em',
    },
  },
  shape: {
    borderRadius: 12, // Bordes más redondeados estilo macOS
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.08)',
    '0px 2px 4px rgba(0, 0, 0, 0.08)',
    '0px 2px 6px rgba(0, 0, 0, 0.08)',
    '0px 3px 8px rgba(0, 0, 0, 0.1)',
    '0px 4px 10px rgba(0, 0, 0, 0.1)',
    '0px 4px 12px rgba(0, 0, 0, 0.12)',
    '0px 5px 14px rgba(0, 0, 0, 0.12)',
    '0px 5px 16px rgba(0, 0, 0, 0.14)',
    '0px 6px 18px rgba(0, 0, 0, 0.14)',
    '0px 6px 20px rgba(0, 0, 0, 0.16)',
    '0px 7px 22px rgba(0, 0, 0, 0.16)',
    '0px 7px 24px rgba(0, 0, 0, 0.18)',
    '0px 8px 26px rgba(0, 0, 0, 0.18)',
    '0px 8px 28px rgba(0, 0, 0, 0.2)',
    '0px 9px 30px rgba(0, 0, 0, 0.2)',
    '0px 9px 32px rgba(0, 0, 0, 0.22)',
    '0px 10px 34px rgba(0, 0, 0, 0.22)',
    '0px 10px 36px rgba(0, 0, 0, 0.24)',
    '0px 11px 38px rgba(0, 0, 0, 0.24)',
    '0px 11px 40px rgba(0, 0, 0, 0.26)',
    '0px 12px 42px rgba(0, 0, 0, 0.26)',
    '0px 12px 44px rgba(0, 0, 0, 0.28)',
    '0px 13px 46px rgba(0, 0, 0, 0.28)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#C7C7CC #F5F5F7",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#F5F5F7",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#C7C7CC",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#AEAEB2",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#8E8E93",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#AEAEB2",
          },
          backgroundColor: '#F5F5F7',
          minHeight: '100vh',
          fontSmooth: 'always',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        html: {
          scrollBehavior: 'smooth',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
          fontSize: '0.9375rem',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          backgroundColor: '#007AFF',
          color: '#FFFFFF',
          boxShadow: '0px 2px 6px rgba(0, 122, 255, 0.3)',
          '&:hover': {
            backgroundColor: '#0056CC',
            boxShadow: '0px 4px 12px rgba(0, 122, 255, 0.4)',
          },
        },
        containedSecondary: {
          backgroundColor: '#dc143c',
          color: '#FFFFFF',
          boxShadow: '0px 2px 6px rgba(220, 20, 60, 0.3)',
          '&:hover': {
            backgroundColor: '#9a0036',
            boxShadow: '0px 4px 12px rgba(220, 20, 60, 0.4)',
          },
        },
        outlinedPrimary: {
          borderColor: '#E5E5EA',
          color: '#007AFF',
          backgroundColor: 'transparent',
          borderWidth: '1.5px',
          '&:hover': {
            backgroundColor: alpha('#007AFF', 0.04),
            borderColor: '#007AFF',
          },
        },
        outlinedSecondary: {
          borderColor: '#E5E5EA',
          color: '#dc143c',
          backgroundColor: 'transparent',
          borderWidth: '1.5px',
          '&:hover': {
            backgroundColor: alpha('#dc143c', 0.04),
            borderColor: '#dc143c',
          },
        },
        text: {
          color: '#007AFF',
          '&:hover': {
            backgroundColor: alpha('#007AFF', 0.04),
          },
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E5E5EA',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
        },
        elevation1: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0px 1px 0px #E5E5EA',
          borderBottom: '1px solid #E5E5EA',
          color: '#1D1D1F',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#1D1D1F',
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            transition: 'all 0.2s ease',
            fontSize: '0.9375rem',
          },
          '& .MuiInputLabel-root': {
            color: '#86868B',
            fontSize: '0.9375rem',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E5E5EA',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: '#C7C7CC',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#007AFF',
              borderWidth: '2px',
            },
          },
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: '#C7C7CC',
              opacity: 1,
            },
            padding: '12px 16px',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.15)',
          border: '1px solid #E5E5EA',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid',
          padding: '12px 16px',
          fontSize: '0.875rem',
        },
        standardError: {
          backgroundColor: alpha('#FF3B30', 0.04),
          borderColor: '#FF3B30',
          color: '#D70015',
        },
        standardSuccess: {
          backgroundColor: alpha('#34C759', 0.04),
          borderColor: '#34C759',
          color: '#00A32E',
        },
        standardInfo: {
          backgroundColor: alpha('#007AFF', 0.04),
          borderColor: '#007AFF',
          color: '#0056CC',
        },
        standardWarning: {
          backgroundColor: alpha('#FF9500', 0.04),
          borderColor: '#FF9500',
          color: '#CC7700',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          fontSize: '0.8125rem',
          '&.MuiChip-filledPrimary': {
            backgroundColor: alpha('#007AFF', 0.1),
            color: '#007AFF',
          },
          '&.MuiChip-filledSecondary': {
            backgroundColor: alpha('#dc143c', 0.1),
            color: '#dc143c',
          },
          '&.MuiChip-outlinedPrimary': {
            borderColor: '#007AFF',
            color: '#007AFF',
          },
          '&.MuiChip-outlinedSecondary': {
            borderColor: '#dc143c',
            color: '#dc143c',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#E5E5EA',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: '8px 0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          fontSize: '0.9375rem',
          borderRadius: 8,
          margin: '0 8px',
          width: 'auto',
          '&:hover': {
            backgroundColor: alpha('#007AFF', 0.04),
          },
          '&.Mui-selected': {
            backgroundColor: alpha('#007AFF', 0.08),
            '&:hover': {
              backgroundColor: alpha('#007AFF', 0.12),
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#007AFF',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#007AFF',
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          backgroundColor: '#E5E5EA',
          opacity: 1,
        },
      },
    },
  },
});