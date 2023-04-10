import { LocalText, TableColumn } from 'types';

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
}

export type TruthTablesFlag = keyof TruthTablesFlags;
