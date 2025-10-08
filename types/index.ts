// types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'recruiter' | 'candidate';
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: 'recruiter' | 'candidate';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface InterviewStructure {
  meetingLink: any;
  id: string;
  recruiterId: string;
  title: string;
  description: string;
  duration: number;
  availableSlots: TimeSlot[];
  isActive: boolean;
  shareableUrl: string;
  createdAt: Date;
  recruiter?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface TimeSlot {
  id: string;
  interviewId: string;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  bookedBy?: string;
}

export interface Reservation {
  id: string;
  candidateId: string;
  recruiterId: string;
  interviewId: string;
  timeSlotId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  candidateName: string;
  candidateEmail: string;
  notes?: string;
  createdAt: Date;
}

// Tipo para CandidateReservation (usado en el InterviewVideoButton)
export interface CandidateReservation {
  id: string;
  interviewId: string;
  candidateEmail: string;
  candidateName: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  interviewTitle: string;
  recruiterName: string;
  recruiterEmail: string;
  meetingLink: string | null;
  notes: string | null;
  rescheduleReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Tipo para AvailableSlot (usado en el calendario)
export interface AvailableSlot {
  id: string;
  interviewId: string;
  date: Date;
  startTime: string;
  endTime: string;
  interviewTitle: string;
  recruiterName: string;
  recruiterEmail: string;
}