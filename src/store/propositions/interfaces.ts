import { LocalText } from 'types';
import { PropositionalExpression } from 'types/formulas';

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
  comment: LocalText | string;
};
