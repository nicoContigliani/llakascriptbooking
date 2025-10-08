// components/candidate/DebugSlots.tsx (opcional - para debugging)
import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { AvailableSlot } from '@/types/candidate';

interface DebugSlotsProps {
  availableSlots: AvailableSlot[];
  onRefresh: () => void;
}

const DebugSlots: React.FC<DebugSlotsProps> = ({ availableSlots, onRefresh }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
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

  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Debug: Available Slots ({availableSlots.length})
          </Typography>
          <Button 
            startIcon={<Refresh />} 
            onClick={onRefresh}
            size="small"
          >
            Refresh
          </Button>
        </Box>
        
        {availableSlots.length > 0 ? (
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {availableSlots.map((slot, index) => (
              <Card key={slot.id} variant="outlined" sx={{ mb: 1, p: 1.5 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  <strong>ID:</strong> {slot.id.substring(0, 8)}... | 
                  <strong> Interview:</strong> {slot.interviewTitle} | 
                  <strong> Date:</strong> {formatDate(slot.date)} | 
                  <strong> Time:</strong> {formatTime(slot.startTime)}-{formatTime(slot.endTime)} | 
                  <strong> Recruiter:</strong> {slot.recruiterName}
                </Typography>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No available slots found in the database.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DebugSlots;