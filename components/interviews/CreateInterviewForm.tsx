


// // // components/interviews/CreateInterviewForm.tsx
// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   TextField,
// //   Button,
// //   Typography,
// //   Alert,
// //   CircularProgress,
// //   Grid,
// //   Card,
// //   CardContent,
// //   IconButton,
// // } from '@mui/material';
// // import { Add, Delete } from '@mui/icons-material';
// // import { useFormik } from 'formik';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { createInterview, clearError } from '../../store/slices/interviewSlice';
// // import { RootState } from '../../store';

// // interface TimeSlotInput {
// //   date: string;
// //   startTime: string;
// //   endTime: string;
// // }

// // interface CreateInterviewFormProps {
// //   onSuccess: () => void;
// //   onCancel: () => void;
// // }

// // const CreateInterviewForm: React.FC<CreateInterviewFormProps> = ({ onSuccess, onCancel }) => {
// //   const dispatch = useDispatch();
// //   const { loading, error } = useSelector((state: RootState) => state.interviews);
// //   const { user } = useSelector((state: RootState) => state.auth);

// //   const [timeSlots, setTimeSlots] = useState<TimeSlotInput[]>([
// //     { date: '', startTime: '09:00', endTime: '10:00' }
// //   ]);

// //   const formik = useFormik({
// //     initialValues: {
// //       title: '',
// //       description: '',
// //       duration: 60,
// //     },
// //     onSubmit: async (values) => {
// //       if (!user) return;

// //       const interviewData: any = {
// //         recruiterId: user.id,
// //         title: values.title,
// //         description: values.description,
// //         duration: values.duration,
// //         availableSlots: timeSlots.filter(slot => slot.date && slot.startTime && slot.endTime),
// //       };

// //       const result = await dispatch(createInterview(interviewData) as any);
// //       if (createInterview.fulfilled.match(result)) {
// //         formik.resetForm();
// //         setTimeSlots([{ date: '', startTime: '09:00', endTime: '10:00' }]);
// //         onSuccess();
// //       }
// //     },
// //   });

// //   const addTimeSlot = () => {
// //     setTimeSlots([...timeSlots, { date: '', startTime: '09:00', endTime: '10:00' }]);
// //   };

// //   const removeTimeSlot = (index: number) => {
// //     setTimeSlots(timeSlots.filter((_, i) => i !== index));
// //   };

// //   const updateTimeSlot = (index: number, field: keyof TimeSlotInput, value: string) => {
// //     const updatedSlots = timeSlots.map((slot, i) => 
// //       i === index ? { ...slot, [field]: value } : slot
// //     );
// //     setTimeSlots(updatedSlots);
// //   };

// //   const isFormValid = () => {
// //     return formik.values.title.trim() !== '' && 
// //            formik.values.duration > 0 &&
// //            timeSlots.some(slot => slot.date && slot.startTime && slot.endTime);
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
// //         Create New Interview Structure
// //       </Typography>

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
// //           {error}
// //         </Alert>
// //       )}

// //       <form onSubmit={formik.handleSubmit}>
// //         <Grid container spacing={3}>
// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               id="title"
// //               name="title"
// //               label="Interview Title *"
// //               value={formik.values.title}
// //               onChange={formik.handleChange}
// //               required
// //               variant="outlined"
// //               placeholder="e.g., Technical Interview - Frontend Position"
// //             />
// //           </Grid>

// //           <Grid item xs={12}>
// //             <TextField
// //               fullWidth
// //               id="description"
// //               name="description"
// //               label="Description"
// //               value={formik.values.description}
// //               onChange={formik.handleChange}
// //               multiline
// //               rows={3}
// //               variant="outlined"
// //               placeholder="Describe the interview process, topics to be covered, etc."
// //             />
// //           </Grid>

// //           <Grid item xs={12} md={6}>
// //             <TextField
// //               fullWidth
// //               id="duration"
// //               name="duration"
// //               label="Duration (minutes) *"
// //               type="number"
// //               value={formik.values.duration}
// //               onChange={formik.handleChange}
// //               required
// //               variant="outlined"
// //               inputProps={{ min: 15, max: 480 }}
// //               helperText="Typical duration: 30-60 minutes"
// //             />
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
// //               Available Time Slots *
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// //               Add the time slots when candidates can book interviews
// //             </Typography>
            
// //             {timeSlots.map((slot, index) => (
// //               <Card key={index} sx={{ mb: 2 }}>
// //                 <CardContent>
// //                   <Grid container spacing={2} alignItems="center">
// //                     <Grid item xs={12} md={4}>
// //                       <TextField
// //                         fullWidth
// //                         type="date"
// //                         label="Date *"
// //                         value={slot.date}
// //                         onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
// //                         InputLabelProps={{ shrink: true }}
// //                         required
// //                       />
// //                     </Grid>
// //                     <Grid item xs={5} md={3}>
// //                       <TextField
// //                         fullWidth
// //                         type="time"
// //                         label="Start Time *"
// //                         value={slot.startTime}
// //                         onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
// //                         InputLabelProps={{ shrink: true }}
// //                         required
// //                       />
// //                     </Grid>
// //                     <Grid item xs={5} md={3}>
// //                       <TextField
// //                         fullWidth
// //                         type="time"
// //                         label="End Time *"
// //                         value={slot.endTime}
// //                         onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
// //                         InputLabelProps={{ shrink: true }}
// //                         required
// //                       />
// //                     </Grid>
// //                     <Grid item xs={2} md={2}>
// //                       <IconButton 
// //                         color="error" 
// //                         onClick={() => removeTimeSlot(index)}
// //                         disabled={timeSlots.length === 1}
// //                       >
// //                         <Delete />
// //                       </IconButton>
// //                     </Grid>
// //                   </Grid>
// //                 </CardContent>
// //               </Card>
// //             ))}

// //             <Button
// //               startIcon={<Add />}
// //               onClick={addTimeSlot}
// //               variant="outlined"
// //               sx={{ mt: 1 }}
// //             >
// //               Add Time Slot
// //             </Button>
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
// //               <Button
// //                 type="submit"
// //                 variant="contained"
// //                 color="secondary"
// //                 size="large"
// //                 disabled={loading || !isFormValid()}
// //                 sx={{ minWidth: 120 }}
// //               >
// //                 {loading ? <CircularProgress size={24} /> : 'Create Interview'}
// //               </Button>
// //               <Button
// //                 variant="outlined"
// //                 onClick={onCancel}
// //                 size="large"
// //               >
// //                 Cancel
// //               </Button>
// //             </Box>
// //           </Grid>
// //         </Grid>
// //       </form>
// //     </Box>
// //   );
// // };

// // export default CreateInterviewForm;


// // components/interviews/CreateInterviewForm.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Chip,
//   Paper,
// } from '@mui/material';
// import { Add, Delete, ContentCopy, CheckCircle, VideoCall } from '@mui/icons-material';
// import { useFormik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import { createInterview, clearError } from '../../store/slices/interviewSlice';
// import { RootState } from '../../store';
// import useMeetLinkGenerator from '../../hooks/useMeetLinkGenerator';

// interface TimeSlotInput {
//   date: string;
//   startTime: string;
//   endTime: string;
// }

// interface CreateInterviewFormProps {
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// const CreateInterviewForm: React.FC<CreateInterviewFormProps> = ({ onSuccess, onCancel }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector((state: RootState) => state.interviews);
//   const { user } = useSelector((state: RootState) => state.auth);
//   const { generateMeetLink, generateMeetCode, generateZoomLink, isValidMeetCode } = useMeetLinkGenerator();

//   const [timeSlots, setTimeSlots] = useState<TimeSlotInput[]>([
//     { date: '', startTime: '09:00', endTime: '10:00' }
//   ]);
//   const [meetingLink, setMeetingLink] = useState<string>('');
//   const [zoomLink, setZoomLink] = useState<string>('');
//   const [meetingCode, setMeetingCode] = useState<string>('');
//   const [copySuccess, setCopySuccess] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       duration: 60,
//     },
//     onSubmit: async (values) => {
//       if (!user) return;

//       const interviewData: any = {
//         recruiterId: user.id,
//         title: values.title,
//         description: values.description,
//         duration: values.duration,
//         availableSlots: timeSlots.filter(slot => slot.date && slot.startTime && slot.endTime),
//         meetingLink: meetingLink,
//         meetingCode: meetingCode,
//         zoomLink: zoomLink,
//         meetingPlatform: 'google_meet'
//       };

//       const result = await dispatch(createInterview(interviewData) as any);
//       if (createInterview.fulfilled.match(result)) {
//         formik.resetForm();
//         setTimeSlots([{ date: '', startTime: '09:00', endTime: '10:00' }]);
//         setMeetingLink('');
//         setZoomLink('');
//         setMeetingCode('');
//         onSuccess();
//       }
//     },
//   });

//   // Generar meeting links cuando cambie el título o el usuario
//   useEffect(() => {
//     if (user && formik.values.title.trim()) {
//       const seed = `${user.id}-${formik.values.title}-${Date.now()}`;
//       const meetLink = generateMeetLink(seed);
//       const zoomLink = generateZoomLink(seed);
//       const code = generateMeetCode(seed);
      
//       setMeetingLink(meetLink);
//       setZoomLink(zoomLink);
//       setMeetingCode(code);
//     } else {
//       // Reset links si no hay título o usuario
//       setMeetingLink('');
//       setZoomLink('');
//       setMeetingCode('');
//     }
//   }, [formik.values.title, user, generateMeetLink, generateZoomLink, generateMeetCode]);

//   const handleCopyLink = async (link: string) => {
//     try {
//       await navigator.clipboard.writeText(link);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (error) {
//       console.error('Error copying link:', error);
//     }
//   };

//   const addTimeSlot = () => {
//     setTimeSlots([...timeSlots, { date: '', startTime: '09:00', endTime: '10:00' }]);
//   };

//   const removeTimeSlot = (index: number) => {
//     setTimeSlots(timeSlots.filter((_, i) => i !== index));
//   };

//   const updateTimeSlot = (index: number, field: keyof TimeSlotInput, value: string) => {
//     const updatedSlots = timeSlots.map((slot, i) => 
//       i === index ? { ...slot, [field]: value } : slot
//     );
//     setTimeSlots(updatedSlots);
//   };

//   const isFormValid = () => {
//     return formik.values.title.trim() !== '' && 
//            formik.values.duration > 0 &&
//            timeSlots.some(slot => slot.date && slot.startTime && slot.endTime) &&
//            meetingLink !== '';
//   };

//   const getDefaultDate = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split('T')[0];
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
//         Create New Interview Structure
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
//           {error}
//         </Alert>
//       )}

//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="title"
//               name="title"
//               label="Interview Title *"
//               value={formik.values.title}
//               onChange={formik.handleChange}
//               required
//               variant="outlined"
//               placeholder="e.g., Technical Interview - Frontend Position"
//               helperText="This will be used to generate a unique meeting link"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               id="description"
//               name="description"
//               label="Description"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               multiline
//               rows={3}
//               variant="outlined"
//               placeholder="Describe the interview process, topics to be covered, etc."
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               id="duration"
//               name="duration"
//               label="Duration (minutes) *"
//               type="number"
//               value={formik.values.duration}
//               onChange={formik.handleChange}
//               required
//               variant="outlined"
//               inputProps={{ min: 15, max: 480 }}
//               helperText="Typical duration: 30-60 minutes"
//             />
//           </Grid>

//           {/* Meeting Links Section */}
//           {meetingLink && (
//             <Grid item xs={12}>
//               <Paper sx={{ 
//                 p: 3, 
//                 backgroundColor: 'success.light', 
//                 border: '1px solid', 
//                 borderColor: 'success.main',
//                 borderRadius: 2
//               }}>
//                 <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <VideoCall />
//                   Meeting Links Generated
//                 </Typography>
                
//                 <Box sx={{ mb: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                       Google Meet:
//                     </Typography>
//                     <Chip 
//                       icon={<CheckCircle />}
//                       label="Valid Meeting Code" 
//                       color="success"
//                       size="small"
//                     />
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <Typography variant="body2" sx={{ 
//                       flex: 1, 
//                       fontFamily: 'monospace',
//                       backgroundColor: 'white',
//                       p: 1,
//                       borderRadius: 1,
//                       border: '1px solid',
//                       borderColor: 'divider'
//                     }}>
//                       {meetingLink}
//                     </Typography>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
//                       onClick={() => handleCopyLink(meetingLink)}
//                       color={copySuccess ? "success" : "primary"}
//                     >
//                       {copySuccess ? 'Copied!' : 'Copy'}
//                     </Button>
//                   </Box>
//                   <Typography variant="caption" color="text.secondary">
//                     Meeting Code: <strong>{meetingCode}</strong>
//                   </Typography>
//                 </Box>

//                 <Box>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//                     Zoom Backup:
//                   </Typography>
//                   <Typography variant="body2" sx={{ 
//                     fontFamily: 'monospace', 
//                     fontSize: '0.9rem',
//                     backgroundColor: 'white',
//                     p: 1,
//                     borderRadius: 1,
//                     border: '1px solid',
//                     borderColor: 'divider'
//                   }}>
//                     {zoomLink}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           )}

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2 }}>
//               Available Time Slots *
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Add the time slots when candidates can book interviews
//             </Typography>
            
//             {timeSlots.map((slot, index) => (
//               <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
//                 <CardContent>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} md={4}>
//                       <TextField
//                         fullWidth
//                         type="date"
//                         label="Date *"
//                         value={slot.date}
//                         onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
//                         InputLabelProps={{ shrink: true }}
//                         required
//                         inputProps={{ 
//                           min: getDefaultDate() 
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={5} md={3}>
//                       <TextField
//                         fullWidth
//                         type="time"
//                         label="Start Time *"
//                         value={slot.startTime}
//                         onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
//                         InputLabelProps={{ shrink: true }}
//                         required
//                       />
//                     </Grid>
//                     <Grid item xs={5} md={3}>
//                       <TextField
//                         fullWidth
//                         type="time"
//                         label="End Time *"
//                         value={slot.endTime}
//                         onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
//                         InputLabelProps={{ shrink: true }}
//                         required
//                       />
//                     </Grid>
//                     <Grid item xs={2} md={2}>
//                       <IconButton 
//                         color="error" 
//                         onClick={() => removeTimeSlot(index)}
//                         disabled={timeSlots.length === 1}
//                         sx={{
//                           '&:hover': {
//                             backgroundColor: 'error.light',
//                             color: 'white'
//                           }
//                         }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             ))}

//             <Button
//               startIcon={<Add />}
//               onClick={addTimeSlot}
//               variant="outlined"
//               sx={{ mt: 1 }}
//             >
//               Add Time Slot
//             </Button>
//           </Grid>

//           <Grid item xs={12}>
//             <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
//               <Button
//                 variant="outlined"
//                 onClick={onCancel}
//                 size="large"
//                 sx={{ minWidth: 120 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 size="large"
//                 disabled={loading || !isFormValid()}
//                 sx={{ minWidth: 120 }}
//                 startIcon={loading ? <CircularProgress size={20} /> : <VideoCall />}
//               >
//                 {loading ? 'Creating...' : 'Create Interview'}
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default CreateInterviewForm;


// components/interviews/CreateInterviewForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Paper,
  Tooltip,
  Snackbar,
} from '@mui/material';
import { 
  Add, 
  Delete, 
  ContentCopy, 
  CheckCircle, 
  VideoCall,
  Link as LinkIcon,
  ZoomIn,
  CalendarToday
} from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview, clearError } from '../../store/slices/interviewSlice';
import { RootState } from '../../store';
import useMeetLinkGenerator from '../../hooks/useMeetLinkGenerator';

interface TimeSlotInput {
  date: string;
  startTime: string;
  endTime: string;
}

interface CreateInterviewFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CreateInterviewForm: React.FC<CreateInterviewFormProps> = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.interviews);
  const { user } = useSelector((state: RootState) => state.auth);
  const { generateMeetLink, generateMeetCode, generateZoomLink, isValidMeetCode } = useMeetLinkGenerator();

  const [timeSlots, setTimeSlots] = useState<TimeSlotInput[]>([
    { date: '', startTime: '09:00', endTime: '10:00' }
  ]);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [zoomLink, setZoomLink] = useState<string>('');
  const [meetingCode, setMeetingCode] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      duration: 60,
    },
    onSubmit: async (values) => {
      if (!user) return;

      const interviewData: any = {
        recruiterId: user.id,
        title: values.title,
        description: values.description,
        duration: values.duration,
        availableSlots: timeSlots.filter(slot => slot.date && slot.startTime && slot.endTime),
        meetingLink: meetingLink,
        meetingCode: meetingCode,
        zoomLink: zoomLink,
        meetingPlatform: 'google_meet'
      };

      const result = await dispatch(createInterview(interviewData) as any);
      if (createInterview.fulfilled.match(result)) {
        formik.resetForm();
        setTimeSlots([{ date: '', startTime: '09:00', endTime: '10:00' }]);
        setMeetingLink('');
        setZoomLink('');
        setMeetingCode('');
        onSuccess();
      }
    },
  });

  // Generar meeting links cuando cambie el título o el usuario
  useEffect(() => {
    if (user && formik.values.title.trim()) {
      const seed = `${user.id}-${formik.values.title}-${Date.now()}`;
      const meetLink = generateMeetLink(seed);
      const zoomLink = generateZoomLink(seed);
      const code = generateMeetCode(seed);
      
      setMeetingLink(meetLink);
      setZoomLink(zoomLink);
      setMeetingCode(code);
    } else {
      // Reset links si no hay título o usuario
      setMeetingLink('');
      setZoomLink('');
      setMeetingCode('');
    }
  }, [formik.values.title, user, generateMeetLink, generateZoomLink, generateMeetCode]);

  const handleCopyLink = async (link: string, type: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      setSnackbarMessage(`${type} link copied to clipboard! 🎉`);
      setSnackbarOpen(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      setSnackbarMessage('Error copying link');
      setSnackbarOpen(true);
    }
  };

  const handleTestMeeting = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { date: '', startTime: '09:00', endTime: '10:00' }]);
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlotInput, value: string) => {
    const updatedSlots = timeSlots.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    );
    setTimeSlots(updatedSlots);
  };

  const isFormValid = () => {
    return formik.values.title.trim() !== '' && 
           formik.values.duration > 0 &&
           timeSlots.some(slot => slot.date && slot.startTime && slot.endTime) &&
           meetingLink !== '';
  };

  const getDefaultDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ 
        color: 'primary.main', 
        mb: 3,
        fontWeight: 700,
        textAlign: 'center'
      }}>
        Create New Interview
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: 'primary.main'
                }}>
                  <CalendarToday />
                  Interview Details
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="title"
                      name="title"
                      label="Interview Title *"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      required
                      variant="outlined"
                      placeholder="e.g., Technical Interview - Frontend Position"
                      helperText="This will be used to generate unique meeting links"
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Describe the interview process, topics to be covered, etc."
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="duration"
                      name="duration"
                      label="Duration (minutes) *"
                      type="number"
                      value={formik.values.duration}
                      onChange={formik.handleChange}
                      required
                      variant="outlined"
                      inputProps={{ min: 15, max: 480 }}
                      helperText="Typical duration: 30-60 minutes"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Meeting Links Section */}
          {meetingLink && (
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'success.main',
                backgroundColor: 'success.50'
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: 'success.main'
                  }}>
                    <VideoCall />
                    Meeting Links Generated Automatically
                  </Typography>
                  
                  {/* Google Meet Section */}
                  <Paper sx={{ 
                    p: 2, 
                    mb: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'success.light'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <VideoCall sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Google Meet
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            icon={<CheckCircle />}
                            label="Valid Meeting Code" 
                            color="success"
                            size="small"
                            variant="filled"
                          />
                          <Typography variant="caption" color="text.secondary">
                            Code: <strong>{meetingCode}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ 
                        flex: 1,
                        fontFamily: 'monospace',
                        backgroundColor: 'grey.50',
                        p: 1.5,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        fontSize: '0.9rem',
                        wordBreak: 'break-all'
                      }}>
                        {meetingLink}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
                        onClick={() => handleCopyLink(meetingLink, 'Google Meet')}
                        color={copySuccess ? "success" : "primary"}
                        sx={{ minWidth: 120 }}
                      >
                        {copySuccess ? 'Copied!' : 'Copy Link'}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VideoCall />}
                        onClick={() => handleTestMeeting(meetingLink)}
                        sx={{ minWidth: 140 }}
                      >
                        Test Meeting
                      </Button>
                    </Box>
                  </Paper>

                  {/* Zoom Backup Section */}
                  <Paper sx={{ 
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'info.light'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: '50%', 
                        backgroundColor: 'info.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ZoomIn sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Zoom Backup
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Alternative meeting platform
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ 
                        flex: 1,
                        fontFamily: 'monospace',
                        backgroundColor: 'grey.50',
                        p: 1.5,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        fontSize: '0.9rem',
                        wordBreak: 'break-all'
                      }}>
                        {zoomLink}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={copySuccess ? <CheckCircle /> : <ContentCopy />}
                        onClick={() => handleCopyLink(zoomLink, 'Zoom')}
                        color="info"
                        sx={{ minWidth: 120 }}
                      >
                        {copySuccess ? 'Copied!' : 'Copy Link'}
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<ZoomIn />}
                        onClick={() => handleTestMeeting(zoomLink)}
                        color="info"
                        sx={{ minWidth: 140 }}
                      >
                        Test Meeting
                      </Button>
                    </Box>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Time Slots Section */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: 'primary.main'
                }}>
                  <CalendarToday />
                  Available Time Slots *
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Add the time slots when candidates can book interviews. Dates must be in the future.
                </Typography>
                
                {timeSlots.map((slot, index) => (
                  <Card key={index} sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200'
                  }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Date *"
                            value={slot.date}
                            onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                            inputProps={{ 
                              min: getMinDate() 
                            }}
                            helperText="Select a future date"
                          />
                        </Grid>
                        <Grid item xs={5} md={3}>
                          <TextField
                            fullWidth
                            type="time"
                            label="Start Time *"
                            value={slot.startTime}
                            onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                        </Grid>
                        <Grid item xs={5} md={3}>
                          <TextField
                            fullWidth
                            type="time"
                            label="End Time *"
                            value={slot.endTime}
                            onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            required
                          />
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <Tooltip title="Remove time slot">
                            <IconButton 
                              color="error" 
                              onClick={() => removeTimeSlot(index)}
                              disabled={timeSlots.length === 1}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'error.light',
                                  color: 'white'
                                }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  startIcon={<Add />}
                  onClick={addTimeSlot}
                  variant="outlined"
                  sx={{ mt: 1 }}
                >
                  Add Another Time Slot
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'flex-end',
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    size="large"
                    sx={{ 
                      minWidth: 120,
                      borderRadius: 2
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading || !isFormValid()}
                    sx={{ 
                      minWidth: 160,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      }
                    }}
                    startIcon={loading ? <CircularProgress size={20} /> : <VideoCall />}
                  >
                    {loading ? 'Creating...' : 'Create Interview'}
                  </Button>
                </Box>

                {!isFormValid() && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                    * Please fill in all required fields and add at least one time slot
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>

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
          sx={{ borderRadius: 2 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateInterviewForm;