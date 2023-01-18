import converter from 'logic/propositions/converter';
import replacer from 'logic/propositions/replacer';
import { LocalText } from 'types';
import { NPFormulaBase } from 'enums';
import { NaturalProofsTableItem, PropositionsNaturalProofsFlag } from './interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { propositionsNPInitialState } from './initial-state';

export const propositionsNPSlice = createSlice({
  name: 'Prop-NP',
  initialState: propositionsNPInitialState,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: PropositionsNaturalProofsFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setSelectedIds: (state, action: PayloadAction<string[]>) => {
      state.selectedIds = action.payload;
    },

    resetError: (state, _action: PayloadAction) => {
      state.error = null;
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
      const id = crypto.randomUUID();
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
        assumptionId: null,
        dependentOn: null,
      };
      state.tableData = [...state.tableData, newItem];
    },

    addShortcut: (state, action: PayloadAction<{ rawInput: string; comment: string }>) => {
      const { rawInput, comment } = action.payload;
      const itemsCount = state.tableData.length;
      const expression = converter.convertStringToExpression(rawInput);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
      const step = itemsCount + 1;
      const level = itemsCount > 0 ? state.tableData[itemsCount - 1].level : 0;
      const id = crypto.randomUUID();
      const newItem: NaturalProofsTableItem = {
        level,
        id,
        step,
        rawInput,
        expression,
        friendlyExpression,
        formula,
        comment: { en: comment, ru: comment },
        formulaBase: NPFormulaBase.Shortcut,
        assumptionId: null,
        dependentOn: null,
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
      const id = crypto.randomUUID();
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
        assumptionId: crypto.randomUUID(),
        dependentOn: null,
      };
      state.tableData = [...state.tableData, newItem];
    },

    reiterateStep: (state) => {
      const selectedStep = state.tableData.find((item) => item.id === state.selectedIds[0]);
      if (!selectedStep) {
        return state;
      }
      const index = state.tableData.length + 1;
      const lastItemLevel = state.tableData[state.tableData.length - 1].level;
      const newStep = {
        ...selectedStep,
        id: crypto.randomUUID(),
        step: index,
        comment: { en: `Reiter. ${selectedStep.step}`, ru: `Повтор ${selectedStep.step}` },
        dependentOn: selectedStep.dependentOn?.length ? [...selectedStep.dependentOn, selectedStep.id] : [selectedStep.id],
        level: lastItemLevel,
      };

      state.selectedIds = [];
      state.tableData = [...state.tableData, newStep];
    },

    replacePropositionalVariable: (state, action: PayloadAction<{ newVariable: string; oldVariable: string }>) => {
      const { newVariable, oldVariable } = action.payload;
      state.tableData = replacer.replacePropositionalVariableInNPTableItems(state.tableData, newVariable, oldVariable);
    },

    deleteSteps: (state, _action: PayloadAction<{ isConfirmed: boolean }>) => {
      return state;
    },

    setDependentItems: (state, action: PayloadAction<NaturalProofsTableItem[]>) => {
      state.dependentItems = action.payload;
    },

    setError: (state, action: PayloadAction<LocalText | null>) => {
      state.error = action.payload;
    },

    createDisjunction: (state, _action: PayloadAction<string>) => {
      return state;
    },

    eliminateDisjunction: (state) => {
      return state;
    },

    createConjunction: (state) => {
      return state;
    },

    eliminateConjunction: (state) => {
      return state;
    },

    createNegation: (state) => {
      return state;
    },

    eliminateNegation: (state) => {
      return state;
    },

    createEquivalence: (state) => {
      return state;
    },

    eliminateEquivalence: (state) => {
      return state;
    },

    eliminateImplication: (state) => {
      return state;
    },

    createImplication: (state) => {
      return state;
    },

    exportToXML: (state, _action: PayloadAction<string | undefined>) => {
      return state;
    },

    importFromXML: (state, _action: PayloadAction<{ file: File }>) => {
      return state;
    },
  },
});

export const propositionsNPActions = { ...propositionsNPSlice.actions };
