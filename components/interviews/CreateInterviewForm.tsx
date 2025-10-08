import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview, clearError } from '../../store/slices/interviewSlice';
import { RootState } from '../../store';

interface TimeSlotInput {
  date: string;
  startTime: string;
  endTime: string;
}

const CreateInterviewForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.interviews);
  const { user } = useSelector((state: RootState) => state.auth);

  const [timeSlots, setTimeSlots] = useState<TimeSlotInput[]>([
    { date: '', startTime: '09:00', endTime: '10:00' }
  ]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      duration: 60,
    },
    onSubmit: (values) => {
      if (!user) return;

      const interviewData:any = {
        recruiterId: user.id,
        title: values.title,
        description: values.description,
        duration: values.duration,
        availableSlots: timeSlots.filter(slot => slot.date && slot.startTime && slot.endTime),
      };

      dispatch(createInterview(interviewData) as any);
    },
  });

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

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Create Interview Structure
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Interview Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
              variant="outlined"
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
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="duration"
              name="duration"
              label="Duration (minutes)"
              type="number"
              value={formik.values.duration}
              onChange={formik.handleChange}
              required
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Available Time Slots
            </Typography>
            
            {timeSlots.map((slot, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        type="date"
                        label="Date"
                        value={slot.date}
                        onChange={(e) => updateTimeSlot(index, 'date', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={5} md={3}>
                      <TextField
                        fullWidth
                        type="time"
                        label="Start Time"
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
                        label="End Time"
                        value={slot.endTime}
                        onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <IconButton 
                        color="error" 
                        onClick={() => removeTimeSlot(index)}
                        disabled={timeSlots.length === 1}
                      >
                        <Delete />
                      </IconButton>
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
              Add Time Slot
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Interview'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateInterviewForm;