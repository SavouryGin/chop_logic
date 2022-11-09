import { NPFormulaBase, PropositionalOperator } from 'enums';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';

const dpTableDataIE: DirectProofsTableItem[] = [
  {
    id: '2b8eeaae-4606-ea33-30ca-eceb95cbcd79',
    step: 1,
    rawInput: 'p|q',
    expression: [
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
        input: 'p',
        representation: 'P',
        type: 'variable',
        position: 2,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 3,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 4,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 5,
      },
      {
        input: 'q',
        representation: 'Q',
        type: 'variable',
        position: 6,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
    ],
    friendlyExpression: [
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 0,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 1,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 2,
      },
    ],
    formula: {
      operator: PropositionalOperator.Or,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: 'P',
        },
        {
          operator: PropositionalOperator.Var,
          values: 'Q',
        },
      ],
    },
    comment: {
      en: 'Premise',
      ru: 'Посылка',
    },
  },
  {
    step: 2,
    id: 'd3d4aa2e-1e09-c2ff-43a0-f9cddd5f86e7',
    rawInput: 'p|q, r',
    expression: [
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
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 2,
      },
      {
        input: 'p',
        representation: 'P',
        type: 'variable',
        position: 3,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 4,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 5,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 6,
      },
      {
        input: 'q',
        representation: 'Q',
        type: 'variable',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 9,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 10,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 11,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 12,
      },
      {
        input: 'r',
        representation: 'R',
        type: 'variable',
        position: 13,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 14,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 15,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 16,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 17,
      },
      {
        input: 'p',
        representation: 'P',
        type: 'variable',
        position: 18,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 19,
      },
      {
        input: '|',
        representation: '∨',
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
        input: 'q',
        representation: 'Q',
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
    ],
    friendlyExpression: [
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 0,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 1,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 2,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 3,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 4,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 5,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 6,
      },
      {
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 7,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 8,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 9,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 10,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 11,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 12,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 13,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 14,
      },
    ],
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Or,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: 'P',
            },
            {
              operator: PropositionalOperator.Var,
              values: 'Q',
            },
          ],
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: 'R',
            },
            {
              operator: PropositionalOperator.Or,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: 'P',
                },
                {
                  operator: PropositionalOperator.Var,
                  values: 'Q',
                },
              ],
            },
          ],
        },
      ],
    },
    comment: {
      en: 'IC',
      ru: 'ВИ',
    },
  },
  {
    step: 3,
    expression: [
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
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 2,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 3,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 4,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 5,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 6,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 9,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 10,
      },
      {
        input: 'Q',
        representation: 'Q',
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
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 13,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 14,
      },
    ],
    friendlyExpression: [
      {
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 0,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 1,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 2,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 3,
      },
      {
        input: '|',
        representation: '∨',
        type: 'operator',
        position: 4,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 5,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 6,
      },
    ],
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: 'R',
        },
        {
          operator: PropositionalOperator.Or,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: 'P',
            },
            {
              operator: PropositionalOperator.Var,
              values: 'Q',
            },
          ],
        },
      ],
    },
    id: '19fcd153-94c1-f47d-eda2-d737cb05f5dc',
    rawInput: 'p|q, p|q, r',
    comment: {
      en: 'IE: 1, 2',
      ru: 'УИ: 1, 2',
    },
    dependentOn: ['2b8eeaae-4606-ea33-30ca-eceb95cbcd79', 'd3d4aa2e-1e09-c2ff-43a0-f9cddd5f86e7'],
  },
];

const npTableDataIEandII: NaturalProofsTableItem[] = [
  {
    level: 0,
    id: 'bdf7f71f-eb31-a92d-cb0b-bf99a17555c8',
    step: 1,
    rawInput: 'p&r',
    expression: [
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
        input: 'p',
        representation: 'P',
        type: 'variable',
        position: 2,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 3,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 4,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 5,
      },
      {
        input: 'r',
        representation: 'R',
        type: 'variable',
        position: 6,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
    ],
    friendlyExpression: [
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 0,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 1,
      },
      {
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 2,
      },
    ],
    formula: {
      operator: PropositionalOperator.And,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: 'P',
        },
        {
          operator: PropositionalOperator.Var,
          values: 'R',
        },
      ],
    },
    comment: {
      en: 'Premise',
      ru: 'Посылка',
    },
    formulaBase: NPFormulaBase.Premise,
    assumptionId: null,
  },
  {
    level: 1,
    id: 'd2bc8810-1389-2786-a430-b1137cfe1cbe',
    step: 2,
    rawInput: 'p&r=>q',
    expression: [
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
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 2,
      },
      {
        input: 'p',
        representation: 'P',
        type: 'variable',
        position: 3,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 4,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 5,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 6,
      },
      {
        input: 'r',
        representation: 'R',
        type: 'variable',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 9,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 10,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 11,
      },
      {
        input: 'q',
        representation: 'Q',
        type: 'variable',
        position: 12,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 13,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 14,
      },
    ],
    friendlyExpression: [
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 0,
      },
      {
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 1,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 2,
      },
      {
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 3,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 4,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 5,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 6,
      },
    ],
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.And,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: 'P',
            },
            {
              operator: PropositionalOperator.Var,
              values: 'R',
            },
          ],
        },
        {
          operator: PropositionalOperator.Var,
          values: 'Q',
        },
      ],
    },
    comment: {
      en: 'Assumption',
      ru: 'Гипотеза',
    },
    formulaBase: NPFormulaBase.Assumption,
    assumptionId: 'd1895ed1-e6ec-bc46-0b56-b99a6ef8a02a',
  },
  {
    level: 1,
    step: 3,
    assumptionId: 'd1895ed1-e6ec-bc46-0b56-b99a6ef8a02a',
    id: 'db3ee14a-6052-1b68-6e4c-a1d39d093806',
    rawInput: 'p&r, p&r=>q',
    formulaBase: NPFormulaBase.IE,
    dependentOn: ['bdf7f71f-eb31-a92d-cb0b-bf99a17555c8', 'd2bc8810-1389-2786-a430-b1137cfe1cbe'],
    comment: {
      en: 'IE: 1, 2',
      ru: 'УИ: 1, 2',
    },
    formula: {
      operator: PropositionalOperator.Var,
      values: 'Q',
    },
    expression: [
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 0,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 1,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 2,
      },
    ],
    friendlyExpression: [
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 0,
      },
    ],
  },
  {
    level: 0,
    step: 4,
    assumptionId: null,
    id: 'b56afff7-2845-bc80-dfa3-bfa5f04f1eba',
    rawInput: 'p&r=>q, p&r, p&r=>q',
    formulaBase: NPFormulaBase.II,
    dependentOn: ['d2bc8810-1389-2786-a430-b1137cfe1cbe', 'db3ee14a-6052-1b68-6e4c-a1d39d093806'],
    comment: {
      en: 'II: 2, 3',
      ru: 'ВИ: 2, 3',
    },
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.And,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: 'P',
                },
                {
                  operator: PropositionalOperator.Var,
                  values: 'R',
                },
              ],
            },
            {
              operator: PropositionalOperator.Var,
              values: 'Q',
            },
          ],
        },
        {
          operator: PropositionalOperator.Var,
          values: 'Q',
        },
      ],
    },
    expression: [
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
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 2,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 3,
      },
      {
        input: 'P',
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
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 6,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 7,
      },
      {
        input: 'R',
        representation: 'R',
        type: 'variable',
        position: 8,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 9,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 10,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 11,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 12,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 13,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 14,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 15,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 16,
      },
      {
        input: '(',
        representation: '(',
        type: 'parentheses',
        position: 17,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 18,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 19,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 20,
      },
    ],
    friendlyExpression: [
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
        input: 'P',
        representation: 'P',
        type: 'variable',
        position: 2,
      },
      {
        input: '&',
        representation: '∧',
        type: 'operator',
        position: 3,
      },
      {
        input: 'R',
        representation: 'R',
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
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 6,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 7,
      },
      {
        input: ')',
        representation: ')',
        type: 'parentheses',
        position: 8,
      },
      {
        input: '=>',
        representation: '⇒',
        type: 'operator',
        position: 9,
      },
      {
        input: 'Q',
        representation: 'Q',
        type: 'variable',
        position: 10,
      },
    ],
  },
];

const propositionsTableItems = {
  dpTableDataIE,
  npTableDataIEandII,
};

export default propositionsTableItems;
