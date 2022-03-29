import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './settings/slice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});
