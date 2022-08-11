import { configureStore } from '@reduxjs/toolkit';
import { propositionsDirectProofsSlice } from './propositions/direct-proofs/slice';
import { settingsSlice } from './settings/slice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    propositionsDirectProofs: propositionsDirectProofsSlice.reducer,
  },
});
