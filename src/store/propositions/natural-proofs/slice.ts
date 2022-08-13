import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PropositionsNaturalProofsFlag, PropositionsNaturalProofsInitialState } from './interfaces';

export const propositionsNaturalProofsInitialState: PropositionsNaturalProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isReplacerFormOpened: false,
  },
  tableData: [],
  selectedIds: [],
};

export const propositionsNaturalProofsSlice = createSlice({
  name: 'propositionsNaturalProofs',
  initialState: propositionsNaturalProofsInitialState,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsNaturalProofsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },
  },
});

export const propositionsNaturalProofsActions = { ...propositionsNaturalProofsSlice.actions };
