import { ProofTableItem, PropositionalExpression, PropositionalFormula } from 'types/propositions';

export interface PropositionsDirectProofsInitialState {
  flags: PropositionsDirectProofsFlags;
  tableData: DirectProofsTableItem[];
  selectedIds: string[];
}

export interface PropositionsDirectProofsFlags {
  isPremiseOpened: boolean;
  isImplicationCreationOpened: boolean;
  isImplicationDistributionOpened: boolean;
  isContradictionRealizationOpened: boolean;
  isReplacerFormOpened: boolean;
}

export type PropositionsDirectProofsFlag = keyof PropositionsDirectProofsFlags;

export type DirectProofsTableItem = ProofTableItem & {
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  formula: PropositionalFormula;
};

export type NaturalProofsTableDataItem = ProofTableItem & {
  formula: PropositionalFormula;
};
