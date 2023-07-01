import converter from 'logic/propositions/converter';
import executor from 'logic/propositions/executor';
import replacer from 'logic/propositions/replacer';
import validator from 'logic/propositions/validator';
import { DP_INITIAL_STATE } from './initial-state';
import { DirectProofsTableItem, PropositionsDirectProofsFlag } from './interfaces';
import { LocalText } from 'types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const propositionsDPSlice = createSlice({
  name: 'Prop-DP',
  initialState: DP_INITIAL_STATE,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsDirectProofsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },

    resetError: (state, _action: PayloadAction) => {
      state.error = null;
    },

    setTableData: (state, action: PayloadAction<DirectProofsTableItem[]>) => {
      state.tableData = action.payload;
    },

    setClipboardData: (state, action: PayloadAction<DirectProofsTableItem[]>) => {
      state.clipboardData = action.payload;
    },

    setDependentItems: (state, action: PayloadAction<DirectProofsTableItem[]>) => {
      state.dependentItems = action.payload;
    },

    addPremise: (state, action: PayloadAction<string>) => {
      const rawInput = action.payload;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const id = crypto.randomUUID();
      const newItem: DirectProofsTableItem = {
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'Premise', ru: 'Посылка' },
        dependentOn: null,
      };
      state.tableData = [...state.tableData, newItem];
    },

    deleteSteps: (state, _action: PayloadAction<{ isConfirmed: boolean }>) => {
      return state;
    },

    reiterateStep: (state) => {
      const selectedStep = state.tableData.find((item) => item.id === state.selectedIds[0]);
      if (!selectedStep) {
        return state;
      }
      const index = state.tableData.length + 1;
      const newStep = {
        ...selectedStep,
        id: crypto.randomUUID(),
        step: index,
        comment: { en: `Reiter. ${selectedStep.step}`, ru: `Повтор ${selectedStep.step}` },
      };

      state.selectedIds = [];
      state.tableData = [...state.tableData, newStep];
    },

    createImplication: (state, action: PayloadAction<{ firstVariable: string; secondVariable: string }>) => {
      const { firstVariable, secondVariable } = action.payload;
      const expression = converter.convertToICExpression(firstVariable, secondVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const newItem: DirectProofsTableItem = {
        step,
        id: crypto.randomUUID(),
        rawInput: `${firstVariable}, ${secondVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'IC', ru: 'ВИ' },
        dependentOn: null,
      };
      state.selectedIds = [];
      state.tableData = [...state.tableData, newItem];
    },

    createImplicationDistribution: (
      state,
      action: PayloadAction<{ firstVariable: string; secondVariable: string; thirdVariable: string }>,
    ) => {
      const { firstVariable, secondVariable, thirdVariable } = action.payload;
      const expression = converter.convertToIDExpression(firstVariable, secondVariable, thirdVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const newItem: DirectProofsTableItem = {
        step,
        id: crypto.randomUUID(),
        rawInput: `${firstVariable}, ${secondVariable}, ${thirdVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'ID', ru: 'ДИ' },
        dependentOn: null,
      };
      state.selectedIds = [];
      state.tableData = [...state.tableData, newItem];
    },

    createContradictionRealization: (state, action: PayloadAction<{ firstVariable: string; secondVariable: string }>) => {
      const { firstVariable, secondVariable } = action.payload;
      const expression = converter.convertToCRExpression(firstVariable, secondVariable);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = state.tableData.length + 1;
      const newItem: DirectProofsTableItem = {
        step,
        id: crypto.randomUUID(),
        rawInput: `${firstVariable}, ${secondVariable}`,
        expression,
        friendlyExpression,
        formula,
        comment: { en: 'CR', ru: 'СП' },
        dependentOn: null,
      };
      state.selectedIds = [];
      state.tableData = [...state.tableData, newItem];
    },

    eliminateImplication: (state, _action: PayloadAction) => {
      const selectedIds = state.selectedIds;
      const items = state.tableData.filter((item) => selectedIds.includes(item.id));

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
      const step = state.tableData.length + 1;
      const newItem: DirectProofsTableItem = {
        step,
        expression,
        friendlyExpression,
        formula,
        id: crypto.randomUUID(),
        rawInput: `${items[0].rawInput}, ${items[1].rawInput}`,
        comment: { en: `IE: ${items[0].step}, ${items[1].step}`, ru: `УИ: ${items[0].step}, ${items[1].step}` },
        dependentOn: [items[0].id, items[1].id],
      };

      state.selectedIds = [];
      state.tableData = [...state.tableData, newItem];
    },

    replacePropositionalVariable: (state, action: PayloadAction<{ newVariable: string; oldVariable: string }>) => {
      const { newVariable, oldVariable } = action.payload;
      state.tableData = replacer.replacePropositionalVariableInDPTableItems(state.tableData, newVariable, oldVariable);
    },

    setError: (state, action: PayloadAction<LocalText | null>) => {
      state.error = action.payload;
    },

    exportToXML: (state, _action: PayloadAction<string | undefined>) => {
      return state;
    },

    importFromXML: (state, _action: PayloadAction<{ file: File }>) => {
      return state;
    },

    copySteps: (state, _action: PayloadAction) => {
      const { selectedIds, tableData } = state;
      const selectedItems = tableData.filter((item) => selectedIds.includes(item.id));

      state.clipboardData = selectedItems.map((item) => ({ ...item, id: crypto.randomUUID() }));
    },

    cutSteps: (state, _action: PayloadAction<{ isConfirmed: boolean }>) => {
      return state;
    },

    pasteSteps: (state, _action: PayloadAction) => {
      return state;
    },
  },
});

export const dpActions = { ...propositionsDPSlice.actions };
