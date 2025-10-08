import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 8,
            textAlign: 'center',
            backgroundColor: 'background.paper',
            mt: 8,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: 'secondary.main',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: 'primary.main', mb: 3 }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', mb: 4, maxWidth: '400px', mx: 'auto' }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/')}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;