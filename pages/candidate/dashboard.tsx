import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';

const CandidateDashboard: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'candidate') {
      router.push('/auth/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'candidate') {
    return null;
  }

  // Datos de ejemplo para reservas
  const mockReservations = [
    {
      id: '1',
      title: 'Technical Interview',
      date: '2024-01-15',
      time: '14:00 - 15:00',
      status: 'confirmed',
      recruiter: 'Tech Corp Inc.',
    },
    {
      id: '2',
      title: 'HR Interview',
      date: '2024-01-20',
      time: '10:00 - 10:30',
      status: 'pending',
      recruiter: 'Startup XYZ',
    },
  ];

  return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
            Candidate Dashboard
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Welcome, {user.name}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              My Reservations
            </Typography>

            {mockReservations.map((reservation) => (
              <Card key={reservation.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {reservation.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reservation.recruiter}
                      </Typography>
                    </Box>
                    <Chip 
                      label={reservation.status} 
                      color={reservation.status === 'confirmed' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    📅 {reservation.date} | 🕒 {reservation.time}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}

            {mockReservations.length === 0 && (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No reservations yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use interview links shared by recruiters to book your time slots.
                </Typography>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" fullWidth>
                    Update Profile
                  </Button>
                  <Button variant="outlined" fullWidth>
                    View Calendar
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Interview History
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Need Help?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  If you're having trouble with your interview booking, contact the recruiter directly or check your email for instructions.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
  );
};

export default CandidateDashboard;