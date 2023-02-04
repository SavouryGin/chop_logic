import { LocalText } from 'types';
import { ProofTableItem, PropositionalExpression, PropositionalFormula } from 'types/propositions';

export interface PropositionsDirectProofsInitialState {
  flags: PropositionsDirectProofsFlags;
  tableData: DirectProofsTableItem[];
  selectedIds: string[];
  dependentItems: DirectProofsTableItem[];
  error: LocalText | null;
  clipboardData: DirectProofsTableItem[];
}

export interface PropositionsDirectProofsFlags {
  isPremiseOpened: boolean;
  isImplicationCreationOpened: boolean;
  isImplicationDistributionOpened: boolean;
  isContradictionRealizationOpened: boolean;
  isReplacerFormOpened: boolean;
  isConfirmDeletePopupOpened: boolean;
  isConfirmCutPopupOpened: boolean;
  isNameInputPopupVisible: boolean;
  isUserFileFormVisible: boolean;
  isLoading: boolean;
}

export type PropositionsDirectProofsFlag = keyof PropositionsDirectProofsFlags;

export type DirectProofsTableItem = ProofTableItem & {
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  formula: PropositionalFormula;
};
