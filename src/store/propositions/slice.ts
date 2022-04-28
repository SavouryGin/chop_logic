import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DirectProofsTableItem, PropositionsFlag, PropositionsInitialState } from './interfaces';

export const propositionsInitialState: PropositionsInitialState = {
  flags: {
    isPremiseOpened: false,
  },
  directProofsTableData: [],
  selectedIds: [],
};

export const propositionsSlice = createSlice({
  name: 'propositions',
  initialState: propositionsInitialState,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },

    addPromise: (state, action: PayloadAction<string>) => {
      const formula = action.payload;
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        id,
        step,
        formula,
        comment: { en: 'Premise', ru: 'Посылка' },
      };
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },

    deleteSteps: (state) => {
      const newSteps = state.directProofsTableData
        .filter((item) => !state.selectedIds.includes(item.id))
        .map((item, index) => {
          return {
            ...item,
            step: index + 1,
            id: `proof-step-${index + 1}`,
          };
        });

      state.selectedIds = [];
      state.directProofsTableData = newSteps;
    },
  },
});

export const propositionsActions = { ...propositionsSlice.actions };
