// // // components/interviews/InterviewList.tsx
// // import React from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Chip,
// //   IconButton,
// //   Button,
// //   Avatar,
// //   alpha,
// // } from '@mui/material';
// // import {
// //   MoreVert,
// //   Share,
// //   VideoCall,
// //   Schedule,
// //   People,
// // } from '@mui/icons-material';
// // import { InterviewStructure } from '../../types';

// // interface InterviewListProps {
// //   interviews: InterviewStructure[];
// //   onShare: (interview: InterviewStructure) => void;
// //   onMenuOpen: (event: React.MouseEvent<HTMLElement>, interview: InterviewStructure) => void;
// // }

// // const InterviewList: React.FC<InterviewListProps> = ({ 
// //   interviews, 
// //   onShare, 
// //   onMenuOpen 
// // }) => {
// //   const formatDate = (date: string | Date) => {
// //     return new Date(date).toLocaleDateString('en-US', {
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     });
// //   };

// //   const getTimeSlotsCount = (interview: InterviewStructure) => {
// //     return interview.availableSlots.length;
// //   };

// //   const getBookedSlotsCount = (interview: InterviewStructure) => {
// //     return interview.availableSlots.filter(slot => slot.isBooked).length;
// //   };

// //   if (interviews.length === 0) {
// //     return (
// //       <Box sx={{ textAlign: 'center', py: 8 }}>
// //         <VideoCall sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
// //         <Typography variant="h6" color="text.secondary" gutterBottom>
// //           No interviews created yet
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
// //           Create your first interview structure to get started
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
// //       {interviews.map(interview => (
// //         <Card 
// //           key={interview.id}
// //           sx={{ 
// //             borderRadius: 3,
// //             transition: 'all 0.2s ease-in-out',
// //             border: 1,
// //             borderColor: 'divider',
// //             '&:hover': {
// //               transform: 'translateY(-2px)',
// //               boxShadow: 4,
// //               borderColor: 'primary.main',
// //             }
// //           }}
// //         >
// //           <CardContent sx={{ p: 3 }}>
// //             <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
// //               {/* Avatar */}
// //               <Avatar
// //                 sx={{
// //                   width: 56,
// //                   height: 56,
// //                   backgroundColor: alpha('#2196f3', 0.1),
// //                   color: 'primary.main',
// //                   fontWeight: 600
// //                 }}
// //               >
// //                 <VideoCall />
// //               </Avatar>

// //               {/* Content */}
// //               <Box sx={{ flex: 1 }}>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
// //                   <Box>
// //                     <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
// //                       {interview.title}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //                       {interview.description}
// //                     </Typography>
// //                   </Box>

// //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                     <Chip 
// //                       label={interview.isActive ? 'Active' : 'Inactive'} 
// //                       color={interview.isActive ? 'success' : 'default'}
// //                       size="small"
// //                       variant="outlined"
// //                     />
// //                     <IconButton
// //                       size="small"
// //                       onClick={(e) => onMenuOpen(e, interview)}
// //                     >
// //                       <MoreVert />
// //                     </IconButton>
// //                   </Box>
// //                 </Box>

// //                 {/* Stats */}
// //                 <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
// //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                     <Schedule sx={{ fontSize: 18, color: 'primary.main' }} />
// //                     <Typography variant="body2" color="text.secondary">
// //                       {interview.duration} min
// //                     </Typography>
// //                   </Box>
// //                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                     <People sx={{ fontSize: 18, color: 'success.main' }} />
// //                     <Typography variant="body2" color="text.secondary">
// //                       {getBookedSlotsCount(interview)} / {getTimeSlotsCount(interview)} booked
// //                     </Typography>
// //                   </Box>
// //                   <Typography variant="body2" color="text.secondary">
// //                     Created {formatDate(interview.createdAt)}
// //                   </Typography>
// //                 </Box>

// //                 {/* Actions */}
// //                 <Box sx={{ display: 'flex', gap: 1 }}>
// //                   <Button
// //                     variant="outlined"
// //                     startIcon={<Share />}
// //                     onClick={() => onShare(interview)}
// //                     size="small"
// //                     sx={{ borderRadius: 2 }}
// //                   >
// //                     Share
// //                   </Button>
// //                   <Button
// //                     variant="outlined"
// //                     size="small"
// //                     sx={{ borderRadius: 2 }}
// //                   >
// //                     View Details
// //                   </Button>
// //                   <Button
// //                     variant="outlined"
// //                     size="small"
// //                     sx={{ borderRadius: 2 }}
// //                   >
// //                     Edit Slots
// //                   </Button>
// //                 </Box>
// //               </Box>
// //             </Box>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </Box>
// //   );
// // };

// // export default InterviewList;



// // components/interviews/InterviewList.tsx
// import React from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Button,
//   Avatar,
//   alpha,
// } from '@mui/material';
// import {
//   MoreVert,
//   Share,
//   VideoCall,
//   Schedule,
//   People,
//   Link,
//   LinkOff,
// } from '@mui/icons-material';
// import { InterviewStructure } from '../../types';
// import { InterviewVideoButton } from '../InterviewVideoButton';

// interface InterviewListProps {
//   interviews: InterviewStructure[];
//   onShare: (interview: InterviewStructure) => void;
//   onMenuOpen: (event: React.MouseEvent<HTMLElement>, interview: InterviewStructure) => void;
// }

// const InterviewList: React.FC<InterviewListProps> = ({
//   interviews,
//   onShare,
//   onMenuOpen
// }) => {
//   const formatDate = (date: string | Date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   const getTimeSlotsCount = (interview: InterviewStructure) => {
//     return interview.availableSlots?.length || 0;
//   };

//   const getBookedSlotsCount = (interview: InterviewStructure) => {
//     return interview.availableSlots?.filter(slot => slot.isBooked).length || 0;
//   };

//   if (interviews.length === 0) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 8 }}>
//         <VideoCall sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
//         <Typography variant="h6" color="text.secondary" gutterBottom>
//           No interviews created yet
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//           Create your first interview structure to get started
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//       {interviews.map(interview => (
//         <Card
//           key={interview.id}
//           sx={{
//             borderRadius: 3,
//             transition: 'all 0.2s ease-in-out',
//             border: 1,
//             borderColor: 'divider',
//             '&:hover': {
//               transform: 'translateY(-2px)',
//               boxShadow: 4,
//               borderColor: 'primary.main',
//             }
//           }}
//         >
//           <CardContent sx={{ p: 3 }}>
//             <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
//               {/* Avatar */}
//               <Avatar
//                 sx={{
//                   width: 56,
//                   height: 56,
//                   backgroundColor: interview.isActive
//                     ? alpha('#2196f3', 0.1)
//                     : alpha('#9e9e9e', 0.1),
//                   color: interview.isActive ? 'primary.main' : 'text.secondary',
//                   fontWeight: 600
//                 }}
//               >
//                 {interview.isActive ? <Link /> : <LinkOff />}
//               </Avatar>

//               {/* Content */}
//               <Box sx={{ flex: 1 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
//                       {interview.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       {interview.description || 'No description provided'}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Chip
//                       label={interview.isActive ? 'Active' : 'Inactive'}
//                       color={interview.isActive ? 'success' : 'default'}
//                       size="small"
//                       variant="outlined"
//                     />
//                     <IconButton
//                       size="small"
//                       onClick={(e) => onMenuOpen(e, interview)}
//                     >
//                       <MoreVert />
//                     </IconButton>
//                   </Box>
//                 </Box>

//                 {/* Stats */}
//                 <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Schedule sx={{ fontSize: 18, color: 'primary.main' }} />
//                     <Typography variant="body2" color="text.secondary">
//                       {interview.duration} min
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <VideoCall sx={{ fontSize: 18, color: 'info.main' }} />
//                     <Typography variant="body2" color="text.secondary">
//                       {getTimeSlotsCount(interview)} slots
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <People sx={{ fontSize: 18, color: 'success.main' }} />
//                     <Typography variant="body2" color="text.secondary">
//                       {getBookedSlotsCount(interview)} booked
//                     </Typography>
//                   </Box>
//                   <Typography variant="body2" color="text.secondary">
//                     Created {formatDate(interview.createdAt)}
//                   </Typography>
//                 </Box>

//                 {/* URL Info */}
//                 <Box sx={{ mb: 2, p: 1.5, backgroundColor: 'grey.50', borderRadius: 2 }}>
//                   <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
//                     Shareable URL:
//                   </Typography>
//                   <Typography variant="body2" sx={{
//                     fontFamily: 'monospace',
//                     fontSize: '0.75rem',
//                     wordBreak: 'break-all'
//                   }}>
//                     {`${typeof window !== 'undefined' ? window.location.origin : ''}/interview/${interview.shareableUrl}`}
//                   </Typography>
//                 </Box>

//                 {/* Actions */}
//                 <InterviewVideoButton
//                   reservation={{
//                     id: interview.id,
//                     interviewId: interview.id,
//                     status: interview.isActive ? 'confirmed' : 'cancelled'
//                   }}
//                   variant="outlined"
//                   size="small"
//                 />
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                   <Button
//                     variant="outlined"
//                     startIcon={<Share />}
//                     onClick={() => onShare(interview)}
//                     size="small"
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Share
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ borderRadius: 2 }}
//                     onClick={() => {
//                       const url = `${window.location.origin}/interview/${interview.shareableUrl}`;
//                       window.open(url, '_blank');
//                     }}
//                   >
//                     Preview
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ borderRadius: 2 }}
//                     onClick={() => {
//                       const url = `${window.location.origin}/interview/${interview.shareableUrl}`;
//                       navigator.clipboard.writeText(url);
//                     }}
//                   >
//                     Copy URL
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default InterviewList;



// components/interviews/InterviewList.tsx
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Avatar,
  alpha,
} from '@mui/material';
import {
  MoreVert,
  Share,
  VideoCall,
  Schedule,
  People,
  Link,
  LinkOff,
} from '@mui/icons-material';
import { InterviewStructure } from '../../types';
import { InterviewVideoButton } from '../InterviewVideoButton';

interface InterviewListProps {
  interviews: InterviewStructure[];
  onShare: (interview: InterviewStructure) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, interview: InterviewStructure) => void;
}

const InterviewList: React.FC<InterviewListProps> = ({
  interviews,
  onShare,
  onMenuOpen
}) => {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeSlotsCount = (interview: InterviewStructure) => {
    return interview.availableSlots?.length || 0;
  };

  const getBookedSlotsCount = (interview: InterviewStructure) => {
    return interview.availableSlots?.filter(slot => slot.isBooked).length || 0;
  };

  // Función para crear un objeto de reserva compatible
  const createVideoButtonReservation = (interview: InterviewStructure) => {
    return {
      id: interview.id,
      interviewId: interview.id,
      candidateEmail: '',
      candidateName: '',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:00',
      status: interview.isActive ? 'confirmed' as const : 'cancelled' as const,
      interviewTitle: interview.title,
      recruiterName: 'Recruiter',
      recruiterEmail: '',
      meetingLink: undefined,
      notes: undefined,
      rescheduleReason: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  if (interviews.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <VideoCall sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No interviews created yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create your first interview structure to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {interviews.map(interview => {
        const videoButtonReservation = createVideoButtonReservation(interview);
        
        return (
          <Card
            key={interview.id}
            sx={{
              borderRadius: 3,
              transition: 'all 0.2s ease-in-out',
              border: 1,
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
                borderColor: 'primary.main',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: interview.isActive
                      ? alpha('#2196f3', 0.1)
                      : alpha('#9e9e9e', 0.1),
                    color: interview.isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: 600
                  }}
                >
                  {interview.isActive ? <Link /> : <LinkOff />}
                </Avatar>

                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {interview.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {interview.description || 'No description provided'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={interview.isActive ? 'Active' : 'Inactive'}
                        color={interview.isActive ? 'success' : 'default'}
                        size="small"
                        variant="outlined"
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => onMenuOpen(e, interview)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule sx={{ fontSize: 18, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {interview.duration} min
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VideoCall sx={{ fontSize: 18, color: 'info.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {getTimeSlotsCount(interview)} slots
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <People sx={{ fontSize: 18, color: 'success.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        {getBookedSlotsCount(interview)} booked
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Created {formatDate(interview.createdAt)}
                    </Typography>
                  </Box>

                  {/* URL Info */}
                  <Box sx={{ mb: 2, p: 1.5, backgroundColor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                      Shareable URL:
                    </Typography>
                    <Typography variant="body2" sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      wordBreak: 'break-all'
                    }}>
                      {`${typeof window !== 'undefined' ? window.location.origin : ''}/interview/${interview.shareableUrl}`}
                    </Typography>
                  </Box>

                  {/* Video Button */}
                  <Box sx={{ mb: 2 }}>
                    <InterviewVideoButton
                      reservation={videoButtonReservation}
                      variant="outlined"
                      size="small"
                      showStatus={false}
                    />
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => onShare(interview)}
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      Share
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                      onClick={() => {
                        const url = `${window.location.origin}/interview/${interview.shareableUrl}`;
                        window.open(url, '_blank');
                      }}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                      onClick={() => {
                        const url = `${window.location.origin}/interview/${interview.shareableUrl}`;
                        navigator.clipboard.writeText(url);
                      }}
                    >
                      Copy URL
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default InterviewList;