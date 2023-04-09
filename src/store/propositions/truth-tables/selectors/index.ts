import { LocalText, RootState, TableColumnProps } from 'types';
import { TruthTablesFlags } from '../interfaces';

const flags = (state: RootState): TruthTablesFlags => state.truthTables.flags;

const error = (state: RootState): LocalText | null => state.truthTables.error;

const columns = (state: RootState): TableColumnProps[] => state.truthTables.columns;

const truthTablesSelectors = {
  flags,
  error,
  columns,
};

export default truthTablesSelectors;
