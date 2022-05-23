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
