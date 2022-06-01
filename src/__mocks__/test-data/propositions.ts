import { LogicalSymbolHexCode, PropositionalOperator } from 'enums';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';

export const propositionalSymbols: PropositionalSymbol[] = [
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

export const propositionalAtom: PropositionalFormula = {
  operator: PropositionalOperator.Var,
  values: 'P',
};

const propositionalExpression: PropositionalExpression = [
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

const firstSubExpression: PropositionalExpression = [
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

const secondSubExpression: PropositionalExpression = [
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

const thirdSubExpression: PropositionalExpression = [
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

const fourthSubExpression: PropositionalExpression = [
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

const firstVariable: PropositionalExpression = [
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

const secondVariable: PropositionalExpression = [
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

const thirdVariable: PropositionalExpression = [
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

const fourthVariable: PropositionalExpression = [
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

const parenthesis: PropositionalSymbol = {
  input: ')',
  representation: ')',
  type: 'parentheses',
  position: 0,
};

const propositionalFormula: PropositionalFormula = {
  operator: 4,
  values: [
    {
      operator: 1,
      values: [
        {
          operator: 0,
          values: 'P',
        },
      ],
    },
    {
      operator: 4,
      values: [
        {
          operator: 3,
          values: [
            {
              operator: 0,
              values: 'P',
            },
            {
              operator: 0,
              values: 'Q',
            },
          ],
        },
        {
          operator: 1,
          values: [
            {
              operator: 0,
              values: 'P',
            },
          ],
        },
      ],
    },
  ],
};

const firstSubFormula: PropositionalFormula = {
  operator: 1,
  values: [
    {
      operator: 0,
      values: 'P',
    },
  ],
};

const secondSubFormula: PropositionalFormula = {
  operator: 4,
  values: [
    {
      operator: 3,
      values: [
        {
          operator: 0,
          values: 'P',
        },
        {
          operator: 0,
          values: 'Q',
        },
      ],
    },
    {
      operator: 1,
      values: [
        {
          operator: 0,
          values: 'P',
        },
      ],
    },
  ],
};

const testData = {
  secondSubFormula,
  firstSubFormula,
  propositionalFormula,
  parenthesis,
  fourthVariable,
  thirdVariable,
  secondVariable,
  firstVariable,
  fourthSubExpression,
  thirdSubExpression,
  secondSubExpression,
  firstSubExpression,
  propositionalExpression,
  propositionalAtom,
  propositionalSymbols,
};

export default testData;
