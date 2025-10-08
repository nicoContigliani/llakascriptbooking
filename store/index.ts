// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import interviewSlice from './slices/interviewSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    interviews: interviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;