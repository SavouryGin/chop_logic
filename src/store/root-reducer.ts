import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from './propositions/direct-proofs/slice';
import { propositionsNP } from './propositions/natural-proofs/slice';
import { settingsSlice } from './settings/slice';

const rootReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDP: propositionsDPSlice.reducer,
  propositionsNP: propositionsNP.reducer,
});

export default rootReducer;
