import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

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

export const testPropositionalExpression: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 0,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 1,
  },
  {
    input: '~',
    representation: '¬',
    type: 'operator',
    position: 2,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 3,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 4,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 5,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 6,
  },
  {
    input: '=>',
    representation: '⇒',
    type: 'operator',
    position: 7,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 8,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 9,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 10,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 11,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 12,
  },
  {
    input: '&',
    representation: '∧',
    type: 'operator',
    position: 13,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 14,
  },
  {
    input: 'q',
    representation: 'Q',
    type: 'variable',
    position: 15,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 16,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 17,
  },
  {
    input: '=>',
    representation: '⇒',
    type: 'operator',
    position: 18,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 19,
  },
  {
    input: '~',
    representation: '¬',
    type: 'operator',
    position: 20,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 21,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 22,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 23,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 24,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 25,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 26,
  },
];

export const testFirstSubExpression: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 1,
  },
  {
    input: '~',
    representation: '¬',
    type: 'operator',
    position: 2,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 3,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 4,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 5,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 6,
  },
];

export const testSecondSubExpression: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 8,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 9,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 10,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 11,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 12,
  },
  {
    input: '&',
    representation: '∧',
    type: 'operator',
    position: 13,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 14,
  },
  {
    input: 'q',
    representation: 'Q',
    type: 'variable',
    position: 15,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 16,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 17,
  },
  {
    input: '=>',
    representation: '⇒',
    type: 'operator',
    position: 18,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 19,
  },
  {
    input: '~',
    representation: '¬',
    type: 'operator',
    position: 20,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 21,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 22,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 23,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 24,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 25,
  },
];

export const testThirdSubExpression: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 9,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 10,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 11,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 12,
  },
  {
    input: '&',
    representation: '∧',
    type: 'operator',
    position: 13,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 14,
  },
  {
    input: 'q',
    representation: 'Q',
    type: 'variable',
    position: 15,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 16,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 17,
  },
];

export const testFourthSubExpression: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 19,
  },
  {
    input: '~',
    representation: '¬',
    type: 'operator',
    position: 20,
  },
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 21,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 22,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 23,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 24,
  },
];

export const testFirstVariable: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 3,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 4,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 5,
  },
];

export const testSecondVariable: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 10,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 11,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 12,
  },
];

export const testThirdVariable: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 14,
  },
  {
    input: 'q',
    representation: 'Q',
    type: 'variable',
    position: 15,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 16,
  },
];

export const testFourthVariable: PropositionalExpression = [
  {
    input: '(',
    representation: '(',
    type: 'parentheses',
    position: 21,
  },
  {
    input: 'p',
    representation: 'P',
    type: 'variable',
    position: 22,
  },
  {
    input: ')',
    representation: ')',
    type: 'parentheses',
    position: 23,
  },
];

export const testParenthesis: PropositionalSymbol = {
  input: ')',
  representation: ')',
  type: 'parentheses',
  position: 0,
};
