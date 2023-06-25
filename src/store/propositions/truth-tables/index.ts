import { LocalText, TableColumn, TableItem } from 'types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TRUTH_TABLES_INITIAL_STATE } from './constants';
import { TruthTablesFlag } from './interfaces';

export const truthTablesSlice = createSlice({
  name: 'TruthTables',
  initialState: TRUTH_TABLES_INITIAL_STATE,
  reducers: {
    setUpFlag: (state, action: PayloadAction<{ flag: TruthTablesFlag; value: boolean }>) => {
      const { flag, value } = action.payload;
      state.flags[flag] = value;
    },

    setError: (state, action: PayloadAction<LocalText | null>) => {
      state.error = action.payload;
    },

    generateTruthTable: (state, _action: PayloadAction<{ input: string }>) => {
      return state;
    },

    setTableColumns: (state, action: PayloadAction<TableColumn[]>) => {
      state.columns = action.payload;
    },

    setTableData: (state, action: PayloadAction<TableItem[]>) => {
      state.data = action.payload;
    },

    exportXML: (state, _action: PayloadAction<{ input: string }>) => {
      return state;
    },

    resetState: () => {
      return TRUTH_TABLES_INITIAL_STATE;
    },
  },
});

export const truthTablesActions = { ...truthTablesSlice.actions };
