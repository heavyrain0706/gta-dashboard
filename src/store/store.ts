import { configureStore } from '@reduxjs/toolkit';
import managementReducer from '@/store/management/managementSlice';

export const store = configureStore({
  reducer: {
    management: managementReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

