// // // // components/candidate/CandidateCalendar.tsx
// // // import React, { useState, useMemo } from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Card,
// // //   CardContent,
// // //   Chip,
// // //   IconButton,
// // //   Tooltip,
// // //   alpha,
// // //   Button,
// // //   useTheme,
// // //   useMediaQuery,
// // // } from '@mui/material';
// // // import {
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Today,
// // //   VideoCall,
// // //   Person,
// // //   Cancel,
// // //   Edit,
// // // } from '@mui/icons-material';
// // // import { CandidateReservation, AvailableSlot } from '../../types/candidate';
// // // import { InterviewVideoButton } from '../InterviewVideoButton';

// // // interface CandidateCalendarProps {
// // //   reservations: CandidateReservation[];
// // //   availableSlots: AvailableSlot[];
// // //   onReschedule: (reservation: CandidateReservation) => void;
// // //   onCancel: (reservation: CandidateReservation) => void;
// // //   onChangeDate: (reservation: CandidateReservation) => void;
// // // }

// // // const CandidateCalendar: React.FC<CandidateCalendarProps> = ({ 
// // //   reservations, 
// // //   availableSlots,
// // //   onReschedule,
// // //   onCancel,
// // //   onChangeDate,
// // // }) => {
// // //   const theme = useTheme();
// // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// // //   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
// // //   const [currentDate, setCurrentDate] = useState(new Date());

// // //   const daysInMonth = useMemo(() => {
// // //     const year = currentDate.getFullYear();
// // //     const month = currentDate.getMonth();
// // //     const firstDay = new Date(year, month, 1);
// // //     const lastDay = new Date(year, month + 1, 0);
// // //     const days = [];
    
// // //     // Días del mes anterior
// // //     const prevMonthLastDay = new Date(year, month, 0).getDate();
// // //     const firstDayOfWeek = firstDay.getDay();
// // //     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
// // //       days.push(new Date(year, month - 1, prevMonthLastDay - i));
// // //     }
    
// // //     // Días del mes actual
// // //     for (let i = 1; i <= lastDay.getDate(); i++) {
// // //       days.push(new Date(year, month, i));
// // //     }
    
// // //     // Días del próximo mes
// // //     const totalCells = isMobile ? 35 : 42; // 5 semanas en mobile, 6 en desktop
// // //     while (days.length < totalCells) {
// // //       days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
// // //     }
    
// // //     return days;
// // //   }, [currentDate, isMobile]);

// // //   const navigateMonth = (direction: 'prev' | 'next') => {
// // //     setCurrentDate(prev => {
// // //       const newDate = new Date(prev);
// // //       if (direction === 'prev') {
// // //         newDate.setMonth(prev.getMonth() - 1);
// // //       } else {
// // //         newDate.setMonth(prev.getMonth() + 1);
// // //       }
// // //       return newDate;
// // //     });
// // //   };

// // //   const goToToday = () => {
// // //     setCurrentDate(new Date());
// // //   };

// // //   const getEventsForDate = (date: Date) => {
// // //     const dateString = date.toISOString().split('T')[0];
    
// // //     const reservationsForDate = reservations.filter(reservation => {
// // //       const reservationDate = new Date(reservation.date);
// // //       return reservationDate.toISOString().split('T')[0] === dateString;
// // //     });

// // //     const availableForDate = availableSlots.filter(slot => {
// // //       const slotDate = new Date(slot.date);
// // //       return slotDate.toISOString().split('T')[0] === dateString;
// // //     });

// // //     return { reservations: reservationsForDate, available: availableForDate };
// // //   };

// // //   const isToday = (date: Date) => {
// // //     const today = new Date();
// // //     return date.toDateString() === today.toDateString();
// // //   };

// // //   const isCurrentMonth = (date: Date) => {
// // //     return date.getMonth() === currentDate.getMonth();
// // //   };

// // //   const formatMonthYear = (date: Date) => {
// // //     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
// // //   };

// // //   const getDayAbbreviation = (date: Date) => {
// // //     return isMobile 
// // //       ? date.toLocaleDateString('en-US', { weekday: 'narrow' })
// // //       : date.toLocaleDateString('en-US', { weekday: 'short' });
// // //   };

// // //   const getStatusColor = (status: string) => {
// // //     switch (status) {
// // //       case 'confirmed': return 'success';
// // //       case 'pending': return 'warning';
// // //       case 'completed': return 'info';
// // //       case 'cancelled': return 'error';
// // //       default: return 'default';
// // //     }
// // //   };

// // //   const formatTime = (time: string) => {
// // //     if (!time) return 'TBD';
// // //     const [hours, minutes] = time.split(':');
// // //     const hour = parseInt(hours, 10);
// // //     const ampm = hour >= 12 ? 'PM' : 'AM';
// // //     const formattedHour = hour % 12 || 12;
// // //     return `${formattedHour}:${minutes} ${ampm}`;
// // //   };

// // //   const formatDateForDisplay = (date: Date) => {
// // //     return date.toLocaleDateString('en-US', {
// // //       month: 'short',
// // //       day: 'numeric',
// // //       year: 'numeric'
// // //     });
// // //   };

// // //   // Función para renderizar el tooltip de reserva
// // //   const renderReservationTooltip = (reservation: CandidateReservation) => (
// // //     <Box sx={{ 
// // //       p: 2, 
// // //       minWidth: isMobile ? 280 : 320,
// // //       maxWidth: isMobile ? 300 : 350,
// // //       backgroundColor: 'background.paper',
// // //       borderRadius: 2,
// // //       boxShadow: 3,
// // //       border: 1,
// // //       borderColor: 'divider'
// // //     }}>
// // //       <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
// // //         {reservation.interviewTitle}
// // //       </Typography>
      
// // //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             📅 Date:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
// // //             {formatDateForDisplay(new Date(reservation.date))}
// // //           </Typography>
// // //         </Box>
        
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             🕒 Time:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
// // //             {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
// // //           </Typography>
// // //         </Box>
        
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             👤 With:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
// // //             {reservation.recruiterName}
// // //           </Typography>
// // //         </Box>
        
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             Status:
// // //           </Typography>
// // //           <Chip 
// // //             label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
// // //             size="small"
// // //             color={getStatusColor(reservation.status) as any}
// // //             variant="outlined"
// // //           />
// // //         </Box>
// // //       </Box>
      
// // //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
// // //         <InterviewVideoButton 
// // //           reservation={reservation} 
// // //           size={isMobile ? "small" : "medium"}
// // //           variant="contained"
// // //           showStatus={false}
// // //         />
        
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           gap: 1,
// // //           flexDirection: isMobile ? 'column' : 'row'
// // //         }}>
// // //           <Button 
// // //             size={isMobile ? "small" : "medium"}
// // //             variant="outlined"
// // //             startIcon={<Edit />}
// // //             onClick={(e) => {
// // //               e.stopPropagation();
// // //               onChangeDate(reservation);
// // //             }}
// // //             sx={{ 
// // //               flex: 1,
// // //               fontSize: isMobile ? '0.75rem' : '0.875rem',
// // //             }}
// // //             fullWidth={isMobile}
// // //           >
// // //             Reschedule
// // //           </Button>
// // //           <Button 
// // //             size={isMobile ? "small" : "medium"}
// // //             color="error"
// // //             variant="outlined"
// // //             startIcon={<Cancel />}
// // //             onClick={(e) => {
// // //               e.stopPropagation();
// // //               onCancel(reservation);
// // //             }}
// // //             sx={{ 
// // //               flex: 1,
// // //               fontSize: isMobile ? '0.75rem' : '0.875rem',
// // //             }}
// // //             fullWidth={isMobile}
// // //           >
// // //             Cancel
// // //           </Button>
// // //         </Box>
// // //       </Box>
// // //     </Box>
// // //   );

// // //   // Función para renderizar el tooltip de slot disponible
// // //   const renderAvailableSlotTooltip = (slot: AvailableSlot) => (
// // //     <Box sx={{ 
// // //       p: 2,
// // //       minWidth: isMobile ? 250 : 300,
// // //       backgroundColor: 'background.paper',
// // //       borderRadius: 2,
// // //       boxShadow: 3,
// // //       border: 1,
// // //       borderColor: 'divider'
// // //     }}>
// // //       <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
// // //         🟢 Available Slot
// // //       </Typography>
      
// // //       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             Type:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
// // //             {slot.interviewTitle}
// // //           </Typography>
// // //         </Box>
        
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             🕒 Time:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
// // //             {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
// // //           </Typography>
// // //         </Box>
        
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
// // //             👤 With:
// // //           </Typography>
// // //           <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
// // //             {slot.recruiterName}
// // //           </Typography>
// // //         </Box>
// // //       </Box>
      
// // //       <Button 
// // //         variant="contained" 
// // //         color="primary"
// // //         size={isMobile ? "small" : "medium"}
// // //         fullWidth
// // //         onClick={(e) => {
// // //           e.stopPropagation();
// // //           // Aquí puedes agregar la lógica para reservar este slot
// // //         }}
// // //       >
// // //         Book This Slot
// // //       </Button>
// // //     </Box>
// // //   );

// // //   return (
// // //     <Box sx={{ 
// // //       minHeight: '600px',
// // //       backgroundColor: theme.palette.background.default,
// // //       p: isMobile ? 1 : 2,
// // //       borderRadius: 3
// // //     }}>
// // //       {/* Calendar Header */}
// // //       <Box sx={{ 
// // //         display: 'flex', 
// // //         justifyContent: 'space-between', 
// // //         alignItems: isMobile ? 'flex-start' : 'center',
// // //         mb: 3,
// // //         p: isMobile ? 2 : 3,
// // //         backgroundColor: 'background.paper',
// // //         borderRadius: 3,
// // //         boxShadow: 1,
// // //         flexDirection: isMobile ? 'column' : 'row',
// // //         gap: isMobile ? 2 : 0
// // //       }}>
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           alignItems: 'center', 
// // //           gap: 2,
// // //           flexDirection: isMobile ? 'column' : 'row',
// // //           width: isMobile ? '100%' : 'auto'
// // //         }}>
// // //           <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, color: 'primary.main' }}>
// // //             {formatMonthYear(currentDate)}
// // //           </Typography>
// // //           <Button
// // //             startIcon={<Today />}
// // //             onClick={goToToday}
// // //             variant="outlined"
// // //             size={isMobile ? "small" : "medium"}
// // //             fullWidth={isMobile}
// // //           >
// // //             Today
// // //           </Button>
// // //         </Box>
        
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           gap: 1,
// // //           width: isMobile ? '100%' : 'auto',
// // //           justifyContent: isMobile ? 'space-between' : 'flex-end'
// // //         }}>
// // //           <IconButton 
// // //             onClick={() => navigateMonth('prev')}
// // //             size={isMobile ? "small" : "medium"}
// // //             sx={{ 
// // //               backgroundColor: 'background.default',
// // //               '&:hover': { backgroundColor: 'action.hover' }
// // //             }}
// // //           >
// // //             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
// // //           </IconButton>
// // //           <IconButton 
// // //             onClick={() => navigateMonth('next')}
// // //             size={isMobile ? "small" : "medium"}
// // //             sx={{ 
// // //               backgroundColor: 'background.default',
// // //               '&:hover': { backgroundColor: 'action.hover' }
// // //             }}
// // //           >
// // //             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
// // //           </IconButton>
// // //         </Box>
// // //       </Box>

// // //       {/* Calendar Days Header */}
// // //       <Box sx={{ 
// // //         display: 'grid', 
// // //         gridTemplateColumns: 'repeat(7, 1fr)',
// // //         gap: 0.5,
// // //         mb: 2
// // //       }}>
// // //         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
// // //           <Box 
// // //             key={day} 
// // //             sx={{ 
// // //               p: isMobile ? 1 : 2, 
// // //               textAlign: 'center',
// // //               backgroundColor: 'background.paper',
// // //               borderRadius: 1,
// // //               border: 1,
// // //               borderColor: 'divider'
// // //             }}
// // //           >
// // //             <Typography 
// // //               variant={isMobile ? "caption" : "subtitle2"} 
// // //               sx={{ 
// // //                 fontWeight: 600, 
// // //                 color: 'text.secondary',
// // //                 fontSize: isMobile ? '0.7rem' : '0.875rem'
// // //               }}
// // //             >
// // //               {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
// // //             </Typography>
// // //           </Box>
// // //         ))}
// // //       </Box>

// // //       {/* Calendar Grid */}
// // //       <Box sx={{ 
// // //         display: 'grid', 
// // //         gridTemplateColumns: 'repeat(7, 1fr)',
// // //         gap: 0.5
// // //       }}>
// // //         {daysInMonth.map((date, index) => {
// // //           const { reservations: dayReservations, available: dayAvailable } = getEventsForDate(date);
// // //           const isTodayDate = isToday(date);
// // //           const isCurrentMonthDate = isCurrentMonth(date);

// // //           // Filtrar reservas activas (confirmed y pending)
// // //           const activeReservations = dayReservations.filter(
// // //             reservation => ['confirmed', 'pending'].includes(reservation.status)
// // //           );

// // //           const maxEventsToShow = isMobile ? 2 : 3;
// // //           const maxSlotsToShow = isMobile ? 1 : 2;

// // //           return (
// // //             <Card
// // //               key={index}
// // //               sx={{
// // //                 minHeight: isMobile ? 120 : 160,
// // //                 borderRadius: 2,
// // //                 border: isTodayDate ? 2 : 1,
// // //                 borderColor: isTodayDate ? 'primary.main' : 'divider',
// // //                 backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
// // //                 opacity: isCurrentMonthDate ? 1 : 0.4,
// // //                 transition: 'all 0.2s ease-in-out',
// // //                 '&:hover': {
// // //                   transform: 'translateY(-2px)',
// // //                   boxShadow: 2,
// // //                 },
// // //                 display: 'flex',
// // //                 flexDirection: 'column',
// // //                 position: 'relative'
// // //               }}
// // //             >
// // //               <CardContent sx={{ 
// // //                 p: isMobile ? 0.5 : 1.5, 
// // //                 height: '100%',
// // //                 display: 'flex',
// // //                 flexDirection: 'column',
// // //                 gap: 0.5,
// // //                 '&:last-child': { pb: isMobile ? 0.5 : 1.5 }
// // //               }}>
// // //                 {/* Date Header */}
// // //                 <Box sx={{ 
// // //                   display: 'flex', 
// // //                   justifyContent: 'space-between', 
// // //                   alignItems: 'center',
// // //                   mb: 0.5
// // //                 }}>
// // //                   <Typography 
// // //                     variant={isMobile ? "caption" : "body2"} 
// // //                     sx={{ 
// // //                       fontWeight: isTodayDate ? 700 : 600,
// // //                       color: isTodayDate ? 'primary.main' : 'text.primary',
// // //                       fontSize: isMobile ? '0.7rem' : '0.875rem'
// // //                     }}
// // //                   >
// // //                     {date.getDate()}
// // //                   </Typography>
// // //                   {!isMobile && (
// // //                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
// // //                       {getDayAbbreviation(date)}
// // //                     </Typography>
// // //                   )}
// // //                 </Box>

// // //                 {/* Events Container */}
// // //                 <Box sx={{ 
// // //                   flex: 1,
// // //                   maxHeight: isMobile ? 80 : 120,
// // //                   overflow: 'auto',
// // //                   '&::-webkit-scrollbar': {
// // //                     width: 3,
// // //                   },
// // //                   '&::-webkit-scrollbar-thumb': {
// // //                     backgroundColor: theme.palette.divider,
// // //                     borderRadius: 2,
// // //                   }
// // //                 }}>
// // //                   {/* Reservations Activas */}
// // //                   {activeReservations.slice(0, maxEventsToShow).map((reservation) => (
// // //                     <Tooltip 
// // //                       key={reservation.id} 
// // //                       title={renderReservationTooltip(reservation)}
// // //                       arrow
// // //                       placement={isMobile ? "top" : "top"}
// // //                       componentsProps={{
// // //                         tooltip: {
// // //                           sx: {
// // //                             backgroundColor: 'transparent',
// // //                             boxShadow: 'none',
// // //                             maxWidth: 'none',
// // //                           }
// // //                         }
// // //                       }}
// // //                     >
// // //                       <Chip
// // //                         icon={<VideoCall sx={{ fontSize: isMobile ? 10 : 12 }} />}
// // //                         label={isMobile ? '' : `${formatTime(reservation.startTime)}`}
// // //                         size="small"
// // //                         color={getStatusColor(reservation.status) as any}
// // //                         sx={{
// // //                           mb: 0.5,
// // //                           width: '100%',
// // //                           justifyContent: 'flex-start',
// // //                           fontSize: isMobile ? '0.55rem' : '0.6rem',
// // //                           height: isMobile ? 18 : 20,
// // //                           '& .MuiChip-label': {
// // //                             paddingRight: 0.5,
// // //                             overflow: 'hidden',
// // //                             textOverflow: 'ellipsis',
// // //                             whiteSpace: 'nowrap',
// // //                             display: isMobile ? 'none' : 'block'
// // //                           },
// // //                           '& .MuiChip-icon': {
// // //                             marginLeft: 0.5,
// // //                             marginRight: isMobile ? 0 : 0.5,
// // //                             fontSize: isMobile ? 10 : 12
// // //                           }
// // //                         }}
// // //                       />
// // //                     </Tooltip>
// // //                   ))}

// // //                   {/* Available Slots */}
// // //                   {dayAvailable.slice(0, maxSlotsToShow).map((slot) => (
// // //                     <Tooltip 
// // //                       key={slot.id} 
// // //                       title={renderAvailableSlotTooltip(slot)}
// // //                       arrow
// // //                       placement={isMobile ? "top" : "top"}
// // //                       componentsProps={{
// // //                         tooltip: {
// // //                           sx: {
// // //                             backgroundColor: 'transparent',
// // //                             boxShadow: 'none',
// // //                             maxWidth: 'none',
// // //                           }
// // //                         }
// // //                       }}
// // //                     >
// // //                       <Chip
// // //                         icon={<Person sx={{ fontSize: isMobile ? 10 : 12 }} />}
// // //                         label={isMobile ? '' : `${formatTime(slot.startTime)}`}
// // //                         size="small"
// // //                         color="primary"
// // //                         variant="outlined"
// // //                         sx={{
// // //                           mb: 0.5,
// // //                           width: '100%',
// // //                           justifyContent: 'flex-start',
// // //                           fontSize: isMobile ? '0.55rem' : '0.6rem',
// // //                           height: isMobile ? 18 : 20,
// // //                           '& .MuiChip-label': {
// // //                             paddingRight: 0.5,
// // //                             display: isMobile ? 'none' : 'block'
// // //                           },
// // //                           '& .MuiChip-icon': {
// // //                             marginLeft: 0.5,
// // //                             marginRight: isMobile ? 0 : 0.5,
// // //                             fontSize: isMobile ? 10 : 12
// // //                           }
// // //                         }}
// // //                       />
// // //                     </Tooltip>
// // //                   ))}

// // //                   {/* Show more indicator */}
// // //                   {(activeReservations.length > maxEventsToShow || dayAvailable.length > maxSlotsToShow) && (
// // //                     <Typography 
// // //                       variant="caption" 
// // //                       color="text.secondary" 
// // //                       sx={{ 
// // //                         display: 'block', 
// // //                         textAlign: 'center',
// // //                         fontSize: isMobile ? '0.5rem' : '0.55rem',
// // //                         fontStyle: 'italic'
// // //                       }}
// // //                     >
// // //                       +{Math.max(0, activeReservations.length - maxEventsToShow) + Math.max(0, dayAvailable.length - maxSlotsToShow)} more
// // //                     </Typography>
// // //                   )}

// // //                   {/* No events message */}
// // //                   {activeReservations.length === 0 && dayAvailable.length === 0 && (
// // //                     <Typography 
// // //                       variant="caption" 
// // //                       color="text.secondary" 
// // //                       sx={{ 
// // //                         display: 'block', 
// // //                         textAlign: 'center',
// // //                         fontSize: isMobile ? '0.5rem' : '0.6rem',
// // //                         fontStyle: 'italic',
// // //                         mt: 0.5
// // //                       }}
// // //                     >
// // //                       No events
// // //                     </Typography>
// // //                   )}
// // //                 </Box>

// // //                 {/* Day Stats */}
// // //                 {(activeReservations.length > 0 || dayAvailable.length > 0) && !isMobile && (
// // //                   <Box sx={{ 
// // //                     display: 'flex', 
// // //                     alignItems: 'center', 
// // //                     gap: 0.5,
// // //                     mt: 'auto',
// // //                     pt: 0.5,
// // //                     borderTop: 1,
// // //                     borderColor: 'divider'
// // //                   }}>
// // //                     {activeReservations.length > 0 && (
// // //                       <>
// // //                         <VideoCall sx={{ fontSize: 10, color: 'success.main' }} />
// // //                         <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
// // //                           {activeReservations.length}
// // //                         </Typography>
// // //                       </>
// // //                     )}
// // //                     {dayAvailable.length > 0 && (
// // //                       <>
// // //                         <Person sx={{ fontSize: 10, color: 'primary.main' }} />
// // //                         <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
// // //                           {dayAvailable.length}
// // //                         </Typography>
// // //                       </>
// // //                     )}
// // //                   </Box>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           );
// // //         })}
// // //       </Box>

// // //       {/* Legend - Solo mostrar en desktop */}
// // //       {!isMobile && (
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           gap: 3, 
// // //           mt: 3, 
// // //           p: 2, 
// // //           backgroundColor: 'background.paper', 
// // //           borderRadius: 2,
// // //           flexWrap: 'wrap',
// // //           border: 1,
// // //           borderColor: 'divider'
// // //         }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //             <Box sx={{ width: 8, height: 8, backgroundColor: 'success.main', borderRadius: '50%' }} />
// // //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Confirmed Interview</Typography>
// // //           </Box>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //             <Box sx={{ width: 8, height: 8, backgroundColor: 'warning.main', borderRadius: '50%' }} />
// // //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Pending Interview</Typography>
// // //           </Box>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //             <Box sx={{ width: 8, height: 8, backgroundColor: 'primary.main', borderRadius: '50%' }} />
// // //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Available Slot</Typography>
// // //           </Box>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //             <VideoCall sx={{ fontSize: 12, color: 'success.main' }} />
// // //             <Typography variant="caption">Join Meeting Available</Typography>
// // //           </Box>
// // //         </Box>
// // //       )}

// // //       {/* Quick Stats */}
// // //       <Box sx={{ 
// // //         display: 'flex', 
// // //         gap: 3, 
// // //         mt: 2,
// // //         p: 2,
// // //         flexDirection: isMobile ? 'column' : 'row',
// // //         alignItems: isMobile ? 'flex-start' : 'center'
// // //       }}>
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="caption" color="text.secondary">
// // //             Upcoming Interviews:
// // //           </Typography>
// // //           <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
// // //             {reservations.filter(r => ['confirmed', 'pending'].includes(r.status)).length}
// // //           </Typography>
// // //         </Box>
// // //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// // //           <Typography variant="caption" color="text.secondary">
// // //             Available Slots:
// // //           </Typography>
// // //           <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
// // //             {availableSlots.length}
// // //           </Typography>
// // //         </Box>
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default CandidateCalendar;




// // // components/candidate/CandidateCalendar.tsx
// // import React, { useState, useMemo, useCallback } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Chip,
// //   IconButton,
// //   Tooltip,
// //   alpha,
// //   Button,
// //   useTheme,
// //   useMediaQuery,
// //   Dialog,
// //   DialogContent,
// //   DialogTitle,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   Badge,
// // } from '@mui/material';
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   Today,
// //   VideoCall,
// //   Person,
// //   Cancel,
// //   Edit,
// //   Schedule,
// //   EventAvailable,
// //   Close,
// // } from '@mui/icons-material';
// // import { CandidateReservation, AvailableSlot } from '../../types/candidate';
// // import { InterviewVideoButton } from '../InterviewVideoButton';

// // interface CandidateCalendarProps {
// //   reservations: CandidateReservation[];
// //   availableSlots: AvailableSlot[];
// //   onReschedule: (reservation: CandidateReservation) => void;
// //   onCancel: (reservation: CandidateReservation) => void;
// //   onChangeDate: (reservation: CandidateReservation) => void;
// // }

// // interface DayDetailsModalProps {
// //   open: boolean;
// //   onClose: () => void;
// //   date: Date | null;
// //   reservations: CandidateReservation[];
// //   availableSlots: AvailableSlot[];
// //   onReschedule: (reservation: CandidateReservation) => void;
// //   onCancel: (reservation: CandidateReservation) => void;
// //   onChangeDate: (reservation: CandidateReservation) => void;
// //   isMobile: boolean;
// // }

// // // Componente Modal para mostrar detalles del día en móvil
// // const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
// //   open,
// //   onClose,
// //   date,
// //   reservations,
// //   availableSlots,
// //   onReschedule,
// //   onCancel,
// //   onChangeDate,
// //   isMobile,
// // }) => {
// //   const theme = useTheme();

// //   const formatTime = useCallback((time: string) => {
// //     if (!time) return 'TBD';
// //     const [hours, minutes] = time.split(':');
// //     const hour = parseInt(hours, 10);
// //     const ampm = hour >= 12 ? 'PM' : 'AM';
// //     const formattedHour = hour % 12 || 12;
// //     return `${formattedHour}:${minutes} ${ampm}`;
// //   }, []);

// //   const formatDateForDisplay = useCallback((date: Date) => {
// //     return date.toLocaleDateString('en-US', {
// //       weekday: 'long',
// //       month: 'long',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   }, []);

// //   const getStatusColor = useCallback((status: string) => {
// //     switch (status) {
// //       case 'confirmed': return 'success';
// //       case 'pending': return 'warning';
// //       case 'completed': return 'info';
// //       case 'cancelled': return 'error';
// //       default: return 'default';
// //     }
// //   }, []);

// //   if (!date) return null;

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={onClose}
// //       maxWidth="sm"
// //       fullWidth
// //       fullScreen={isMobile}
// //       scroll="paper"
// //     >
// //       <DialogTitle sx={{ 
// //         pb: 1,
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'space-between'
// //       }}>
// //         <Typography variant="h6" component="div">
// //           {formatDateForDisplay(date)}
// //         </Typography>
// //         <IconButton onClick={onClose} size="small">
// //           <Close />
// //         </IconButton>
// //       </DialogTitle>
      
// //       <DialogContent sx={{ p: 0 }}>
// //         {/* Reservations Section */}
// //         {reservations.length > 0 && (
// //           <Box sx={{ p: 2 }}>
// //             <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <EventAvailable color="primary" />
// //               Scheduled Interviews ({reservations.length})
// //             </Typography>
            
// //             <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
// //               {reservations.map((reservation) => (
// //                 <ListItem key={reservation.id} sx={{ mb: 2 }}>
// //                   <Card sx={{ width: '100%', borderLeft: 3, borderLeftColor: `${getStatusColor(reservation.status)}.main` }}>
// //                     <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
// //                       <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
// //                         {reservation.interviewTitle}
// //                       </Typography>
                      
// //                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                           <Schedule fontSize="small" color="action" />
// //                           <Typography variant="body2">
// //                             {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
// //                           </Typography>
// //                         </Box>
                        
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                           <Person fontSize="small" color="action" />
// //                           <Typography variant="body2" color="primary.main">
// //                             {reservation.recruiterName}
// //                           </Typography>
// //                         </Box>
                        
// //                         <Chip 
// //                           label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
// //                           size="small"
// //                           color={getStatusColor(reservation.status) as any}
// //                           variant="outlined"
// //                         />
// //                       </Box>

// //                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
// //                         <InterviewVideoButton 
// //                           reservation={reservation} 
// //                           size="small"
// //                           variant="contained"
// //                           showStatus={false}
// //                           fullWidth
// //                         />
                        
// //                         <Box sx={{ display: 'flex', gap: 1 }}>
// //                           <Button 
// //                             size="small"
// //                             variant="outlined"
// //                             startIcon={<Edit />}
// //                             onClick={() => {
// //                               onClose();
// //                               onChangeDate(reservation);
// //                             }}
// //                             sx={{ flex: 1 }}
// //                           >
// //                             Reschedule
// //                           </Button>
// //                           <Button 
// //                             size="small"
// //                             color="error"
// //                             variant="outlined"
// //                             startIcon={<Cancel />}
// //                             onClick={() => {
// //                               onClose();
// //                               onCancel(reservation);
// //                             }}
// //                             sx={{ flex: 1 }}
// //                           >
// //                             Cancel
// //                           </Button>
// //                         </Box>
// //                       </Box>
// //                     </CardContent>
// //                   </Card>
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Box>
// //         )}

// //         {reservations.length > 0 && availableSlots.length > 0 && (
// //           <Divider />
// //         )}

// //         {/* Available Slots Section */}
// //         {availableSlots.length > 0 && (
// //           <Box sx={{ p: 2 }}>
// //             <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <Person color="primary" />
// //               Available Slots ({availableSlots.length})
// //             </Typography>
            
// //             <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
// //               {availableSlots.map((slot) => (
// //                 <ListItem key={slot.id} sx={{ mb: 1 }}>
// //                   <Card variant="outlined" sx={{ width: '100%' }}>
// //                     <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
// //                       <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
// //                         {slot.interviewTitle}
// //                       </Typography>
                      
// //                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                           <Schedule fontSize="small" color="action" />
// //                           <Typography variant="body2">
// //                             {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
// //                           </Typography>
// //                         </Box>
                        
// //                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                           <Person fontSize="small" color="action" />
// //                           <Typography variant="body2" color="primary.main">
// //                             {slot.recruiterName}
// //                           </Typography>
// //                         </Box>
// //                       </Box>

// //                       <Button 
// //                         variant="contained" 
// //                         color="primary"
// //                         size="small"
// //                         fullWidth
// //                         onClick={() => {
// //                           onClose();
// //                           // Lógica para reservar este slot
// //                         }}
// //                       >
// //                         Book This Slot
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Box>
// //         )}

// //         {reservations.length === 0 && availableSlots.length === 0 && (
// //           <Box sx={{ p: 4, textAlign: 'center' }}>
// //             <EventAvailable sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
// //             <Typography variant="body1" color="text.secondary">
// //               No events scheduled for this day
// //             </Typography>
// //           </Box>
// //         )}
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // const CandidateCalendar: React.FC<CandidateCalendarProps> = ({ 
// //   reservations, 
// //   availableSlots,
// //   onReschedule,
// //   onCancel,
// //   onChangeDate,
// // }) => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// //   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
// //   const [modalOpen, setModalOpen] = useState(false);

// //   // Memoized calculations for better performance
// //   const daysInMonth = useMemo(() => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const days = [];
    
// //     // Previous month days
// //     const prevMonthLastDay = new Date(year, month, 0).getDate();
// //     const firstDayOfWeek = firstDay.getDay();
// //     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
// //       days.push(new Date(year, month - 1, prevMonthLastDay - i));
// //     }
    
// //     // Current month days
// //     for (let i = 1; i <= lastDay.getDate(); i++) {
// //       days.push(new Date(year, month, i));
// //     }
    
// //     // Next month days
// //     const totalCells = isMobile ? 35 : 42;
// //     while (days.length < totalCells) {
// //       days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
// //     }
    
// //     return days;
// //   }, [currentDate, isMobile]);

// //   // Memoized event getter
// //   const getEventsForDate = useCallback((date: Date) => {
// //     const dateString = date.toISOString().split('T')[0];
    
// //     const reservationsForDate = reservations.filter(reservation => {
// //       const reservationDate = new Date(reservation.date);
// //       return reservationDate.toISOString().split('T')[0] === dateString;
// //     });

// //     const availableForDate = availableSlots.filter(slot => {
// //       const slotDate = new Date(slot.date);
// //       return slotDate.toISOString().split('T')[0] === dateString;
// //     });

// //     return { reservations: reservationsForDate, available: availableForDate };
// //   }, [reservations, availableSlots]);

// //   // Memoized utility functions
// //   const isToday = useCallback((date: Date) => {
// //     const today = new Date();
// //     return date.toDateString() === today.toDateString();
// //   }, []);

// //   const isCurrentMonth = useCallback((date: Date) => {
// //     return date.getMonth() === currentDate.getMonth();
// //   }, [currentDate]);

// //   const formatMonthYear = useCallback((date: Date) => {
// //     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
// //   }, []);

// //   const formatTime = useCallback((time: string) => {
// //     if (!time) return 'TBD';
// //     const [hours, minutes] = time.split(':');
// //     const hour = parseInt(hours, 10);
// //     const ampm = hour >= 12 ? 'PM' : 'AM';
// //     const formattedHour = hour % 12 || 12;
// //     return `${formattedHour}:${minutes} ${ampm}`;
// //   }, []);

// //   const getStatusColor = useCallback((status: string) => {
// //     switch (status) {
// //       case 'confirmed': return 'success';
// //       case 'pending': return 'warning';
// //       case 'completed': return 'info';
// //       case 'cancelled': return 'error';
// //       default: return 'default';
// //     }
// //   }, []);

// //   // Event handlers
// //   const navigateMonth = useCallback((direction: 'prev' | 'next') => {
// //     setCurrentDate(prev => {
// //       const newDate = new Date(prev);
// //       newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
// //       return newDate;
// //     });
// //   }, []);

// //   const goToToday = useCallback(() => {
// //     setCurrentDate(new Date());
// //   }, []);

// //   const handleDayClick = useCallback((date: Date, events: { reservations: CandidateReservation[], available: AvailableSlot[] }) => {
// //     if (events.reservations.length > 0 || events.available.length > 0) {
// //       setSelectedDate(date);
// //       setModalOpen(true);
// //     }
// //   }, []);

// //   const closeModal = useCallback(() => {
// //     setModalOpen(false);
// //     setSelectedDate(null);
// //   }, []);

// //   // Calculate stats for performance
// //   const calendarStats = useMemo(() => {
// //     const upcomingInterviews = reservations.filter(r => ['confirmed', 'pending'].includes(r.status)).length;
// //     const totalAvailableSlots = availableSlots.length;
    
// //     return { upcomingInterviews, totalAvailableSlots };
// //   }, [reservations, availableSlots]);

// //   return (
// //     <Box sx={{ 
// //       minHeight: '600px',
// //       backgroundColor: theme.palette.background.default,
// //       p: isMobile ? 1 : 2,
// //       borderRadius: 3
// //     }}>
// //       {/* Calendar Header */}
// //       <Box sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: isMobile ? 'flex-start' : 'center',
// //         mb: 3,
// //         p: isMobile ? 2 : 3,
// //         backgroundColor: 'background.paper',
// //         borderRadius: 3,
// //         boxShadow: 1,
// //         flexDirection: isMobile ? 'column' : 'row',
// //         gap: isMobile ? 2 : 0
// //       }}>
// //         <Box sx={{ 
// //           display: 'flex', 
// //           alignItems: 'center', 
// //           gap: 2,
// //           flexDirection: isMobile ? 'column' : 'row',
// //           width: isMobile ? '100%' : 'auto'
// //         }}>
// //           <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, color: 'primary.main' }}>
// //             {formatMonthYear(currentDate)}
// //           </Typography>
// //           <Button
// //             startIcon={<Today />}
// //             onClick={goToToday}
// //             variant="outlined"
// //             size={isMobile ? "small" : "medium"}
// //             fullWidth={isMobile}
// //           >
// //             Today
// //           </Button>
// //         </Box>
        
// //         <Box sx={{ 
// //           display: 'flex', 
// //           gap: 1,
// //           width: isMobile ? '100%' : 'auto',
// //           justifyContent: isMobile ? 'space-between' : 'flex-end'
// //         }}>
// //           <IconButton 
// //             onClick={() => navigateMonth('prev')}
// //             size={isMobile ? "small" : "medium"}
// //             sx={{ 
// //               backgroundColor: 'background.default',
// //               '&:hover': { backgroundColor: 'action.hover' }
// //             }}
// //           >
// //             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
// //           </IconButton>
// //           <IconButton 
// //             onClick={() => navigateMonth('next')}
// //             size={isMobile ? "small" : "medium"}
// //             sx={{ 
// //               backgroundColor: 'background.default',
// //               '&:hover': { backgroundColor: 'action.hover' }
// //             }}
// //           >
// //             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
// //           </IconButton>
// //         </Box>
// //       </Box>

// //       {/* Calendar Days Header */}
// //       <Box sx={{ 
// //         display: 'grid', 
// //         gridTemplateColumns: 'repeat(7, 1fr)',
// //         gap: 0.5,
// //         mb: 2
// //       }}>
// //         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
// //           <Box 
// //             key={day} 
// //             sx={{ 
// //               p: isMobile ? 1 : 2, 
// //               textAlign: 'center',
// //               backgroundColor: 'background.paper',
// //               borderRadius: 1,
// //               border: 1,
// //               borderColor: 'divider'
// //             }}
// //           >
// //             <Typography 
// //               variant={isMobile ? "caption" : "subtitle2"} 
// //               sx={{ 
// //                 fontWeight: 600, 
// //                 color: 'text.secondary',
// //                 fontSize: isMobile ? '0.7rem' : '0.875rem'
// //               }}
// //             >
// //               {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
// //             </Typography>
// //           </Box>
// //         ))}
// //       </Box>

// //       {/* Calendar Grid */}
// //       <Box sx={{ 
// //         display: 'grid', 
// //         gridTemplateColumns: 'repeat(7, 1fr)',
// //         gap: 0.5
// //       }}>
// //         {daysInMonth.map((date, index) => {
// //           const events = getEventsForDate(date);
// //           const isTodayDate = isToday(date);
// //           const isCurrentMonthDate = isCurrentMonth(date);
          
// //           const activeReservations = events.reservations.filter(
// //             reservation => ['confirmed', 'pending'].includes(reservation.status)
// //           );

// //           const totalEvents = activeReservations.length + events.available.length;
// //           const hasEvents = totalEvents > 0;

// //           return (
// //             <Card
// //               key={index}
// //               onClick={() => handleDayClick(date, events)}
// //               sx={{
// //                 minHeight: isMobile ? 80 : 140,
// //                 borderRadius: 2,
// //                 border: isTodayDate ? 2 : 1,
// //                 borderColor: isTodayDate ? 'primary.main' : 'divider',
// //                 backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
// //                 opacity: isCurrentMonthDate ? 1 : 0.4,
// //                 transition: 'all 0.2s ease-in-out',
// //                 '&:hover': {
// //                   transform: 'translateY(-2px)',
// //                   boxShadow: 2,
// //                   cursor: hasEvents ? 'pointer' : 'default',
// //                 },
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 position: 'relative'
// //               }}
// //             >
// //               <CardContent sx={{ 
// //                 p: isMobile ? 0.5 : 1, 
// //                 height: '100%',
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 gap: 0.5,
// //                 '&:last-child': { pb: isMobile ? 0.5 : 1 }
// //               }}>
// //                 {/* Date Header */}
// //                 <Box sx={{ 
// //                   display: 'flex', 
// //                   justifyContent: 'space-between', 
// //                   alignItems: 'center',
// //                   mb: 0.5
// //                 }}>
// //                   <Badge 
// //                     color="primary" 
// //                     variant="dot" 
// //                     invisible={!hasEvents}
// //                     sx={{ 
// //                       '& .MuiBadge-badge': {
// //                         right: -2,
// //                         top: -2,
// //                       }
// //                     }}
// //                   >
// //                     <Typography 
// //                       variant={isMobile ? "caption" : "body2"} 
// //                       sx={{ 
// //                         fontWeight: isTodayDate ? 700 : 600,
// //                         color: isTodayDate ? 'primary.main' : 'text.primary',
// //                         fontSize: isMobile ? '0.7rem' : '0.875rem'
// //                       }}
// //                     >
// //                       {date.getDate()}
// //                     </Typography>
// //                   </Badge>
                  
// //                   {!isMobile && (
// //                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
// //                       {date.toLocaleDateString('en-US', { weekday: 'short' })}
// //                     </Typography>
// //                   )}
// //                 </Box>

// //                 {/* Events Indicators */}
// //                 {hasEvents && (
// //                   <Box sx={{ 
// //                     flex: 1,
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     gap: 0.3,
// //                     alignItems: 'center',
// //                     justifyContent: 'center'
// //                   }}>
// //                     {/* Reservation Indicators */}
// //                     {activeReservations.slice(0, 2).map((reservation, idx) => (
// //                       <Box
// //                         key={reservation.id}
// //                         sx={{
// //                           width: '100%',
// //                           height: 4,
// //                           backgroundColor: theme.palette[getStatusColor(reservation.status)].main,
// //                           borderRadius: 2,
// //                           opacity: 0.8
// //                         }}
// //                       />
// //                     ))}
                    
// //                     {/* Available Slot Indicators */}
// //                     {events.available.slice(0, 2).map((slot, idx) => (
// //                       <Box
// //                         key={slot.id}
// //                         sx={{
// //                           width: '100%',
// //                           height: 4,
// //                           backgroundColor: theme.palette.primary.main,
// //                           borderRadius: 2,
// //                           opacity: 0.6,
// //                           border: `1px solid ${theme.palette.primary.main}`
// //                         }}
// //                       />
// //                     ))}

// //                     {/* More events indicator */}
// //                     {(activeReservations.length > 2 || events.available.length > 2) && (
// //                       <Typography 
// //                         variant="caption" 
// //                         color="text.secondary"
// //                         sx={{ fontSize: '0.5rem', fontStyle: 'italic' }}
// //                       >
// //                         +{Math.max(0, activeReservations.length - 2) + Math.max(0, events.available.length - 2)}
// //                       </Typography>
// //                     )}
// //                   </Box>
// //                 )}

// //                 {/* Day Stats for Desktop */}
// //                 {hasEvents && !isMobile && (
// //                   <Box sx={{ 
// //                     display: 'flex', 
// //                     alignItems: 'center', 
// //                     gap: 0.5,
// //                     mt: 'auto',
// //                     pt: 0.5,
// //                     borderTop: 1,
// //                     borderColor: 'divider'
// //                   }}>
// //                     {activeReservations.length > 0 && (
// //                       <>
// //                         <VideoCall sx={{ fontSize: 10, color: 'success.main' }} />
// //                         <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
// //                           {activeReservations.length}
// //                         </Typography>
// //                       </>
// //                     )}
// //                     {events.available.length > 0 && (
// //                       <>
// //                         <Person sx={{ fontSize: 10, color: 'primary.main' }} />
// //                         <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
// //                           {events.available.length}
// //                         </Typography>
// //                       </>
// //                     )}
// //                   </Box>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           );
// //         })}
// //       </Box>

// //       {/* Legend - Solo mostrar en desktop */}
// //       {!isMobile && (
// //         <Box sx={{ 
// //           display: 'flex', 
// //           gap: 3, 
// //           mt: 3, 
// //           p: 2, 
// //           backgroundColor: 'background.paper', 
// //           borderRadius: 2,
// //           flexWrap: 'wrap',
// //           border: 1,
// //           borderColor: 'divider'
// //         }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //             <Box sx={{ width: 8, height: 8, backgroundColor: 'success.main', borderRadius: '50%' }} />
// //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Confirmed Interview</Typography>
// //           </Box>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //             <Box sx={{ width: 8, height: 8, backgroundColor: 'warning.main', borderRadius: '50%' }} />
// //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Pending Interview</Typography>
// //           </Box>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //             <Box sx={{ width: 8, height: 8, backgroundColor: 'primary.main', borderRadius: '50%' }} />
// //             <Typography variant="caption" sx={{ fontWeight: 600 }}>Available Slot</Typography>
// //           </Box>
// //         </Box>
// //       )}

// //       {/* Quick Stats */}
// //       <Box sx={{ 
// //         display: 'flex', 
// //         gap: 3, 
// //         mt: 2,
// //         p: 2,
// //         flexDirection: isMobile ? 'column' : 'row',
// //         alignItems: isMobile ? 'flex-start' : 'center'
// //       }}>
// //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //           <Typography variant="caption" color="text.secondary">
// //             Upcoming Interviews:
// //           </Typography>
// //           <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
// //             {calendarStats.upcomingInterviews}
// //           </Typography>
// //         </Box>
// //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //           <Typography variant="caption" color="text.secondary">
// //             Available Slots:
// //           </Typography>
// //           <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
// //             {calendarStats.totalAvailableSlots}
// //           </Typography>
// //         </Box>
// //       </Box>

// //       {/* Day Details Modal */}
// //       <DayDetailsModal
// //         open={modalOpen}
// //         onClose={closeModal}
// //         date={selectedDate}
// //         reservations={selectedDate ? getEventsForDate(selectedDate).reservations : []}
// //         availableSlots={selectedDate ? getEventsForDate(selectedDate).available : []}
// //         onReschedule={onReschedule}
// //         onCancel={onCancel}
// //         onChangeDate={onChangeDate}
// //         isMobile={isMobile}
// //       />
// //     </Box>
// //   );
// // };

// // export default CandidateCalendar;



// // components/candidate/CandidateCalendar.tsx
// import React, { useState, useMemo, useCallback } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Tooltip,
//   alpha,
//   Button,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Badge,
// } from '@mui/material';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Today,
//   VideoCall,
//   Person,
//   Cancel,
//   Edit,
//   Schedule,
//   EventAvailable,
//   Close,
// } from '@mui/icons-material';
// import { CandidateReservation, AvailableSlot } from '../../types/candidate';
// import { InterviewVideoButton } from '../InterviewVideoButton';

// interface CandidateCalendarProps {
//   reservations: CandidateReservation[];
//   availableSlots: AvailableSlot[];
//   onReschedule: (reservation: CandidateReservation) => void;
//   onCancel: (reservation: CandidateReservation) => void;
//   onChangeDate: (reservation: CandidateReservation) => void;
// }

// interface DayDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   date: Date | null;
//   reservations: CandidateReservation[];
//   availableSlots: AvailableSlot[];
//   onReschedule: (reservation: CandidateReservation) => void;
//   onCancel: (reservation: CandidateReservation) => void;
//   onChangeDate: (reservation: CandidateReservation) => void;
//   isMobile: boolean;
// }

// // Componente Modal para mostrar detalles del día en móvil
// const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
//   open,
//   onClose,
//   date,
//   reservations,
//   availableSlots,
//   onReschedule,
//   onCancel,
//   onChangeDate,
//   isMobile,
// }) => {
//   const theme = useTheme();

//   const formatTime = useCallback((time: string) => {
//     if (!time) return 'TBD';
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes} ${ampm}`;
//   }, []);

//   const formatDateForDisplay = useCallback((date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   }, []);

//   const getStatusColor = useCallback((status: string) => {
//     switch (status) {
//       case 'confirmed': return 'success';
//       case 'pending': return 'warning';
//       case 'completed': return 'info';
//       case 'cancelled': return 'error';
//       default: return 'default';
//     }
//   }, []);

//   if (!date) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       fullScreen={isMobile}
//       scroll="paper"
//     >
//       <DialogTitle sx={{ 
//         pb: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//       }}>
//         <Typography variant="h6" component="div">
//           {formatDateForDisplay(date)}
//         </Typography>
//         <IconButton onClick={onClose} size="small">
//           <Close />
//         </IconButton>
//       </DialogTitle>
      
//       <DialogContent sx={{ p: 0 }}>
//         {/* Reservations Section */}
//         {reservations.length > 0 && (
//           <Box sx={{ p: 2 }}>
//             <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//               <EventAvailable color="primary" />
//               Scheduled Interviews ({reservations.length})
//             </Typography>
            
//             <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
//               {reservations.map((reservation) => (
//                 <ListItem key={reservation.id} sx={{ mb: 2 }}>
//                   <Card sx={{ width: '100%', borderLeft: 3, borderLeftColor: `${getStatusColor(reservation.status)}.main` }}>
//                     <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                         {reservation.interviewTitle}
//                       </Typography>
                      
//                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Schedule fontSize="small" color="action" />
//                           <Typography variant="body2">
//                             {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
//                           </Typography>
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Person fontSize="small" color="action" />
//                           <Typography variant="body2" color="primary.main">
//                             {reservation.recruiterName}
//                           </Typography>
//                         </Box>
                        
//                         <Chip 
//                           label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
//                           size="small"
//                           color={getStatusColor(reservation.status) as any}
//                           variant="outlined"
//                         />
//                       </Box>

//                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                         <InterviewVideoButton 
//                           reservation={reservation} 
//                           size="small"
//                           variant="contained"
//                           showStatus={false}
//                           fullWidth
//                         />
                        
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button 
//                             size="small"
//                             variant="outlined"
//                             startIcon={<Edit />}
//                             onClick={() => {
//                               onClose();
//                               onChangeDate(reservation);
//                             }}
//                             sx={{ flex: 1 }}
//                           >
//                             Reschedule
//                           </Button>
//                           <Button 
//                             size="small"
//                             color="error"
//                             variant="outlined"
//                             startIcon={<Cancel />}
//                             onClick={() => {
//                               onClose();
//                               onCancel(reservation);
//                             }}
//                             sx={{ flex: 1 }}
//                           >
//                             Cancel
//                           </Button>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         )}

//         {reservations.length > 0 && availableSlots.length > 0 && (
//           <Divider />
//         )}

//         {/* Available Slots Section */}
//         {availableSlots.length > 0 && (
//           <Box sx={{ p: 2 }}>
//             <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Person color="primary" />
//               Available Slots ({availableSlots.length})
//             </Typography>
            
//             <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
//               {availableSlots.map((slot) => (
//                 <ListItem key={slot.id} sx={{ mb: 1 }}>
//                   <Card variant="outlined" sx={{ width: '100%' }}>
//                     <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//                       <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
//                         {slot.interviewTitle}
//                       </Typography>
                      
//                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Schedule fontSize="small" color="action" />
//                           <Typography variant="body2">
//                             {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//                           </Typography>
//                         </Box>
                        
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Person fontSize="small" color="action" />
//                           <Typography variant="body2" color="primary.main">
//                             {slot.recruiterName}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Button 
//                         variant="contained" 
//                         color="primary"
//                         size="small"
//                         fullWidth
//                         onClick={() => {
//                           onClose();
//                           // Lógica para reservar este slot
//                         }}
//                       >
//                         Book This Slot
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         )}

//         {reservations.length === 0 && availableSlots.length === 0 && (
//           <Box sx={{ p: 4, textAlign: 'center' }}>
//             <EventAvailable sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//             <Typography variant="body1" color="text.secondary">
//               No events scheduled for this day
//             </Typography>
//           </Box>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// const CandidateCalendar: React.FC<CandidateCalendarProps> = ({ 
//   reservations, 
//   availableSlots,
//   onReschedule,
//   onCancel,
//   onChangeDate,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   // Memoized calculations for better performance
//   const daysInMonth = useMemo(() => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const days = [];
    
//     // Previous month days
//     const prevMonthLastDay = new Date(year, month, 0).getDate();
//     const firstDayOfWeek = firstDay.getDay();
//     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//       days.push(new Date(year, month - 1, prevMonthLastDay - i));
//     }
    
//     // Current month days
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(new Date(year, month, i));
//     }
    
//     // Next month days
//     const totalCells = isMobile ? 35 : 42;
//     while (days.length < totalCells) {
//       days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
//     }
    
//     return days;
//   }, [currentDate, isMobile]);

//   // Memoized event getter
//   const getEventsForDate = useCallback((date: Date) => {
//     const dateString = date.toISOString().split('T')[0];
    
//     const reservationsForDate = reservations.filter(reservation => {
//       const reservationDate = new Date(reservation.date);
//       return reservationDate.toISOString().split('T')[0] === dateString;
//     });

//     const availableForDate = availableSlots.filter(slot => {
//       const slotDate = new Date(slot.date);
//       return slotDate.toISOString().split('T')[0] === dateString;
//     });

//     return { reservations: reservationsForDate, available: availableForDate };
//   }, [reservations, availableSlots]);

//   // Memoized utility functions
//   const isToday = useCallback((date: Date) => {
//     const today = new Date();
//     return date.toDateString() === today.toDateString();
//   }, []);

//   const isCurrentMonth = useCallback((date: Date) => {
//     return date.getMonth() === currentDate.getMonth();
//   }, [currentDate]);

//   const formatMonthYear = useCallback((date: Date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   }, []);

//   const formatTime = useCallback((time: string) => {
//     if (!time) return 'TBD';
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes} ${ampm}`;
//   }, []);

//   const getStatusColor = useCallback((status: string) => {
//     switch (status) {
//       case 'confirmed': return 'success';
//       case 'pending': return 'warning';
//       case 'completed': return 'info';
//       case 'cancelled': return 'error';
//       default: return 'default';
//     }
//   }, []);

//   const formatDateForDisplay = useCallback((date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   }, []);

//   // Event handlers
//   const navigateMonth = useCallback((direction: 'prev' | 'next') => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
//       return newDate;
//     });
//   }, []);

//   const goToToday = useCallback(() => {
//     setCurrentDate(new Date());
//   }, []);

//   const handleDayClick = useCallback((date: Date, events: { reservations: CandidateReservation[], available: AvailableSlot[] }) => {
//     if (isMobile && (events.reservations.length > 0 || events.available.length > 0)) {
//       setSelectedDate(date);
//       setModalOpen(true);
//     }
//   }, [isMobile]);

//   const closeModal = useCallback(() => {
//     setModalOpen(false);
//     setSelectedDate(null);
//   }, []);

//   // Calculate stats for performance
//   const calendarStats = useMemo(() => {
//     const upcomingInterviews = reservations.filter(r => ['confirmed', 'pending'].includes(r.status)).length;
//     const totalAvailableSlots = availableSlots.length;
    
//     return { upcomingInterviews, totalAvailableSlots };
//   }, [reservations, availableSlots]);

//   // Función para renderizar el tooltip de reserva (SOLO PARA PC)
//   const renderReservationTooltip = useCallback((reservation: CandidateReservation) => (
//     <Box sx={{ 
//       p: 2, 
//       minWidth: 320,
//       maxWidth: 350,
//       backgroundColor: 'background.paper',
//       borderRadius: 2,
//       boxShadow: 3,
//       border: 1,
//       borderColor: 'divider'
//     }}>
//       <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
//         {reservation.interviewTitle}
//       </Typography>
      
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             📅 Date:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
//             {formatDateForDisplay(new Date(reservation.date))}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             🕒 Time:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
//             {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             👤 With:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
//             {reservation.recruiterName}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             Status:
//           </Typography>
//           <Chip 
//             label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
//             size="small"
//             color={getStatusColor(reservation.status) as any}
//             variant="outlined"
//           />
//         </Box>
//       </Box>
      
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//         <InterviewVideoButton 
//           reservation={reservation} 
//           size="medium"
//           variant="contained"
//           showStatus={false}
//         />
        
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <Button 
//             size="medium"
//             variant="outlined"
//             startIcon={<Edit />}
//             onClick={(e) => {
//               e.stopPropagation();
//               onChangeDate(reservation);
//             }}
//             sx={{ flex: 1 }}
//           >
//             Reschedule
//           </Button>
//           <Button 
//             size="medium"
//             color="error"
//             variant="outlined"
//             startIcon={<Cancel />}
//             onClick={(e) => {
//               e.stopPropagation();
//               onCancel(reservation);
//             }}
//             sx={{ flex: 1 }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   ), [formatDateForDisplay, formatTime, getStatusColor, onChangeDate, onCancel]);

//   // Función para renderizar el tooltip de slot disponible (SOLO PARA PC)
//   const renderAvailableSlotTooltip = useCallback((slot: AvailableSlot) => (
//     <Box sx={{ 
//       p: 2,
//       minWidth: 300,
//       backgroundColor: 'background.paper',
//       borderRadius: 2,
//       boxShadow: 3,
//       border: 1,
//       borderColor: 'divider'
//     }}>
//       <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
//         🟢 Available Slot
//       </Typography>
      
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             Type:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
//             {slot.interviewTitle}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             🕒 Time:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
//             {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
//           </Typography>
//         </Box>
        
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 60 }}>
//             👤 With:
//           </Typography>
//           <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
//             {slot.recruiterName}
//           </Typography>
//         </Box>
//       </Box>
      
//       <Button 
//         variant="contained" 
//         color="primary"
//         size="medium"
//         fullWidth
//         onClick={(e) => {
//           e.stopPropagation();
//           // Aquí puedes agregar la lógica para reservar este slot
//         }}
//       >
//         Book This Slot
//       </Button>
//     </Box>
//   ), [formatTime]);

//   return (
//     <Box sx={{ 
//       minHeight: '600px',
//       backgroundColor: theme.palette.background.default,
//       p: isMobile ? 1 : 2,
//       borderRadius: 3
//     }}>
//       {/* Calendar Header */}
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: isMobile ? 'flex-start' : 'center',
//         mb: 3,
//         p: isMobile ? 2 : 3,
//         backgroundColor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: 1,
//         flexDirection: isMobile ? 'column' : 'row',
//         gap: isMobile ? 2 : 0
//       }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 2,
//           flexDirection: isMobile ? 'column' : 'row',
//           width: isMobile ? '100%' : 'auto'
//         }}>
//           <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, color: 'primary.main' }}>
//             {formatMonthYear(currentDate)}
//           </Typography>
//           <Button
//             startIcon={<Today />}
//             onClick={goToToday}
//             variant="outlined"
//             size={isMobile ? "small" : "medium"}
//             fullWidth={isMobile}
//           >
//             Today
//           </Button>
//         </Box>
        
//         <Box sx={{ 
//           display: 'flex', 
//           gap: 1,
//           width: isMobile ? '100%' : 'auto',
//           justifyContent: isMobile ? 'space-between' : 'flex-end'
//         }}>
//           <IconButton 
//             onClick={() => navigateMonth('prev')}
//             size={isMobile ? "small" : "medium"}
//             sx={{ 
//               backgroundColor: 'background.default',
//               '&:hover': { backgroundColor: 'action.hover' }
//             }}
//           >
//             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//           <IconButton 
//             onClick={() => navigateMonth('next')}
//             size={isMobile ? "small" : "medium"}
//             sx={{ 
//               backgroundColor: 'background.default',
//               '&:hover': { backgroundColor: 'action.hover' }
//             }}
//           >
//             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Calendar Days Header */}
//       <Box sx={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(7, 1fr)',
//         gap: 0.5,
//         mb: 2
//       }}>
//         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
//           <Box 
//             key={day} 
//             sx={{ 
//               p: isMobile ? 1 : 2, 
//               textAlign: 'center',
//               backgroundColor: 'background.paper',
//               borderRadius: 1,
//               border: 1,
//               borderColor: 'divider'
//             }}
//           >
//             <Typography 
//               variant={isMobile ? "caption" : "subtitle2"} 
//               sx={{ 
//                 fontWeight: 600, 
//                 color: 'text.secondary',
//                 fontSize: isMobile ? '0.7rem' : '0.875rem'
//               }}
//             >
//               {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       {/* Calendar Grid */}
//       <Box sx={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(7, 1fr)',
//         gap: 0.5
//       }}>
//         {daysInMonth.map((date, index) => {
//           const events = getEventsForDate(date);
//           const isTodayDate = isToday(date);
//           const isCurrentMonthDate = isCurrentMonth(date);
          
//           const activeReservations = events.reservations.filter(
//             reservation => ['confirmed', 'pending'].includes(reservation.status)
//           );

//           const totalEvents = activeReservations.length + events.available.length;
//           const hasEvents = totalEvents > 0;

//           // Para móvil: mostrar indicadores simples
//           if (isMobile) {
//             return (
//               <Card
//                 key={index}
//                 onClick={() => handleDayClick(date, events)}
//                 sx={{
//                   minHeight: 80,
//                   borderRadius: 2,
//                   border: isTodayDate ? 2 : 1,
//                   borderColor: isTodayDate ? 'primary.main' : 'divider',
//                   backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
//                   opacity: isCurrentMonthDate ? 1 : 0.4,
//                   transition: 'all 0.2s ease-in-out',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: 2,
//                     cursor: hasEvents ? 'pointer' : 'default',
//                   },
//                   display: 'flex',
//                   flexDirection: 'column',
//                   position: 'relative'
//                 }}
//               >
//                 <CardContent sx={{ 
//                   p: 0.5,
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 0.5,
//                   '&:last-child': { pb: 0.5 }
//                 }}>
//                   {/* Date Header */}
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center',
//                     mb: 0.5
//                   }}>
//                     <Badge 
//                       color="primary" 
//                       variant="dot" 
//                       invisible={!hasEvents}
//                       sx={{ 
//                         '& .MuiBadge-badge': {
//                           right: -2,
//                           top: -2,
//                         }
//                       }}
//                     >
//                       <Typography 
//                         variant="caption" 
//                         sx={{ 
//                           fontWeight: isTodayDate ? 700 : 600,
//                           color: isTodayDate ? 'primary.main' : 'text.primary',
//                           fontSize: '0.7rem'
//                         }}
//                       >
//                         {date.getDate()}
//                       </Typography>
//                     </Badge>
//                   </Box>

//                   {/* Events Indicators */}
//                   {hasEvents && (
//                     <Box sx={{ 
//                       flex: 1,
//                       display: 'flex',
//                       flexDirection: 'column',
//                       gap: 0.3,
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}>
//                       {/* Reservation Indicators */}
//                       {activeReservations.slice(0, 2).map((reservation:any, idx:any) => (
//                         <Box
//                           key={reservation.id}
//                           sx={{
//                             width: '100%',
//                             height: 4,
//                             backgroundColor: theme.palette[getStatusColor(reservation.status)].main,
//                             borderRadius: 2,
//                             opacity: 0.8
//                           }}
//                         />
//                       ))}
                      
//                       {/* Available Slot Indicators */}
//                       {events.available.slice(0, 2).map((slot, idx) => (
//                         <Box
//                           key={slot.id}
//                           sx={{
//                             width: '100%',
//                             height: 4,
//                             backgroundColor: theme.palette.primary.main,
//                             borderRadius: 2,
//                             opacity: 0.6,
//                             border: `1px solid ${theme.palette.primary.main}`
//                           }}
//                         />
//                       ))}

//                       {/* More events indicator */}
//                       {(activeReservations.length > 2 || events.available.length > 2) && (
//                         <Typography 
//                           variant="caption" 
//                           color="text.secondary"
//                           sx={{ fontSize: '0.5rem', fontStyle: 'italic' }}
//                         >
//                           +{Math.max(0, activeReservations.length - 2) + Math.max(0, events.available.length - 2)}
//                         </Typography>
//                       )}
//                     </Box>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           }

//           // Para PC: mostrar la versión completa con tooltips
//           return (
//             <Card
//               key={index}
//               sx={{
//                 minHeight: 160,
//                 borderRadius: 2,
//                 border: isTodayDate ? 2 : 1,
//                 borderColor: isTodayDate ? 'primary.main' : 'divider',
//                 backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
//                 opacity: isCurrentMonthDate ? 1 : 0.4,
//                 transition: 'all 0.2s ease-in-out',
//                 '&:hover': {
//                   transform: 'translateY(-2px)',
//                   boxShadow: 2,
//                 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 position: 'relative'
//               }}
//             >
//               <CardContent sx={{ 
//                 p: 1,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 0.5,
//                 '&:last-child': { pb: 1 }
//               }}>
//                 {/* Date Header */}
//                 <Box sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'center',
//                   mb: 0.5
//                 }}>
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       fontWeight: isTodayDate ? 700 : 600,
//                       color: isTodayDate ? 'primary.main' : 'text.primary',
//                     }}
//                   >
//                     {date.getDate()}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//                     {date.toLocaleDateString('en-US', { weekday: 'short' })}
//                   </Typography>
//                 </Box>

//                 {/* Events Container */}
//                 <Box sx={{ 
//                   flex: 1,
//                   maxHeight: 120,
//                   overflow: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: 3,
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: theme.palette.divider,
//                     borderRadius: 2,
//                   }
//                 }}>
//                   {/* Reservations Activas */}
//                   {activeReservations.slice(0, 3).map((reservation) => (
//                     <Tooltip 
//                       key={reservation.id} 
//                       title={renderReservationTooltip(reservation)}
//                       arrow
//                       placement="top"
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             backgroundColor: 'transparent',
//                             boxShadow: 'none',
//                             maxWidth: 'none',
//                           }
//                         }
//                       }}
//                     >
//                       <Chip
//                         icon={<VideoCall sx={{ fontSize: 12 }} />}
//                         label={`${formatTime(reservation.startTime)}`}
//                         size="small"
//                         color={getStatusColor(reservation.status) as any}
//                         sx={{
//                           mb: 0.5,
//                           width: '100%',
//                           justifyContent: 'flex-start',
//                           fontSize: '0.6rem',
//                           height: 20,
//                           '& .MuiChip-label': {
//                             paddingRight: 0.5,
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                             whiteSpace: 'nowrap',
//                           },
//                           '& .MuiChip-icon': {
//                             marginLeft: 0.5,
//                             marginRight: 0.5,
//                             fontSize: 12
//                           }
//                         }}
//                       />
//                     </Tooltip>
//                   ))}

//                   {/* Available Slots */}
//                   {events.available.slice(0, 2).map((slot) => (
//                     <Tooltip 
//                       key={slot.id} 
//                       title={renderAvailableSlotTooltip(slot)}
//                       arrow
//                       placement="top"
//                       componentsProps={{
//                         tooltip: {
//                           sx: {
//                             backgroundColor: 'transparent',
//                             boxShadow: 'none',
//                             maxWidth: 'none',
//                           }
//                         }
//                       }}
//                     >
//                       <Chip
//                         icon={<Person sx={{ fontSize: 12 }} />}
//                         label={`${formatTime(slot.startTime)}`}
//                         size="small"
//                         color="primary"
//                         variant="outlined"
//                         sx={{
//                           mb: 0.5,
//                           width: '100%',
//                           justifyContent: 'flex-start',
//                           fontSize: '0.6rem',
//                           height: 20,
//                           '& .MuiChip-label': {
//                             paddingRight: 0.5,
//                           },
//                           '& .MuiChip-icon': {
//                             marginLeft: 0.5,
//                             marginRight: 0.5,
//                             fontSize: 12
//                           }
//                         }}
//                       />
//                     </Tooltip>
//                   ))}

//                   {/* Show more indicator */}
//                   {(activeReservations.length > 3 || events.available.length > 2) && (
//                     <Typography 
//                       variant="caption" 
//                       color="text.secondary" 
//                       sx={{ 
//                         display: 'block', 
//                         textAlign: 'center',
//                         fontSize: '0.55rem',
//                         fontStyle: 'italic'
//                       }}
//                     >
//                       +{Math.max(0, activeReservations.length - 3) + Math.max(0, events.available.length - 2)} more
//                     </Typography>
//                   )}

//                   {/* No events message */}
//                   {activeReservations.length === 0 && events.available.length === 0 && (
//                     <Typography 
//                       variant="caption" 
//                       color="text.secondary" 
//                       sx={{ 
//                         display: 'block', 
//                         textAlign: 'center',
//                         fontSize: '0.6rem',
//                         fontStyle: 'italic',
//                         mt: 0.5
//                       }}
//                     >
//                       No events
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Day Stats */}
//                 {(activeReservations.length > 0 || events.available.length > 0) && (
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 0.5,
//                     mt: 'auto',
//                     pt: 0.5,
//                     borderTop: 1,
//                     borderColor: 'divider'
//                   }}>
//                     {activeReservations.length > 0 && (
//                       <>
//                         <VideoCall sx={{ fontSize: 10, color: 'success.main' }} />
//                         <Typography variant="caption" color="success.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
//                           {activeReservations.length}
//                         </Typography>
//                       </>
//                     )}
//                     {events.available.length > 0 && (
//                       <>
//                         <Person sx={{ fontSize: 10, color: 'primary.main' }} />
//                         <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
//                           {events.available.length}
//                         </Typography>
//                       </>
//                     )}
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </Box>

//       {/* Legend - Solo mostrar en desktop */}
//       {!isMobile && (
//         <Box sx={{ 
//           display: 'flex', 
//           gap: 3, 
//           mt: 3, 
//           p: 2, 
//           backgroundColor: 'background.paper', 
//           borderRadius: 2,
//           flexWrap: 'wrap',
//           border: 1,
//           borderColor: 'divider'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box sx={{ width: 8, height: 8, backgroundColor: 'success.main', borderRadius: '50%' }} />
//             <Typography variant="caption" sx={{ fontWeight: 600 }}>Confirmed Interview</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box sx={{ width: 8, height: 8, backgroundColor: 'warning.main', borderRadius: '50%' }} />
//             <Typography variant="caption" sx={{ fontWeight: 600 }}>Pending Interview</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box sx={{ width: 8, height: 8, backgroundColor: 'primary.main', borderRadius: '50%' }} />
//             <Typography variant="caption" sx={{ fontWeight: 600 }}>Available Slot</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <VideoCall sx={{ fontSize: 12, color: 'success.main' }} />
//             <Typography variant="caption">Join Meeting Available</Typography>
//           </Box>
//         </Box>
//       )}

//       {/* Quick Stats */}
//       <Box sx={{ 
//         display: 'flex', 
//         gap: 3, 
//         mt: 2,
//         p: 2,
//         flexDirection: isMobile ? 'column' : 'row',
//         alignItems: isMobile ? 'flex-start' : 'center'
//       }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="caption" color="text.secondary">
//             Upcoming Interviews:
//           </Typography>
//           <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
//             {calendarStats.upcomingInterviews}
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Typography variant="caption" color="text.secondary">
//             Available Slots:
//           </Typography>
//           <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
//             {calendarStats.totalAvailableSlots}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Day Details Modal (solo para móvil) */}
//       {isMobile && (
//         <DayDetailsModal
//           open={modalOpen}
//           onClose={closeModal}
//           date={selectedDate}
//           reservations={selectedDate ? getEventsForDate(selectedDate).reservations : []}
//           availableSlots={selectedDate ? getEventsForDate(selectedDate).available : []}
//           onReschedule={onReschedule}
//           onCancel={onCancel}
//           onChangeDate={onChangeDate}
//           isMobile={isMobile}
//         />
//       )}
//     </Box>
//   );
// };

// export default CandidateCalendar;



// components/candidate/CandidateCalendar.tsx
import React, { useState, useMemo, useCallback } from 'react';
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
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  VideoCall,
  Person,
  Cancel,
  Edit,
  Schedule,
  EventAvailable,
  Close,
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

interface DayDetailsModalProps {
  open: boolean;
  onClose: () => void;
  date: Date | null;
  reservations: CandidateReservation[];
  availableSlots: AvailableSlot[];
  onReschedule: (reservation: CandidateReservation) => void;
  onCancel: (reservation: CandidateReservation) => void;
  onChangeDate: (reservation: CandidateReservation) => void;
  isMobile: boolean;
}

// Componente Modal para mostrar detalles del día en móvil
const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  open,
  onClose,
  date,
  reservations,
  availableSlots,
  onReschedule,
  onCancel,
  onChangeDate,
  isMobile,
}) => {
  const theme = useTheme();

  const formatTime = useCallback((time: string) => {
    if (!time) return 'TBD';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }, []);

  const formatDateForDisplay = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  }, []);

  const getStatusColorValue = useCallback((status: string) => {
    const color = getStatusColor(status);
    if (color === 'default') {
      return theme.palette.grey[500];
    }
    return theme.palette[color].main;
  }, [getStatusColor, theme]);

  if (!date) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      scroll="paper"
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" component="div">
          {formatDateForDisplay(date)}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {/* Reservations Section */}
        {reservations.length > 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <EventAvailable color="primary" />
              Scheduled Interviews ({reservations.length})
            </Typography>
            
            <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
              {reservations.map((reservation) => (
                <ListItem key={reservation.id} sx={{ mb: 2 }}>
                  <Card sx={{ 
                    width: '100%', 
                    borderLeft: 3, 
                    borderLeftColor: getStatusColorValue(reservation.status)
                  }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        {reservation.interviewTitle}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Schedule fontSize="small" color="action" />
                          <Typography variant="body2">
                            {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="body2" color="primary.main">
                            {reservation.recruiterName}
                          </Typography>
                        </Box>
                        
                        <Chip 
                          label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          size="small"
                          color={getStatusColor(reservation.status) as any}
                          variant="outlined"
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <InterviewVideoButton 
                          reservation={reservation} 
                          size="small"
                          variant="contained"
                          showStatus={false}
                          fullWidth
                        />
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button 
                            size="small"
                            variant="outlined"
                            startIcon={<Edit />}
                            onClick={() => {
                              onClose();
                              onChangeDate(reservation);
                            }}
                            sx={{ flex: 1 }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="small"
                            color="error"
                            variant="outlined"
                            startIcon={<Cancel />}
                            onClick={() => {
                              onClose();
                              onCancel(reservation);
                            }}
                            sx={{ flex: 1 }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {reservations.length > 0 && availableSlots.length > 0 && (
          <Divider />
        )}

        {/* Available Slots Section */}
        {availableSlots.length > 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person color="primary" />
              Available Slots ({availableSlots.length})
            </Typography>
            
            <List dense sx={{ '& .MuiListItem-root': { px: 0 } }}>
              {availableSlots.map((slot) => (
                <ListItem key={slot.id} sx={{ mb: 1 }}>
                  <Card variant="outlined" sx={{ width: '100%' }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                        {slot.interviewTitle}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Schedule fontSize="small" color="action" />
                          <Typography variant="body2">
                            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="body2" color="primary.main">
                            {slot.recruiterName}
                          </Typography>
                        </Box>
                      </Box>

                      <Button 
                        variant="contained" 
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => {
                          onClose();
                          // Lógica para reservar este slot
                        }}
                      >
                        Book This Slot
                      </Button>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {reservations.length === 0 && availableSlots.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <EventAvailable sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              No events scheduled for this day
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Memoized calculations for better performance
  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Next month days
    const totalCells = isMobile ? 35 : 42;
    while (days.length < totalCells) {
      days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
    }
    
    return days;
  }, [currentDate, isMobile]);

  // Memoized event getter
  const getEventsForDate = useCallback((date: Date) => {
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
  }, [reservations, availableSlots]);

  // Memoized utility functions
  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }, []);

  const isCurrentMonth = useCallback((date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  }, [currentDate]);

  const formatMonthYear = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  const formatTime = useCallback((time: string) => {
    if (!time) return 'TBD';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  }, []);

  // Función auxiliar para obtener el color del tema de forma segura
  const getStatusColorValue = useCallback((status: string) => {
    const color = getStatusColor(status);
    if (color === 'default') {
      return theme.palette.grey[500];
    }
    return theme.palette[color].main;
  }, [getStatusColor, theme]);

  const formatDateForDisplay = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  // Event handlers
  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDayClick = useCallback((date: Date, events: { reservations: CandidateReservation[], available: AvailableSlot[] }) => {
    if (isMobile && (events.reservations.length > 0 || events.available.length > 0)) {
      setSelectedDate(date);
      setModalOpen(true);
    }
  }, [isMobile]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedDate(null);
  }, []);

  // Calculate stats for performance
  const calendarStats = useMemo(() => {
    const upcomingInterviews = reservations.filter(r => ['confirmed', 'pending'].includes(r.status)).length;
    const totalAvailableSlots = availableSlots.length;
    
    return { upcomingInterviews, totalAvailableSlots };
  }, [reservations, availableSlots]);

  // Función para renderizar el tooltip de reserva (SOLO PARA PC)
  const renderReservationTooltip = useCallback((reservation: CandidateReservation) => (
    <Box sx={{ 
      p: 2, 
      minWidth: 320,
      maxWidth: 350,
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
          size="medium"
          variant="contained"
          showStatus={false}
        />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="medium"
            variant="outlined"
            startIcon={<Edit />}
            onClick={(e) => {
              e.stopPropagation();
              onChangeDate(reservation);
            }}
            sx={{ flex: 1 }}
          >
            Reschedule
          </Button>
          <Button 
            size="medium"
            color="error"
            variant="outlined"
            startIcon={<Cancel />}
            onClick={(e) => {
              e.stopPropagation();
              onCancel(reservation);
            }}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  ), [formatDateForDisplay, formatTime, getStatusColor, onChangeDate, onCancel]);

  // Función para renderizar el tooltip de slot disponible (SOLO PARA PC)
  const renderAvailableSlotTooltip = useCallback((slot: AvailableSlot) => (
    <Box sx={{ 
      p: 2,
      minWidth: 300,
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
        size="medium"
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          // Aquí puedes agregar la lógica para reservar este slot
        }}
      >
        Book This Slot
      </Button>
    </Box>
  ), [formatTime]);

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
          const events = getEventsForDate(date);
          const isTodayDate = isToday(date);
          const isCurrentMonthDate = isCurrentMonth(date);
          
          const activeReservations = events.reservations.filter(
            reservation => ['confirmed', 'pending'].includes(reservation.status)
          );

          const totalEvents = activeReservations.length + events.available.length;
          const hasEvents = totalEvents > 0;

          // Para móvil: mostrar indicadores simples
          if (isMobile) {
            return (
              <Card
                key={index}
                onClick={() => handleDayClick(date, events)}
                sx={{
                  minHeight: 80,
                  borderRadius: 2,
                  border: isTodayDate ? 2 : 1,
                  borderColor: isTodayDate ? 'primary.main' : 'divider',
                  backgroundColor: isTodayDate ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
                  opacity: isCurrentMonthDate ? 1 : 0.4,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                    cursor: hasEvents ? 'pointer' : 'default',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <CardContent sx={{ 
                  p: 0.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  '&:last-child': { pb: 0.5 }
                }}>
                  {/* Date Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 0.5
                  }}>
                    <Badge 
                      color="primary" 
                      variant="dot" 
                      invisible={!hasEvents}
                      sx={{ 
                        '& .MuiBadge-badge': {
                          right: -2,
                          top: -2,
                        }
                      }}
                    >
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: isTodayDate ? 700 : 600,
                          color: isTodayDate ? 'primary.main' : 'text.primary',
                          fontSize: '0.7rem'
                        }}
                      >
                        {date.getDate()}
                      </Typography>
                    </Badge>
                  </Box>

                  {/* Events Indicators */}
                  {hasEvents && (
                    <Box sx={{ 
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.3,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {/* Reservation Indicators */}
                      {activeReservations.slice(0, 2).map((reservation, idx) => (
                        <Box
                          key={reservation.id}
                          sx={{
                            width: '100%',
                            height: 4,
                            backgroundColor: getStatusColorValue(reservation.status),
                            borderRadius: 2,
                            opacity: 0.8
                          }}
                        />
                      ))}
                      
                      {/* Available Slot Indicators */}
                      {events.available.slice(0, 2).map((slot, idx) => (
                        <Box
                          key={slot.id}
                          sx={{
                            width: '100%',
                            height: 4,
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 2,
                            opacity: 0.6,
                            border: `1px solid ${theme.palette.primary.main}`
                          }}
                        />
                      ))}

                      {/* More events indicator */}
                      {(activeReservations.length > 2 || events.available.length > 2) && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ fontSize: '0.5rem', fontStyle: 'italic' }}
                        >
                          +{Math.max(0, activeReservations.length - 2) + Math.max(0, events.available.length - 2)}
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            );
          }

          // Para PC: mostrar la versión completa con tooltips
          return (
            <Card
              key={index}
              sx={{
                minHeight: 160,
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
                p: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                '&:last-child': { pb: 1 }
              }}>
                {/* Date Header */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 0.5
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: isTodayDate ? 700 : 600,
                      color: isTodayDate ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {date.getDate()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Typography>
                </Box>

                {/* Events Container */}
                <Box sx={{ 
                  flex: 1,
                  maxHeight: 120,
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
                  {activeReservations.slice(0, 3).map((reservation) => (
                    <Tooltip 
                      key={reservation.id} 
                      title={renderReservationTooltip(reservation)}
                      arrow
                      placement="top"
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
                        icon={<VideoCall sx={{ fontSize: 12 }} />}
                        label={`${formatTime(reservation.startTime)}`}
                        size="small"
                        color={getStatusColor(reservation.status) as any}
                        sx={{
                          mb: 0.5,
                          width: '100%',
                          justifyContent: 'flex-start',
                          fontSize: '0.6rem',
                          height: 20,
                          '& .MuiChip-label': {
                            paddingRight: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                          '& .MuiChip-icon': {
                            marginLeft: 0.5,
                            marginRight: 0.5,
                            fontSize: 12
                          }
                        }}
                      />
                    </Tooltip>
                  ))}

                  {/* Available Slots */}
                  {events.available.slice(0, 2).map((slot) => (
                    <Tooltip 
                      key={slot.id} 
                      title={renderAvailableSlotTooltip(slot)}
                      arrow
                      placement="top"
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
                        icon={<Person sx={{ fontSize: 12 }} />}
                        label={`${formatTime(slot.startTime)}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                          mb: 0.5,
                          width: '100%',
                          justifyContent: 'flex-start',
                          fontSize: '0.6rem',
                          height: 20,
                          '& .MuiChip-label': {
                            paddingRight: 0.5,
                          },
                          '& .MuiChip-icon': {
                            marginLeft: 0.5,
                            marginRight: 0.5,
                            fontSize: 12
                          }
                        }}
                      />
                    </Tooltip>
                  ))}

                  {/* Show more indicator */}
                  {(activeReservations.length > 3 || events.available.length > 2) && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        textAlign: 'center',
                        fontSize: '0.55rem',
                        fontStyle: 'italic'
                      }}
                    >
                      +{Math.max(0, activeReservations.length - 3) + Math.max(0, events.available.length - 2)} more
                    </Typography>
                  )}

                  {/* No events message */}
                  {activeReservations.length === 0 && events.available.length === 0 && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        textAlign: 'center',
                        fontSize: '0.6rem',
                        fontStyle: 'italic',
                        mt: 0.5
                      }}
                    >
                      No events
                    </Typography>
                  )}
                </Box>

                {/* Day Stats */}
                {(activeReservations.length > 0 || events.available.length > 0) && (
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
                    {events.available.length > 0 && (
                      <>
                        <Person sx={{ fontSize: 10, color: 'primary.main' }} />
                        <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, fontSize: '0.55rem' }}>
                          {events.available.length}
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
            {calendarStats.upcomingInterviews}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Available Slots:
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {calendarStats.totalAvailableSlots}
          </Typography>
        </Box>
      </Box>

      {/* Day Details Modal (solo para móvil) */}
      {isMobile && (
        <DayDetailsModal
          open={modalOpen}
          onClose={closeModal}
          date={selectedDate}
          reservations={selectedDate ? getEventsForDate(selectedDate).reservations : []}
          availableSlots={selectedDate ? getEventsForDate(selectedDate).available : []}
          onReschedule={onReschedule}
          onCancel={onCancel}
          onChangeDate={onChangeDate}
          isMobile={isMobile}
        />
      )}
    </Box>
  );
};

export default CandidateCalendar;