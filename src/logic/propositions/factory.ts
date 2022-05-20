import { LogicalSymbol, LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalFormula, PropositionalSymbol } from 'types';

const factory = {
  createOperatorFromSymbol(symbol: PropositionalSymbol): PropositionalOperator {
    switch (symbol.input) {
      case LogicalSymbolRawInput.Negation: {
        return PropositionalOperator.Not;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return PropositionalOperator.And;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return PropositionalOperator.Or;
      }
      case LogicalSymbolRawInput.Implication: {
        return PropositionalOperator.Implies;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return PropositionalOperator.Equiv;
      }
      default: {
        return PropositionalOperator.Var;
      }
    }
  },

  createSymbolFromRawInput(char: string): LogicalSymbol | undefined {
    switch (char) {
      case LogicalSymbolRawInput.Implication: {
        return LogicalSymbol.Implication;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return LogicalSymbol.Conjunction;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return LogicalSymbol.Disjunction;
      }
      case LogicalSymbolRawInput.Negation: {
        return LogicalSymbol.Negation;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return LogicalSymbol.Equivalence;
      }
      default: {
        return undefined;
      }
    }
  },

  createAtom(symbol: PropositionalSymbol): PropositionalFormula {
    return {
      operator: PropositionalOperator.Var,
      values: symbol.representation || symbol.input.toLocaleUpperCase(),
    };
  },

  createImplication(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Implies,
      values: [firstArgument, secondArgument],
    };
  },

  createConjunction(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.And,
      values: [firstArgument, secondArgument],
    };
  },

  createDisjunction(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Or,
      values: [firstArgument, secondArgument],
    };
  },

  createEquivalence(firstArgument: PropositionalFormula, secondArgument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Equiv,
      values: [firstArgument, secondArgument],
    };
  },

  createNegation(argument: PropositionalFormula): PropositionalFormula {
    return {
      operator: PropositionalOperator.Not,
      values: [argument],
    };
  },
};

export default Object.freeze(factory);
