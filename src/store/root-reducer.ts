import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from './propositions/direct-proofs/slice';
import { propositionsNPSlice } from './propositions/natural-proofs/slice';
import { settingsSlice } from './settings/slice';

const rootReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDP: propositionsDPSlice.reducer,
  propositionsNP: propositionsNPSlice.reducer,
});

export default rootReducer;
