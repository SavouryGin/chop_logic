import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDirectProofsSlice } from './propositions/direct-proofs/slice';
import { propositionsNaturalProofsSlice } from './propositions/natural-proofs/slice';
import { settingsSlice } from './settings/slice';

const rootReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDirectProofs: propositionsDirectProofsSlice.reducer,
  propositionsNaturalProofs: propositionsNaturalProofsSlice.reducer,
});

export default rootReducer;
