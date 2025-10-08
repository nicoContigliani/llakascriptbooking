import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser, clearError } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import Link from 'next/link';

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'candidate' as 'recruiter' | 'candidate',
    },
    onSubmit: (values) => {
      dispatch(registerUser(values) as any);
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'recruiter':
          router.push('/recruiter/dashboard');
          break;
        case 'candidate':
          router.push('/candidate/dashboard');
          break;
        default:
          router.push('/');
      }
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main', mb: 4 }}>
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              id="role"
              name="role"
              label="Role"
              select
              value={formik.values.role}
              onChange={formik.handleChange}
              margin="normal"
              required
              variant="outlined"
            >
              <MenuItem value="candidate">Candidate</MenuItem>
              <MenuItem value="recruiter">Recruiter</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </form>

          <Box textAlign="center">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: '#dc143c', textDecoration: 'none' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
  );
};

export default Register;