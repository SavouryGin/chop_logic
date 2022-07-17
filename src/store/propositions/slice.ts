import converter from 'logic/propositions/converter';
import executor from 'logic/propositions/executor';
import validator from 'logic/propositions/validator';
import { DirectProofsTableItem, PropositionsFlag, PropositionsInitialState } from './interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const propositionsInitialState: PropositionsInitialState = {
  flags: {
    isPremiseOpened: false,
    isImplicationCreationOpened: false,
    isImplicationDistributionOpened: false,
    isContradictionRealizationOpened: false,
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
      const rawInput = action.payload;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
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

    reiterateStep: (state) => {
      const selectedStep = state.directProofsTableData.find((item) => item.id === state.selectedIds[0]);
      if (!selectedStep) {
        return state;
      }
      const index = state.directProofsTableData.length + 1;
      const newStep = {
        ...selectedStep,
        id: `proof-step-${index}`,
        step: index,
        comment: { en: `Reiter. ${selectedStep.step}`, ru: `Повтор ${selectedStep.step}` },
      };

      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newStep];
    },

    createImplication: (state, action: PayloadAction<{ firstVariable: string; secondVariable: string }>) => {
      const { firstVariable, secondVariable } = action.payload;
      const expression = converter.convertToICExpression(firstVariable, secondVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        step,
        id,
        rawInput: `${firstVariable}, ${secondVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'IC', ru: 'ВИ' },
      };
      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },

    createImplicationDistribution: (
      state,
      action: PayloadAction<{ firstVariable: string; secondVariable: string; thirdVariable: string }>,
    ) => {
      const { firstVariable, secondVariable, thirdVariable } = action.payload;
      const expression = converter.convertToIDExpression(firstVariable, secondVariable, thirdVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        step,
        id,
        rawInput: `${firstVariable}, ${secondVariable}, ${thirdVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'ID', ru: 'ДИ' },
      };
      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },

    createContradictionRealization: (state, action: PayloadAction<{ firstVariable: string; secondVariable: string }>) => {
      const { firstVariable, secondVariable } = action.payload;
      const expression = converter.convertToCRExpression(firstVariable, secondVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        step,
        id,
        rawInput: `${firstVariable}, ${secondVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'CR', ru: 'СП' },
      };
      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },

    eliminateImplication: (state, action: PayloadAction<DirectProofsTableItem[]>) => {
      const items = action.payload;
      if (items.length !== 2) {
        return state;
      }

      const formulas = items.map((item) => item.formula);

      if (!validator.isIEApplicable(formulas[0], formulas[1])) {
        return state;
      }

      const formula = executor.performIE(formulas[0], formulas[1]);
      const expression = converter.convertFormulaToExpression(formula);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        step,
        id,
        expression,
        friendlyExpression,
        formula,
        rawInput: `${items[0].rawInput}, ${items[1].rawInput}`,
        comment: { en: `IE: ${items[0].step}, ${items[1].step}`, ru: `УИ: ${items[0].step}, ${items[1].step}` },
      };

      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },
  },
});

export const propositionsActions = { ...propositionsSlice.actions };
