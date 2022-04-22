import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropositionsFlag, PropositionsInitialState } from './interfaces';

export const propositionsInitialState: PropositionsInitialState = {
  flags: {
    isPremiseOpened: false,
  },
};

export const propositionsSlice = createSlice({
  name: 'propositions',
  initialState: propositionsInitialState,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },
  },
});

export const propositionsActions = { ...propositionsSlice.actions };
