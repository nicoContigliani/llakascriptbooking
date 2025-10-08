// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Container,
// // //   Typography,
// // //   Box,
// // //   Card,
// // //   CardContent,
// // //   Button,
// // //   Grid,
// // //   Chip,
// // //   Alert,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   TextField,
// // // } from '@mui/material';
// // // import { ContentCopy, Share, Add } from '@mui/icons-material';
// // // import { useSelector, useDispatch } from 'react-redux';
// // // import { useRouter } from 'next/router';
// // // import { RootState } from '../../store';
// // // import { getRecruiterInterviews, clearError } from '../../store/slices/interviewSlice';
// // // import CreateInterviewForm from '../../components/interviews/CreateInterviewForm';

// // // const RecruiterDashboard: React.FC = () => {
// // //   const dispatch = useDispatch();
// // //   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
// // //   const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);
// // //   const router = useRouter();
// // //   const [createDialogOpen, setCreateDialogOpen] = useState(false);
// // //   const [shareDialogOpen, setShareDialogOpen] = useState(false);
// // //   const [currentInterview, setCurrentInterview] = useState<any>(null);
// // //   const [copied, setCopied] = useState(false);

// // //   useEffect(() => {
// // //     if (!isAuthenticated || user?.role !== 'recruiter') {
// // //       router.push('/auth/login');
// // //     } else {
// // //       dispatch(getRecruiterInterviews(user.id) as any);
// // //     }
// // //   }, [isAuthenticated, user, router, dispatch]);

// // //   const handleShare = (interview: any) => {
// // //     setCurrentInterview(interview);
// // //     setShareDialogOpen(true);
// // //     setCopied(false);
// // //   };

// // //   const copyToClipboard = () => {
// // //     const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
// // //     navigator.clipboard.writeText(url);
// // //     setCopied(true);
// // //   };

// // //   if (!isAuthenticated || user?.role !== 'recruiter') {
// // //     return null;
// // //   }

// // //   return (
// // //       <Container maxWidth="lg">
// // //         <Box sx={{ mb: 4 }}>
// // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //             <Typography variant="h3" component="h1" sx={{ color: 'primary.main' }}>
// // //               Recruiter Dashboard
// // //             </Typography>
// // //             <Button
// // //               variant="contained"
// // //               color="secondary"
// // //               startIcon={<Add />}
// // //               onClick={() => setCreateDialogOpen(true)}
// // //             >
// // //               Create Interview
// // //             </Button>
// // //           </Box>
// // //           <Typography variant="h6" sx={{ color: 'text.secondary' }}>
// // //             Welcome, {user.name}
// // //           </Typography>
// // //         </Box>

// // //         {error && (
// // //           <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
// // //             {error}
// // //           </Alert>
// // //         )}

// // //         <Grid container spacing={3}>
// // //           {interviews.map((interview) => (
// // //             <Grid item xs={12} md={6} key={interview.id}>
// // //               <Card>
// // //                 <CardContent>
// // //                   <Typography variant="h6" gutterBottom>
// // //                     {interview.title}
// // //                   </Typography>
// // //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
// // //                     {interview.description}
// // //                   </Typography>
// // //                   <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
// // //                     <Chip 
// // //                       label={`${interview.duration} min`} 
// // //                       size="small" 
// // //                       variant="outlined" 
// // //                     />
// // //                     <Chip 
// // //                       label={interview.isActive ? 'Active' : 'Inactive'} 
// // //                       color={interview.isActive ? 'success' : 'default'}
// // //                       size="small" 
// // //                     />
// // //                   </Box>
// // //                   <Box sx={{ display: 'flex', gap: 1 }}>
// // //                     <Button
// // //                       variant="outlined"
// // //                       startIcon={<Share />}
// // //                       onClick={() => handleShare(interview)}
// // //                       size="small"
// // //                     >
// // //                       Share
// // //                     </Button>
// // //                     <Button variant="outlined" size="small">
// // //                       View Details
// // //                     </Button>
// // //                   </Box>
// // //                 </CardContent>
// // //               </Card>
// // //             </Grid>
// // //           ))}

// // //           {interviews.length === 0 && !loading && (
// // //             <Grid item xs={12}>
// // //               <Card>
// // //                 <CardContent sx={{ textAlign: 'center', py: 4 }}>
// // //                   <Typography variant="h6" color="text.secondary" gutterBottom>
// // //                     No interviews created yet
// // //                   </Typography>
// // //                   <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
// // //                     Create your first interview structure to get started
// // //                   </Typography>
// // //                   <Button
// // //                     variant="contained"
// // //                     color="secondary"
// // //                     startIcon={<Add />}
// // //                     onClick={() => setCreateDialogOpen(true)}
// // //                   >
// // //                     Create Interview
// // //                   </Button>
// // //                 </CardContent>
// // //               </Card>
// // //             </Grid>
// // //           )}
// // //         </Grid>

// // //         {/* Dialog para crear entrevista */}
// // //         <Dialog 
// // //           open={createDialogOpen} 
// // //           onClose={() => setCreateDialogOpen(false)}
// // //           maxWidth="md"
// // //           fullWidth
// // //         >
// // //           <DialogTitle>Create New Interview</DialogTitle>
// // //           <DialogContent>
// // //             <CreateInterviewForm />
// // //           </DialogContent>
// // //           <DialogActions>
// // //             <Button onClick={() => setCreateDialogOpen(false)}>Close</Button>
// // //           </DialogActions>
// // //         </Dialog>

// // //         {/* Dialog para compartir */}
// // //         <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
// // //           <DialogTitle>Share Interview</DialogTitle>
// // //           <DialogContent>
// // //             <Typography variant="body2" sx={{ mb: 2 }}>
// // //               Share this link with candidates to let them book time slots:
// // //             </Typography>
// // //             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
// // //               <TextField
// // //                 value={currentInterview ? `${window.location.origin}/interview/${currentInterview.shareableUrl}` : ''}
// // //                 fullWidth
// // //                 size="small"
// // //                 InputProps={{ readOnly: true }}
// // //               />
// // //               <Button
// // //                 startIcon={<ContentCopy />}
// // //                 onClick={copyToClipboard}
// // //                 variant="outlined"
// // //                 color={copied ? 'success' : 'primary'}
// // //               >
// // //                 {copied ? 'Copied!' : 'Copy'}
// // //               </Button>
// // //             </Box>
// // //           </DialogContent>
// // //           <DialogActions>
// // //             <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
// // //           </DialogActions>
// // //         </Dialog>
// // //       </Container>
// // //   );
// // // };

// // // export default RecruiterDashboard;


// // // pages/recruiter/dashboard.tsx
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   Card,
// //   CardContent,
// //   Button,
// //   Alert,
// //   Dialog,
// //   Tabs,
// //   Tab,
// //   Chip,
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   ListItemIcon,
// //   ListItemText,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// // } from '@mui/material';
// // import {
// //   Add,
// //   MoreVert,
// //   Edit,
// //   Delete,
// //   ContentCopy,
// //   Share,
// //   CalendarViewMonth,
// //   ViewList,
// // } from '@mui/icons-material';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { useRouter } from 'next/router';
// // import { RootState } from '../../store';
// // import { getRecruiterInterviews, clearError, deleteInterview } from '../../store/slices/interviewSlice';
// // import CreateInterviewForm from '../../components/interviews/CreateInterviewForm';
// // import InterviewCalendar from '@/components/interviews/InterviewCalendar';
// // import InterviewList from '@/components/interviews/InterviewList';

// // const RecruiterDashboard: React.FC = () => {
// //   const dispatch = useDispatch();
// //   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
// //   const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);
// //   const router = useRouter();
  
// //   const [createDialogOpen, setCreateDialogOpen] = useState(false);
// //   const [shareDialogOpen, setShareDialogOpen] = useState(false);
// //   const [currentInterview, setCurrentInterview] = useState<any>(null);
// //   const [copied, setCopied] = useState(false);
// //   const [activeTab, setActiveTab] = useState(0);
// //   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
// //   const [selectedInterview, setSelectedInterview] = useState<any>(null);

// //   useEffect(() => {
// //     if (!isAuthenticated || user?.role !== 'recruiter') {
// //       router.push('/auth/login');
// //     } else {
// //       dispatch(getRecruiterInterviews(user.id) as any);
// //     }
// //   }, [isAuthenticated, user, router, dispatch]);

// //   const handleShare = (interview: any) => {
// //     setCurrentInterview(interview);
// //     setShareDialogOpen(true);
// //     setCopied(false);
// //   };

// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, interview: any) => {
// //     setMenuAnchor(event.currentTarget);
// //     setSelectedInterview(interview);
// //   };

// //   const handleMenuClose = () => {
// //     setMenuAnchor(null);
// //     setSelectedInterview(null);
// //   };

// //   const handleEdit = () => {
// //     // Implementar edición
// //     console.log('Edit interview:', selectedInterview);
// //     handleMenuClose();
// //   };

// //   const handleDelete = () => {
// //     if (selectedInterview) {
// //       dispatch(deleteInterview(selectedInterview.id) as any);
// //     }
// //     handleMenuClose();
// //   };

// //   const copyToClipboard = () => {
// //     const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
// //     navigator.clipboard.writeText(url);
// //     setCopied(true);
// //   };

// //   const getStatusColor = (isActive: boolean) => {
// //     return isActive ? 'success' : 'default';
// //   };

// //   if (!isAuthenticated || user?.role !== 'recruiter') {
// //     return null;
// //   }

// //   return (
// //     <Container maxWidth="xl" sx={{ py: 4 }}>
// //       {/* Header */}
// //       <Box sx={{ mb: 6 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
// //           <Box>
// //             <Typography variant="h3" component="h1" sx={{ 
// //               color: 'primary.main',
// //               fontWeight: 700,
// //               mb: 1
// //             }}>
// //               Interview Dashboard
// //             </Typography>
// //             <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
// //               Welcome back, {user.name} 👋
// //             </Typography>
// //           </Box>
// //           <Button
// //             variant="contained"
// //             color="secondary"
// //             startIcon={<Add />}
// //             onClick={() => setCreateDialogOpen(true)}
// //             sx={{
// //               borderRadius: 3,
// //               px: 4,
// //               py: 1.5,
// //               fontSize: '1rem',
// //               fontWeight: 600,
// //             }}
// //           >
// //             Create Interview
// //           </Button>
// //         </Box>

// //         {/* Stats Cards */}
// //         <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
// //           <Card sx={{ flex: 1, borderRadius: 3 }}>
// //             <CardContent sx={{ p: 3 }}>
// //               <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
// //                 {interviews.length}
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 Total Interviews
// //               </Typography>
// //             </CardContent>
// //           </Card>
// //           <Card sx={{ flex: 1, borderRadius: 3 }}>
// //             <CardContent sx={{ p: 3 }}>
// //               <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
// //                 {interviews.filter(i => i.isActive).length}
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 Active Interviews
// //               </Typography>
// //             </CardContent>
// //           </Card>
// //           <Card sx={{ flex: 1, borderRadius: 3 }}>
// //             <CardContent sx={{ p: 3 }}>
// //               <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
// //                 0
// //               </Typography>
// //               <Typography variant="body2" color="text.secondary">
// //                 Scheduled Today
// //               </Typography>
// //             </CardContent>
// //           </Card>
// //         </Box>
// //       </Box>

// //       {error && (
// //         <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => dispatch(clearError())}>
// //           {error}
// //         </Alert>
// //       )}

// //       {/* Navigation Tabs */}
// //       <Card sx={{ borderRadius: 3, mb: 4 }}>
// //         <CardContent sx={{ p: 0 }}>
// //           <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
// //             <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
// //               <Tab 
// //                 icon={<CalendarViewMonth />} 
// //                 label="Calendar View" 
// //                 iconPosition="start"
// //                 sx={{ fontWeight: 600 }}
// //               />
// //               <Tab 
// //                 icon={<ViewList />} 
// //                 label="List View" 
// //                 iconPosition="start"
// //                 sx={{ fontWeight: 600 }}
// //               />
// //             </Tabs>
// //           </Box>

// //           {/* Tab Content */}
// //           <Box sx={{ p: 3 }}>
// //             {activeTab === 0 ? (
// //               <InterviewCalendar interviews={interviews} />
// //             ) : (
// //               <InterviewList 
// //                 interviews={interviews}
// //                 onShare={handleShare}
// //                 onMenuOpen={handleMenuOpen}
// //               />
// //             )}
// //           </Box>
// //         </CardContent>
// //       </Card>

// //       {/* Dialogs */}
// //       <Dialog 
// //         open={createDialogOpen} 
// //         onClose={() => setCreateDialogOpen(false)}
// //         maxWidth="md"
// //         fullWidth
// //         PaperProps={{ sx: { borderRadius: 3 } }}
// //       >
// //         <DialogTitle sx={{ 
// //           backgroundColor: 'primary.main',
// //           color: 'white',
// //           fontWeight: 600
// //         }}>
// //           Create New Interview
// //         </DialogTitle>
// //         <DialogContent sx={{ p: 0 }}>
// //           <CreateInterviewForm onSuccess={() => setCreateDialogOpen(false)} />
// //         </DialogContent>
// //       </Dialog>

// //       <Dialog 
// //         open={shareDialogOpen} 
// //         onClose={() => setShareDialogOpen(false)}
// //         PaperProps={{ sx: { borderRadius: 3 } }}
// //       >
// //         <DialogTitle sx={{ fontWeight: 600 }}>Share Interview</DialogTitle>
// //         <DialogContent>
// //           <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
// //             Share this link with candidates to let them book time slots:
// //           </Typography>
// //           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
// //             <Typography
// //               variant="body2"
// //               sx={{
// //                 flex: 1,
// //                 p: 2,
// //                 backgroundColor: 'grey.50',
// //                 borderRadius: 2,
// //                 border: '1px solid',
// //                 borderColor: 'grey.200',
// //                 fontFamily: 'monospace',
// //                 wordBreak: 'break-all'
// //               }}
// //             >
// //               {currentInterview ? `${window.location.origin}/interview/${currentInterview.shareableUrl}` : ''}
// //             </Typography>
// //             <Button
// //               startIcon={<ContentCopy />}
// //               onClick={copyToClipboard}
// //               variant="outlined"
// //               color={copied ? 'success' : 'primary'}
// //               sx={{ minWidth: 'auto', px: 3 }}
// //             >
// //               {copied ? 'Copied!' : 'Copy'}
// //             </Button>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 3 }}>
// //           <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Context Menu */}
// //       <Menu
// //         anchorEl={menuAnchor}
// //         open={Boolean(menuAnchor)}
// //         onClose={handleMenuClose}
// //         PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
// //       >
// //         <MenuItem onClick={handleEdit}>
// //           <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
// //           <ListItemText>Edit</ListItemText>
// //         </MenuItem>
// //         <MenuItem onClick={() => handleShare(selectedInterview)}>
// //           <ListItemIcon><Share fontSize="small" /></ListItemIcon>
// //           <ListItemText>Share</ListItemText>
// //         </MenuItem>
// //         <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
// //           <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
// //           <ListItemText>Delete</ListItemText>
// //         </MenuItem>
// //       </Menu>
// //     </Container>
// //   );
// // };

// // export default RecruiterDashboard;



// // pages/recruiter/dashboard.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Alert,
//   Dialog,
//   Tabs,
//   Tab,
//   Chip,
//   IconButton,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   ListItemText,
//   Snackbar,
//   CircularProgress,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import {
//   Add,
//   MoreVert,
//   Edit,
//   Delete,
//   ContentCopy,
//   Share,
//   CalendarViewMonth,
//   ViewList,
//   Link,
//   VideoCall,
//   Schedule,
//   People,
// } from '@mui/icons-material';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { RootState } from '../../store';
// import { 
//   getRecruiterInterviews, 
//   clearError, 
//   deleteInterview, 
//   updateInterview 
// } from '../../store/slices/interviewSlice';
// import InterviewCalendar from '@/components/interviews/InterviewCalendar';
// import InterviewList from '@/components/interviews/InterviewList';
// import CreateInterviewForm from '@/components/interviews/CreateInterviewForm';
// import EditInterviewForm from '@/components/interviews/EditInterviewForm';


// const RecruiterDashboard: React.FC = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);
//   const router = useRouter();
  
//   const [createDialogOpen, setCreateDialogOpen] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [shareDialogOpen, setShareDialogOpen] = useState(false);
//   const [currentInterview, setCurrentInterview] = useState<any>(null);
//   const [copied, setCopied] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
//   const [selectedInterview, setSelectedInterview] = useState<any>(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

//   useEffect(() => {
//     if (!isAuthenticated || user?.role !== 'recruiter') {
//       router.push('/auth/login');
//     } else {
//       dispatch(getRecruiterInterviews(user.id) as any);
//     }
//   }, [isAuthenticated, user, router, dispatch]);

//   const handleShare = (interview: any) => {
//     setCurrentInterview(interview);
//     setShareDialogOpen(true);
//     setCopied(false);
//   };

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, interview: any) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedInterview(interview);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedInterview(null);
//   };

//   const handleEdit = () => {
//     setCurrentInterview(selectedInterview);
//     setEditDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleDelete = async () => {
//     if (selectedInterview) {
//       try {
//         await dispatch(deleteInterview(selectedInterview.id) as any);
//         setSnackbar({ open: true, message: 'Interview deleted successfully', severity: 'success' });
//       } catch (error) {
//         setSnackbar({ open: true, message: 'Failed to delete interview', severity: 'error' });
//       }
//     }
//     handleMenuClose();
//   };

//   const handleToggleActive = async () => {
//     if (selectedInterview) {
//       try {
//         await dispatch(updateInterview({
//           id: selectedInterview.id,
//           isActive: !selectedInterview.isActive
//         }) as any);
//         setSnackbar({ 
//           open: true, 
//           message: `Interview ${!selectedInterview.isActive ? 'activated' : 'deactivated'} successfully`, 
//           severity: 'success' 
//         });
//       } catch (error) {
//         setSnackbar({ open: true, message: 'Failed to update interview', severity: 'error' });
//       }
//     }
//     handleMenuClose();
//   };

//   const copyToClipboard = () => {
//     if (currentInterview) {
//       const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
//       navigator.clipboard.writeText(url);
//       setCopied(true);
//       setSnackbar({ open: true, message: 'URL copied to clipboard!', severity: 'success' });
//     }
//   };

//   const handleCreateSuccess = () => {
//     setCreateDialogOpen(false);
//     setSnackbar({ open: true, message: 'Interview created successfully!', severity: 'success' });
//     dispatch(getRecruiterInterviews(user!.id) as any);
//   };

//   const handleEditSuccess = () => {
//     setEditDialogOpen(false);
//     setSnackbar({ open: true, message: 'Interview updated successfully!', severity: 'success' });
//     dispatch(getRecruiterInterviews(user!.id) as any);
//   };

//   const getStats = () => {
//     const totalInterviews = interviews.length;
//     const activeInterviews = interviews.filter(i => i.isActive).length;
//     const totalSlots = interviews.reduce((acc, interview) => acc + (interview.availableSlots?.length || 0), 0);
//     const bookedSlots = interviews.reduce((acc, interview) => 
//       acc + (interview.availableSlots?.filter(slot => slot.isBooked).length || 0), 0
//     );

//     return { totalInterviews, activeInterviews, totalSlots, bookedSlots };
//   };

//   if (!isAuthenticated || user?.role !== 'recruiter') {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const stats = getStats();

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box sx={{ mb: 6 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
//           <Box>
//             <Typography variant="h3" component="h1" sx={{ 
//               color: 'primary.main',
//               fontWeight: 700,
//               mb: 1
//             }}>
//               Interview Dashboard
//             </Typography>
//             <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
//               Welcome back, {user.name} 👋
//             </Typography>
//           </Box>
//           <Button
//             variant="contained"
//             color="secondary"
//             startIcon={<Add />}
//             onClick={() => setCreateDialogOpen(true)}
//             sx={{
//               borderRadius: 3,
//               px: 4,
//               py: 1.5,
//               fontSize: '1rem',
//               fontWeight: 600,
//             }}
//           >
//             Create Interview
//           </Button>
//         </Box>

//         {/* Stats Cards */}
//         <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
//           <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                 <VideoCall sx={{ fontSize: 32, color: 'primary.main' }} />
//                 <Box>
//                   <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
//                     {stats.totalInterviews}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Total Interviews
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
          
//           <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                 <Link sx={{ fontSize: 32, color: 'success.main' }} />
//                 <Box>
//                   <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
//                     {stats.activeInterviews}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Active Interviews
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
          
//           <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                 <Schedule sx={{ fontSize: 32, color: 'info.main' }} />
//                 <Box>
//                   <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
//                     {stats.totalSlots}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Total Time Slots
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
          
//           <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                 <People sx={{ fontSize: 32, color: 'warning.main' }} />
//                 <Box>
//                   <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
//                     {stats.bookedSlots}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Booked Slots
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>

//       {error && (
//         <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => dispatch(clearError())}>
//           {error}
//         </Alert>
//       )}

//       {/* Navigation Tabs */}
//       <Card sx={{ borderRadius: 3, mb: 4 }}>
//         <CardContent sx={{ p: 0 }}>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
//             <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
//               <Tab 
//                 icon={<CalendarViewMonth />} 
//                 label="Calendar View" 
//                 iconPosition="start"
//                 sx={{ fontWeight: 600 }}
//               />
//               <Tab 
//                 icon={<ViewList />} 
//                 label="List View" 
//                 iconPosition="start"
//                 sx={{ fontWeight: 600 }}
//               />
//             </Tabs>
//           </Box>

//           {/* Tab Content */}
//           <Box sx={{ p: 3 }}>
//             {activeTab === 0 ? (
//               <InterviewCalendar 
//                 interviews={interviews}
//                 onInterviewClick={(interview) => {
//                   setCurrentInterview(interview);
//                   setShareDialogOpen(true);
//                 }}
//               />
//             ) : (
//               <InterviewList 
//                 interviews={interviews}
//                 onShare={handleShare}
//                 onMenuOpen={handleMenuOpen}
//               />
//             )}
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Dialog para crear entrevista */}
//       <Dialog 
//         open={createDialogOpen} 
//         onClose={() => setCreateDialogOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ 
//           backgroundColor: 'primary.main',
//           color: 'white',
//           fontWeight: 600
//         }}>
//           Create New Interview
//         </DialogTitle>
//         <DialogContent sx={{ p: 0 }}>
//           <CreateInterviewForm 
//             onSuccess={handleCreateSuccess}
//             onCancel={() => setCreateDialogOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Dialog para editar entrevista */}
//       <Dialog 
//         open={editDialogOpen} 
//         onClose={() => setEditDialogOpen(false)}
//         maxWidth="md"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ 
//           backgroundColor: 'primary.main',
//           color: 'white',
//           fontWeight: 600
//         }}>
//           Edit Interview
//         </DialogTitle>
//         <DialogContent sx={{ p: 0 }}>
//           <EditInterviewForm 
//             interview={currentInterview}
//             onSuccess={handleEditSuccess}
//             onCancel={() => setEditDialogOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>

//       {/* Dialog para compartir */}
//       <Dialog 
//         open={shareDialogOpen} 
//         onClose={() => setShareDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
//           <Share />
//           Share Interview
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
//             {currentInterview?.title}
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
//             Share this link with candidates to let them book time slots for this interview:
//           </Typography>
          
//           <Box sx={{ 
//             p: 2, 
//             backgroundColor: 'grey.50', 
//             borderRadius: 2,
//             border: '1px solid',
//             borderColor: 'grey.200',
//             mb: 2
//           }}>
//             <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
//               {currentInterview ? `${window.location.origin}/interview/${currentInterview.shareableUrl}` : ''}
//             </Typography>
//           </Box>

//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             <Button
//               startIcon={<ContentCopy />}
//               onClick={copyToClipboard}
//               variant="contained"
//               color={copied ? 'success' : 'primary'}
//               sx={{ minWidth: '140px' }}
//             >
//               {copied ? 'Copied!' : 'Copy URL'}
//             </Button>
//             <Button
//               startIcon={<Share />}
//               onClick={() => {
//                 if (currentInterview) {
//                   const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
//                   window.open(`mailto:?subject=Interview Invitation&body=You are invited to book an interview slot. Please use this link: ${url}`, '_blank');
//                 }
//               }}
//               variant="outlined"
//             >
//               Share via Email
//             </Button>
//           </Box>

//           <Alert severity="info" sx={{ mt: 2 }}>
//             <Typography variant="body2">
//               Candidates can use this link to view available time slots and book their interview.
//             </Typography>
//           </Alert>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Context Menu */}
//       <Menu
//         anchorEl={menuAnchor}
//         open={Boolean(menuAnchor)}
//         onClose={handleMenuClose}
//         PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
//       >
//         <MenuItem onClick={handleEdit}>
//           <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
//           <ListItemText>Edit</ListItemText>
//         </MenuItem>
//         <MenuItem onClick={() => handleShare(selectedInterview)}>
//           <ListItemIcon><Share fontSize="small" /></ListItemIcon>
//           <ListItemText>Share</ListItemText>
//         </MenuItem>
//         <MenuItem onClick={handleToggleActive}>
//           <ListItemIcon><Link fontSize="small" /></ListItemIcon>
//           <ListItemText>
//             {selectedInterview?.isActive ? 'Deactivate' : 'Activate'}
//           </ListItemText>
//         </MenuItem>
//         <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//           <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
//           <ListItemText>Delete</ListItemText>
//         </MenuItem>
//       </Menu>

//       {/* Snackbar para notificaciones */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           severity={snackbar.severity} 
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           sx={{ borderRadius: 2 }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default RecruiterDashboard;



// pages/recruiter/dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Dialog,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  CircularProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  Share,
  CalendarViewMonth,
  ViewList,
  Link,
  VideoCall,
  Schedule,
  People,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { 
  getRecruiterInterviews, 
  clearError, 
  deleteInterview, 
  updateInterview 
} from '../../store/slices/interviewSlice';
import InterviewCalendar from '@/components/interviews/InterviewCalendar';
import InterviewList from '@/components/interviews/InterviewList';
import CreateInterviewForm from '@/components/interviews/CreateInterviewForm';
import EditInterviewForm from '@/components/interviews/EditInterviewForm';

const RecruiterDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);
  console.log("🚀 ~ RecruiterDashboard ~ interviews:", interviews)
  const router = useRouter();
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Nuevo estado para forzar actualización

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'recruiter') {
      router.push('/auth/login');
    } else {
      dispatch(getRecruiterInterviews(user.id) as any);
    }
  }, [isAuthenticated, user, router, dispatch, refreshTrigger]); // Añadir refreshTrigger como dependencia

  const handleShare = (interview: any) => {
    setCurrentInterview(interview);
    setShareDialogOpen(true);
    setCopied(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, interview: any) => {
    setMenuAnchor(event.currentTarget);
    setSelectedInterview(interview);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedInterview(null);
  };

  const handleEdit = () => {
    setCurrentInterview(selectedInterview);
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (selectedInterview) {
      try {
        await dispatch(deleteInterview(selectedInterview.id) as any);
        setSnackbar({ open: true, message: 'Interview deleted successfully', severity: 'success' });
        // Forzar actualización después de eliminar
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete interview', severity: 'error' });
      }
    }
    handleMenuClose();
  };

  const handleToggleActive = async () => {
    if (selectedInterview) {
      try {
        await dispatch(updateInterview({
          id: selectedInterview.id,
          isActive: !selectedInterview.isActive
        }) as any);
        setSnackbar({ 
          open: true, 
          message: `Interview ${!selectedInterview.isActive ? 'activated' : 'deactivated'} successfully`, 
          severity: 'success' 
        });
        // Forzar actualización después de cambiar estado
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to update interview', severity: 'error' });
      }
    }
    handleMenuClose();
  };

  const copyToClipboard = () => {
    if (currentInterview) {
      const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setSnackbar({ open: true, message: 'URL copied to clipboard!', severity: 'success' });
    }
  };

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
    setSnackbar({ open: true, message: 'Interview created successfully!', severity: 'success' });
    // Forzar actualización después de crear
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setSnackbar({ open: true, message: 'Interview updated successfully!', severity: 'success' });
    // Forzar actualización después de editar
    setRefreshTrigger(prev => prev + 1);
  };

  const getStats = () => {
    const totalInterviews = interviews.length;
    const activeInterviews = interviews.filter(i => i.isActive).length;
    const totalSlots = interviews.reduce((acc, interview) => acc + (interview.availableSlots?.length || 0), 0);
    const bookedSlots = interviews.reduce((acc, interview) => 
      acc + (interview.availableSlots?.filter(slot => slot.isBooked).length || 0), 0
    );

    return { totalInterviews, activeInterviews, totalSlots, bookedSlots };
  };

  // Función para forzar actualización manual
  const refreshData = () => {
    if (user) {
      dispatch(getRecruiterInterviews(user.id) as any);
    }
  };

  if (!isAuthenticated || user?.role !== 'recruiter') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const stats = getStats();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h3" component="h1" sx={{ 
              color: 'primary.main',
              fontWeight: 700,
              mb: 1
            }}>
              Interview Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
              Welcome back, {user.name} 👋
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              onClick={refreshData}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Create Interview
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
          <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <VideoCall sx={{ fontSize: 32, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {stats.totalInterviews}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Interviews
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Link sx={{ fontSize: 32, color: 'success.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {stats.activeInterviews}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Interviews
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Schedule sx={{ fontSize: 32, color: 'info.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                    {stats.totalSlots}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Time Slots
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ flex: '1 1 200px', minWidth: 200, borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <People sx={{ fontSize: 32, color: 'warning.main' }} />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {stats.bookedSlots}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Booked Slots
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      {/* Navigation Tabs */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
              <Tab 
                icon={<CalendarViewMonth />} 
                label="Calendar View" 
                iconPosition="start"
                sx={{ fontWeight: 600 }}
              />
              <Tab 
                icon={<ViewList />} 
                label="List View" 
                iconPosition="start"
                sx={{ fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            {activeTab === 0 ? (
              <InterviewCalendar 
                interviews={interviews}
                onInterviewClick={(interview) => {
                  setCurrentInterview(interview);
                  setShareDialogOpen(true);
                }}
              />
            ) : (
              <InterviewList 
                interviews={interviews}
                onShare={handleShare}
                onMenuOpen={handleMenuOpen}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Dialog para crear entrevista */}
      <Dialog 
        open={createDialogOpen} 
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main',
          color: 'white',
          fontWeight: 600
        }}>
          Create New Interview
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <CreateInterviewForm 
            onSuccess={handleCreateSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para editar entrevista */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main',
          color: 'white',
          fontWeight: 600
        }}>
          Edit Interview
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <EditInterviewForm 
            interview={currentInterview}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para compartir */}
      <Dialog 
        open={shareDialogOpen} 
        onClose={() => setShareDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Share />
          Share Interview
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
            {currentInterview?.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            Share this link with candidates to let them book time slots for this interview:
          </Typography>
          
          <Box sx={{ 
            p: 2, 
            backgroundColor: 'grey.50', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            mb: 2
          }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {currentInterview ? `${window.location.origin}/interview/${currentInterview.shareableUrl}` : ''}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              startIcon={<ContentCopy />}
              onClick={copyToClipboard}
              variant="contained"
              color={copied ? 'success' : 'primary'}
              sx={{ minWidth: '140px' }}
            >
              {copied ? 'Copied!' : 'Copy URL'}
            </Button>
            <Button
              startIcon={<Share />}
              onClick={() => {
                if (currentInterview) {
                  const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
                  window.open(`mailto:?subject=Interview Invitation&body=You are invited to book an interview slot. Please use this link: ${url}`, '_blank');
                }
              }}
              variant="outlined"
            >
              Share via Email
            </Button>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Candidates can use this link to view available time slots and book their interview.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 2, minWidth: 180 } }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare(selectedInterview)}>
          <ListItemIcon><Share fontSize="small" /></ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleToggleActive}>
          <ListItemIcon><Link fontSize="small" /></ListItemIcon>
          <ListItemText>
            {selectedInterview?.isActive ? 'Deactivate' : 'Activate'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RecruiterDashboard;