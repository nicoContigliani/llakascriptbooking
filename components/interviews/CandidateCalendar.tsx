// components/candidate/CandidateCalendar.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  VideoCall,
  Person,
  Cancel,
  Edit,
} from '@mui/icons-material';
import { CandidateReservation, AvailableSlot } from '../../types/candidate';
import { InterviewVideoButton } from '../InterviewVideoButton';

interface CandidateCalendarProps {
  reservations: CandidateReservation[];
  availableSlots: AvailableSlot[];
  onReschedule: (reservation: CandidateReservation) => void;
  onCancel: (reservation: CandidateReservation) => void;
  onChangeDate: (reservation: CandidateReservation) => void;
}

const CandidateCalendar: React.FC<CandidateCalendarProps> = ({ 
  reservations, 
  availableSlots,
  onReschedule,
  onCancel,
  onChangeDate,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    
    // Días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Días del próximo mes
    const totalCells = isMobile ? 35 : 42; // 5 semanas en mobile, 6 en desktop
    while (days.length < totalCells) {
      days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
    }
    
    return days;
  }, [currentDate, isMobile]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    
    const reservationsForDate = reservations.filter(reservation => {
      const reservationDate = new Date(reservation.date);
      return reservationDate.toISOString().split('T')[0] === dateString;
    });

    const availableForDate = availableSlots.filter(slot => {
      const slotDate = new Date(slot.date);
      return slotDate.toISOString().split('T')[0] === dateString;
    });

    return { reservations: reservationsForDate, available: availableForDate };
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getDayAbbreviation = (date: Date) => {
    return isMobile 
      ? date.toLocaleDateString('en-US', { weekday: 'narrow' })
      : date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatTime = (time: string) => {
    if (!time) return 'TBD';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Función para renderizar el tooltip de reserva
  const renderReservationTooltip = (reservation: CandidateReservation) => (
    <Box sx={{ 
      p: 2, 
      minWidth: isMobile ? 280 : 320,
      maxWidth: isMobile ? 300 : 350,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
      border: 1,
      borderColor: 'divider'
    }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
        {reservation.interviewTitle}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            📅 Date:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {formatDateForDisplay(new Date(reservation.date))}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            🕒 Time:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            👤 With:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {reservation.recruiterName}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            Status:
          </Typography>
          <Chip 
            label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            size="small"
            color={getStatusColor(reservation.status) as any}
            variant="outlined"
          />
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <InterviewVideoButton 
          reservation={reservation} 
          size={isMobile ? "small" : "medium"}
          variant="contained"
          showStatus={false}
        />
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <Button 
            size={isMobile ? "small" : "medium"}
            variant="outlined"
            startIcon={<Edit />}
            onClick={(e) => {
              e.stopPropagation();
              onChangeDate(reservation);
            }}
            sx={{ 
              flex: 1,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
            fullWidth={isMobile}
          >
            Reschedule
          </Button>
          <Button 
            size={isMobile ? "small" : "medium"}
            color="error"
            variant="outlined"
            startIcon={<Cancel />}
            onClick={(e) => {
              e.stopPropagation();
              onCancel(reservation);
            }}
            sx={{ 
              flex: 1,
              fontSize: isMobile ? '0.75rem' : '0.875rem',
            }}
            fullWidth={isMobile}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );

  // Función para renderizar el tooltip de slot disponible
  const renderAvailableSlotTooltip = (slot: AvailableSlot) => (
    <Box sx={{ 
      p: 2,
      minWidth: isMobile ? 250 : 300,
      backgroundColor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3,
      border: 1,
      borderColor: 'divider'
    }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
        🟢 Available Slot
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            Type:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {slot.interviewTitle}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            🕒 Time:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
            👤 With:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {slot.recruiterName}
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary"
        size={isMobile ? "small" : "medium"}
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          // Aquí puedes agregar la lógica para reservar este slot
        }}
      >
        Book This Slot
      </Button>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '600px',
      backgroundColor: theme.palette.background.default,
      p: isMobile ? 1 : 2,
      borderRadius: 3
    }}>
      {/* Calendar Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: 3,
        p: isMobile ? 2 : 3,
        backgroundColor: 'background.paper',
        borderRadius: 3,
        boxShadow: 1,
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          flexDirection: isMobile ? 'column' : 'row',
          width: isMobile ? '100%' : 'auto'
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, color: 'primary.main' }}>
            {formatMonthYear(currentDate)}
          </Typography>
          <Button
            startIcon={<Today />}
            onClick={goToToday}
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            fullWidth={isMobile}
          >
            Today
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'space-between' : 'flex-end'
        }}>
          <IconButton 
            onClick={() => navigateMonth('prev')}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              backgroundColor: 'background.default',
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <IconButton 
            onClick={() => navigateMonth('next')}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              backgroundColor: 'background.default',
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <ChevronRight fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Days Header */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 0.5,
        mb: 2
      }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Box 
            key={day} 
            sx={{ 
              p: isMobile ? 1 : 2, 
              textAlign: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 1,
              border: 1,
              borderColor: 'divider'
            }}
          >
            <Typography 
              variant={isMobile ? "caption" : "subtitle2"} 
              sx={{ 
                fontWeight: 600, 
                color: 'text.secondary',
                fontSize: isMobile ? '0.7rem' : '0.875rem'
              }}
            >
              {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 0.5
      }}>
        {daysInMonth.map((date, index) => {
          const { reservations: dayReservations, available: dayAvailable } = getEventsForDate(date);
          const isTodayDate = isToday(date);
          const isCurrentMonthDate = isCurrentMonth(date);

          // Filtrar reservas activas (confirmed y pending)
          const activeReservations = dayReservations.filter(
            reservation => ['confirmed', 'pending'].includes(reservation.status)
          );

          const maxEventsToShow = isMobile ? 2 : 3;
          const maxSlotsToShow = isMobile ? 1 : 2;

          return (
            <Card
              key={index}
              sx={{
                minHeight: isMobile ? 120 : 160,
                borderRadius: 2,
                border: isTodayDate ? 2 : 1,
                borderColor: isTodayDate ? 'primary.main' : 'divider',
                backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
                opacity: isCurrentMonthDate ? 1 : 0.4,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                },
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <CardContent sx={{ 
                p: isMobile ? 0.5 : 1.5, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                '&:last-child': { pb: isMobile ? 0.5 : 1.5 }
              }}>
                {/* Date Header */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Typography 
                    variant={isMobile ? "caption" : "body2"} 
                    sx={{ 
                      fontWeight: isTodayDate ? 700 : 600,
                      color: isTodayDate ? 'primary.main' : 'text.primary',
                      fontSize: isMobile ? '0.7rem' : '0.875rem'
                    }}
                  >
                    {date.getDate()}
                  </Typography>
                  {!isMobile && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {getDayAbbreviation(date)}
                    </Typography>
                  )}
                </Box>

                {/* Events Container */}
                <Box sx={{ 
                  flex: 1,
                  maxHeight: isMobile ? 80 : 120,
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: 3,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.divider,
                    borderRadius: 2,
                  }
                }}>
                  {/* Reservations Activas */}
                  {activeReservations.slice(0, maxEventsToShow).map((reservation) => (
                    <Tooltip 
                      key={reservation.id} 
                      title={renderReservationTooltip(reservation)}
                      arrow
                      placement={isMobile ? "top" : "top"}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            maxWidth: 'none',
                          }
                        }
                      }}
                    >
                      <Chip
                        icon={<VideoCall sx={{ fontSize: isMobile ? 10 : 12 }} />}
                        label={isMobile ? '' : `${formatTime(reservation.startTime)}`}
                        size="small"
                        color={getStatusColor(reservation.status) as any}
                        sx={{
                          mb: 0.5,
                          width: '100%',
                          justifyContent: 'flex-start',
                          fontSize: isMobile ? '0.55rem' : '0.6rem',
                          height: isMobile ? 18 : 20,
                          '& .MuiChip-label': {
                            paddingRight: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: isMobile ? 'none' : 'block'
                          },
                          '& .MuiChip-icon': {
                            marginLeft: 0.5,
                            marginRight: isMobile ? 0 : 0.5,
                            fontSize: isMobile ? 10 : 12
                          }
                        }}
                      />
                    </Tooltip>
                  ))}

                  {/* Available Slots */}
                  {dayAvailable.slice(0, maxSlotsToShow).map((slot) => (
                    <Tooltip 
                      key={slot.id} 
                      title={renderAvailableSlotTooltip(slot)}
                      arrow
                      placement={isMobile ? "top" : "top"}
                      componentsProps={{
                        tooltip: {
                          sx: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            maxWidth: 'none',
                          }
                        }
                      }}
                    >
                      <Chip
                        icon={<Person sx={{ fontSize: isMobile ? 10 : 12 }} />}
                        label={isMobile ? '' : `${formatTime(slot.startTime)}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                          mb: 0.5,
                          width: '100%',
                          justifyContent: 'flex-start',
                          fontSize: isMobile ? '0.55rem' : '0.6rem',
                          height: isMobile ? 18 : 20,
                          '& .MuiChip-label': {
                            paddingRight: 0.5,
                            display: isMobile ? 'none' : 'block'
                          },
                          '& .MuiChip-icon': {
                            marginLeft: 0.5,
                            marginRight: isMobile ? 0 : 0.5,
                            fontSize: isMobile ? 10 : 12
                          }
                        }}
                      />
                    </Tooltip>
                  ))}

                  {/* Show more indicator */}
                  {(activeReservations.length > maxEventsToShow || dayAvailable.length > maxSlotsToShow) && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        textAlign: 'center',
                        fontSize: isMobile ? '0.5rem' : '0.55rem',
                        fontStyle: 'italic'
                      }}
                    >
                      +{Math.max(0, activeReservations.length - maxEventsToShow) + Math.max(0, dayAvailable.length - maxSlotsToShow)} more
                    </Typography>
                  )}

                  {/* No events message */}
                  {activeReservations.length === 0 && dayAvailable.length === 0 && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        textAlign: 'center',
                        fontSize: isMobile ? '0.5rem' : '0.6rem',
                        fontStyle: 'italic',
                        mt: 0.5
                      }}
                    >
                      No events
                    </Typography>
                  )}
                </Box>

                {/* Day Stats */}
                {(activeReservations.length > 0 || dayAvailable.length > 0) && !isMobile && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    mt: 'auto',
                    pt: 0.5,
                    borderTop: 1,
                    borderColor: 'divider'
                  }}>
                    {activeReservations.length > 0 && (
                      <>
                        <VideoCall sx={{ fontSize: 10, color: 'success.main' }} />
                        <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
                          {activeReservations.length}
                        </Typography>
                      </>
                    )}
                    {dayAvailable.length > 0 && (
                      <>
                        <Person sx={{ fontSize: 10, color: 'primary.main' }} />
                        <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
                          {dayAvailable.length}
                        </Typography>
                      </>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Legend - Solo mostrar en desktop */}
      {!isMobile && (
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          mt: 3, 
          p: 2, 
          backgroundColor: 'background.paper', 
          borderRadius: 2,
          flexWrap: 'wrap',
          border: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: 'success.main', borderRadius: '50%' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Confirmed Interview</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: 'warning.main', borderRadius: '50%' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Pending Interview</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, backgroundColor: 'primary.main', borderRadius: '50%' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Available Slot</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VideoCall sx={{ fontSize: 12, color: 'success.main' }} />
            <Typography variant="caption">Join Meeting Available</Typography>
          </Box>
        </Box>
      )}

      {/* Quick Stats */}
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        mt: 2,
        p: 2,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Upcoming Interviews:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
            {reservations.filter(r => ['confirmed', 'pending'].includes(r.status)).length}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Available Slots:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {availableSlots.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateCalendar;