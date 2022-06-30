import { LocalText } from 'types';
import { PropositionalExpression, PropositionalFormula } from 'types/propositions';

export interface PropositionsInitialState {
  flags: PropositionsFlags;
  directProofsTableData: DirectProofsTableItem[];
  selectedIds: string[];
}

export interface PropositionsFlags {
  isPremiseOpened: boolean;
  isImplicationCreationOpened: boolean;
}

export type PropositionsFlag = keyof PropositionsFlags;

export type DirectProofsTableItem = {
  id: string;
  step: number;
  expression: PropositionalExpression;
  friendlyExpression: PropositionalExpression;
  comment: LocalText | string;
  formula: PropositionalFormula;
};
