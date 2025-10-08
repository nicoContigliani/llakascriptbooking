// pages/candidate/dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Snackbar,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  CalendarMonth,
  Person,
  VideoCall,
  Schedule,
  Cancel,
  Edit,
  Refresh,
  Help,
  History,
  Email,
  Phone,
  CalendarViewMonth,
  ViewList,
  Link,
  BugReport,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { clearError } from '../../store/slices/interviewSlice';
import { CandidateReservation, AvailableSlot } from '../../types/candidate';
import CandidateCalendar from '@/components/interviews/CandidateCalendar';
import { InterviewVideoButton } from '@/components/InterviewVideoButton';

const CandidateDashboard: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.interviews);
  const dispatch = useDispatch();
  const router = useRouter();

  const [reservations, setReservations] = useState<CandidateReservation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [changeDateDialogOpen, setChangeDateDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<CandidateReservation | null>(null);
  const [selectedNewSlot, setSelectedNewSlot] = useState<string>('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'candidate') {
      router.push('/auth/login');
    } else {
      fetchUserData();
    }
  }, [isAuthenticated, user, router]);

  const fetchUserData = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      await Promise.all([
        fetchUserReservations(),
        fetchAvailableSlots()
      ]);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setSnackbar({ open: true, message: 'Error loading data', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReservations = async () => {
    if (!user?.email) return;

    try {
      const response = await fetch(`/api/candidate/reservations?candidateEmail=${user.email}`);

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      const data = await response.json();
      setReservations(data.reservations || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservations([]);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      console.log('Fetching available slots...');
      const response = await fetch('/api/candidate/available-slots');

      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }

      const data = await response.json();
      console.log('Available slots response:', data);
      setAvailableSlots(data.availableSlots || []);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      setAvailableSlots([]);
    }
  };

  const handleCancelReservation = async (reservation: CandidateReservation) => {
    try {
      const response = await fetch(`/api/candidate/reservations/${reservation.id}/cancel`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      const data = await response.json();

      // Actualizar el estado local con la reserva actualizada de la API
      setReservations(prev =>
        prev.map(r =>
          r.id === reservation.id
            ? {
              ...r,
              status: data.reservation.status,
              // Asegurarse de mantener toda la información existente
              interviewTitle: r.interviewTitle,
              recruiterName: r.recruiterName,
              startTime: r.startTime,
              endTime: r.endTime
            }
            : r
        )
      );

      setCancelDialogOpen(false);
      setSnackbar({ open: true, message: 'Reservation cancelled successfully', severity: 'success' });

      // Recargar slots disponibles
      setTimeout(() => {
        fetchAvailableSlots();
      }, 1000);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      setSnackbar({ open: true, message: 'Error cancelling reservation', severity: 'error' });
    }
  };

  const handleRescheduleRequest = async (reservation: CandidateReservation) => {
    if (!rescheduleReason.trim()) {
      setSnackbar({ open: true, message: 'Please provide a reason for rescheduling', severity: 'error' });
      return;
    }

    try {
      const response = await fetch(`/api/candidate/reservations/${reservation.id}/reschedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: rescheduleReason }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reschedule request');
      }

      // Actualizar el estado local
      setReservations(prev =>
        prev.map(r =>
          r.id === reservation.id
            ? { ...r, status: 'cancelled' as const, rescheduleReason }
            : r
        )
      );

      setRescheduleDialogOpen(false);
      setRescheduleReason('');
      setSnackbar({
        open: true,
        message: 'Reschedule request sent successfully',
        severity: 'success'
      });

      // Recargar slots disponibles ya que se liberó un slot
      setTimeout(() => {
        fetchAvailableSlots();
      }, 1000);
    } catch (error) {
      console.error('Error sending reschedule request:', error);
      setSnackbar({ open: true, message: 'Error sending reschedule request', severity: 'error' });
    }
  };

  const handleChangeDate = async (reservation: CandidateReservation) => {
    if (!selectedNewSlot) {
      setSnackbar({ open: true, message: 'Please select a new time slot', severity: 'error' });
      return;
    }

    try {
      const response = await fetch(`/api/candidate/reservations/${reservation.id}/change-date`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTimeSlotId: selectedNewSlot }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change date');
      }

      const data = await response.json();

      // Encontrar el slot seleccionado para obtener los detalles
      const selectedSlot = availableSlots.find(slot => slot.id === selectedNewSlot);

      if (!selectedSlot) {
        throw new Error('Selected slot not found');
      }

      // Actualizar la reserva con la nueva información
      setReservations(prev =>
        prev.map(r =>
          r.id === reservation.id
            ? {
              ...r,
              date: new Date(data.reservation.date),
              startTime: selectedSlot.startTime,
              endTime: selectedSlot.endTime,
              timeSlotId: data.reservation.timeSlotId,
              interviewId: data.reservation.interviewId,
              recruiterId: data.reservation.recruiterId,
              interviewTitle: selectedSlot.interviewTitle,
              recruiterName: selectedSlot.recruiterName,
              status: 'confirmed' as const
            }
            : r
        )
      );

      setChangeDateDialogOpen(false);
      setSelectedNewSlot('');
      setSnackbar({
        open: true,
        message: 'Interview date changed successfully',
        severity: 'success'
      });

      // Recargar datos después de un breve delay
      setTimeout(() => {
        fetchAvailableSlots();
        fetchUserReservations();
      }, 1500);
    } catch (error) {
      console.error('Error changing date:', error);
      setSnackbar({ open: true, message: 'Error changing interview date', severity: 'error' });
    }
  };

  const openCancelDialog = (reservation: CandidateReservation) => {
    setSelectedReservation(reservation);
    setCancelDialogOpen(true);
  };

  const openRescheduleDialog = (reservation: CandidateReservation) => {
    setSelectedReservation(reservation);
    setRescheduleReason('');
    setRescheduleDialogOpen(true);
  };

  const openChangeDateDialog = (reservation: CandidateReservation) => {
    setSelectedReservation(reservation);
    setSelectedNewSlot('');
    setChangeDateDialogOpen(true);
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    if (!time) return 'TBD';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const isUpcoming = (reservation: CandidateReservation) => {
    const now = new Date();
    const reservationDate = new Date(reservation.date);
    if (reservation.startTime) {
      reservationDate.setHours(parseInt(reservation.startTime.split(':')[0]));
      reservationDate.setMinutes(parseInt(reservation.startTime.split(':')[1]));
    }
    return reservationDate > now && (reservation.status === 'confirmed' || reservation.status === 'pending');
  };

  const upcomingReservations = reservations.filter(isUpcoming);
  const pastReservations = reservations.filter(reservation => !isUpcoming(reservation));

  if (!isAuthenticated || user?.role !== 'candidate') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{
              color: 'primary.main',
              fontWeight: 700
            }}>
              Candidate Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
              Welcome back, {user.name} 👋
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchUserData}
              disabled={loading}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              startIcon={<BugReport />}
              onClick={() => setShowDebug(!showDebug)}
              color="secondary"
            >
              Debug
            </Button>
          </Box>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <CalendarMonth sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {upcomingReservations.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Interviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <History sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
                  {pastReservations.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Past Interviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <VideoCall sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                  {reservations.filter(r => r.status === 'completed').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Link sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                  {availableSlots.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Slots
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
              <CandidateCalendar
                reservations={reservations}
                availableSlots={availableSlots}
                onReschedule={openRescheduleDialog}
                onCancel={openCancelDialog}
                onChangeDate={openChangeDateDialog}
              />
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} lg={8}>
                  {/* Upcoming Interviews */}
                  <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" gutterBottom sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <Schedule />
                      Upcoming Interviews
                    </Typography>

                    {loading ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                      </Box>
                    ) : upcomingReservations.length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {upcomingReservations.map((reservation) => (
                          <Card key={reservation.id} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6" gutterBottom>
                                    {reservation.interviewTitle}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    with {reservation.recruiterName}
                                  </Typography>
                                  <Chip
                                    label={getStatusText(reservation.status)}
                                    color={getStatusColor(reservation.status) as any}
                                    size="small"
                                    sx={{ mb: 2 }}
                                  />
                                </Box>
                              </Box>

                              <Box sx={{ display: 'flex', gap: 4, mb: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CalendarMonth sx={{ color: 'primary.main' }} />
                                  <Typography variant="body2">
                                    {formatDate(reservation.date)}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Schedule sx={{ color: 'primary.main' }} />
                                  <Typography variant="body2">
                                    {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                                  </Typography>
                                </Box>
                              </Box>

                              {reservation.notes && (
                                <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                                  <Typography variant="body2">
                                    {reservation.notes}
                                  </Typography>
                                </Alert>
                              )}

                              {reservation.rescheduleReason && (
                                <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
                                  <Typography variant="body2">
                                    <strong>Reschedule Reason:</strong> {reservation.rescheduleReason}
                                  </Typography>
                                </Alert>
                              )}

                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                
                                <InterviewVideoButton
                                  reservation={reservation}
                                  variant="outlined"
                                  size="small"
                                />
                                <Button
                                  variant="outlined"
                                  startIcon={<Edit />}
                                  size="small"
                                  onClick={() => openChangeDateDialog(reservation)}
                                  disabled={!['confirmed', 'pending'].includes(reservation.status)}
                                >
                                  Change Date
                                </Button>
                                <Button
                                  variant="outlined"
                                  startIcon={<Edit />}
                                  size="small"
                                  onClick={() => openRescheduleDialog(reservation)}
                                  disabled={!['confirmed', 'pending'].includes(reservation.status)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<Cancel />}
                                  size="small"
                                  onClick={() => openCancelDialog(reservation)}
                                  disabled={!['confirmed', 'pending'].includes(reservation.status)}
                                >
                                  Cancel
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    ) : (
                      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                        <CalendarMonth sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No upcoming interviews
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {reservations.length === 0
                            ? "You haven't booked any interviews yet. Use interview links shared by recruiters to book your time slots."
                            : "All your scheduled interviews are in the past or have been cancelled."
                          }
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<Refresh />}
                          onClick={fetchUserData}
                        >
                          Refresh
                        </Button>
                      </Paper>
                    )}
                  </Box>

                  {/* Interview History */}
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{
                      mb: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <History />
                      Interview History
                    </Typography>

                    {pastReservations.length > 0 ? (
                      <List sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
                        {pastReservations.map((reservation, index) => (
                          <React.Fragment key={reservation.id}>
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                  <VideoCall />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={reservation.interviewTitle}
                                secondary={
                                  <React.Fragment>
                                    <Typography variant="body2" color="text.primary">
                                      {reservation.recruiterName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {formatDate(reservation.date)} at {formatTime(reservation.startTime)}
                                    </Typography>
                                    <Chip
                                      label={getStatusText(reservation.status)}
                                      color={getStatusColor(reservation.status) as any}
                                      size="small"
                                      sx={{ mt: 1 }}
                                    />
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            {index < pastReservations.length - 1 && <Divider variant="inset" component="li" />}
                          </React.Fragment>
                        ))}
                      </List>
                    ) : (
                      <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                        <History sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                          No past interviews yet.
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                </Grid>

                {/* Available Slots Sidebar */}
                <Grid item xs={12} lg={4}>
                  <Card sx={{ mb: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link />
                        Available Interview Slots ({availableSlots.length})
                      </Typography>
                      {availableSlots.length > 0 ? (
                        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                          {availableSlots.slice(0, 5).map((slot) => (
                            <Card key={slot.id} variant="outlined" sx={{ mb: 1, p: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                {slot.interviewTitle}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {formatDate(slot.date)} at {formatTime(slot.startTime)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                with {slot.recruiterName}
                              </Typography>
                            </Card>
                          ))}
                          {availableSlots.length > 5 && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                              +{availableSlots.length - 5} more slots available
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                          No available slots at the moment.
                        </Typography>
                      )}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card sx={{ mb: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person />
                        Quick Actions
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button variant="outlined" fullWidth startIcon={<Email />}>
                          Contact Recruiters
                        </Button>
                        <Button variant="outlined" fullWidth startIcon={<CalendarMonth />}>
                          Export Calendar
                        </Button>
                        <Button variant="outlined" fullWidth startIcon={<History />}>
                          Download History
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Dialog para Cancelar */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Cancel Interview</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to cancel your interview for:
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedReservation?.interviewTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            with {selectedReservation?.recruiterName} on {selectedReservation && formatDate(selectedReservation.date)}
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action cannot be undone. The time slot will be released for other candidates.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Keep Reservation</Button>
          <Button
            onClick={() => selectedReservation && handleCancelReservation(selectedReservation)}
            color="error"
            variant="contained"
          >
            Cancel Interview
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Reprogramar */}
      <Dialog open={rescheduleDialogOpen} onClose={() => setRescheduleDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Reschedule</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Request to reschedule your interview:
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {selectedReservation?.interviewTitle}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for rescheduling"
            value={rescheduleReason}
            onChange={(e) => setRescheduleReason(e.target.value)}
            placeholder="Please explain why you need to reschedule this interview..."
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Alert severity="info">
            Your reschedule request will be sent to the recruiter for approval.
            They will contact you with alternative time slots.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRescheduleDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => selectedReservation && handleRescheduleRequest(selectedReservation)}
            variant="contained"
            disabled={!rescheduleReason.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Cambiar Fecha - CORREGIDO */}
      <Dialog open={changeDateDialogOpen} onClose={() => setChangeDateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Change Interview Date</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Select a new time slot for your interview:
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {selectedReservation?.interviewTitle}
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Available Time Slots ({availableSlots.length})</InputLabel>
            <Select
              value={selectedNewSlot}
              onChange={(e) => setSelectedNewSlot(e.target.value)}
              label={`Available Time Slots (${availableSlots.length})`}
            >
              {availableSlots.map((slot) => (
                <MenuItem key={slot.id} value={slot.id}>
                  {formatDate(slot.date)} at {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  {" - "}{slot.interviewTitle} ({slot.recruiterName})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {availableSlots.length === 0 && (
            <Alert severity="info">
              No available time slots found at the moment. Please check back later or contact the recruiter.
            </Alert>
          )}

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Note:</strong> When you change the date, your current time slot will be released
              and this new one will be reserved for you.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangeDateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => selectedReservation && handleChangeDate(selectedReservation)}
            variant="contained"
            disabled={!selectedNewSlot}
          >
            Change Date
          </Button>
        </DialogActions>
      </Dialog>

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

export default CandidateDashboard;