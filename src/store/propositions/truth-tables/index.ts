import { LocalText } from 'types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TRUTH_TABLES_INITIAL_STATE } from './constants';
import { TruthTablesFlag } from './interfaces';

export const truthTablesSlice = createSlice({
  name: 'TruthTables',
  initialState: TRUTH_TABLES_INITIAL_STATE,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: TruthTablesFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setError: (state, action: PayloadAction<LocalText | null>) => {
      state.error = action.payload;
    },
  },
});

export const truthTablesActions = { ...truthTablesSlice.actions };
