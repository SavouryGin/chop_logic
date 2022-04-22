import { LocalText } from 'types';

export interface PropositionsInitialState {
  flags: PropositionsFlags;
  directProofsTableData: DirectProofsTableItem[];
}

export interface PropositionsFlags {
  isPremiseOpened: boolean;
}

export type PropositionsFlag = keyof PropositionsFlags;

export type DirectProofsTableItem = {
  id: string;
  step: number;
  formula: string;
  comment: LocalText;
};
