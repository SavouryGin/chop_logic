import { LocalText, PropositionalFormula, TableColumn, TableItem } from 'types';
import { PropositionalOperator } from 'enums';

export interface TruthTablesInitialState {
  flags: TruthTablesFlags;
  error: LocalText | null;
  columns: TableColumn[];
  data: TableItem[];
}

export interface TruthTablesFlags {
  isLoading: boolean;
}

export type TruthSet = {
  [key: string]: unknown;
};

export interface TruthTableColumn extends TableColumn {
  depth: number;
  operator: PropositionalOperator;
  subFormulas: PropositionalFormula[];
}

export type TruthTablesFlag = keyof TruthTablesFlags;
