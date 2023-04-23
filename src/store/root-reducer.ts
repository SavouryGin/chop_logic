import { combineReducers } from '@reduxjs/toolkit';
import { propositionsDPSlice } from './propositions/direct-proofs';
import { propositionsNPSlice } from './propositions/natural-proofs';
import { settingsSlice } from './settings';
import { truthTablesSlice } from './propositions/truth-tables';

const rootReducer = combineReducers({
  settings: settingsSlice.reducer,
  propositionsDP: propositionsDPSlice.reducer,
  propositionsNP: propositionsNPSlice.reducer,
  truthTables: truthTablesSlice.reducer,
});

export default rootReducer;
