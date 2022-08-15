import converter from 'logic/propositions/converter';
import { NaturalProofsTableDataItem, PropositionsNaturalProofsFlag, PropositionsNaturalProofsInitialState } from './interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const propositionsNaturalProofsInitialState: PropositionsNaturalProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isReplacerFormOpened: false,
    isAssumptionOpened: false,
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

    addPremise: (state, action: PayloadAction<string>) => {
      const rawInput = action.payload;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: NaturalProofsTableDataItem = {
        level: 0,
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'Premise', ru: 'Посылка' },
      };
      state.tableData = [...state.tableData, newItem];
    },
  },
});

export const propositionsNaturalProofsActions = { ...propositionsNaturalProofsSlice.actions };
