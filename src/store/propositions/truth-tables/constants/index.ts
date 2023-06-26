import { TruthTablesInitialState } from '../interfaces';

export const TRUTH_TABLES_INITIAL_STATE: TruthTablesInitialState = {
  flags: { isLoading: false, isNameInputPopupVisible: false },
  error: null,
  columns: [],
  data: [],
  formula: null,
};
