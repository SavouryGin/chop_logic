import { LogicalSymbolRawInput } from 'enums';

const constants = {
  logicalOperators: [
    LogicalSymbolRawInput.Implication,
    LogicalSymbolRawInput.Conjunction,
    LogicalSymbolRawInput.Disjunction,
    LogicalSymbolRawInput.Negation,
    LogicalSymbolRawInput.Equivalence,
  ],
  parentheses: ['(', ')'],
};

export default Object.freeze(constants);
