import { NPFormulaBase } from 'enums';
import { ProofTableItem, PropositionalExpression, PropositionalFormula } from 'types';

export interface PropositionsNaturalProofsInitialState {
  flags: PropositionsNaturalProofsFlags;
  tableData: NaturalProofsTableItem[];
  selectedIds: string[];
  dependentItems: NaturalProofsTableItem[];
  error: string | null;
}

export interface PropositionsNaturalProofsFlags {
  isPremiseOpened: boolean;
  isReplacerFormOpened: boolean;
  isAssumptionOpened: boolean;
  isConfirmDeletePopupOpened: boolean;
  isOrIntroductionFormOpened: boolean;
  isShortcutOpened: boolean;
  isNameInputPopupVisible: boolean;
  isUserFileFormVisible: boolean;
  isLoading: boolean;
}

export type PropositionsNaturalProofsFlag = keyof PropositionsNaturalProofsFlags;

export type NaturalProofsTableItem = ProofTableItem & {
  formula: PropositionalFormula;
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  level: number;
  formulaBase: NPFormulaBase;
  assumptionId: string | null;
};
