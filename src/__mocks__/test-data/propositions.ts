import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalFormula, PropositionalSymbol } from 'types';

export const testPropositionalSymbols: PropositionalSymbol[] = [
  {
    input: '~',
    type: 'operator',
    position: 0,
    representation: LogicalSymbolHexCode.Negation,
  },
  {
    input: '&',
    type: 'operator',
    position: 1,
    representation: LogicalSymbolHexCode.Conjunction,
  },
  {
    input: '|',
    type: 'operator',
    position: 2,
    representation: LogicalSymbolHexCode.Disjunction,
  },
  {
    input: '=>',
    type: 'operator',
    position: 3,
    representation: LogicalSymbolHexCode.Implication,
  },
  {
    input: '<=>',
    type: 'operator',
    position: 4,
    representation: LogicalSymbolHexCode.Equivalence,
  },
  {
    input: 'p',
    type: 'variable',
    position: 5,
    representation: 'P',
  },
  {
    input: ')',
    type: 'parentheses',
    position: 6,
    representation: ')',
  },
];

export const testPropositionalAtom: PropositionalFormula = {
  operator: PropositionalOperator.Var,
  values: 'P',
};
