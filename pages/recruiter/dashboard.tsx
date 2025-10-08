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
} from '@mui/material';
import { ContentCopy, Share, Add } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../store';
import { getRecruiterInterviews, clearError } from '../../store/slices/interviewSlice';
import CreateInterviewForm from '../../components/interviews/CreateInterviewForm';

const RecruiterDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { interviews, loading, error } = useSelector((state: RootState) => state.interviews);
  const router = useRouter();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'recruiter') {
      router.push('/auth/login');
    } else {
      dispatch(getRecruiterInterviews(user.id) as any);
    }
  }, [isAuthenticated, user, router, dispatch]);

  const handleShare = (interview: any) => {
    setCurrentInterview(interview);
    setShareDialogOpen(true);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/interview/${currentInterview.shareableUrl}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  if (!isAuthenticated || user?.role !== 'recruiter') {
    return null;
  }

  return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h3" component="h1" sx={{ color: 'primary.main' }}>
              Recruiter Dashboard
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
            >
              Create Interview
            </Button>
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Welcome, {user.name}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {interviews.map((interview) => (
            <Grid item xs={12} md={6} key={interview.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {interview.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {interview.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`${interview.duration} min`} 
                      size="small" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={interview.isActive ? 'Active' : 'Inactive'} 
                      color={interview.isActive ? 'success' : 'default'}
                      size="small" 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => handleShare(interview)}
                      size="small"
                    >
                      Share
                    </Button>
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {interviews.length === 0 && !loading && (
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No interviews created yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create your first interview structure to get started
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Add />}
                    onClick={() => setCreateDialogOpen(true)}
                  >
                    Create Interview
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Dialog para crear entrevista */}
        <Dialog 
          open={createDialogOpen} 
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Create New Interview</DialogTitle>
          <DialogContent>
            <CreateInterviewForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog para compartir */}
        <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
          <DialogTitle>Share Interview</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Share this link with candidates to let them book time slots:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                value={currentInterview ? `${window.location.origin}/interview/${currentInterview.shareableUrl}` : ''}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
              />
              <Button
                startIcon={<ContentCopy />}
                onClick={copyToClipboard}
                variant="outlined"
                color={copied ? 'success' : 'primary'}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Container>
  );
};

export default RecruiterDashboard;