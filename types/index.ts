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
    id: string;
    recruiterId: string;
    title: string;
    description: string;
    duration: number; // en minutos
    availableSlots: TimeSlot[];
    isActive: boolean;
    shareableUrl: string;
    createdAt: Date;
  }
  
  export interface TimeSlot {
    id: string;
    interviewId: string;
    date: Date;
    startTime: string;
    endTime: string;
    isBooked: boolean;
    bookedBy?: string; // candidateId
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