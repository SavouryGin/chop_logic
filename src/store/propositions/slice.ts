import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import converter from 'logic/propositions/converter';
import { DirectProofsTableItem, PropositionsFlag, PropositionsInitialState } from './interfaces';

export const propositionsInitialState: PropositionsInitialState = {
  flags: {
    isPremiseOpened: false,
    isImplicationCreationOpened: false,
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
      const expression = converter.convertStringToExpression(action.payload);
      const formula = converter.convertExpressionToFormula(expression);
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        id,
        step,
        expression,
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
      if (!selectedStep) return state;
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
      const step = state.directProofsTableData.length + 1;
      const id = `proof-step-${step}`;
      const newItem: DirectProofsTableItem = {
        step,
        id,
        expression,
        formula,
        comment: { en: 'IC', ru: 'ВИ' },
      };
      state.selectedIds = [];
      state.directProofsTableData = [...state.directProofsTableData, newItem];
    },
  },
});

export const propositionsActions = { ...propositionsSlice.actions };
