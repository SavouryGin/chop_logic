import { LocalText, PropositionalFormula, RootState, TableColumn, TableItem } from 'types';
import { TruthTablesFlags } from '../interfaces';

const flags = (state: RootState): TruthTablesFlags => state.truthTables.flags;

const error = (state: RootState): LocalText | null => state.truthTables.error;

const columns = (state: RootState): TableColumn[] => state.truthTables.columns;

const data = (state: RootState): TableItem[] => state.truthTables.data;

const formula = (state: RootState): PropositionalFormula | null => state.truthTables.formula;

const truthTablesSelectors = {
  flags,
  error,
  columns,
  data,
  formula,
};

export default truthTablesSelectors;
