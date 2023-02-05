import { LocalText, ProofTableItem, PropositionalExpression, PropositionalFormula } from 'types';
import { NPFormulaBase } from 'enums';

export interface PropositionsNaturalProofsInitialState {
  flags: PropositionsNaturalProofsFlags;
  tableData: NaturalProofsTableItem[];
  selectedIds: string[];
  dependentItems: NaturalProofsTableItem[];
  error: LocalText | null;
  clipboardData: NaturalProofsTableItem[];
}

export interface PropositionsNaturalProofsFlags {
  isPremiseOpened: boolean;
  isReplacerFormOpened: boolean;
  isAssumptionOpened: boolean;
  isConfirmDeletePopupOpened: boolean;
  isConfirmCutPopupOpened: boolean;
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
