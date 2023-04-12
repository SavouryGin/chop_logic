import { LocalText, TableColumn } from 'types';
import { PropositionalOperator } from 'enums';

export interface TruthTablesInitialState {
  flags: TruthTablesFlags;
  error: LocalText | null;
  columns: TableColumn[];
}

export interface TruthTablesFlags {
  isLoading: boolean;
}

export interface TruthTableColumn extends TableColumn {
  depth: number;
  operator: PropositionalOperator;
}

export type TruthTablesFlag = keyof TruthTablesFlags;
