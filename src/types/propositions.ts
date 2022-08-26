import { LocalText } from './general';
import { PropositionalOperator } from 'enums';

export type PropositionalSymbol = {
  input: string;
  type: 'variable' | 'operator' | 'parentheses';
  position: number;
  representation?: string;
};

export type PropositionalExpression = PropositionalSymbol[];

// NB: Recursive Type
export type PropositionalFormula = {
  operator: PropositionalOperator;
  values: PropositionalFormula[] | string;
};

export type ProofTableItem = {
  id: string;
  step: number;
  rawInput: string;
  comment: LocalText | string;
  dependentOn?: string[];
};
