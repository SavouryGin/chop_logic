import { LocalText, PropositionalFormula, TableColumn, TableItem } from 'types';
import { PropositionalOperator } from 'enums';

export interface TruthTablesInitialState {
  flags: TruthTablesFlags;
  error: LocalText | null;
  columns: TableColumn[];
  data: TableItem[];
  formula: PropositionalFormula | null;
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
  operands: string[];
}

export type TruthTablesFlag = keyof TruthTablesFlags;
