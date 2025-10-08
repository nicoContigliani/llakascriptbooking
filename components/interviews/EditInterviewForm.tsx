// components/interviews/EditInterviewForm.tsx
import React from 'react';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateInterview, clearError } from '../../store/slices/interviewSlice';
import { RootState } from '../../store';

interface EditInterviewFormProps {
  interview: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditInterviewForm: React.FC<EditInterviewFormProps> = ({ 
  interview, 
  onSuccess, 
  onCancel 
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.interviews);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: interview?.title || '',
      description: interview?.description || '',
      duration: interview?.duration || 60,
      isActive: interview?.isActive || false,
    },
    onSubmit: async (values) => {
      if (!interview) return;

      const result = await dispatch(updateInterview({
        id: interview.id,
        ...values
      }) as any);

      if (updateInterview.fulfilled.match(result)) {
        onSuccess();
      }
    },
  });

  if (!interview) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Interview not found</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        Edit Interview
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

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isActive}
                  onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                  color="primary"
                />
              }
              label="Active Interview"
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              {formik.values.isActive 
                ? 'Candidates can book time slots' 
                : 'Interview is inactive - candidates cannot book slots'
              }
            </Typography>
          </Grid>

          {/* Información de la URL */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Shareable URL
                </Typography>
                <Typography variant="body2" sx={{ 
                  fontFamily: 'monospace', 
                  backgroundColor: 'grey.50', 
                  p: 1, 
                  borderRadius: 1,
                  wordBreak: 'break-all'
                }}>
                  {`${typeof window !== 'undefined' ? window.location.origin : ''}/interview/${interview.shareableUrl}`}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Share this URL with candidates to allow them to book time slots
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={loading}
                sx={{ minWidth: 120 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Update'}
              </Button>
              <Button
                variant="outlined"
                onClick={onCancel}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditInterviewForm;