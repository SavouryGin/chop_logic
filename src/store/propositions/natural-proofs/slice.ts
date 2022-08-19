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

    setTableData: (state, action: PayloadAction<NaturalProofsTableDataItem[]>) => {
      state.tableData = action.payload;
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

    addAssumption: (state, action: PayloadAction<string>) => {
      const rawInput = action.payload;
      const itemsCount = state.tableData.length;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = itemsCount + 1;
      const id = `proof-step-${step}`;
      const level = itemsCount > 0 ? state.tableData[itemsCount - 1].level + 1 : 1;
      const newItem: NaturalProofsTableDataItem = {
        level,
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'Assumption', ru: 'Гипотеза' },
      };
      state.tableData = [...state.tableData, newItem];
    },

    deleteSteps: (state) => {
      return state;
      // const newSteps = state.tableData
      //   .filter((item) => !state.selectedIds.includes(item.id))
      //   .map((item, index) => {
      //     return {
      //       ...item,
      //       step: index + 1,
      //       id: `proof-step-${index + 1}`,
      //     };
      //   });

      // state.selectedIds = [];
      // state.tableData = newSteps;
    },
  },
});

export const propositionsNaturalProofsActions = { ...propositionsNaturalProofsSlice.actions };
