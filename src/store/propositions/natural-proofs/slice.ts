import converter from 'logic/propositions/converter';
import { NPFormulaBase } from 'enums';
import { NaturalProofsTableItem, PropositionsNaturalProofsFlag, PropositionsNaturalProofsInitialState } from './interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const propositionsNPInitialState: PropositionsNaturalProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isReplacerFormOpened: false,
    isAssumptionOpened: false,
    isConfirmDeletePopupOpened: false,
    isOrIntroductionFormOpened: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
};

export const propositionsNP = createSlice({
  name: 'propositionsNP',
  initialState: propositionsNPInitialState,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsNaturalProofsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },

    setTableData: (state, action: PayloadAction<NaturalProofsTableItem[]>) => {
      state.tableData = action.payload;
    },

    addPremise: (state, action: PayloadAction<string>) => {
      const rawInput = action.payload;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: NaturalProofsTableItem = {
        level: 0,
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'Premise', ru: 'Посылка' },
        formulaBase: NPFormulaBase.Premise,
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
      const newItem: NaturalProofsTableItem = {
        level,
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'Assumption', ru: 'Гипотеза' },
        formulaBase: NPFormulaBase.Assumption,
      };
      state.tableData = [...state.tableData, newItem];
    },

    deleteSteps: (state, _action: PayloadAction<{ isConfirmed: boolean }>) => {
      return state;
    },

    setDependentItems: (state, action: PayloadAction<NaturalProofsTableItem[]>) => {
      state.dependentItems = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    createDisjunction: (state, _action: PayloadAction<string>) => {
      return state;
    },
  },
});

export const propositionsNPActions = { ...propositionsNP.actions };
