import { LocalText, TableColumnProps } from 'types';

export interface TruthTablesInitialState {
  flags: TruthTablesFlags;
  error: LocalText | null;
  columns: TableColumnProps[];
}

export interface TruthTablesFlags {
  isLoading: boolean;
}

export type TruthTablesFlag = keyof TruthTablesFlags;
