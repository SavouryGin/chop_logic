import { LogicalSymbol, LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalFormula, PropositionalSymbol } from 'types';
import constants from 'assets/const/propositions';
import { PropositionalError } from 'errors/propositional-error';

const factory = {
  createOperator(symbol: PropositionalSymbol): PropositionalOperator {
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
        if (symbol.type === 'variable') {
          return PropositionalOperator.Var;
        } else {
          throw new PropositionalError(`Cannot create a correct operator from input "${symbol.input}"`);
        }
      }
    }
  },

  getSymbolRepresentation(char: string): LogicalSymbol {
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
        throw new PropositionalError(`Cannot get a correct logical representation from the input "${char}"`);
      }
    }
  },

  createPropositionalSymbol(char: string, position: number): PropositionalSymbol {
    if (constants.logicalOperators.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: this.getSymbolRepresentation(char),
        type: 'operator',
        position,
      };
    } else if (constants.parentheses.includes(char)) {
      return {
        input: char,
        representation: char,
        type: 'parentheses',
        position,
      };
    } else {
      return {
        input: char,
        representation: char.toLocaleUpperCase(),
        type: 'variable',
        position,
      };
    }
  },

  createAtom(symbol: PropositionalSymbol): PropositionalFormula {
    return {
      operator: PropositionalOperator.Var,
      values: symbol.representation || symbol.input.toLocaleUpperCase(),
    };
  },

  createBinary(
    operator: PropositionalOperator,
    firstArgument: PropositionalFormula,
    secondArgument: PropositionalFormula,
  ): PropositionalFormula {
    return {
      operator,
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
