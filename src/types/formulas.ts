import { PropositionalOperator } from 'enums';

export type PropositionalSymbol = {
  representation?: string;
  input: string;
  type: 'variable' | 'operator' | 'parentheses';
};

export type PropositionalExpression = PropositionalSymbol[];

// NB: Recursive Type
export type PropositionalFormula = {
  operator: PropositionalOperator;
  values: PropositionalFormula[] | string;
};
