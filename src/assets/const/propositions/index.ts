import { LogicalSymbolRawInput } from 'enums';

const constants = {
  logicalOperators: [
    LogicalSymbolRawInput.Implication,
    LogicalSymbolRawInput.Conjunction,
    LogicalSymbolRawInput.Disjunction,
    LogicalSymbolRawInput.Negation,
    LogicalSymbolRawInput.Equivalence,
  ],

  parentheses: [LogicalSymbolRawInput.OpenParenthesis, LogicalSymbolRawInput.CloseParenthesis],

  directProofsEditorTableColumns: [
    {
      field: 'step',
      title: { en: '#', ru: '№' },
    },
    {
      field: 'expression',
      title: { en: 'Formula', ru: 'Формула' },
    },
    {
      field: 'comment',
      title: { en: 'Comment', ru: 'Коммент.' },
    },
  ],

  openParenthesisSymbol: {
    input: LogicalSymbolRawInput.OpenParenthesis,
    representation: '(',
    type: 'parentheses',
    position: 0,
  },

  closeParenthesisSymbol: {
    input: LogicalSymbolRawInput.CloseParenthesis,
    representation: ')',
    type: 'parentheses',
    position: 0,
  },
};

export default Object.freeze(constants);
