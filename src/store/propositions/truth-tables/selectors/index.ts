import { LocalText, RootState, TableColumn, TableItem } from 'types';
import { TruthTablesFlags } from '../interfaces';

const flags = (state: RootState): TruthTablesFlags => state.truthTables.flags;

const error = (state: RootState): LocalText | null => state.truthTables.error;

const columns = (state: RootState): TableColumn[] => state.truthTables.columns;

const data = (state: RootState): TableItem[] => state.truthTables.data;

const truthTablesSelectors = {
  flags,
  error,
  columns,
  data,
};

export default truthTablesSelectors;
