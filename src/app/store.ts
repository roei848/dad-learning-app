import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../store/sessionSlice';
import sectionsReducer from '../store/sectionsSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    sections: sectionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
