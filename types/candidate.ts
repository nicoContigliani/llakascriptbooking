// types/candidate.ts
import { Reservation } from './index';

export interface CandidateReservation extends Reservation {
  meetingLink: string;
  interviewTitle: string;
  recruiterName: string;
  startTime: string;
  endTime: string;
  rescheduleReason?: string;
}

export interface AvailableSlot {
  id: string;
  interviewId: string;
  date: Date;
  startTime: string;
  endTime: string;
  interviewTitle: string;
  recruiterName: string;
  duration: number;
}