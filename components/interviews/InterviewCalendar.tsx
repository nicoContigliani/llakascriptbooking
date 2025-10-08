// // // // components/interviews/InterviewCalendar.tsx
// // // import React, { useState, useMemo, useEffect } from 'react';
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
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Snackbar,
// // //   Alert,
// // //   Paper,
// // //   Divider,
// // //   useTheme,
// // //   useMediaQuery,
// // // } from '@mui/material';
// // // import {
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Today,
// // //   VideoCall,
// // //   Person,
// // //   ContentCopy,
// // //   OpenInNew,
// // //   CalendarToday,
// // //   Schedule,
// // //   Link as LinkIcon,
// // //   CheckCircle,
// // //   Groups,
// // // } from '@mui/icons-material';
// // // import { InterviewStructure } from '../../types';

// // // interface InterviewCalendarProps {
// // //   interviews: InterviewStructure[];
// // //   onInterviewClick?: (interview: InterviewStructure) => void;
// // // }

// // // const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ 
// // //   interviews, 
// // //   onInterviewClick 
// // // }) => {
// // //   const [currentDate, setCurrentDate] = useState(new Date());
// // //   const [selectedInterview, setSelectedInterview] = useState<InterviewStructure | null>(null);
// // //   const [joinDialogOpen, setJoinDialogOpen] = useState(false);
// // //   const [copySuccess, setCopySuccess] = useState(false);
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// // //   const [snackbarMessage, setSnackbarMessage] = useState('');
// // //   const theme = useTheme();
// // //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// // //   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

// // //   // Reset copy success state when dialog closes
// // //   useEffect(() => {
// // //     if (!joinDialogOpen) {
// // //       setCopySuccess(false);
// // //     }
// // //   }, [joinDialogOpen]);

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
// // //     const totalCells = 42; // 6 semanas
// // //     while (days.length < totalCells) {
// // //       days.push(new Date(year, month + 1, days.length - firstDayOfWeek - lastDay.getDate() + 1));
// // //     }
    
// // //     return days;
// // //   }, [currentDate]);

// // //   // Función para generar un código de Google Meet válido
// // //   const generateValidMeetCode = (interview: InterviewStructure|any): string => {
// // //     if (interview.meetingLink) {
// // //       const match = interview.meetingLink.match(/https:\/\/meet\.google\.com\/([a-z0-9-]+)/);
// // //       if (match && match[1]) {
// // //         return match[1];
// // //       }
// // //     }
    
// // //     // Si no hay meetingLink, usar el código por defecto o generar uno
// // //     return interview.meetingCode || 'zii-bwgi-kxu';
// // //   };

// // //   const generateMeetLink = (interview: InterviewStructure): string => {
// // //     const meetCode = generateValidMeetCode(interview);
// // //     return `https://meet.google.com/${meetCode}`;
// // //   };

// // //   const generateZoomLink = (interview: InterviewStructure): string => {
// // //     const meetingId = Math.abs(interview.id.split('').reduce((a, b) => {
// // //       a = ((a << 5) - a) + b.charCodeAt(0);
// // //       return a & a;
// // //     }, 0)).toString().substring(0, 10);
    
// // //     return `https://zoom.us/j/${meetingId}?pwd=${btoa(interview.id).substring(0, 10)}`;
// // //   };

// // //   const handleJoinMeeting = (interview: InterviewStructure) => {
// // //     const meetLink = generateMeetLink(interview);
// // //     window.open(meetLink, '_blank', 'noopener,noreferrer');
// // //   };

// // //   const handleCopyLink = async (interview: InterviewStructure, event: React.MouseEvent) => {
// // //     event.stopPropagation();
    
// // //     try {
// // //       const meetingLink = generateMeetLink(interview);
// // //       await navigator.clipboard.writeText(meetingLink);
// // //       setCopySuccess(true);
// // //       setSnackbarMessage('Meeting link copied to clipboard! 🎉');
// // //       setSnackbarOpen(true);
      
// // //       setTimeout(() => {
// // //         setCopySuccess(false);
// // //       }, 2000);
// // //     } catch (error) {
// // //       console.error('Error copying link:', error);
// // //       setSnackbarMessage('Error copying link');
// // //       setSnackbarOpen(true);
// // //     }
// // //   };

// // //   const handleInterviewClick = (interview: InterviewStructure) => {
// // //     setSelectedInterview(interview);
// // //     setJoinDialogOpen(true);
// // //     onInterviewClick?.(interview);
// // //   };

// // //   const closeJoinDialog = () => {
// // //     setJoinDialogOpen(false);
// // //     setSelectedInterview(null);
// // //   };

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

// // //   const getInterviewsForDate = (date: Date) => {
// // //     return interviews.filter(interview => {
// // //       return interview.availableSlots?.some(slot => {
// // //         const slotDate = new Date(slot.date);
// // //         return (
// // //           slotDate.getDate() === date.getDate() &&
// // //           slotDate.getMonth() === date.getMonth() &&
// // //           slotDate.getFullYear() === date.getFullYear()
// // //         );
// // //       });
// // //     });
// // //   };

// // //   const isToday = (date: Date) => {
// // //     const today = new Date();
// // //     return (
// // //       date.getDate() === today.getDate() &&
// // //       date.getMonth() === today.getMonth() &&
// // //       date.getFullYear() === today.getFullYear()
// // //     );
// // //   };

// // //   const isCurrentMonth = (date: Date) => {
// // //     return date.getMonth() === currentDate.getMonth();
// // //   };

// // //   const formatMonthYear = (date: Date) => {
// // //     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
// // //   };

// // //   const getDayAbbreviation = (date: Date) => {
// // //     return date.toLocaleDateString('en-US', { weekday: isMobile ? 'narrow' : 'short' });
// // //   };

// // //   const getNextSlotForInterview = (interview: InterviewStructure, date: Date) => {
// // //     return interview.availableSlots?.find(slot => {
// // //       const slotDate = new Date(slot.date);
// // //       return (
// // //         slotDate.getDate() === date.getDate() &&
// // //         slotDate.getMonth() === date.getMonth() &&
// // //         slotDate.getFullYear() === date.getFullYear()
// // //       );
// // //     });
// // //   };

// // //   const formatInterviewDate = (interview: InterviewStructure): string => {
// // //     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No date set';
    
// // //     const slot = interview.availableSlots[0];
// // //     const slotDate = new Date(slot.date);
    
// // //     return slotDate.toLocaleDateString('en-US', {
// // //       weekday: 'long',
// // //       year: 'numeric',
// // //       month: 'long',
// // //       day: 'numeric'
// // //     });
// // //   };

// // //   const formatInterviewTime = (interview: InterviewStructure): string => {
// // //     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No time set';
    
// // //     const slot = interview.availableSlots[0];
// // //     return slot.startTime || 'Time not specified';
// // //   };

// // //   // Estilos responsive para las celdas del calendario
// // //   const getCalendarCellStyles = () => {
// // //     if (isSmallMobile) {
// // //       return {
// // //         minHeight: 120,
// // //         p: 1,
// // //         '& .MuiCardContent-root': { p: 1 }
// // //       };
// // //     } else if (isMobile) {
// // //       return {
// // //         minHeight: 140,
// // //         p: 1.5,
// // //         '& .MuiCardContent-root': { p: 1.5 }
// // //       };
// // //     }
// // //     return {
// // //       minHeight: 160,
// // //       p: 2,
// // //       '& .MuiCardContent-root': { p: 2 }
// // //     };
// // //   };

// // //   return (
// // //     <Box>
// // //       {/* Calendar Header - Responsive */}
// // //       <Box sx={{ 
// // //         display: 'flex', 
// // //         flexDirection: isMobile ? 'column' : 'row',
// // //         justifyContent: 'space-between', 
// // //         alignItems: isMobile ? 'stretch' : 'center',
// // //         gap: isMobile ? 2 : 0,
// // //         mb: 4,
// // //         p: isMobile ? 2 : 3,
// // //         backgroundColor: 'grey.50',
// // //         borderRadius: 3,
// // //         border: `1px solid ${theme.palette.divider}`
// // //       }}>
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           alignItems: 'center', 
// // //           gap: 2,
// // //           justifyContent: isMobile ? 'space-between' : 'flex-start'
// // //         }}>
// // //           <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
// // //             fontWeight: 700, 
// // //             color: 'primary.main',
// // //             fontSize: isMobile ? '1.25rem' : '1.5rem'
// // //           }}>
// // //             {formatMonthYear(currentDate)}
// // //           </Typography>
// // //           <Chip 
// // //             icon={<Today />}
// // //             label="Today"
// // //             onClick={goToToday}
// // //             variant="outlined"
// // //             clickable
// // //             size={isMobile ? "small" : "medium"}
// // //             sx={{ 
// // //               borderColor: 'primary.main',
// // //               color: 'primary.main',
// // //               '&:hover': {
// // //                 backgroundColor: 'primary.main',
// // //                 color: 'white'
// // //               }
// // //             }}
// // //           />
// // //         </Box>
        
// // //         <Box sx={{ 
// // //           display: 'flex', 
// // //           gap: 1,
// // //           justifyContent: isMobile ? 'center' : 'flex-end',
// // //           mt: isMobile ? 1 : 0
// // //         }}>
// // //           <IconButton 
// // //             onClick={() => navigateMonth('prev')}
// // //             size={isMobile ? "small" : "medium"}
// // //             sx={{ 
// // //               backgroundColor: 'white',
// // //               '&:hover': { backgroundColor: 'grey.100' }
// // //             }}
// // //           >
// // //             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
// // //           </IconButton>
// // //           <IconButton 
// // //             onClick={() => navigateMonth('next')}
// // //             size={isMobile ? "small" : "medium"}
// // //             sx={{ 
// // //               backgroundColor: 'white',
// // //               '&:hover': { backgroundColor: 'grey.100' }
// // //             }}
// // //           >
// // //             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
// // //           </IconButton>
// // //         </Box>
// // //       </Box>

// // //       {/* Calendar Grid - Responsive */}
// // //       <Box sx={{ 
// // //         display: 'grid', 
// // //         gridTemplateColumns: 'repeat(7, 1fr)',
// // //         gap: 1,
// // //         mb: 2
// // //       }}>
// // //         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
// // //           <Box key={day} sx={{ 
// // //             p: isMobile ? 1 : 2, 
// // //             textAlign: 'center' 
// // //           }}>
// // //             <Typography variant="subtitle2" sx={{ 
// // //               fontWeight: 600, 
// // //               color: 'text.secondary',
// // //               fontSize: isMobile ? '0.75rem' : '0.875rem'
// // //             }}>
// // //               {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
// // //             </Typography>
// // //           </Box>
// // //         ))}
// // //       </Box>

// // //       <Box sx={{ 
// // //         display: 'grid', 
// // //         gridTemplateColumns: 'repeat(7, 1fr)',
// // //         gap: 1
// // //       }}>
// // //         {daysInMonth.map((date, index) => {
// // //           const dayInterviews = getInterviewsForDate(date);
// // //           const isTodayDate = isToday(date);
// // //           const isCurrentMonthDate = isCurrentMonth(date);

// // //           return (
// // //             <Card
// // //               key={index}
// // //               sx={{
// // //                 ...getCalendarCellStyles(),
// // //                 borderRadius: 2,
// // //                 border: isTodayDate ? 2 : 1,
// // //                 borderColor: isTodayDate ? 'primary.main' : 'divider',
// // //                 backgroundColor: isTodayDate ? alpha('#2196f3', 0.04) : 'white',
// // //                 opacity: isCurrentMonthDate ? 1 : 0.4,
// // //                 transition: 'all 0.3s ease-in-out',
// // //                 '&:hover': {
// // //                   transform: isMobile ? 'none' : 'translateY(-2px)',
// // //                   boxShadow: isMobile ? 1 : 4,
// // //                 }
// // //               }}
// // //             >
// // //               <CardContent sx={{ 
// // //                 p: isSmallMobile ? 0.5 : isMobile ? 1 : 2,
// // //                 height: '100%',
// // //                 '&:last-child': { pb: isSmallMobile ? 0.5 : isMobile ? 1 : 2 }
// // //               }}>
// // //                 <Box sx={{ 
// // //                   display: 'flex', 
// // //                   justifyContent: 'space-between', 
// // //                   alignItems: 'flex-start',
// // //                   mb: 0.5
// // //                 }}>
// // //                   <Typography 
// // //                     variant="body2" 
// // //                     sx={{ 
// // //                       fontWeight: isTodayDate ? 700 : 600,
// // //                       color: isTodayDate ? 'primary.main' : 'text.primary',
// // //                       fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.875rem' : '1rem'
// // //                     }}
// // //                   >
// // //                     {date.getDate()}
// // //                   </Typography>
// // //                   <Typography variant="caption" color="text.secondary" sx={{ 
// // //                     fontWeight: 500,
// // //                     fontSize: isSmallMobile ? '0.6rem' : '0.75rem'
// // //                   }}>
// // //                     {getDayAbbreviation(date)}
// // //                   </Typography>
// // //                 </Box>

// // //                 {/* Interview List for the Day - Responsive */}
// // //                 <Box sx={{ 
// // //                   maxHeight: isSmallMobile ? 80 : isMobile ? 100 : 120, 
// // //                   overflow: 'auto',
// // //                   '&::-webkit-scrollbar': {
// // //                     width: '4px',
// // //                   },
// // //                   '&::-webkit-scrollbar-thumb': {
// // //                     backgroundColor: theme.palette.grey[300],
// // //                     borderRadius: '2px',
// // //                   }
// // //                 }}>
// // //                   {dayInterviews.slice(0, isSmallMobile ? 2 : 3).map(interview => {
// // //                     const slot = getNextSlotForInterview(interview, date);
// // //                     const meetingCode = generateValidMeetCode(interview);
                    
// // //                     return (
// // //                       <Tooltip 
// // //                         key={interview.id} 
// // //                         title={
// // //                           <Box sx={{ p: 1 }}>
// // //                             <Typography variant="subtitle2" gutterBottom>
// // //                               {interview.title}
// // //                             </Typography>
// // //                             <Typography variant="caption" display="block">
// // //                               🕒 {slot?.startTime || 'No time specified'}
// // //                             </Typography>
// // //                             <Typography variant="caption" display="block">
// // //                               🔗 {meetingCode} ✅
// // //                             </Typography>
// // //                           </Box>
// // //                         } 
// // //                         arrow
// // //                         placement="top"
// // //                       >
// // //                         <Box
// // //                           sx={{
// // //                             mb: 0.5,
// // //                             p: isSmallMobile ? 0.5 : 1,
// // //                             borderRadius: 1,
// // //                             backgroundColor: alpha('#4CAF50', 0.08),
// // //                             border: '1px solid',
// // //                             borderColor: alpha('#4CAF50', 0.2),
// // //                             cursor: 'pointer',
// // //                             transition: 'all 0.3s ease-in-out',
// // //                             '&:hover': {
// // //                               backgroundColor: alpha('#4CAF50', 0.12),
// // //                               transform: isMobile ? 'none' : 'translateX(2px)',
// // //                             }
// // //                           }}
// // //                           onClick={() => handleInterviewClick(interview)}
// // //                         >
// // //                           <Typography variant="caption" sx={{ 
// // //                             fontWeight: 600, 
// // //                             display: 'block', 
// // //                             color: '#2E7D32',
// // //                             fontSize: isSmallMobile ? '0.55rem' : '0.65rem',
// // //                             lineHeight: 1.2
// // //                           }}>
// // //                             {isSmallMobile 
// // //                               ? interview.title.split(' ')[0] 
// // //                               : interview.title.length > 20 
// // //                                 ? `${interview.title.substring(0, 20)}...`
// // //                                 : interview.title
// // //                             }
// // //                           </Typography>
// // //                           {slot && (
// // //                             <Typography variant="caption" color="text.secondary" display="block" sx={{ 
// // //                               fontSize: isSmallMobile ? '0.5rem' : '0.6rem',
// // //                               lineHeight: 1.2
// // //                             }}>
// // //                               🕒 {slot.startTime}
// // //                             </Typography>
// // //                           )}
// // //                           {!isSmallMobile && (
// // //                             <Typography variant="caption" color="success.main" display="block" sx={{ 
// // //                               fontSize: '0.6rem', 
// // //                               fontWeight: 600,
// // //                               lineHeight: 1.2
// // //                             }}>
// // //                               🔗 {meetingCode.substring(0, 8)}... ✅
// // //                             </Typography>
// // //                           )}
// // //                           <Box sx={{ 
// // //                             display: 'flex', 
// // //                             gap: 0.5, 
// // //                             mt: 0.5,
// // //                             flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
// // //                           }}>
// // //                             <Button
// // //                               size="small"
// // //                               variant="contained"
// // //                               startIcon={isSmallMobile ? null : <VideoCall />}
// // //                               onClick={(e) => {
// // //                                 e.stopPropagation();
// // //                                 handleJoinMeeting(interview);
// // //                               }}
// // //                               sx={{ 
// // //                                 minWidth: 'auto',
// // //                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
// // //                                 height: isSmallMobile ? 16 : 20,
// // //                                 px: isSmallMobile ? 0.5 : 1,
// // //                                 backgroundColor: '#4CAF50',
// // //                                 '&:hover': {
// // //                                   backgroundColor: '#45a049',
// // //                                 }
// // //                               }}
// // //                             >
// // //                               {isSmallMobile ? 'Join' : 'Join'}
// // //                             </Button>
// // //                             <Button
// // //                               size="small"
// // //                               variant="outlined"
// // //                               color={copySuccess ? "success" : "primary"}
// // //                               onClick={(e) => handleCopyLink(interview, e)}
// // //                               sx={{ 
// // //                                 minWidth: 'auto',
// // //                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
// // //                                 height: isSmallMobile ? 16 : 20,
// // //                                 px: isSmallMobile ? 0.5 : 1,
// // //                                 borderColor: '#2196f3',
// // //                                 color: '#2196f3'
// // //                               }}
// // //                             >
// // //                               <ContentCopy fontSize={isSmallMobile ? "small" : "small"} />
// // //                             </Button>
// // //                           </Box>
// // //                         </Box>
// // //                       </Tooltip>
// // //                     );
// // //                   })}
// // //                   {dayInterviews.length > (isSmallMobile ? 2 : 3) && (
// // //                     <Typography variant="caption" color="text.secondary" sx={{ 
// // //                       fontStyle: 'italic',
// // //                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
// // //                     }}>
// // //                       +{dayInterviews.length - (isSmallMobile ? 2 : 3)} more
// // //                     </Typography>
// // //                   )}
// // //                 </Box>

// // //                 {/* Stats */}
// // //                 {dayInterviews.length > 0 && (
// // //                   <Box sx={{ 
// // //                     display: 'flex', 
// // //                     alignItems: 'center', 
// // //                     gap: 0.5,
// // //                     mt: 0.5,
// // //                     pt: 0.5,
// // //                     borderTop: 1,
// // //                     borderColor: 'divider'
// // //                   }}>
// // //                     <Groups sx={{ 
// // //                       fontSize: isSmallMobile ? 10 : isMobile ? 12 : 14, 
// // //                       color: 'success.main' 
// // //                     }} />
// // //                     <Typography variant="caption" color="success.main" sx={{ 
// // //                       fontWeight: 600,
// // //                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
// // //                     }}>
// // //                       {dayInterviews.length} {isSmallMobile ? '' : 'interview'}{dayInterviews.length > 1 && !isSmallMobile ? 's' : ''}
// // //                     </Typography>
// // //                   </Box>
// // //                 )}
// // //               </CardContent>
// // //             </Card>
// // //           );
// // //         })}
// // //       </Box>

// // //       {/* Elegant Join Meeting Dialog - Responsive */}
// // //       <Dialog 
// // //         open={joinDialogOpen} 
// // //         onClose={closeJoinDialog}
// // //         maxWidth="md"
// // //         fullWidth
// // //         fullScreen={isMobile}
// // //         PaperProps={{
// // //           sx: {
// // //             borderRadius: isMobile ? 0 : 4,
// // //             boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0,0,0,0.1)',
// // //             background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
// // //             overflow: 'hidden'
// // //           }
// // //         }}
// // //       >
// // //         <DialogTitle sx={{ 
// // //           pb: 2,
// // //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // //           color: 'white',
// // //           position: 'relative'
// // //         }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// // //             <Box sx={{
// // //               width: isMobile ? 40 : 48,
// // //               height: isMobile ? 40 : 48,
// // //               borderRadius: '50%',
// // //               backgroundColor: 'rgba(255,255,255,0.2)',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               backdropFilter: 'blur(10px)'
// // //             }}>
// // //               <VideoCall sx={{ fontSize: isMobile ? 24 : 28 }} />
// // //             </Box>
// // //             <Box>
// // //               <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, mb: 0.5 }}>
// // //                 Join Interview Meeting
// // //               </Typography>
// // //               <Typography variant="body2" sx={{ opacity: 0.9 }}>
// // //                 Ready to connect with your candidate
// // //               </Typography>
// // //             </Box>
// // //           </Box>
// // //         </DialogTitle>

// // //         <DialogContent sx={{ p: 0 }}>
// // //           {selectedInterview && (
// // //             <Box>
// // //               {/* Interview Details */}
// // //               <Box sx={{ p: isMobile ? 2 : 4, pb: isMobile ? 1 : 2 }}>
// // //                 <Box sx={{ 
// // //                   display: 'flex', 
// // //                   alignItems: 'flex-start', 
// // //                   gap: isMobile ? 2 : 3, 
// // //                   mb: isMobile ? 2 : 3,
// // //                   flexDirection: isSmallMobile ? 'column' : 'row'
// // //                 }}>
// // //                   <Box sx={{
// // //                     width: isMobile ? 50 : 60,
// // //                     height: isMobile ? 50 : 60,
// // //                     borderRadius: isMobile ? 2 : 3,
// // //                     backgroundColor: 'primary.light',
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     justifyContent: 'center',
// // //                     color: 'white',
// // //                     fontSize: isMobile ? '1.25rem' : '1.5rem',
// // //                     fontWeight: 700
// // //                   }}>
// // //                     {selectedInterview.title.charAt(0)}
// // //                   </Box>
// // //                   <Box sx={{ flex: 1 }}>
// // //                     <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
// // //                       fontWeight: 700, 
// // //                       mb: 1, 
// // //                       color: 'text.primary' 
// // //                     }}>
// // //                       {selectedInterview.title}
// // //                     </Typography>
// // //                     <Typography variant="body2" color="text.secondary" sx={{ 
// // //                       lineHeight: 1.6,
// // //                       fontSize: isMobile ? '0.875rem' : '1rem'
// // //                     }}>
// // //                       {selectedInterview.description || 'Interview session with candidate'}
// // //                     </Typography>
// // //                   </Box>
// // //                 </Box>

// // //                 {/* Meeting Information Cards - Responsive */}
// // //                 <Box sx={{ 
// // //                   display: 'grid', 
// // //                   gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
// // //                   gap: 2, 
// // //                   mb: 3 
// // //                 }}>
// // //                   <Paper sx={{ 
// // //                     p: 2, 
// // //                     borderRadius: 3, 
// // //                     border: `1px solid ${theme.palette.divider}` 
// // //                   }}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
// // //                       <CalendarToday color="primary" sx={{ fontSize: isMobile ? 18 : 20 }} />
// // //                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
// // //                         Date & Time
// // //                       </Typography>
// // //                     </Box>
// // //                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// // //                       {formatInterviewDate(selectedInterview)}
// // //                     </Typography>
// // //                     <Typography variant="body2" sx={{ 
// // //                       fontWeight: 600, 
// // //                       color: 'primary.main',
// // //                       fontSize: isMobile ? '0.875rem' : '1rem'
// // //                     }}>
// // //                       {formatInterviewTime(selectedInterview)}
// // //                     </Typography>
// // //                   </Paper>

// // //                   <Paper sx={{ 
// // //                     p: 2, 
// // //                     borderRadius: 3, 
// // //                     border: `1px solid ${theme.palette.divider}` 
// // //                   }}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
// // //                       <CheckCircle color="success" sx={{ fontSize: isMobile ? 18 : 20 }} />
// // //                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
// // //                         Meeting Status
// // //                       </Typography>
// // //                     </Box>
// // //                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// // //                       Ready to join
// // //                     </Typography>
// // //                     <Chip 
// // //                       label="Active" 
// // //                       color="success" 
// // //                       size="small" 
// // //                       sx={{ mt: 0.5, fontWeight: 600 }}
// // //                     />
// // //                   </Paper>
// // //                 </Box>

// // //                 {/* Meeting Link Section */}
// // //                 <Paper sx={{ 
// // //                   p: isMobile ? 2 : 3, 
// // //                   borderRadius: 3,
// // //                   backgroundColor: alpha('#4CAF50', 0.05),
// // //                   border: `2px solid ${alpha('#4CAF50', 0.2)}`,
// // //                   position: 'relative',
// // //                   overflow: 'hidden'
// // //                 }}>
// // //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
// // //                     <Box sx={{
// // //                       width: isMobile ? 36 : 40,
// // //                       height: isMobile ? 36 : 40,
// // //                       borderRadius: '50%',
// // //                       backgroundColor: '#4CAF50',
// // //                       display: 'flex',
// // //                       alignItems: 'center',
// // //                       justifyContent: 'center'
// // //                     }}>
// // //                       <LinkIcon sx={{ color: 'white', fontSize: isMobile ? 18 : 20 }} />
// // //                     </Box>
// // //                     <Box>
// // //                       <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
// // //                         fontWeight: 700, 
// // //                         color: '#2E7D32' 
// // //                       }}>
// // //                         Google Meet Link
// // //                       </Typography>
// // //                       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// // //                         Click to join or copy the link below
// // //                       </Typography>
// // //                     </Box>
// // //                   </Box>

// // //                   <Box sx={{ 
// // //                     display: 'flex', 
// // //                     flexDirection: isMobile ? 'column' : 'row',
// // //                     alignItems: isMobile ? 'stretch' : 'center', 
// // //                     gap: 1, 
// // //                     mb: 2,
// // //                     p: 2,
// // //                     backgroundColor: 'white',
// // //                     borderRadius: 2,
// // //                     border: `1px solid ${theme.palette.divider}`
// // //                   }}>
// // //                     <Typography variant="body1" sx={{ 
// // //                       flex: 1,
// // //                       fontFamily: 'monospace',
// // //                       fontWeight: 600,
// // //                       color: '#2E7D32',
// // //                       wordBreak: 'break-all',
// // //                       fontSize: isMobile ? '0.875rem' : '1rem',
// // //                       mb: isMobile ? 1 : 0
// // //                     }}>
// // //                       {generateMeetLink(selectedInterview)}
// // //                     </Typography>
// // //                     <Button
// // //                       variant="contained"
// // //                       color={copySuccess ? "success" : "primary"}
// // //                       onClick={() => handleCopyLink(selectedInterview, { stopPropagation: () => {} } as any)}
// // //                       startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
// // //                       sx={{
// // //                         minWidth: 'auto',
// // //                         px: 2,
// // //                         backgroundColor: copySuccess ? '#4CAF50' : '#2196f3',
// // //                         '&:hover': {
// // //                           backgroundColor: copySuccess ? '#45a049' : '#1976d2',
// // //                         }
// // //                       }}
// // //                     >
// // //                       {copySuccess ? 'Copied!' : 'Copy'}
// // //                     </Button>
// // //                   </Box>

// // //                   <Box sx={{ 
// // //                     display: 'flex', 
// // //                     alignItems: 'center', 
// // //                     gap: 1,
// // //                     flexWrap: isMobile ? 'wrap' : 'nowrap'
// // //                   }}>
// // //                     <Chip 
// // //                       icon={<CheckCircle />}
// // //                       label="Valid Meeting Code" 
// // //                       color="success"
// // //                       variant="filled"
// // //                       size={isMobile ? "small" : "medium"}
// // //                       sx={{ fontWeight: 600 }}
// // //                     />
// // //                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
// // //                       Code: <strong>{generateValidMeetCode(selectedInterview)}</strong>
// // //                     </Typography>
// // //                   </Box>
// // //                 </Paper>

// // //                 {/* Alternative Options */}
// // //                 <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
// // //                   <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
// // //                     Alternative Options
// // //                   </Typography>
// // //                   <Typography variant="caption" color="text.secondary" sx={{ 
// // //                     fontFamily: 'monospace',
// // //                     fontSize: isMobile ? '0.75rem' : '0.875rem',
// // //                     wordBreak: 'break-all'
// // //                   }}>
// // //                     {generateZoomLink(selectedInterview)}
// // //                   </Typography>
// // //                 </Box>
// // //               </Box>

// // //               <Divider />
// // //             </Box>
// // //           )}
// // //         </DialogContent>

// // //         <DialogActions sx={{ p: isMobile ? 2 : 3, gap: 2 }}>
// // //           <Button 
// // //             onClick={closeJoinDialog}
// // //             variant="outlined"
// // //             sx={{ 
// // //               borderRadius: 2,
// // //               px: 3,
// // //               py: 1,
// // //               borderColor: theme.palette.divider,
// // //               color: 'text.secondary'
// // //             }}
// // //           >
// // //             Close
// // //           </Button>
// // //           <Button 
// // //             variant="contained"
// // //             startIcon={<OpenInNew />}
// // //             onClick={() => selectedInterview && handleJoinMeeting(selectedInterview)}
// // //             sx={{ 
// // //               borderRadius: 2,
// // //               px: 4,
// // //               py: 1,
// // //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// // //               '&:hover': {
// // //                 background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
// // //                 boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
// // //               },
// // //               fontWeight: 600,
// // //               fontSize: isMobile ? '0.875rem' : '1rem'
// // //             }}
// // //           >
// // //             Join Meeting Now
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>

// // //       {/* Snackbar for notifications */}
// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         autoHideDuration={3000}
// // //         onClose={() => setSnackbarOpen(false)}
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// // //       >
// // //         <Alert 
// // //           onClose={() => setSnackbarOpen(false)} 
// // //           severity="success"
// // //           variant="filled"
// // //           sx={{
// // //             borderRadius: 3,
// // //             fontWeight: 600
// // //           }}
// // //         >
// // //           {snackbarMessage}
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // export default InterviewCalendar;




// // // components/interviews/InterviewCalendar.tsx
// // import React, { useState, useMemo, useEffect } from 'react';
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
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Snackbar,
// //   Alert,
// //   Paper,
// //   Divider,
// //   useTheme,
// //   useMediaQuery,
// // } from '@mui/material';
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   Today,
// //   VideoCall,
// //   Person,
// //   ContentCopy,
// //   OpenInNew,
// //   CalendarToday,
// //   Schedule,
// //   Link as LinkIcon,
// //   CheckCircle,
// //   Groups,
// // } from '@mui/icons-material';
// // import { InterviewStructure } from '../../types';

// // interface InterviewCalendarProps {
// //   interviews: InterviewStructure[];
// //   onInterviewClick?: (interview: InterviewStructure) => void;
// // }

// // const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ 
// //   interviews, 
// //   onInterviewClick 
// // }) => {
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [selectedInterview, setSelectedInterview] = useState<InterviewStructure | null>(null);
// //   const [joinDialogOpen, setJoinDialogOpen] = useState(false);
// //   const [copySuccess, setCopySuccess] = useState(false);
// //   const [snackbarOpen, setSnackbarOpen] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
// //   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   // Reset copy success state when dialog closes
// //   useEffect(() => {
// //     if (!joinDialogOpen) {
// //       setCopySuccess(false);
// //     }
// //   }, [joinDialogOpen]);

// //   // Función para normalizar fechas (eliminar información de tiempo)
// //   const normalizeDate = (date: Date): Date => {
// //     const normalized = new Date(date);
// //     normalized.setHours(0, 0, 0, 0);
// //     return normalized;
// //   };

// //   // Función para crear fechas en zona horaria local
// //   const createLocalDate = (year: number, month: number, day: number): Date => {
// //     return new Date(year, month, day, 0, 0, 0, 0);
// //   };

// //   const daysInMonth = useMemo(() => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();
    
// //     // Primer día del mes actual
// //     const firstDay = createLocalDate(year, month, 1);
// //     // Último día del mes actual
// //     const lastDay = createLocalDate(year, month + 1, 0);
    
// //     const days = [];
    
// //     // Días del mes anterior
// //     const prevMonthLastDay = createLocalDate(year, month, 0).getDate();
// //     const firstDayOfWeek = firstDay.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
// //     // Ajustar para que la semana empiece en Domingo (0)
// //     for (let i = firstDayOfWeek - 1; i >= 0; i--) {
// //       days.push(createLocalDate(year, month - 1, prevMonthLastDay - i));
// //     }
    
// //     // Días del mes actual
// //     for (let i = 1; i <= lastDay.getDate(); i++) {
// //       days.push(createLocalDate(year, month, i));
// //     }
    
// //     // Días del próximo mes para completar 6 semanas (42 días)
// //     const totalCells = 42;
// //     const nextMonth = month + 1;
// //     const nextMonthYear = nextMonth > 11 ? year + 1 : year;
// //     const adjustedNextMonth = nextMonth > 11 ? 0 : nextMonth;
    
// //     let nextMonthDay = 1;
// //     while (days.length < totalCells) {
// //       days.push(createLocalDate(nextMonthYear, adjustedNextMonth, nextMonthDay));
// //       nextMonthDay++;
// //     }
    
// //     return days;
// //   }, [currentDate]);

// //   // Función para generar un código de Google Meet válido
// //   const generateValidMeetCode = (interview: InterviewStructure | any): string => {
// //     if (interview.meetingLink) {
// //       const match = interview.meetingLink.match(/https:\/\/meet\.google\.com\/([a-z0-9-]+)/);
// //       if (match && match[1]) {
// //         return match[1];
// //       }
// //     }
    
// //     // Si no hay meetingLink, usar el código por defecto o generar uno
// //     return interview.meetingCode || 'zii-bwgi-kxu';
// //   };

// //   const generateMeetLink = (interview: InterviewStructure): string => {
// //     const meetCode = generateValidMeetCode(interview);
// //     return `https://meet.google.com/${meetCode}`;
// //   };

// //   const generateZoomLink = (interview: InterviewStructure): string => {
// //     const meetingId = Math.abs(interview.id.split('').reduce((a, b) => {
// //       a = ((a << 5) - a) + b.charCodeAt(0);
// //       return a & a;
// //     }, 0)).toString().substring(0, 10);
    
// //     return `https://zoom.us/j/${meetingId}?pwd=${btoa(interview.id).substring(0, 10)}`;
// //   };

// //   const handleJoinMeeting = (interview: InterviewStructure) => {
// //     const meetLink = generateMeetLink(interview);
// //     window.open(meetLink, '_blank', 'noopener,noreferrer');
// //   };

// //   const handleCopyLink = async (interview: InterviewStructure, event: React.MouseEvent) => {
// //     event.stopPropagation();
    
// //     try {
// //       const meetingLink = generateMeetLink(interview);
// //       await navigator.clipboard.writeText(meetingLink);
// //       setCopySuccess(true);
// //       setSnackbarMessage('Meeting link copied to clipboard! 🎉');
// //       setSnackbarOpen(true);
      
// //       setTimeout(() => {
// //         setCopySuccess(false);
// //       }, 2000);
// //     } catch (error) {
// //       console.error('Error copying link:', error);
// //       setSnackbarMessage('Error copying link');
// //       setSnackbarOpen(true);
// //     }
// //   };

// //   const handleInterviewClick = (interview: InterviewStructure) => {
// //     setSelectedInterview(interview);
// //     setJoinDialogOpen(true);
// //     onInterviewClick?.(interview);
// //   };

// //   const closeJoinDialog = () => {
// //     setJoinDialogOpen(false);
// //     setSelectedInterview(null);
// //   };

// //   const navigateMonth = (direction: 'prev' | 'next') => {
// //     setCurrentDate(prev => {
// //       const newDate = new Date(prev);
// //       if (direction === 'prev') {
// //         newDate.setMonth(prev.getMonth() - 1);
// //       } else {
// //         newDate.setMonth(prev.getMonth() + 1);
// //       }
// //       return newDate;
// //     });
// //   };

// //   const goToToday = () => {
// //     setCurrentDate(new Date());
// //   };

// //   const getInterviewsForDate = (date: Date) => {
// //     const normalizedDate = normalizeDate(date);
    
// //     return interviews.filter(interview => {
// //       return interview.availableSlots?.some(slot => {
// //         if (!slot.date) return false;
        
// //         const slotDate = normalizeDate(new Date(slot.date));
// //         return slotDate.getTime() === normalizedDate.getTime();
// //       });
// //     });
// //   };

// //   const isToday = (date: Date) => {
// //     const today = normalizeDate(new Date());
// //     const targetDate = normalizeDate(date);
// //     return targetDate.getTime() === today.getTime();
// //   };

// //   const isCurrentMonth = (date: Date) => {
// //     return date.getMonth() === currentDate.getMonth();
// //   };

// //   const formatMonthYear = (date: Date) => {
// //     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
// //   };

// //   const getDayAbbreviation = (date: Date) => {
// //     return date.toLocaleDateString('en-US', { weekday: isMobile ? 'narrow' : 'short' });
// //   };

// //   const getNextSlotForInterview = (interview: InterviewStructure, date: Date) => {
// //     const normalizedDate = normalizeDate(date);
    
// //     return interview.availableSlots?.find(slot => {
// //       if (!slot.date) return false;
      
// //       const slotDate = normalizeDate(new Date(slot.date));
// //       return slotDate.getTime() === normalizedDate.getTime();
// //     });
// //   };

// //   const formatInterviewDate = (interview: InterviewStructure): string => {
// //     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No date set';
    
// //     const slot = interview.availableSlots[0];
// //     if (!slot.date) return 'No date set';
    
// //     const slotDate = new Date(slot.date);
    
// //     return slotDate.toLocaleDateString('en-US', {
// //       weekday: 'long',
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   const formatInterviewTime = (interview: InterviewStructure): string => {
// //     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No time set';
    
// //     const slot = interview.availableSlots[0];
// //     return slot.startTime || 'Time not specified';
// //   };

// //   // Estilos responsive para las celdas del calendario
// //   const getCalendarCellStyles = () => {
// //     if (isSmallMobile) {
// //       return {
// //         minHeight: 120,
// //         p: 1,
// //         '& .MuiCardContent-root': { p: 1 }
// //       };
// //     } else if (isMobile) {
// //       return {
// //         minHeight: 140,
// //         p: 1.5,
// //         '& .MuiCardContent-root': { p: 1.5 }
// //       };
// //     }
// //     return {
// //       minHeight: 160,
// //       p: 2,
// //       '& .MuiCardContent-root': { p: 2 }
// //     };
// //   };

// //   // Función para debug: mostrar información de fechas
// //   const debugDateInfo = (date: Date) => {
// //     return {
// //       date: date.toISOString().split('T')[0],
// //       day: date.getDate(),
// //       month: date.getMonth(),
// //       year: date.getFullYear(),
// //       dayOfWeek: date.getDay(),
// //       time: date.toTimeString()
// //     };
// //   };

// //   return (
// //     <Box>
// //       {/* Calendar Header - Responsive */}
// //       <Box sx={{ 
// //         display: 'flex', 
// //         flexDirection: isMobile ? 'column' : 'row',
// //         justifyContent: 'space-between', 
// //         alignItems: isMobile ? 'stretch' : 'center',
// //         gap: isMobile ? 2 : 0,
// //         mb: 4,
// //         p: isMobile ? 2 : 3,
// //         backgroundColor: 'grey.50',
// //         borderRadius: 3,
// //         border: `1px solid ${theme.palette.divider}`
// //       }}>
// //         <Box sx={{ 
// //           display: 'flex', 
// //           alignItems: 'center', 
// //           gap: 2,
// //           justifyContent: isMobile ? 'space-between' : 'flex-start'
// //         }}>
// //           <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
// //             fontWeight: 700, 
// //             color: 'primary.main',
// //             fontSize: isMobile ? '1.25rem' : '1.5rem'
// //           }}>
// //             {formatMonthYear(currentDate)}
// //           </Typography>
// //           <Chip 
// //             icon={<Today />}
// //             label="Today"
// //             onClick={goToToday}
// //             variant="outlined"
// //             clickable
// //             size={isMobile ? "small" : "medium"}
// //             sx={{ 
// //               borderColor: 'primary.main',
// //               color: 'primary.main',
// //               '&:hover': {
// //                 backgroundColor: 'primary.main',
// //                 color: 'white'
// //               }
// //             }}
// //           />
// //         </Box>
        
// //         <Box sx={{ 
// //           display: 'flex', 
// //           gap: 1,
// //           justifyContent: isMobile ? 'center' : 'flex-end',
// //           mt: isMobile ? 1 : 0
// //         }}>
// //           <IconButton 
// //             onClick={() => navigateMonth('prev')}
// //             size={isMobile ? "small" : "medium"}
// //             sx={{ 
// //               backgroundColor: 'white',
// //               '&:hover': { backgroundColor: 'grey.100' }
// //             }}
// //           >
// //             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
// //           </IconButton>
// //           <IconButton 
// //             onClick={() => navigateMonth('next')}
// //             size={isMobile ? "small" : "medium"}
// //             sx={{ 
// //               backgroundColor: 'white',
// //               '&:hover': { backgroundColor: 'grey.100' }
// //             }}
// //           >
// //             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
// //           </IconButton>
// //         </Box>
// //       </Box>

// //       {/* Calendar Grid - Responsive */}
// //       <Box sx={{ 
// //         display: 'grid', 
// //         gridTemplateColumns: 'repeat(7, 1fr)',
// //         gap: 1,
// //         mb: 2
// //       }}>
// //         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
// //           <Box key={day} sx={{ 
// //             p: isMobile ? 1 : 2, 
// //             textAlign: 'center' 
// //           }}>
// //             <Typography variant="subtitle2" sx={{ 
// //               fontWeight: 600, 
// //               color: 'text.secondary',
// //               fontSize: isMobile ? '0.75rem' : '0.875rem'
// //             }}>
// //               {isMobile ? day : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
// //             </Typography>
// //           </Box>
// //         ))}
// //       </Box>

// //       <Box sx={{ 
// //         display: 'grid', 
// //         gridTemplateColumns: 'repeat(7, 1fr)',
// //         gap: 1
// //       }}>
// //         {daysInMonth.map((date, index) => {
// //           const dayInterviews = getInterviewsForDate(date);
// //           const isTodayDate = isToday(date);
// //           const isCurrentMonthDate = isCurrentMonth(date);

// //           return (
// //             <Card
// //               key={index}
// //               sx={{
// //                 ...getCalendarCellStyles(),
// //                 borderRadius: 2,
// //                 border: isTodayDate ? 2 : 1,
// //                 borderColor: isTodayDate ? 'primary.main' : 'divider',
// //                 backgroundColor: isTodayDate ? alpha('#2196f3', 0.04) : 'white',
// //                 opacity: isCurrentMonthDate ? 1 : 0.4,
// //                 transition: 'all 0.3s ease-in-out',
// //                 '&:hover': {
// //                   transform: isMobile ? 'none' : 'translateY(-2px)',
// //                   boxShadow: isMobile ? 1 : 4,
// //                 }
// //               }}
// //             >
// //               <CardContent sx={{ 
// //                 p: isSmallMobile ? 0.5 : isMobile ? 1 : 2,
// //                 height: '100%',
// //                 '&:last-child': { pb: isSmallMobile ? 0.5 : isMobile ? 1 : 2 }
// //               }}>
// //                 <Box sx={{ 
// //                   display: 'flex', 
// //                   justifyContent: 'space-between', 
// //                   alignItems: 'flex-start',
// //                   mb: 0.5
// //                 }}>
// //                   <Typography 
// //                     variant="body2" 
// //                     sx={{ 
// //                       fontWeight: isTodayDate ? 700 : 600,
// //                       color: isTodayDate ? 'primary.main' : 'text.primary',
// //                       fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.875rem' : '1rem'
// //                     }}
// //                   >
// //                     {date.getDate()}
// //                   </Typography>
// //                   <Typography variant="caption" color="text.secondary" sx={{ 
// //                     fontWeight: 500,
// //                     fontSize: isSmallMobile ? '0.6rem' : '0.75rem'
// //                   }}>
// //                     {getDayAbbreviation(date)}
// //                   </Typography>
// //                 </Box>

// //                 {/* Interview List for the Day - Responsive */}
// //                 <Box sx={{ 
// //                   maxHeight: isSmallMobile ? 80 : isMobile ? 100 : 120, 
// //                   overflow: 'auto',
// //                   '&::-webkit-scrollbar': {
// //                     width: '4px',
// //                   },
// //                   '&::-webkit-scrollbar-thumb': {
// //                     backgroundColor: theme.palette.grey[300],
// //                     borderRadius: '2px',
// //                   }
// //                 }}>
// //                   {dayInterviews.slice(0, isSmallMobile ? 2 : 3).map(interview => {
// //                     const slot = getNextSlotForInterview(interview, date);
// //                     const meetingCode = generateValidMeetCode(interview);
                    
// //                     return (
// //                       <Tooltip 
// //                         key={interview.id} 
// //                         title={
// //                           <Box sx={{ p: 1 }}>
// //                             <Typography variant="subtitle2" gutterBottom>
// //                               {interview.title}
// //                             </Typography>
// //                             <Typography variant="caption" display="block">
// //                               🕒 {slot?.startTime || 'No time specified'}
// //                             </Typography>
// //                             <Typography variant="caption" display="block">
// //                               🔗 {meetingCode} ✅
// //                             </Typography>
// //                           </Box>
// //                         } 
// //                         arrow
// //                         placement="top"
// //                       >
// //                         <Box
// //                           sx={{
// //                             mb: 0.5,
// //                             p: isSmallMobile ? 0.5 : 1,
// //                             borderRadius: 1,
// //                             backgroundColor: alpha('#4CAF50', 0.08),
// //                             border: '1px solid',
// //                             borderColor: alpha('#4CAF50', 0.2),
// //                             cursor: 'pointer',
// //                             transition: 'all 0.3s ease-in-out',
// //                             '&:hover': {
// //                               backgroundColor: alpha('#4CAF50', 0.12),
// //                               transform: isMobile ? 'none' : 'translateX(2px)',
// //                             }
// //                           }}
// //                           onClick={() => handleInterviewClick(interview)}
// //                         >
// //                           <Typography variant="caption" sx={{ 
// //                             fontWeight: 600, 
// //                             display: 'block', 
// //                             color: '#2E7D32',
// //                             fontSize: isSmallMobile ? '0.55rem' : '0.65rem',
// //                             lineHeight: 1.2
// //                           }}>
// //                             {isSmallMobile 
// //                               ? interview.title.split(' ')[0] 
// //                               : interview.title.length > 20 
// //                                 ? `${interview.title.substring(0, 20)}...`
// //                                 : interview.title
// //                             }
// //                           </Typography>
// //                           {slot && (
// //                             <Typography variant="caption" color="text.secondary" display="block" sx={{ 
// //                               fontSize: isSmallMobile ? '0.5rem' : '0.6rem',
// //                               lineHeight: 1.2
// //                             }}>
// //                               🕒 {slot.startTime}
// //                             </Typography>
// //                           )}
// //                           {!isSmallMobile && (
// //                             <Typography variant="caption" color="success.main" display="block" sx={{ 
// //                               fontSize: '0.6rem', 
// //                               fontWeight: 600,
// //                               lineHeight: 1.2
// //                             }}>
// //                               🔗 {meetingCode.substring(0, 8)}... ✅
// //                             </Typography>
// //                           )}
// //                           <Box sx={{ 
// //                             display: 'flex', 
// //                             gap: 0.5, 
// //                             mt: 0.5,
// //                             flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
// //                           }}>
// //                             <Button
// //                               size="small"
// //                               variant="contained"
// //                               startIcon={isSmallMobile ? null : <VideoCall />}
// //                               onClick={(e) => {
// //                                 e.stopPropagation();
// //                                 handleJoinMeeting(interview);
// //                               }}
// //                               sx={{ 
// //                                 minWidth: 'auto',
// //                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
// //                                 height: isSmallMobile ? 16 : 20,
// //                                 px: isSmallMobile ? 0.5 : 1,
// //                                 backgroundColor: '#4CAF50',
// //                                 '&:hover': {
// //                                   backgroundColor: '#45a049',
// //                                 }
// //                               }}
// //                             >
// //                               {isSmallMobile ? 'Join' : 'Join'}
// //                             </Button>
// //                             <Button
// //                               size="small"
// //                               variant="outlined"
// //                               color={copySuccess ? "success" : "primary"}
// //                               onClick={(e) => handleCopyLink(interview, e)}
// //                               sx={{ 
// //                                 minWidth: 'auto',
// //                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
// //                                 height: isSmallMobile ? 16 : 20,
// //                                 px: isSmallMobile ? 0.5 : 1,
// //                                 borderColor: '#2196f3',
// //                                 color: '#2196f3'
// //                               }}
// //                             >
// //                               <ContentCopy fontSize={isSmallMobile ? "small" : "small"} />
// //                             </Button>
// //                           </Box>
// //                         </Box>
// //                       </Tooltip>
// //                     );
// //                   })}
// //                   {dayInterviews.length > (isSmallMobile ? 2 : 3) && (
// //                     <Typography variant="caption" color="text.secondary" sx={{ 
// //                       fontStyle: 'italic',
// //                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
// //                     }}>
// //                       +{dayInterviews.length - (isSmallMobile ? 2 : 3)} more
// //                     </Typography>
// //                   )}
// //                 </Box>

// //                 {/* Stats */}
// //                 {dayInterviews.length > 0 && (
// //                   <Box sx={{ 
// //                     display: 'flex', 
// //                     alignItems: 'center', 
// //                     gap: 0.5,
// //                     mt: 0.5,
// //                     pt: 0.5,
// //                     borderTop: 1,
// //                     borderColor: 'divider'
// //                   }}>
// //                     <Groups sx={{ 
// //                       fontSize: isSmallMobile ? 10 : isMobile ? 12 : 14, 
// //                       color: 'success.main' 
// //                     }} />
// //                     <Typography variant="caption" color="success.main" sx={{ 
// //                       fontWeight: 600,
// //                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
// //                     }}>
// //                       {dayInterviews.length} {isSmallMobile ? '' : 'interview'}{dayInterviews.length > 1 && !isSmallMobile ? 's' : ''}
// //                     </Typography>
// //                   </Box>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           );
// //         })}
// //       </Box>

// //       {/* Elegant Join Meeting Dialog - Responsive */}
// //       <Dialog 
// //         open={joinDialogOpen} 
// //         onClose={closeJoinDialog}
// //         maxWidth="md"
// //         fullWidth
// //         fullScreen={isMobile}
// //         PaperProps={{
// //           sx: {
// //             borderRadius: isMobile ? 0 : 4,
// //             boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0,0,0,0.1)',
// //             background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
// //             overflow: 'hidden'
// //           }
// //         }}
// //       >
// //         <DialogTitle sx={{ 
// //           pb: 2,
// //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //           color: 'white',
// //           position: 'relative'
// //         }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //             <Box sx={{
// //               width: isMobile ? 40 : 48,
// //               height: isMobile ? 40 : 48,
// //               borderRadius: '50%',
// //               backgroundColor: 'rgba(255,255,255,0.2)',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               backdropFilter: 'blur(10px)'
// //             }}>
// //               <VideoCall sx={{ fontSize: isMobile ? 24 : 28 }} />
// //             </Box>
// //             <Box>
// //               <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, mb: 0.5 }}>
// //                 Join Interview Meeting
// //               </Typography>
// //               <Typography variant="body2" sx={{ opacity: 0.9 }}>
// //                 Ready to connect with your candidate
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </DialogTitle>

// //         <DialogContent sx={{ p: 0 }}>
// //           {selectedInterview && (
// //             <Box>
// //               {/* Interview Details */}
// //               <Box sx={{ p: isMobile ? 2 : 4, pb: isMobile ? 1 : 2 }}>
// //                 <Box sx={{ 
// //                   display: 'flex', 
// //                   alignItems: 'flex-start', 
// //                   gap: isMobile ? 2 : 3, 
// //                   mb: isMobile ? 2 : 3,
// //                   flexDirection: isSmallMobile ? 'column' : 'row'
// //                 }}>
// //                   <Box sx={{
// //                     width: isMobile ? 50 : 60,
// //                     height: isMobile ? 50 : 60,
// //                     borderRadius: isMobile ? 2 : 3,
// //                     backgroundColor: 'primary.light',
// //                     display: 'flex',
// //                     alignItems: 'center',
// //                     justifyContent: 'center',
// //                     color: 'white',
// //                     fontSize: isMobile ? '1.25rem' : '1.5rem',
// //                     fontWeight: 700
// //                   }}>
// //                     {selectedInterview.title.charAt(0)}
// //                   </Box>
// //                   <Box sx={{ flex: 1 }}>
// //                     <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
// //                       fontWeight: 700, 
// //                       mb: 1, 
// //                       color: 'text.primary' 
// //                     }}>
// //                       {selectedInterview.title}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary" sx={{ 
// //                       lineHeight: 1.6,
// //                       fontSize: isMobile ? '0.875rem' : '1rem'
// //                     }}>
// //                       {selectedInterview.description || 'Interview session with candidate'}
// //                     </Typography>
// //                   </Box>
// //                 </Box>

// //                 {/* Meeting Information Cards - Responsive */}
// //                 <Box sx={{ 
// //                   display: 'grid', 
// //                   gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
// //                   gap: 2, 
// //                   mb: 3 
// //                 }}>
// //                   <Paper sx={{ 
// //                     p: 2, 
// //                     borderRadius: 3, 
// //                     border: `1px solid ${theme.palette.divider}` 
// //                   }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
// //                       <CalendarToday color="primary" sx={{ fontSize: isMobile ? 18 : 20 }} />
// //                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
// //                         Date & Time
// //                       </Typography>
// //                     </Box>
// //                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// //                       {formatInterviewDate(selectedInterview)}
// //                     </Typography>
// //                     <Typography variant="body2" sx={{ 
// //                       fontWeight: 600, 
// //                       color: 'primary.main',
// //                       fontSize: isMobile ? '0.875rem' : '1rem'
// //                     }}>
// //                       {formatInterviewTime(selectedInterview)}
// //                     </Typography>
// //                   </Paper>

// //                   <Paper sx={{ 
// //                     p: 2, 
// //                     borderRadius: 3, 
// //                     border: `1px solid ${theme.palette.divider}` 
// //                   }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
// //                       <CheckCircle color="success" sx={{ fontSize: isMobile ? 18 : 20 }} />
// //                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
// //                         Meeting Status
// //                       </Typography>
// //                     </Box>
// //                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// //                       Ready to join
// //                     </Typography>
// //                     <Chip 
// //                       label="Active" 
// //                       color="success" 
// //                       size="small" 
// //                       sx={{ mt: 0.5, fontWeight: 600 }}
// //                     />
// //                   </Paper>
// //                 </Box>

// //                 {/* Meeting Link Section */}
// //                 <Paper sx={{ 
// //                   p: isMobile ? 2 : 3, 
// //                   borderRadius: 3,
// //                   backgroundColor: alpha('#4CAF50', 0.05),
// //                   border: `2px solid ${alpha('#4CAF50', 0.2)}`,
// //                   position: 'relative',
// //                   overflow: 'hidden'
// //                 }}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
// //                     <Box sx={{
// //                       width: isMobile ? 36 : 40,
// //                       height: isMobile ? 36 : 40,
// //                       borderRadius: '50%',
// //                       backgroundColor: '#4CAF50',
// //                       display: 'flex',
// //                       alignItems: 'center',
// //                       justifyContent: 'center'
// //                     }}>
// //                       <LinkIcon sx={{ color: 'white', fontSize: isMobile ? 18 : 20 }} />
// //                     </Box>
// //                     <Box>
// //                       <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
// //                         fontWeight: 700, 
// //                         color: '#2E7D32' 
// //                       }}>
// //                         Google Meet Link
// //                       </Typography>
// //                       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
// //                         Click to join or copy the link below
// //                       </Typography>
// //                     </Box>
// //                   </Box>

// //                   <Box sx={{ 
// //                     display: 'flex', 
// //                     flexDirection: isMobile ? 'column' : 'row',
// //                     alignItems: isMobile ? 'stretch' : 'center', 
// //                     gap: 1, 
// //                     mb: 2,
// //                     p: 2,
// //                     backgroundColor: 'white',
// //                     borderRadius: 2,
// //                     border: `1px solid ${theme.palette.divider}`
// //                   }}>
// //                     <Typography variant="body1" sx={{ 
// //                       flex: 1,
// //                       fontFamily: 'monospace',
// //                       fontWeight: 600,
// //                       color: '#2E7D32',
// //                       wordBreak: 'break-all',
// //                       fontSize: isMobile ? '0.875rem' : '1rem',
// //                       mb: isMobile ? 1 : 0
// //                     }}>
// //                       {generateMeetLink(selectedInterview)}
// //                     </Typography>
// //                     <Button
// //                       variant="contained"
// //                       color={copySuccess ? "success" : "primary"}
// //                       onClick={() => handleCopyLink(selectedInterview, { stopPropagation: () => {} } as any)}
// //                       startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
// //                       sx={{
// //                         minWidth: 'auto',
// //                         px: 2,
// //                         backgroundColor: copySuccess ? '#4CAF50' : '#2196f3',
// //                         '&:hover': {
// //                           backgroundColor: copySuccess ? '#45a049' : '#1976d2',
// //                         }
// //                       }}
// //                     >
// //                       {copySuccess ? 'Copied!' : 'Copy'}
// //                     </Button>
// //                   </Box>

// //                   <Box sx={{ 
// //                     display: 'flex', 
// //                     alignItems: 'center', 
// //                     gap: 1,
// //                     flexWrap: isMobile ? 'wrap' : 'nowrap'
// //                   }}>
// //                     <Chip 
// //                       icon={<CheckCircle />}
// //                       label="Valid Meeting Code" 
// //                       color="success"
// //                       variant="filled"
// //                       size={isMobile ? "small" : "medium"}
// //                       sx={{ fontWeight: 600 }}
// //                     />
// //                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
// //                       Code: <strong>{generateValidMeetCode(selectedInterview)}</strong>
// //                     </Typography>
// //                   </Box>
// //                 </Paper>

// //                 {/* Alternative Options */}
// //                 <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
// //                   <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
// //                     Alternative Options
// //                   </Typography>
// //                   <Typography variant="caption" color="text.secondary" sx={{ 
// //                     fontFamily: 'monospace',
// //                     fontSize: isMobile ? '0.75rem' : '0.875rem',
// //                     wordBreak: 'break-all'
// //                   }}>
// //                     {generateZoomLink(selectedInterview)}
// //                   </Typography>
// //                 </Box>
// //               </Box>

// //               <Divider />
// //             </Box>
// //           )}
// //         </DialogContent>

// //         <DialogActions sx={{ p: isMobile ? 2 : 3, gap: 2 }}>
// //           <Button 
// //             onClick={closeJoinDialog}
// //             variant="outlined"
// //             sx={{ 
// //               borderRadius: 2,
// //               px: 3,
// //               py: 1,
// //               borderColor: theme.palette.divider,
// //               color: 'text.secondary'
// //             }}
// //           >
// //             Close
// //           </Button>
// //           <Button 
// //             variant="contained"
// //             startIcon={<OpenInNew />}
// //             onClick={() => selectedInterview && handleJoinMeeting(selectedInterview)}
// //             sx={{ 
// //               borderRadius: 2,
// //               px: 4,
// //               py: 1,
// //               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// //               '&:hover': {
// //                 background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
// //                 boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
// //               },
// //               fontWeight: 600,
// //               fontSize: isMobile ? '0.875rem' : '1rem'
// //             }}
// //           >
// //             Join Meeting Now
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Snackbar for notifications */}
// //       <Snackbar
// //         open={snackbarOpen}
// //         autoHideDuration={3000}
// //         onClose={() => setSnackbarOpen(false)}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// //       >
// //         <Alert 
// //           onClose={() => setSnackbarOpen(false)} 
// //           severity="success"
// //           variant="filled"
// //           sx={{
// //             borderRadius: 3,
// //             fontWeight: 600
// //           }}
// //         >
// //           {snackbarMessage}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default InterviewCalendar;



// // components/interviews/InterviewCalendar.tsx
// import React, { useState, useMemo, useEffect } from 'react';
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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Paper,
//   Divider,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   ChevronLeft,
//   ChevronRight,
//   Today,
//   VideoCall,
//   Person,
//   ContentCopy,
//   OpenInNew,
//   CalendarToday,
//   Schedule,
//   Link as LinkIcon,
//   CheckCircle,
//   Groups,
// } from '@mui/icons-material';
// import { InterviewStructure } from '../../types';

// interface InterviewCalendarProps {
//   interviews: InterviewStructure[];
//   onInterviewClick?: (interview: InterviewStructure) => void;
// }

// const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ 
//   interviews, 
//   onInterviewClick 
// }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedInterview, setSelectedInterview] = useState<InterviewStructure | null>(null);
//   const [joinDialogOpen, setJoinDialogOpen] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Reset copy success state when dialog closes
//   useEffect(() => {
//     if (!joinDialogOpen) {
//       setCopySuccess(false);
//     }
//   }, [joinDialogOpen]);

//   // Función para normalizar fechas (eliminar información de tiempo)
//   const normalizeDate = (date: Date): Date => {
//     const normalized = new Date(date);
//     normalized.setHours(0, 0, 0, 0);
//     return normalized;
//   };

//   // Función para crear fechas en zona horaria local
//   const createLocalDate = (year: number, month: number, day: number): Date => {
//     return new Date(year, month, day, 0, 0, 0, 0);
//   };

//   const daysInMonth = useMemo(() => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     // Primer día del mes actual
//     const firstDay = createLocalDate(year, month, 1);
//     // Último día del mes actual
//     const lastDay = createLocalDate(year, month + 1, 0);
    
//     const days = [];
    
//     // Días del mes anterior - CORREGIDO
//     // El primer día de la semana es Domingo (0), necesitamos mostrar los días desde el Domingo anterior
//     const firstDayOfWeek = firstDay.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
//     // Si el primer día no es Domingo, agregar días del mes anterior
//     if (firstDayOfWeek > 0) {
//       const prevMonthLastDay = createLocalDate(year, month, 0).getDate();
//       // Comenzar desde el último día del mes anterior y retroceder
//       for (let i = firstDayOfWeek - 1; i >= 0; i--) {
//         days.push(createLocalDate(year, month - 1, prevMonthLastDay - i));
//       }
//     }
    
//     // Días del mes actual
//     for (let i = 1; i <= lastDay.getDate(); i++) {
//       days.push(createLocalDate(year, month, i));
//     }
    
//     // Días del próximo mes para completar 6 semanas (42 días)
//     const totalCells = 42;
//     const nextMonth = month + 1;
//     const nextMonthYear = nextMonth > 11 ? year + 1 : year;
//     const adjustedNextMonth = nextMonth > 11 ? 0 : nextMonth;
    
//     let nextMonthDay = 1;
//     while (days.length < totalCells) {
//       days.push(createLocalDate(nextMonthYear, adjustedNextMonth, nextMonthDay));
//       nextMonthDay++;
//     }
    
//     return days;
//   }, [currentDate]);

//   // Función para generar un código de Google Meet válido
//   const generateValidMeetCode = (interview: InterviewStructure | any): string => {
//     if (interview.meetingLink) {
//       const match = interview.meetingLink.match(/https:\/\/meet\.google\.com\/([a-z0-9-]+)/);
//       if (match && match[1]) {
//         return match[1];
//       }
//     }
    
//     // Si no hay meetingLink, usar el código por defecto o generar uno
//     return interview.meetingCode || 'zii-bwgi-kxu';
//   };

//   const generateMeetLink = (interview: InterviewStructure): string => {
//     const meetCode = generateValidMeetCode(interview);
//     return `https://meet.google.com/${meetCode}`;
//   };

//   const generateZoomLink = (interview: InterviewStructure): string => {
//     const meetingId = Math.abs(interview.id.split('').reduce((a, b) => {
//       a = ((a << 5) - a) + b.charCodeAt(0);
//       return a & a;
//     }, 0)).toString().substring(0, 10);
    
//     return `https://zoom.us/j/${meetingId}?pwd=${btoa(interview.id).substring(0, 10)}`;
//   };

//   const handleJoinMeeting = (interview: InterviewStructure) => {
//     const meetLink = generateMeetLink(interview);
//     window.open(meetLink, '_blank', 'noopener,noreferrer');
//   };

//   const handleCopyLink = async (interview: InterviewStructure, event: React.MouseEvent) => {
//     event.stopPropagation();
    
//     try {
//       const meetingLink = generateMeetLink(interview);
//       await navigator.clipboard.writeText(meetingLink);
//       setCopySuccess(true);
//       setSnackbarMessage('Meeting link copied to clipboard! 🎉');
//       setSnackbarOpen(true);
      
//       setTimeout(() => {
//         setCopySuccess(false);
//       }, 2000);
//     } catch (error) {
//       console.error('Error copying link:', error);
//       setSnackbarMessage('Error copying link');
//       setSnackbarOpen(true);
//     }
//   };

//   const handleInterviewClick = (interview: InterviewStructure) => {
//     setSelectedInterview(interview);
//     setJoinDialogOpen(true);
//     onInterviewClick?.(interview);
//   };

//   const closeJoinDialog = () => {
//     setJoinDialogOpen(false);
//     setSelectedInterview(null);
//   };

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       if (direction === 'prev') {
//         newDate.setMonth(prev.getMonth() - 1);
//       } else {
//         newDate.setMonth(prev.getMonth() + 1);
//       }
//       return newDate;
//     });
//   };

//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   const getInterviewsForDate = (date: Date) => {
//     const normalizedDate = normalizeDate(date);
    
//     return interviews.filter(interview => {
//       return interview.availableSlots?.some(slot => {
//         if (!slot.date) return false;
        
//         const slotDate = normalizeDate(new Date(slot.date));
//         return slotDate.getTime() === normalizedDate.getTime();
//       });
//     });
//   };

//   const isToday = (date: Date) => {
//     const today = normalizeDate(new Date());
//     const targetDate = normalizeDate(date);
//     return targetDate.getTime() === today.getTime();
//   };

//   const isCurrentMonth = (date: Date) => {
//     return date.getMonth() === currentDate.getMonth();
//   };

//   const formatMonthYear = (date: Date) => {
//     return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
//   };

//   const getDayAbbreviation = (date: Date) => {
//     return date.toLocaleDateString('en-US', { weekday: isMobile ? 'narrow' : 'short' });
//   };

//   const getNextSlotForInterview = (interview: InterviewStructure, date: Date) => {
//     const normalizedDate = normalizeDate(date);
    
//     return interview.availableSlots?.find(slot => {
//       if (!slot.date) return false;
      
//       const slotDate = normalizeDate(new Date(slot.date));
//       return slotDate.getTime() === normalizedDate.getTime();
//     });
//   };

//   const formatInterviewDate = (interview: InterviewStructure): string => {
//     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No date set';
    
//     const slot = interview.availableSlots[0];
//     if (!slot.date) return 'No date set';
    
//     const slotDate = new Date(slot.date);
    
//     return slotDate.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const formatInterviewTime = (interview: InterviewStructure): string => {
//     if (!interview.availableSlots || interview.availableSlots.length === 0) return 'No time set';
    
//     const slot = interview.availableSlots[0];
//     return slot.startTime || 'Time not specified';
//   };

//   // Estilos responsive para las celdas del calendario
//   const getCalendarCellStyles = () => {
//     if (isSmallMobile) {
//       return {
//         minHeight: 120,
//         p: 1,
//         '& .MuiCardContent-root': { p: 1 }
//       };
//     } else if (isMobile) {
//       return {
//         minHeight: 140,
//         p: 1.5,
//         '& .MuiCardContent-root': { p: 1.5 }
//       };
//     }
//     return {
//       minHeight: 160,
//       p: 2,
//       '& .MuiCardContent-root': { p: 2 }
//     };
//   };

//   // Array de días de la semana - CORREGIDO (sin duplicados)
//   const weekDays = isMobile 
//     ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] 
//     : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   return (
//     <Box>
//       {/* Calendar Header - Responsive */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: isMobile ? 'column' : 'row',
//         justifyContent: 'space-between', 
//         alignItems: isMobile ? 'stretch' : 'center',
//         gap: isMobile ? 2 : 0,
//         mb: 4,
//         p: isMobile ? 2 : 3,
//         backgroundColor: 'grey.50',
//         borderRadius: 3,
//         border: `1px solid ${theme.palette.divider}`
//       }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 2,
//           justifyContent: isMobile ? 'space-between' : 'flex-start'
//         }}>
//           <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
//             fontWeight: 700, 
//             color: 'primary.main',
//             fontSize: isMobile ? '1.25rem' : '1.5rem'
//           }}>
//             {formatMonthYear(currentDate)}
//           </Typography>
//           <Chip 
//             icon={<Today />}
//             label="Today"
//             onClick={goToToday}
//             variant="outlined"
//             clickable
//             size={isMobile ? "small" : "medium"}
//             sx={{ 
//               borderColor: 'primary.main',
//               color: 'primary.main',
//               '&:hover': {
//                 backgroundColor: 'primary.main',
//                 color: 'white'
//               }
//             }}
//           />
//         </Box>
        
//         <Box sx={{ 
//           display: 'flex', 
//           gap: 1,
//           justifyContent: isMobile ? 'center' : 'flex-end',
//           mt: isMobile ? 1 : 0
//         }}>
//           <IconButton 
//             onClick={() => navigateMonth('prev')}
//             size={isMobile ? "small" : "medium"}
//             sx={{ 
//               backgroundColor: 'white',
//               '&:hover': { backgroundColor: 'grey.100' }
//             }}
//           >
//             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//           <IconButton 
//             onClick={() => navigateMonth('next')}
//             size={isMobile ? "small" : "medium"}
//             sx={{ 
//               backgroundColor: 'white',
//               '&:hover': { backgroundColor: 'grey.100' }
//             }}
//           >
//             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Calendar Grid - Responsive - CORREGIDO */}
//       <Box sx={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(7, 1fr)',
//         gap: 1,
//         mb: 2
//       }}>
//         {weekDays.map((day, index) => (
//           <Box key={`${day}-${index}`} sx={{ 
//             p: isMobile ? 1 : 2, 
//             textAlign: 'center' 
//           }}>
//             <Typography variant="subtitle2" sx={{ 
//               fontWeight: 600, 
//               color: 'text.secondary',
//               fontSize: isMobile ? '0.75rem' : '0.875rem'
//             }}>
//               {day}
//             </Typography>
//           </Box>
//         ))}
//       </Box>

//       <Box sx={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(7, 1fr)',
//         gap: 1
//       }}>
//         {daysInMonth.map((date, index) => {
//           const dayInterviews = getInterviewsForDate(date);
//           const isTodayDate = isToday(date);
//           const isCurrentMonthDate = isCurrentMonth(date);

//           return (
//             <Card
//               key={`${date.getTime()}-${index}`}
//               sx={{
//                 ...getCalendarCellStyles(),
//                 borderRadius: 2,
//                 border: isTodayDate ? 2 : 1,
//                 borderColor: isTodayDate ? 'primary.main' : 'divider',
//                 backgroundColor: isTodayDate ? alpha('#2196f3', 0.04) : 'white',
//                 opacity: isCurrentMonthDate ? 1 : 0.4,
//                 transition: 'all 0.3s ease-in-out',
//                 '&:hover': {
//                   transform: isMobile ? 'none' : 'translateY(-2px)',
//                   boxShadow: isMobile ? 1 : 4,
//                 }
//               }}
//             >
//               <CardContent sx={{ 
//                 p: isSmallMobile ? 0.5 : isMobile ? 1 : 2,
//                 height: '100%',
//                 '&:last-child': { pb: isSmallMobile ? 0.5 : isMobile ? 1 : 2 }
//               }}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between', 
//                   alignItems: 'flex-start',
//                   mb: 0.5
//                 }}>
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       fontWeight: isTodayDate ? 700 : 600,
//                       color: isTodayDate ? 'primary.main' : 'text.primary',
//                       fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.875rem' : '1rem'
//                     }}
//                   >
//                     {date.getDate()}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ 
//                     fontWeight: 500,
//                     fontSize: isSmallMobile ? '0.6rem' : '0.75rem'
//                   }}>
//                     {getDayAbbreviation(date)}
//                   </Typography>
//                 </Box>

//                 {/* Interview List for the Day - Responsive */}
//                 <Box sx={{ 
//                   maxHeight: isSmallMobile ? 80 : isMobile ? 100 : 120, 
//                   overflow: 'auto',
//                   '&::-webkit-scrollbar': {
//                     width: '4px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: theme.palette.grey[300],
//                     borderRadius: '2px',
//                   }
//                 }}>
//                   {dayInterviews.slice(0, isSmallMobile ? 2 : 3).map(interview => {
//                     const slot = getNextSlotForInterview(interview, date);
//                     const meetingCode = generateValidMeetCode(interview);
                    
//                     return (
//                       <Tooltip 
//                         key={interview.id} 
//                         title={
//                           <Box sx={{ p: 1 }}>
//                             <Typography variant="subtitle2" gutterBottom>
//                               {interview.title}
//                             </Typography>
//                             <Typography variant="caption" display="block">
//                               🕒 {slot?.startTime || 'No time specified'}
//                             </Typography>
//                             <Typography variant="caption" display="block">
//                               🔗 {meetingCode} ✅
//                             </Typography>
//                           </Box>
//                         } 
//                         arrow
//                         placement="top"
//                       >
//                         <Box
//                           sx={{
//                             mb: 0.5,
//                             p: isSmallMobile ? 0.5 : 1,
//                             borderRadius: 1,
//                             backgroundColor: alpha('#4CAF50', 0.08),
//                             border: '1px solid',
//                             borderColor: alpha('#4CAF50', 0.2),
//                             cursor: 'pointer',
//                             transition: 'all 0.3s ease-in-out',
//                             '&:hover': {
//                               backgroundColor: alpha('#4CAF50', 0.12),
//                               transform: isMobile ? 'none' : 'translateX(2px)',
//                             }
//                           }}
//                           onClick={() => handleInterviewClick(interview)}
//                         >
//                           <Typography variant="caption" sx={{ 
//                             fontWeight: 600, 
//                             display: 'block', 
//                             color: '#2E7D32',
//                             fontSize: isSmallMobile ? '0.55rem' : '0.65rem',
//                             lineHeight: 1.2
//                           }}>
//                             {isSmallMobile 
//                               ? interview.title.split(' ')[0] 
//                               : interview.title.length > 20 
//                                 ? `${interview.title.substring(0, 20)}...`
//                                 : interview.title
//                             }
//                           </Typography>
//                           {slot && (
//                             <Typography variant="caption" color="text.secondary" display="block" sx={{ 
//                               fontSize: isSmallMobile ? '0.5rem' : '0.6rem',
//                               lineHeight: 1.2
//                             }}>
//                               🕒 {slot.startTime}
//                             </Typography>
//                           )}
//                           {!isSmallMobile && (
//                             <Typography variant="caption" color="success.main" display="block" sx={{ 
//                               fontSize: '0.6rem', 
//                               fontWeight: 600,
//                               lineHeight: 1.2
//                             }}>
//                               🔗 {meetingCode.substring(0, 8)}... ✅
//                             </Typography>
//                           )}
//                           <Box sx={{ 
//                             display: 'flex', 
//                             gap: 0.5, 
//                             mt: 0.5,
//                             flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
//                           }}>
//                             <Button
//                               size="small"
//                               variant="contained"
//                               startIcon={isSmallMobile ? null : <VideoCall />}
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleJoinMeeting(interview);
//                               }}
//                               sx={{ 
//                                 minWidth: 'auto',
//                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
//                                 height: isSmallMobile ? 16 : 20,
//                                 px: isSmallMobile ? 0.5 : 1,
//                                 backgroundColor: '#4CAF50',
//                                 '&:hover': {
//                                   backgroundColor: '#45a049',
//                                 }
//                               }}
//                             >
//                               {isSmallMobile ? 'Join' : 'Join'}
//                             </Button>
//                             <Button
//                               size="small"
//                               variant="outlined"
//                               color={copySuccess ? "success" : "primary"}
//                               onClick={(e) => handleCopyLink(interview, e)}
//                               sx={{ 
//                                 minWidth: 'auto',
//                                 fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
//                                 height: isSmallMobile ? 16 : 20,
//                                 px: isSmallMobile ? 0.5 : 1,
//                                 borderColor: '#2196f3',
//                                 color: '#2196f3'
//                               }}
//                             >
//                               <ContentCopy fontSize={isSmallMobile ? "small" : "small"} />
//                             </Button>
//                           </Box>
//                         </Box>
//                       </Tooltip>
//                     );
//                   })}
//                   {dayInterviews.length > (isSmallMobile ? 2 : 3) && (
//                     <Typography variant="caption" color="text.secondary" sx={{ 
//                       fontStyle: 'italic',
//                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
//                     }}>
//                       +{dayInterviews.length - (isSmallMobile ? 2 : 3)} more
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Stats */}
//                 {dayInterviews.length > 0 && (
//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 0.5,
//                     mt: 0.5,
//                     pt: 0.5,
//                     borderTop: 1,
//                     borderColor: 'divider'
//                   }}>
//                     <Groups sx={{ 
//                       fontSize: isSmallMobile ? 10 : isMobile ? 12 : 14, 
//                       color: 'success.main' 
//                     }} />
//                     <Typography variant="caption" color="success.main" sx={{ 
//                       fontWeight: 600,
//                       fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
//                     }}>
//                       {dayInterviews.length} {isSmallMobile ? '' : 'interview'}{dayInterviews.length > 1 && !isSmallMobile ? 's' : ''}
//                     </Typography>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           );
//         })}
//       </Box>

//       {/* Elegant Join Meeting Dialog - Responsive */}
//       <Dialog 
//         open={joinDialogOpen} 
//         onClose={closeJoinDialog}
//         maxWidth="md"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 4,
//             boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0,0,0,0.1)',
//             background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//             overflow: 'hidden'
//           }
//         }}
//       >
//         <DialogTitle sx={{ 
//           pb: 2,
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//           color: 'white',
//           position: 'relative'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Box sx={{
//               width: isMobile ? 40 : 48,
//               height: isMobile ? 40 : 48,
//               borderRadius: '50%',
//               backgroundColor: 'rgba(255,255,255,0.2)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backdropFilter: 'blur(10px)'
//             }}>
//               <VideoCall sx={{ fontSize: isMobile ? 24 : 28 }} />
//             </Box>
//             <Box>
//               <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, mb: 0.5 }}>
//                 Join Interview Meeting
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                 Ready to connect with your candidate
//               </Typography>
//             </Box>
//           </Box>
//         </DialogTitle>

//         <DialogContent sx={{ p: 0 }}>
//           {selectedInterview && (
//             <Box>
//               {/* Interview Details */}
//               <Box sx={{ p: isMobile ? 2 : 4, pb: isMobile ? 1 : 2 }}>
//                 <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'flex-start', 
//                   gap: isMobile ? 2 : 3, 
//                   mb: isMobile ? 2 : 3,
//                   flexDirection: isSmallMobile ? 'column' : 'row'
//                 }}>
//                   <Box sx={{
//                     width: isMobile ? 50 : 60,
//                     height: isMobile ? 50 : 60,
//                     borderRadius: isMobile ? 2 : 3,
//                     backgroundColor: 'primary.light',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     fontSize: isMobile ? '1.25rem' : '1.5rem',
//                     fontWeight: 700
//                   }}>
//                     {selectedInterview.title.charAt(0)}
//                   </Box>
//                   <Box sx={{ flex: 1 }}>
//                     <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
//                       fontWeight: 700, 
//                       mb: 1, 
//                       color: 'text.primary' 
//                     }}>
//                       {selectedInterview.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ 
//                       lineHeight: 1.6,
//                       fontSize: isMobile ? '0.875rem' : '1rem'
//                     }}>
//                       {selectedInterview.description || 'Interview session with candidate'}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Meeting Information Cards - Responsive */}
//                 <Box sx={{ 
//                   display: 'grid', 
//                   gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
//                   gap: 2, 
//                   mb: 3 
//                 }}>
//                   <Paper sx={{ 
//                     p: 2, 
//                     borderRadius: 3, 
//                     border: `1px solid ${theme.palette.divider}` 
//                   }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
//                       <CalendarToday color="primary" sx={{ fontSize: isMobile ? 18 : 20 }} />
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         Date & Time
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
//                       {formatInterviewDate(selectedInterview)}
//                     </Typography>
//                     <Typography variant="body2" sx={{ 
//                       fontWeight: 600, 
//                       color: 'primary.main',
//                       fontSize: isMobile ? '0.875rem' : '1rem'
//                     }}>
//                       {formatInterviewTime(selectedInterview)}
//                     </Typography>
//                   </Paper>

//                   <Paper sx={{ 
//                     p: 2, 
//                     borderRadius: 3, 
//                     border: `1px solid ${theme.palette.divider}` 
//                   }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
//                       <CheckCircle color="success" sx={{ fontSize: isMobile ? 18 : 20 }} />
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                         Meeting Status
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
//                       Ready to join
//                     </Typography>
//                     <Chip 
//                       label="Active" 
//                       color="success" 
//                       size="small" 
//                       sx={{ mt: 0.5, fontWeight: 600 }}
//                     />
//                   </Paper>
//                 </Box>

//                 {/* Meeting Link Section */}
//                 <Paper sx={{ 
//                   p: isMobile ? 2 : 3, 
//                   borderRadius: 3,
//                   backgroundColor: alpha('#4CAF50', 0.05),
//                   border: `2px solid ${alpha('#4CAF50', 0.2)}`,
//                   position: 'relative',
//                   overflow: 'hidden'
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//                     <Box sx={{
//                       width: isMobile ? 36 : 40,
//                       height: isMobile ? 36 : 40,
//                       borderRadius: '50%',
//                       backgroundColor: '#4CAF50',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}>
//                       <LinkIcon sx={{ color: 'white', fontSize: isMobile ? 18 : 20 }} />
//                     </Box>
//                     <Box>
//                       <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
//                         fontWeight: 700, 
//                         color: '#2E7D32' 
//                       }}>
//                         Google Meet Link
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
//                         Click to join or copy the link below
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box sx={{ 
//                     display: 'flex', 
//                     flexDirection: isMobile ? 'column' : 'row',
//                     alignItems: isMobile ? 'stretch' : 'center', 
//                     gap: 1, 
//                     mb: 2,
//                     p: 2,
//                     backgroundColor: 'white',
//                     borderRadius: 2,
//                     border: `1px solid ${theme.palette.divider}`
//                   }}>
//                     <Typography variant="body1" sx={{ 
//                       flex: 1,
//                       fontFamily: 'monospace',
//                       fontWeight: 600,
//                       color: '#2E7D32',
//                       wordBreak: 'break-all',
//                       fontSize: isMobile ? '0.875rem' : '1rem',
//                       mb: isMobile ? 1 : 0
//                     }}>
//                       {generateMeetLink(selectedInterview)}
//                     </Typography>
//                     <Button
//                       variant="contained"
//                       color={copySuccess ? "success" : "primary"}
//                       onClick={() => handleCopyLink(selectedInterview, { stopPropagation: () => {} } as any)}
//                       startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
//                       sx={{
//                         minWidth: 'auto',
//                         px: 2,
//                         backgroundColor: copySuccess ? '#4CAF50' : '#2196f3',
//                         '&:hover': {
//                           backgroundColor: copySuccess ? '#45a049' : '#1976d2',
//                         }
//                       }}
//                     >
//                       {copySuccess ? 'Copied!' : 'Copy'}
//                     </Button>
//                   </Box>

//                   <Box sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     flexWrap: isMobile ? 'wrap' : 'nowrap'
//                   }}>
//                     <Chip 
//                       icon={<CheckCircle />}
//                       label="Valid Meeting Code" 
//                       color="success"
//                       variant="filled"
//                       size={isMobile ? "small" : "medium"}
//                       sx={{ fontWeight: 600 }}
//                     />
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
//                       Code: <strong>{generateValidMeetCode(selectedInterview)}</strong>
//                     </Typography>
//                   </Box>
//                 </Paper>

//                 {/* Alternative Options */}
//                 <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
//                   <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
//                     Alternative Options
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ 
//                     fontFamily: 'monospace',
//                     fontSize: isMobile ? '0.75rem' : '0.875rem',
//                     wordBreak: 'break-all'
//                   }}>
//                     {generateZoomLink(selectedInterview)}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Divider />
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ p: isMobile ? 2 : 3, gap: 2 }}>
//           <Button 
//             onClick={closeJoinDialog}
//             variant="outlined"
//             sx={{ 
//               borderRadius: 2,
//               px: 3,
//               py: 1,
//               borderColor: theme.palette.divider,
//               color: 'text.secondary'
//             }}
//           >
//             Close
//           </Button>
//           <Button 
//             variant="contained"
//             startIcon={<OpenInNew />}
//             onClick={() => selectedInterview && handleJoinMeeting(selectedInterview)}
//             sx={{ 
//               borderRadius: 2,
//               px: 4,
//               py: 1,
//               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               '&:hover': {
//                 background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
//                 boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
//               },
//               fontWeight: 600,
//               fontSize: isMobile ? '0.875rem' : '1rem'
//             }}
//           >
//             Join Meeting Now
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={() => setSnackbarOpen(false)} 
//           severity="success"
//           variant="filled"
//           sx={{
//             borderRadius: 3,
//             fontWeight: 600
//           }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default InterviewCalendar;



// components/interviews/InterviewCalendar.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Today,
  VideoCall,
  ContentCopy,
  OpenInNew,
  CalendarToday,
  Link as LinkIcon,
  CheckCircle,
  Groups,
} from '@mui/icons-material';
import { InterviewStructure } from '../../types';

interface InterviewCalendarProps {
  interviews: InterviewStructure[];
  onInterviewClick?: (interview: InterviewStructure) => void;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  interviews: InterviewStructure[];
}

const InterviewCalendar: React.FC<InterviewCalendarProps> = ({ 
  interviews, 
  onInterviewClick 
}) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedInterview, setSelectedInterview] = useState<InterviewStructure | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Memoized utility functions
  const normalizeDate = useCallback((date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }, []);

  const convertUTCToLocal = useCallback((dateString: string): Date => {
    if (!dateString) return new Date();
    
    const utcDate = new Date(dateString);
    return new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate()
    );
  }, []);

  const generateValidMeetCode = useCallback((interview: InterviewStructure|any): string => {
    if (interview.meetingLink) {
      const match = interview.meetingLink.match(/https:\/\/meet\.google\.com\/([a-z0-9-]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return interview.meetingCode || 'zii-bwgi-kxu';
  }, []);

  const generateMeetLink = useCallback((interview: InterviewStructure): string => {
    const meetCode = generateValidMeetCode(interview);
    return `https://meet.google.com/${meetCode}`;
  }, [generateValidMeetCode]);

  // Memoized event handlers
  const handleJoinMeeting = useCallback((interview: InterviewStructure) => {
    const meetLink = generateMeetLink(interview);
    window.open(meetLink, '_blank', 'noopener,noreferrer');
  }, [generateMeetLink]);

  const handleCopyLink = useCallback(async (interview: InterviewStructure, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      const meetingLink = generateMeetLink(interview);
      await navigator.clipboard.writeText(meetingLink);
      setCopySuccess(true);
      setSnackbarMessage('Meeting link copied to clipboard! 🎉');
      setSnackbarOpen(true);
      
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      setSnackbarMessage('Error copying link');
      setSnackbarOpen(true);
    }
  }, [generateMeetLink]);

  const handleInterviewClick = useCallback((interview: InterviewStructure) => {
    setSelectedInterview(interview);
    setJoinDialogOpen(true);
    onInterviewClick?.(interview);
  }, [onInterviewClick]);

  const closeJoinDialog = useCallback(() => {
    setJoinDialogOpen(false);
    setSelectedInterview(null);
  }, []);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Memoized calendar data calculation
  const { daysInMonth, weekDays } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = normalizeDate(new Date());
    
    const days: CalendarDay[] = [];
    const firstDayOfWeek = firstDay.getDay();

    // Previous month days
    if (firstDayOfWeek > 0) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthLastDay - i);
        days.push({
          date,
          isCurrentMonth: false,
          isToday: normalizeDate(date).getTime() === today.getTime(),
          interviews: []
        });
      }
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: normalizeDate(date).getTime() === today.getTime(),
        interviews: []
      });
    }

    // Next month days
    const totalCells = 42;
    const nextMonth = month + 1;
    const nextMonthYear = nextMonth > 11 ? year + 1 : year;
    const adjustedNextMonth = nextMonth > 11 ? 0 : nextMonth;
    
    let nextMonthDay = 1;
    while (days.length < totalCells) {
      const date = new Date(nextMonthYear, adjustedNextMonth, nextMonthDay);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: normalizeDate(date).getTime() === today.getTime(),
        interviews: []
      });
      nextMonthDay++;
    }

    // Assign interviews to days
    interviews.forEach(interview => {
      interview.availableSlots?.forEach((slot:any) => {
        if (!slot.date) return;
        
        const slotDate = convertUTCToLocal(slot.date);
        const normalizedSlotDate = normalizeDate(slotDate);
        
        const dayIndex = days.findIndex(day => 
          normalizeDate(day.date).getTime() === normalizedSlotDate.getTime()
        );
        
        if (dayIndex !== -1 && !days[dayIndex].interviews.find(i => i.id === interview.id)) {
          days[dayIndex].interviews.push(interview);
        }
      });
    });

    const weekDays = isMobile 
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] 
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return { daysInMonth: days, weekDays };
  }, [currentDate, interviews, isMobile, normalizeDate, convertUTCToLocal]);

  // Memoized formatting functions
  const formatMonthYear = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  const getDayAbbreviation = useCallback((date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: isMobile ? 'narrow' : 'short' });
  }, [isMobile]);

  const formatInterviewDate = useCallback((interview: InterviewStructure): string => {
    const slot:any = interview.availableSlots?.[0];
    if (!slot?.date) return 'No date set';
    
    const slotDate = convertUTCToLocal(slot.date);
    return slotDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [convertUTCToLocal]);

  const formatInterviewTime = useCallback((interview: InterviewStructure): string => {
    const slot = interview.availableSlots?.[0];
    return slot?.startTime || 'Time not specified';
  }, []);

  // Memoized styles
  const calendarCellStyles = useMemo(() => ({
    minHeight: isSmallMobile ? 120 : isMobile ? 140 : 160,
    p: isSmallMobile ? 1 : isMobile ? 1.5 : 2,
    '& .MuiCardContent-root': { 
      p: isSmallMobile ? 1 : isMobile ? 1.5 : 2 
    }
  }), [isMobile, isSmallMobile]);

  const cardContentStyles = useMemo(() => ({
    p: isSmallMobile ? 0.5 : isMobile ? 1 : 2,
    height: '100%',
    '&:last-child': { 
      pb: isSmallMobile ? 0.5 : isMobile ? 1 : 2 
    }
  }), [isMobile, isSmallMobile]);

  // Reset copy success state when dialog closes
  useEffect(() => {
    if (!joinDialogOpen) {
      setCopySuccess(false);
    }
  }, [joinDialogOpen]);

  // Optimized Interview Item Component
  const InterviewItem = React.memo(({ 
    interview, 
    date 
  }: { 
    interview: InterviewStructure; 
    date: Date;
  }) => {
    const slot = interview.availableSlots?.find((slot:any) => {
      if (!slot.date) return false;
      const slotDate = convertUTCToLocal(slot.date);
      return normalizeDate(slotDate).getTime() === normalizeDate(date).getTime();
    });

    const meetingCode = generateValidMeetCode(interview);
    const truncatedTitle = isSmallMobile 
      ? interview.title.split(' ')[0] 
      : interview.title.length > 20 
        ? `${interview.title.substring(0, 20)}...`
        : interview.title;

    return (
      <Tooltip 
        title={
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              {interview.title}
            </Typography>
            <Typography variant="caption" display="block">
              🕒 {slot?.startTime || 'No time specified'}
            </Typography>
            <Typography variant="caption" display="block">
              🔗 {meetingCode} ✅
            </Typography>
          </Box>
        } 
        arrow
        placement="top"
      >
        <Box
          sx={{
            mb: 0.5,
            p: isSmallMobile ? 0.5 : 1,
            borderRadius: 1,
            backgroundColor: alpha('#4CAF50', 0.08),
            border: '1px solid',
            borderColor: alpha('#4CAF50', 0.2),
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: alpha('#4CAF50', 0.12),
              transform: isMobile ? 'none' : 'translateX(2px)',
            }
          }}
          onClick={() => handleInterviewClick(interview)}
        >
          <Typography variant="caption" sx={{ 
            fontWeight: 600, 
            display: 'block', 
            color: '#2E7D32',
            fontSize: isSmallMobile ? '0.55rem' : '0.65rem',
            lineHeight: 1.2
          }}>
            {truncatedTitle}
          </Typography>
          {slot && (
            <Typography variant="caption" color="text.secondary" display="block" sx={{ 
              fontSize: isSmallMobile ? '0.5rem' : '0.6rem',
              lineHeight: 1.2
            }}>
              🕒 {slot.startTime}
            </Typography>
          )}
          {!isSmallMobile && (
            <Typography variant="caption" color="success.main" display="block" sx={{ 
              fontSize: '0.6rem', 
              fontWeight: 600,
              lineHeight: 1.2
            }}>
              🔗 {meetingCode.substring(0, 8)}... ✅
            </Typography>
          )}
          <Box sx={{ 
            display: 'flex', 
            gap: 0.5, 
            mt: 0.5,
            flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
          }}>
            <Button
              size="small"
              variant="contained"
              startIcon={isSmallMobile ? null : <VideoCall />}
              onClick={(e) => {
                e.stopPropagation();
                handleJoinMeeting(interview);
              }}
              sx={{ 
                minWidth: 'auto',
                fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
                height: isSmallMobile ? 16 : 20,
                px: isSmallMobile ? 0.5 : 1,
                backgroundColor: '#4CAF50',
                '&:hover': { backgroundColor: '#45a049' }
              }}
            >
              {isSmallMobile ? 'Join' : 'Join'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color={copySuccess ? "success" : "primary"}
              onClick={(e) => handleCopyLink(interview, e)}
              sx={{ 
                minWidth: 'auto',
                fontSize: isSmallMobile ? '0.5rem' : '0.55rem',
                height: isSmallMobile ? 16 : 20,
                px: isSmallMobile ? 0.5 : 1,
                borderColor: '#2196f3',
                color: '#2196f3'
              }}
            >
              <ContentCopy fontSize={isSmallMobile ? "small" : "small"} />
            </Button>
          </Box>
        </Box>
      </Tooltip>
    );
  });

  return (
    <Box>
      {/* Calendar Header - Responsive */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? 2 : 0,
        mb: 4,
        p: isMobile ? 2 : 3,
        backgroundColor: 'grey.50',
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          justifyContent: isMobile ? 'space-between' : 'flex-start'
        }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
            fontWeight: 700, 
            color: 'primary.main',
            fontSize: isMobile ? '1.25rem' : '1.5rem'
          }}>
            {formatMonthYear(currentDate)}
          </Typography>
          <Chip 
            icon={<Today />}
            label="Today"
            onClick={goToToday}
            variant="outlined"
            clickable
            size={isMobile ? "small" : "medium"}
            sx={{ 
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white'
              }
            }}
          />
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1,
          justifyContent: isMobile ? 'center' : 'flex-end',
          mt: isMobile ? 1 : 0
        }}>
          <IconButton 
            onClick={() => navigateMonth('prev')}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'grey.100' }
            }}
          >
            <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
          <IconButton 
            onClick={() => navigateMonth('next')}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'grey.100' }
            }}
          >
            <ChevronRight fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Grid - Responsive */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 1,
        mb: 2
      }}>
        {weekDays.map((day, index) => (
          <Box key={`${day}-${index}`} sx={{ 
            p: isMobile ? 1 : 2, 
            textAlign: 'center' 
          }}>
            <Typography variant="subtitle2" sx={{ 
              fontWeight: 600, 
              color: 'text.secondary',
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}>
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar Days Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 1
      }}>
        {daysInMonth.map((day, index) => (
          <Card
            key={`${day.date.getTime()}-${index}`}
            sx={{
              ...calendarCellStyles,
              borderRadius: 2,
              border: day.isToday ? 2 : 1,
              borderColor: day.isToday ? 'primary.main' : 'divider',
              backgroundColor: day.isToday ? alpha('#2196f3', 0.04) : 'white',
              opacity: day.isCurrentMonth ? 1 : 0.4,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: isMobile ? 'none' : 'translateY(-2px)',
                boxShadow: isMobile ? 1 : 4,
              }
            }}
          >
            <CardContent sx={cardContentStyles}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                mb: 0.5
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: day.isToday ? 700 : 600,
                    color: day.isToday ? 'primary.main' : 'text.primary',
                    fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.875rem' : '1rem'
                  }}
                >
                  {day.date.getDate()}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ 
                  fontWeight: 500,
                  fontSize: isSmallMobile ? '0.6rem' : '0.75rem'
                }}>
                  {getDayAbbreviation(day.date)}
                </Typography>
              </Box>

              {/* Interview List for the Day */}
              <Box sx={{ 
                maxHeight: isSmallMobile ? 80 : isMobile ? 100 : 120, 
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.grey[300],
                  borderRadius: '2px',
                }
              }}>
                {day.interviews.slice(0, isSmallMobile ? 2 : 3).map(interview => (
                  <InterviewItem 
                    key={interview.id} 
                    interview={interview} 
                    date={day.date} 
                  />
                ))}
                {day.interviews.length > (isSmallMobile ? 2 : 3) && (
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontStyle: 'italic',
                    fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
                  }}>
                    +{day.interviews.length - (isSmallMobile ? 2 : 3)} more
                  </Typography>
                )}
              </Box>

              {/* Stats */}
              {day.interviews.length > 0 && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.5,
                  mt: 0.5,
                  pt: 0.5,
                  borderTop: 1,
                  borderColor: 'divider'
                }}>
                  <Groups sx={{ 
                    fontSize: isSmallMobile ? 10 : isMobile ? 12 : 14, 
                    color: 'success.main' 
                  }} />
                  <Typography variant="caption" color="success.main" sx={{ 
                    fontWeight: 600,
                    fontSize: isSmallMobile ? '0.5rem' : '0.65rem'
                  }}>
                    {day.interviews.length} {isSmallMobile ? '' : 'interview'}{day.interviews.length > 1 && !isSmallMobile ? 's' : ''}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Join Meeting Dialog */}
      <Dialog 
        open={joinDialogOpen} 
        onClose={closeJoinDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 4,
            boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: isMobile ? 40 : 48,
              height: isMobile ? 40 : 48,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <VideoCall sx={{ fontSize: isMobile ? 24 : 28 }} />
            </Box>
            <Box>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700, mb: 0.5 }}>
                Join Interview Meeting
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Ready to connect with your candidate
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          {selectedInterview && (
            <Box>
              <Box sx={{ p: isMobile ? 2 : 4, pb: isMobile ? 1 : 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: isMobile ? 2 : 3, 
                  mb: isMobile ? 2 : 3,
                  flexDirection: isSmallMobile ? 'column' : 'row'
                }}>
                  <Box sx={{
                    width: isMobile ? 50 : 60,
                    height: isMobile ? 50 : 60,
                    borderRadius: isMobile ? 2 : 3,
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    fontWeight: 700
                  }}>
                    {selectedInterview.title.charAt(0)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: 'text.primary' 
                    }}>
                      {selectedInterview.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      lineHeight: 1.6,
                      fontSize: isMobile ? '0.875rem' : '1rem'
                    }}>
                      {selectedInterview.description || 'Interview session with candidate'}
                    </Typography>
                  </Box>
                </Box>

                {/* Meeting Information Cards */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: 2, 
                  mb: 3 
                }}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    border: `1px solid ${theme.palette.divider}` 
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <CalendarToday color="primary" sx={{ fontSize: isMobile ? 18 : 20 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Date & Time
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      {formatInterviewDate(selectedInterview)}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 600, 
                      color: 'primary.main',
                      fontSize: isMobile ? '0.875rem' : '1rem'
                    }}>
                      {formatInterviewTime(selectedInterview)}
                    </Typography>
                  </Paper>

                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    border: `1px solid ${theme.palette.divider}` 
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <CheckCircle color="success" sx={{ fontSize: isMobile ? 18 : 20 }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Meeting Status
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                      Ready to join
                    </Typography>
                    <Chip 
                      label="Active" 
                      color="success" 
                      size="small" 
                      sx={{ mt: 0.5, fontWeight: 600 }}
                    />
                  </Paper>
                </Box>

                {/* Meeting Link Section */}
                <Paper sx={{ 
                  p: isMobile ? 2 : 3, 
                  borderRadius: 3,
                  backgroundColor: alpha('#4CAF50', 0.05),
                  border: `2px solid ${alpha('#4CAF50', 0.2)}`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{
                      width: isMobile ? 36 : 40,
                      height: isMobile ? 36 : 40,
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <LinkIcon sx={{ color: 'white', fontSize: isMobile ? 18 : 20 }} />
                    </Box>
                    <Box>
                      <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
                        fontWeight: 700, 
                        color: '#2E7D32' 
                      }}>
                        Google Meet Link
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
                        Click to join or copy the link below
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'stretch' : 'center', 
                    gap: 1, 
                    mb: 2,
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <Typography variant="body1" sx={{ 
                      flex: 1,
                      fontFamily: 'monospace',
                      fontWeight: 600,
                      color: '#2E7D32',
                      wordBreak: 'break-all',
                      fontSize: isMobile ? '0.875rem' : '1rem',
                      mb: isMobile ? 1 : 0
                    }}>
                      {generateMeetLink(selectedInterview)}
                    </Typography>
                    <Button
                      variant="contained"
                      color={copySuccess ? "success" : "primary"}
                      onClick={() => handleCopyLink(selectedInterview, { stopPropagation: () => {} } as any)}
                      startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
                      sx={{
                        minWidth: 'auto',
                        px: 2,
                        backgroundColor: copySuccess ? '#4CAF50' : '#2196f3',
                        '&:hover': {
                          backgroundColor: copySuccess ? '#45a049' : '#1976d2',
                        }
                      }}
                    >
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </Button>
                  </Box>

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    flexWrap: isMobile ? 'wrap' : 'nowrap'
                  }}>
                    <Chip 
                      icon={<CheckCircle />}
                      label="Valid Meeting Code" 
                      color="success"
                      variant="filled"
                      size={isMobile ? "small" : "medium"}
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>
                      Code: <strong>{generateValidMeetCode(selectedInterview)}</strong>
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              <Divider />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: isMobile ? 2 : 3, gap: 2 }}>
          <Button 
            onClick={closeJoinDialog}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: theme.palette.divider,
              color: 'text.secondary'
            }}
          >
            Close
          </Button>
          <Button 
            variant="contained"
            startIcon={<OpenInNew />}
            onClick={() => selectedInterview && handleJoinMeeting(selectedInterview)}
            sx={{ 
              borderRadius: 2,
              px: 4,
              py: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              },
              fontWeight: 600,
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
          >
            Join Meeting Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          variant="filled"
          sx={{
            borderRadius: 3,
            fontWeight: 600
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(InterviewCalendar);