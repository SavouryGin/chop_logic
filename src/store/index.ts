import { configureStore } from '@reduxjs/toolkit';
import { propositionsSlice } from './propositions/slice';
import { settingsSlice } from './settings/slice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    propositions: propositionsSlice.reducer,
  },
});
