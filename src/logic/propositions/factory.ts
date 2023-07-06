import constants, { preparedSymbols } from 'pages/propositions/constants';
import errorsTexts from 'utils/texts/propositions/elements';
import regularExpressions from 'utils/regex';
import { LogicalSymbolHexCode, LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'utils/errors';
import { PropositionalFormula, PropositionalSymbol } from 'types';

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
          throw new PropositionalError(`Cannot create an operator from input "${symbol.input}".`, errorsTexts.inputError);
        }
      }
    }
  },

  getSymbolRepresentation(char: string): LogicalSymbolHexCode {
    switch (char) {
      case LogicalSymbolRawInput.Implication: {
        return LogicalSymbolHexCode.Implication;
      }
      case LogicalSymbolRawInput.Conjunction: {
        return LogicalSymbolHexCode.Conjunction;
      }
      case LogicalSymbolRawInput.Disjunction: {
        return LogicalSymbolHexCode.Disjunction;
      }
      case LogicalSymbolRawInput.Negation: {
        return LogicalSymbolHexCode.Negation;
      }
      case LogicalSymbolRawInput.Equivalence: {
        return LogicalSymbolHexCode.Equivalence;
      }
      default: {
        throw new PropositionalError(`Cannot get a logical representation of the symbol "${char}".`, errorsTexts.inputError);
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
    } else if (constants.parentheses.includes(char as LogicalSymbolRawInput)) {
      return {
        input: char,
        representation: char,
        type: 'parentheses',
        position,
      };
    } else if (regularExpressions.onlyLatinLetters.test(char)) {
      return {
        input: char,
        representation: char.toLocaleUpperCase(),
        type: 'variable',
        position,
      };
    } else {
      throw new PropositionalError(`Cannot create a propositional symbol from the input "${char}".`, errorsTexts.inputError);
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

  createBinarySymbol(input: PropositionalOperator): PropositionalSymbol {
    switch (input) {
      case 'OR': {
        return preparedSymbols.disjunction;
      }
      case 'AND': {
        return preparedSymbols.conjunction;
      }
      case 'IMPLIES': {
        return preparedSymbols.implication;
      }
      case 'EQUIV': {
        return preparedSymbols.equivalence;
      }
      default: {
        throw new PropositionalError(
          `Cannot convert the given propositional operator to a user friendly expression: ${input}`,
          errorsTexts.semanticError,
        );
      }
    }
  },
};

export default Object.freeze(factory);
