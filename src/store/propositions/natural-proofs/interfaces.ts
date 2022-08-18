import { ProofTableItem, PropositionalExpression, PropositionalFormula } from 'types';

export interface PropositionsNaturalProofsInitialState {
  flags: PropositionsNaturalProofsFlags;
  tableData: NaturalProofsTableDataItem[];
  selectedIds: string[];
}

export interface PropositionsNaturalProofsFlags {
  isPremiseOpened: boolean;
  isReplacerFormOpened: boolean;
  isAssumptionOpened: boolean;
}

export type PropositionsNaturalProofsFlag = keyof PropositionsNaturalProofsFlags;

export type NaturalProofsTableDataItem = ProofTableItem & {
  formula: PropositionalFormula;
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  level: number;
};
