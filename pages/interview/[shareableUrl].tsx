import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewByUrl, bookTimeSlot, clearError } from '../../store/slices/interviewSlice';
import { RootState } from '../../store';
import { TimeSlot } from '../../types';
import { InterviewVideoButton } from '@/components/InterviewVideoButton';

const PublicInterviewPage: React.FC = () => {
  const router = useRouter();
  const { shareableUrl } = router.query;
  const dispatch = useDispatch();
  const { currentInterview, timeSlots, loading, error } = useSelector((state: RootState) => state.interviews);

  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingData, setBookingData] = useState({
    candidateName: '',
    candidateEmail: '',
  });

  useEffect(() => {
    if (shareableUrl) {
      dispatch(getInterviewByUrl(shareableUrl as string) as any);
    }
  }, [shareableUrl, dispatch]);

  const handleBookSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setBookingDialogOpen(true);
  };

  const handleBookingSubmit = () => {
    if (selectedSlot && currentInterview) {
      dispatch(bookTimeSlot({
        timeSlotId: selectedSlot.id,
        interviewId: currentInterview.id,
        candidateName: bookingData.candidateName,
        candidateEmail: bookingData.candidateEmail,
      }) as any);
      setBookingDialogOpen(false);
      setBookingData({ candidateName: '', candidateEmail: '' });
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  // Función para crear un objeto compatible con InterviewVideoButton
  const createVideoButtonReservation = (slot: TimeSlot) => {
    return {
      id: `mock-${slot.id}`,
      interviewId: currentInterview?.id || 'mock-interview',
      candidateEmail: '',
      candidateName: '',
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: 'confirmed' as const,
      interviewTitle: currentInterview?.title || 'Interview',
      recruiterName: currentInterview?.recruiter?.name || 'Recruiter',
      recruiterEmail: currentInterview?.recruiter?.email || '',
      meetingLink: undefined, // Usar undefined en lugar de null
      notes: undefined,
      rescheduleReason: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!currentInterview) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          Interview not found or inactive
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', mb: 2 }}>
          {currentInterview.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
          {currentInterview.description}
        </Typography>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Interview Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {currentInterview.duration} minutes
          </Typography>
          {currentInterview.recruiter && (
            <Typography variant="body2" color="text.secondary">
              Recruiter: {currentInterview.recruiter.name}
            </Typography>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Available Time Slots
        </Typography>

        {timeSlots.length === 0 ? (
          <Alert severity="info">
            No available time slots at the moment. Please check back later.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {timeSlots.map((slot) => {
              const videoButtonReservation = createVideoButtonReservation(slot);
              return (
                <Grid item xs={12} md={6} key={slot.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {formatDate(slot.date)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleBookSlot(slot)}
                        sx={{ mb: 1 }}
                      >
                        Book This Slot
                      </Button>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <InterviewVideoButton
                          reservation={videoButtonReservation}
                          variant="outlined"
                          size="small"
                          showStatus={false}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Paper>

      {/* Dialog para reservar */}
      <Dialog open={bookingDialogOpen} onClose={() => setBookingDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book Time Slot</DialogTitle>
        <DialogContent>
          {selectedSlot && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                You are booking:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatDate(selectedSlot.date)} at {formatTime(selectedSlot.startTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
              </Typography>
            </Box>
          )}
          <TextField
            fullWidth
            label="Your Name"
            value={bookingData.candidateName}
            onChange={(e) => setBookingData({ ...bookingData, candidateName: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            value={bookingData.candidateEmail}
            onChange={(e) => setBookingData({ ...bookingData, candidateEmail: e.target.value })}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBookingSubmit}
            variant="contained"
            disabled={!bookingData.candidateName || !bookingData.candidateEmail}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PublicInterviewPage;