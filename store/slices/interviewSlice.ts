// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { InterviewStructure, TimeSlot, Reservation } from '../../types';

// interface InterviewState {
//   interviews: InterviewStructure[];
//   timeSlots: TimeSlot[];
//   reservations: Reservation[];
//   loading: boolean;
//   error: string | null;
//   currentInterview: InterviewStructure | null;
// }

// const initialState: InterviewState = {
//   interviews: [],
//   timeSlots: [],
//   reservations: [],
//   loading: false,
//   error: null,
//   currentInterview: null,
// };

// // Async thunks
// export const createInterview = createAsyncThunk(
//   'interviews/create',
//   async (interviewData: Omit<InterviewStructure, 'id' | 'shareableUrl' | 'createdAt'>, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/interviews/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(interviewData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Failed to create interview');
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue('Failed to create interview');
//     }
//   }
// );

// export const getRecruiterInterviews = createAsyncThunk(
//   'interviews/getRecruiter',
//   async (recruiterId: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/interviews/recruiter/${recruiterId}`);
//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Failed to fetch interviews');
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue('Failed to fetch interviews');
//     }
//   }
// );

// export const getInterviewByUrl = createAsyncThunk(
//   'interviews/getByUrl',
//   async (shareableUrl: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`/api/interviews/url/${shareableUrl}`);
//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Interview not found');
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue('Interview not found');
//     }
//   }
// );

// export const bookTimeSlot = createAsyncThunk(
//   'interviews/bookSlot',
//   async (bookingData: {
//     timeSlotId: string;
//     interviewId: string;
//     candidateName: string;
//     candidateEmail: string;
//   }, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/interviews/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || 'Failed to book time slot');
//       }

//       return data;
//     } catch (error) {
//       return rejectWithValue('Failed to book time slot');
//     }
//   }
// );

// const interviewSlice = createSlice({
//   name: 'interviews',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setCurrentInterview: (state, action: PayloadAction<InterviewStructure | null>) => {
//       state.currentInterview = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Create Interview
//       .addCase(createInterview.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createInterview.fulfilled, (state, action) => {
//         state.loading = false;
//         state.interviews.push(action.payload.interview);
//       })
//       .addCase(createInterview.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Get Recruiter Interviews
//       .addCase(getRecruiterInterviews.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getRecruiterInterviews.fulfilled, (state, action) => {
//         state.loading = false;
//         state.interviews = action.payload.interviews;
//       })
//       .addCase(getRecruiterInterviews.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Get Interview by URL
//       .addCase(getInterviewByUrl.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getInterviewByUrl.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentInterview = action.payload.interview;
//         state.timeSlots = action.payload.timeSlots;
//       })
//       .addCase(getInterviewByUrl.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       // Book Time Slot
//       .addCase(bookTimeSlot.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(bookTimeSlot.fulfilled, (state, action) => {
//         state.loading = false;
//         // Update the time slot to be booked
//         const timeSlotIndex = state.timeSlots.findIndex(slot => slot.id === action.payload.timeSlotId);
//         if (timeSlotIndex !== -1) {
//           state.timeSlots[timeSlotIndex].isBooked = true;
//           state.timeSlots[timeSlotIndex].bookedBy = action.payload.candidateEmail;
//         }
//         state.reservations.push(action.payload.reservation);
//       })
//       .addCase(bookTimeSlot.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { clearError, setCurrentInterview } = interviewSlice.actions;
// export default interviewSlice.reducer;



// store/slices/interviewSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InterviewStructure, TimeSlot, Reservation } from '../../types';

interface InterviewState {
  interviews: InterviewStructure[];
  timeSlots: TimeSlot[];
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  currentInterview: InterviewStructure | null;
}

const initialState: InterviewState = {
  interviews: [],
  timeSlots: [],
  reservations: [],
  loading: false,
  error: null,
  currentInterview: null,
};

// Async thunks
export const createInterview = createAsyncThunk(
  'interviews/create',
  async (interviewData: Omit<InterviewStructure, 'id' | 'shareableUrl' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/interviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to create interview');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Failed to create interview');
    }
  }
);

export const getRecruiterInterviews = createAsyncThunk(
  'interviews/getRecruiter',
  async (recruiterId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/interviews/recruiter/${recruiterId}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch interviews');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch interviews');
    }
  }
);

export const getInterviewByUrl = createAsyncThunk(
  'interviews/getByUrl',
  async (shareableUrl: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/interviews/url/${shareableUrl}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Interview not found');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Interview not found');
    }
  }
);

export const bookTimeSlot = createAsyncThunk(
  'interviews/bookSlot',
  async (bookingData: {
    timeSlotId: string;
    interviewId: string;
    candidateName: string;
    candidateEmail: string;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/interviews/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to book time slot');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Failed to book time slot');
    }
  }
);

export const deleteInterview = createAsyncThunk(
  'interviews/delete',
  async (interviewId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/interviews/${interviewId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to delete interview');
      }

      return { interviewId };
    } catch (error) {
      return rejectWithValue('Failed to delete interview');
    }
  }
);

export const updateInterview = createAsyncThunk(
  'interviews/update',
  async (updateData: {
    id: string;
    title?: string;
    description?: string;
    duration?: number;
    isActive?: boolean;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/interviews/${updateData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update interview');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Failed to update interview');
    }
  }
);


export const getCandidateReservations = createAsyncThunk(
  'interviews/getCandidateReservations',
  async (candidateEmail: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/candidate/reservations?candidateEmail=${candidateEmail}`);
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch reservations');
      }

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch reservations');
    }
  }
);

export const cancelReservation = createAsyncThunk(
  'interviews/cancelReservation',
  async (reservationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/candidate/reservations/${reservationId}/cancel`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to cancel reservation');
      }

      return { reservationId };
    } catch (error) {
      return rejectWithValue('Failed to cancel reservation');
    }
  }
);


const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentInterview: (state, action: PayloadAction<InterviewStructure | null>) => {
      state.currentInterview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Interview
      .addCase(createInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews.push(action.payload.interview);
      })
      .addCase(createInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Recruiter Interviews
      .addCase(getRecruiterInterviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecruiterInterviews.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews = action.payload.interviews;
      })
      .addCase(getRecruiterInterviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Interview by URL
      .addCase(getInterviewByUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInterviewByUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInterview = action.payload.interview;
        state.timeSlots = action.payload.timeSlots;
      })
      .addCase(getInterviewByUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Book Time Slot
      .addCase(bookTimeSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTimeSlot.fulfilled, (state, action) => {
        state.loading = false;
        const timeSlotIndex = state.timeSlots.findIndex(slot => slot.id === action.payload.timeSlotId);
        if (timeSlotIndex !== -1) {
          state.timeSlots[timeSlotIndex].isBooked = true;
          state.timeSlots[timeSlotIndex].bookedBy = action.payload.candidateEmail;
        }
        state.reservations.push(action.payload.reservation);
      })
      .addCase(bookTimeSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Interview
      .addCase(deleteInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInterview.fulfilled, (state, action) => {
        state.loading = false;
        state.interviews = state.interviews.filter(interview => interview.id !== action.payload.interviewId);
      })
      .addCase(deleteInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Interview
      .addCase(updateInterview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInterview.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.interviews.findIndex(interview => interview.id === action.payload.interview.id);
        if (index !== -1) {
          state.interviews[index] = action.payload.interview;
        }
      })
      .addCase(updateInterview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCurrentInterview } = interviewSlice.actions;
export default interviewSlice.reducer;