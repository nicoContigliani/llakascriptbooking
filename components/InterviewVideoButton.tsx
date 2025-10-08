// // components/InterviewVideoButton.tsx
// import React, { useState, useEffect } from 'react';
// import { 
//   Button, 
//   Chip, 
//   Box, 
//   Tooltip, 
//   Alert,
//   CircularProgress,
//   Typography
// } from '@mui/material';
// import { 
//   VideoCall, 
//   Schedule, 
//   AccessTime, 
//   ContentCopy, 
//   Lock,
//   LockOpen,
//   Warning
// } from '@mui/icons-material';
// import { CandidateReservation } from '../types/candidate';

// interface InterviewVideoButtonProps {
//   reservation: Partial<CandidateReservation> & {
//     id: string;
//     interviewId: string;
//     status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
//     date: Date | string;
//     startTime: string;
//     candidateEmail?: string;
//   };
//   variant?: 'text' | 'outlined' | 'contained';
//   size?: 'small' | 'medium' | 'large';
//   showStatus?: boolean;
//   fullWidth?: boolean;
// }

// export const InterviewVideoButton: React.FC<InterviewVideoButtonProps|any> = ({
//   reservation,
//   variant = 'contained',
//   size = 'medium',
//   showStatus = true,
//   fullWidth = false
// }) => {
//   const [timeUntilInterview, setTimeUntilInterview] = useState<string>('');
//   const [canJoin, setCanJoin] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);

//   const getInterviewDateTime = (): Date => {
//     const interviewDate = new Date(reservation.date);
//     if (reservation.startTime) {
//       const [hours, minutes] = reservation.startTime.split(':');
//       interviewDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
//     }
//     return interviewDate;
//   };

//   const calculateTimeUntil = (): string => {
//     const now = new Date();
//     const interviewDate = getInterviewDateTime();
//     const diffMs = interviewDate.getTime() - now.getTime();
    
//     if (diffMs <= 0) return 'Now';
    
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMins / 60);
//     const diffDays = Math.floor(diffHours / 24);
    
//     if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
//     if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
//     return `${diffMins}m`;
//   };

//   const canJoinMeeting = (): boolean => {
//     const now = new Date();
//     const interviewDate = getInterviewDateTime();
    
//     // Permitir unirse 15 minutos antes y hasta 2 horas después
//     const fifteenMinutesBefore = new Date(interviewDate.getTime() - 15 * 60000);
//     const twoHoursAfter = new Date(interviewDate.getTime() + 120 * 60000);
    
//     return now >= fifteenMinutesBefore && now <= twoHoursAfter;
//   };

//   const isTooEarly = (): boolean => {
//     const now = new Date();
//     const interviewDate = getInterviewDateTime();
//     const fifteenMinutesBefore = new Date(interviewDate.getTime() - 15 * 60000);
    
//     return now < fifteenMinutesBefore;
//   };

//   const isCompleted = (): boolean => {
//     const now = new Date();
//     const interviewDate = getInterviewDateTime();
//     const twoHoursAfter = new Date(interviewDate.getTime() + 120 * 60000);
    
//     return now > twoHoursAfter || reservation.status === 'completed';
//   };

//   const isCancelled = (): boolean => {
//     return reservation.status === 'cancelled';
//   };

//   const isUpcoming = (): boolean => {
//     return !isCancelled() && !isCompleted() && !canJoin && !isTooEarly();
//   };

//   const generateMeetLink = (): string => {
//     // Si ya existe un meeting link, usarlo
//     if (reservation.meetingLink) {
//       return reservation.meetingLink;
//     }
    
//     // Generar ID único y consistente basado en la reserva
//     const baseString = `${reservation.id}-${reservation.interviewId}-${reservation.candidateEmail || 'candidate'}`;
//     const meetingId = btoa(baseString)
//       .replace(/[^a-zA-Z0-9]/g, '')
//       .toLowerCase()
//       .substring(0, 12);
    
//     return `https://meet.google.com/${meetingId}`;
//   };

//   const generateZoomLink = (): string => {
//     // Generar link de Zoom alternativo
//     const meetingId = btoa(`${reservation.id}-${reservation.interviewId}`)
//       .replace(/[^a-zA-Z0-9]/g, '')
//       .toLowerCase()
//       .substring(0, 9);
    
//     return `https://zoom.us/j/${meetingId}`;
//   };

//   const handleJoinMeeting = async () => {
//     if (!canJoin) return;
    
//     setIsLoading(true);
//     try {
//       const meetLink = generateMeetLink();
//       console.log('Joining meeting:', meetLink);
      
//       // Simular verificación de disponibilidad
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       window.open(meetLink, '_blank', 'noopener,noreferrer');
//     } catch (error) {
//       console.error('Error joining meeting:', error);
//       // Fallback a Zoom si Google Meet falla
//       const zoomLink = generateZoomLink();
//       window.open(zoomLink, '_blank', 'noopener,noreferrer');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCopyLink = async (event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     try {
//       const meetingLink = generateMeetLink();
//       await navigator.clipboard.writeText(meetingLink);
//       setCopySuccess(true);
      
//       setTimeout(() => {
//         setCopySuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Error copying link:', error);
//     }
//   };

//   const getButtonText = () => {
//     if (isCancelled()) return 'Meeting Cancelled';
//     if (isCompleted()) return 'Meeting Completed';
//     if (isTooEarly()) return 'Join Meeting';
//     if (canJoin) return 'Join Meeting Now';
//     return 'Join Meeting';
//   };

//   const getTooltipText = () => {
//     if (isCancelled()) return 'This interview has been cancelled';
//     if (isCompleted()) return 'This interview has been completed';
//     if (isTooEarly()) return `Meeting will be available 15 minutes before the interview (in ${timeUntilInterview})`;
//     if (canJoin) return 'Click to join the video conference';
//     return 'Meeting time has passed';
//   };

//   const getStatusColor = () => {
//     if (isCancelled()) return 'error';
//     if (isCompleted()) return 'info';
//     if (canJoin) return 'success';
//     if (isTooEarly()) return 'warning';
//     return 'default';
//   };

//   const getStatusText = () => {
//     if (isCancelled()) return 'Cancelled';
//     if (isCompleted()) return 'Completed';
//     if (canJoin) return 'Join Now';
//     if (isTooEarly()) return `Starts in ${timeUntilInterview}`;
//     return 'Upcoming';
//   };

//   const isButtonDisabled = (): boolean => {
//     return isCancelled() || isCompleted() || isLoading || isTooEarly();
//   };

//   const getButtonIcon = () => {
//     if (isLoading) return <CircularProgress size={16} />;
//     if (isTooEarly()) return <Lock />;
//     if (canJoin) return <LockOpen />;
//     return <VideoCall />;
//   };

//   useEffect(() => {
//     const updateTimer = () => {
//       setTimeUntilInterview(calculateTimeUntil());
//       setCanJoin(canJoinMeeting());
//     };

//     updateTimer();
//     const interval = setInterval(updateTimer, 30000); // Actualizar cada 30 segundos

//     return () => clearInterval(interval);
//   }, [reservation]);

//   // No mostrar para entrevistas canceladas o completadas si showStatus es false
//   if ((isCancelled() || isCompleted()) && !showStatus) {
//     return null;
//   }

//   const interviewDate = getInterviewDateTime();
//   const isToday = new Date().toDateString() === interviewDate.toDateString();

//   return (
//     <Box sx={{ 
//       display: 'flex', 
//       alignItems: 'center', 
//       gap: 1,
//       flexWrap: 'wrap'
//     }}>
//       {/* Status Chip */}
//       {showStatus && (
//         <Tooltip title={getTooltipText()}>
//           <Chip
//             icon={canJoin ? <AccessTime /> : <Schedule />}
//             label={getStatusText()}
//             color={getStatusColor() as any}
//             variant={canJoin ? 'filled' : 'outlined'}
//             size="small"
//             sx={{
//               fontWeight: 600,
//               minWidth: '100px'
//             }}
//           />
//         </Tooltip>
//       )}

//       {/* Join Meeting Button */}
//       <Tooltip title={getTooltipText()}>
//         <span>
//           <Button
//             variant={canJoin ? 'contained' : 'outlined'}
//             color={canJoin ? 'success' : 'primary'}
//             startIcon={getButtonIcon()}
//             size={size}
//             onClick={handleJoinMeeting}
//             disabled={isButtonDisabled()}
//             sx={{
//               minWidth: fullWidth ? '100%' : '160px',
//               backgroundColor: canJoin ? '#1a73e8' : 'transparent',
//               '&:hover': {
//                 backgroundColor: canJoin ? '#1669d6' : 'action.hover',
//               },
//               '&.Mui-disabled': {
//                 backgroundColor: 'action.disabledBackground',
//               }
//             }}
//             fullWidth={fullWidth}
//           >
//             {isLoading ? 'Connecting...' : getButtonText()}
//           </Button>
//         </span>
//       </Tooltip>

//       {/* Copy Link Button - Solo mostrar cuando se puede unir o está activo */}
//       {(canJoin || isUpcoming()) && !isCancelled() && !isCompleted() && (
//         <Tooltip title={copySuccess ? "Link copied!" : "Copy meeting link to clipboard"}>
//           <Button
//             size={size}
//             onClick={handleCopyLink}
//             disabled={isLoading}
//             variant="outlined"
//             color={copySuccess ? "success" : "primary"}
//             sx={{ 
//               minWidth: 'auto', 
//               px: 2,
//               borderColor: copySuccess ? 'success.main' : undefined
//             }}
//           >
//             <ContentCopy fontSize="small" />
//           </Button>
//         </Tooltip>
//       )}

//       {/* Alert para reuniones que aún no están disponibles */}
//       {isTooEarly() && (
//         <Alert 
//           severity="warning" 
//           icon={<Warning />}
//           sx={{ 
//             mt: 1, 
//             width: '100%',
//             '& .MuiAlert-message': {
//               fontSize: '0.875rem'
//             }
//           }}
//         >
//           The meeting room will open 15 minutes before your scheduled interview time.
//           {timeUntilInterview && ` Available in ${timeUntilInterview}`}
//         </Alert>
//       )}

//       {/* Información adicional de la reunión */}
//       {(canJoin || isUpcoming()) && (
//         <Box sx={{ 
//           width: '100%', 
//           mt: 1,
//           p: 1,
//           backgroundColor: 'background.default',
//           borderRadius: 1,
//           border: '1px solid',
//           borderColor: 'divider'
//         }}>
//           <Typography variant="caption" color="text.secondary" display="block">
//             📅 {interviewDate.toLocaleDateString('en-US', { 
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric'
//             })}
//           </Typography>
//           <Typography variant="caption" color="text.secondary" display="block">
//             🕒 {interviewDate.toLocaleTimeString('en-US', {
//               hour: '2-digit',
//               minute: '2-digit'
//             })}
//           </Typography>
//           {reservation.meetingPlatform && (
//             <Typography variant="caption" color="text.secondary" display="block">
//               🎥 Platform: {reservation.meetingPlatform}
//             </Typography>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };



// components/InterviewVideoButton.tsx
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Chip, 
  Box, 
  Tooltip, 
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { 
  VideoCall, 
  Schedule, 
  AccessTime, 
  ContentCopy, 
  Lock,
  LockOpen,
  Warning
} from '@mui/icons-material';
import { CandidateReservation } from '../types/candidate';

interface InterviewVideoButtonProps {
  reservation: Partial<CandidateReservation> & {
    id: string;
    interviewId: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    date: Date | string;
    startTime: string;
    candidateEmail?: string;
  };
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
  fullWidth?: boolean;
}

export const InterviewVideoButton: React.FC<InterviewVideoButtonProps|any> = ({
  reservation,
  variant = 'contained',
  size = 'medium',
  showStatus = true,
  fullWidth = false
}) => {
  const [timeUntilInterview, setTimeUntilInterview] = useState<string>('');
  const [canJoin, setCanJoin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const getInterviewDateTime = (): Date => {
    const interviewDate = new Date(reservation.date);
    if (reservation.startTime) {
      const [hours, minutes] = reservation.startTime.split(':');
      interviewDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }
    return interviewDate;
  };

  const calculateTimeUntil = (): string => {
    const now = new Date();
    const interviewDate = getInterviewDateTime();
    const diffMs = interviewDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Now';
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  const canJoinMeeting = (): boolean => {
    const now = new Date();
    const interviewDate = getInterviewDateTime();
    
    // Permitir unirse 15 minutos antes y hasta 2 horas después
    const fifteenMinutesBefore = new Date(interviewDate.getTime() - 15 * 60000);
    const twoHoursAfter = new Date(interviewDate.getTime() + 120 * 60000);
    
    return now >= fifteenMinutesBefore && now <= twoHoursAfter;
  };

  const isTooEarly = (): boolean => {
    const now = new Date();
    const interviewDate = getInterviewDateTime();
    const fifteenMinutesBefore = new Date(interviewDate.getTime() - 15 * 60000);
    
    return now < fifteenMinutesBefore;
  };

  const isCompleted = (): boolean => {
    const now = new Date();
    const interviewDate = getInterviewDateTime();
    const twoHoursAfter = new Date(interviewDate.getTime() + 120 * 60000);
    
    return now > twoHoursAfter || reservation.status === 'completed';
  };

  const isCancelled = (): boolean => {
    return reservation.status === 'cancelled';
  };

  const isUpcoming = (): boolean => {
    return !isCancelled() && !isCompleted() && !canJoin && !isTooEarly();
  };

  const generateMeetLink = (): string => {
    // Si ya existe un meeting link, usarlo
    if (reservation.meetingLink) {
      return reservation.meetingLink;
    }
    
    // Generar ID único y consistente basado en la reserva
    const baseString = `${reservation.id}-${reservation.interviewId}-${reservation.candidateEmail || 'candidate'}`;
    const meetingId = btoa(baseString)
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .substring(0, 12);
    
    return `https://meet.google.com/${meetingId}`;
  };

  const generateZoomLink = (): string => {
    // Generar link de Zoom alternativo
    const meetingId = btoa(`${reservation.id}-${reservation.interviewId}`)
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()
      .substring(0, 9);
    
    return `https://zoom.us/j/${meetingId}`;
  };

  const handleJoinMeeting = async () => {
    if (!canJoin && isTooEarly()) {
      // Mostrar mensaje informativo si es demasiado temprano
      alert(`The meeting room will open 15 minutes before your scheduled time. Please come back in ${timeUntilInterview}.`);
      return;
    }
    
    if (isCancelled()) {
      alert('This interview has been cancelled.');
      return;
    }
    
    if (isCompleted()) {
      alert('This interview has already been completed.');
      return;
    }
    
    setIsLoading(true);
    try {
      const meetLink = generateMeetLink();
      console.log('Joining meeting:', meetLink);
      
      // Simular verificación de disponibilidad
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(meetLink, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error joining meeting:', error);
      // Fallback a Zoom si Google Meet falla
      const zoomLink = generateZoomLink();
      window.open(zoomLink, '_blank', 'noopener,noreferrer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async (event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      const meetingLink = generateMeetLink();
      await navigator.clipboard.writeText(meetingLink);
      setCopySuccess(true);
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const getButtonText = () => {
    if (isCancelled()) return 'Meeting Cancelled';
    if (isCompleted()) return 'Meeting Completed';
    if (isTooEarly()) return 'Join Meeting';
    if (canJoin) return 'Join Meeting Now';
    return 'Join Meeting';
  };

  const getTooltipText = () => {
    if (isCancelled()) return 'This interview has been cancelled';
    if (isCompleted()) return 'This interview has been completed';
    if (isTooEarly()) return `Meeting will be available 15 minutes before the interview (in ${timeUntilInterview})`;
    if (canJoin) return 'Click to join the video conference';
    return 'Click to view meeting details';
  };

  const getStatusColor = () => {
    if (isCancelled()) return 'error';
    if (isCompleted()) return 'info';
    if (canJoin) return 'success';
    if (isTooEarly()) return 'warning';
    return 'primary';
  };

  const getStatusText = () => {
    if (isCancelled()) return 'Cancelled';
    if (isCompleted()) return 'Completed';
    if (canJoin) return 'Join Now';
    if (isTooEarly()) return `Starts in ${timeUntilInterview}`;
    return 'Upcoming';
  };

  const isButtonDisabled = (): boolean => {
    // Solo deshabilitar cuando está cargando
    return isLoading;
  };

  const getButtonIcon = () => {
    if (isLoading) return <CircularProgress size={16} />;
    if (isTooEarly()) return <Lock />;
    if (canJoin) return <LockOpen />;
    return <VideoCall />;
  };

  const getButtonVariant = () => {
    if (isCancelled() || isCompleted()) return 'outlined';
    if (canJoin) return 'contained';
    return variant;
  };

  const getButtonColor = () => {
    if (isCancelled()) return 'error';
    if (isCompleted()) return 'info';
    if (canJoin) return 'success';
    if (isTooEarly()) return 'warning';
    return 'primary';
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeUntilInterview(calculateTimeUntil());
      setCanJoin(canJoinMeeting());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(interval);
  }, [reservation]);

  const interviewDate = getInterviewDateTime();
  const isToday = new Date().toDateString() === interviewDate.toDateString();

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      flexWrap: 'wrap'
    }}>
      {/* Status Chip - Siempre visible cuando showStatus es true */}
      {showStatus && (
        <Tooltip title={getTooltipText()}>
          <Chip
            icon={canJoin ? <AccessTime /> : <Schedule />}
            label={getStatusText()}
            color={getStatusColor() as any}
            variant={canJoin ? 'filled' : 'outlined'}
            size="small"
            sx={{
              fontWeight: 600,
              minWidth: '100px'
            }}
          />
        </Tooltip>
      )}

      {/* Join Meeting Button - SIEMPRE VISIBLE */}
      <Tooltip title={getTooltipText()}>
        <span>
          <Button
            variant={getButtonVariant()}
            color={getButtonColor()}
            startIcon={getButtonIcon()}
            size={size}
            onClick={handleJoinMeeting}
            disabled={isButtonDisabled()}
            sx={{
              minWidth: fullWidth ? '100%' : '160px',
              backgroundColor: canJoin ? '#1a73e8' : undefined,
              '&:hover': {
                backgroundColor: canJoin ? '#1669d6' : undefined,
              },
              '&.Mui-disabled': {
                backgroundColor: 'action.disabledBackground',
              }
            }}
            fullWidth={fullWidth}
          >
            {isLoading ? 'Connecting...' : getButtonText()}
          </Button>
        </span>
      </Tooltip>

      {/* Copy Link Button - SIEMPRE VISIBLE (excepto cuando está cargando) */}
      {!isCancelled() && !isCompleted() && (
        <Tooltip title={copySuccess ? "Link copied!" : "Copy meeting link to clipboard"}>
          <Button
            size={size}
            onClick={handleCopyLink}
            disabled={isLoading}
            variant="outlined"
            color={copySuccess ? "success" : "primary"}
            sx={{ 
              minWidth: 'auto', 
              px: 2,
              borderColor: copySuccess ? 'success.main' : undefined
            }}
          >
            <ContentCopy fontSize="small" />
          </Button>
        </Tooltip>
      )}

      {/* Alert informativo para diferentes estados */}
      {isTooEarly() && (
        <Alert 
          severity="info" 
          icon={<Schedule />}
          sx={{ 
            mt: 1, 
            width: '100%',
            '& .MuiAlert-message': {
              fontSize: '0.875rem'
            }
          }}
        >
          The meeting room will open 15 minutes before your scheduled interview time.
          {timeUntilInterview && ` Available in ${timeUntilInterview}`}
        </Alert>
      )}

      {isCancelled() && (
        <Alert 
          severity="error"
          sx={{ 
            mt: 1, 
            width: '100%'
          }}
        >
          This interview has been cancelled.
        </Alert>
      )}

      {isCompleted() && (
        <Alert 
          severity="info"
          sx={{ 
            mt: 1, 
            width: '100%'
          }}
        >
          This interview has been completed.
        </Alert>
      )}

      {/* Información adicional de la reunión - SIEMPRE VISIBLE */}
      <Box sx={{ 
        width: '100%', 
        mt: 1,
        p: 1,
        backgroundColor: 'background.default',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography variant="caption" color="text.secondary" display="block">
          📅 {interviewDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          🕒 {interviewDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Typography>
        {reservation.meetingPlatform && (
          <Typography variant="caption" color="text.secondary" display="block">
            🎥 Platform: {reservation.meetingPlatform}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" display="block">
          🔗 Meeting ID: {reservation.id.slice(-8)}
        </Typography>
      </Box>
    </Box>
  );
};