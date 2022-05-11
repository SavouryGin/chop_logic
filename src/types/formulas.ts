export type PropositionalSymbol = {
  representation?: string;
  input: string;
  type: 'variable' | 'operator' | 'parentheses';
};

export type PropositionalExpression = PropositionalSymbol[];
