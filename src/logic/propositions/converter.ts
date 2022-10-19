import factory from './factory';
import parenthesizer from './parenthesizer';
import parser from './parser';
import validator from './validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import { PropositionalOperator } from 'enums';
import { errorsTexts } from 'texts';
import { preparedSymbols } from 'pages/propositions/constants';

const converter = {
  convertStringToExpression(input: string): PropositionalExpression {
    const charsArray = parser.getCharsArray(input);
    const preparedArray = parser.joinLogicalSymbols(charsArray);
    const expression = preparedArray.map((char, index) => factory.createPropositionalSymbol(char, index));
    const withVariables = parenthesizer.parenthesizeVariables(expression);
    const withNegations = parenthesizer.parenthesizeNegations(withVariables);

    return parenthesizer.parenthesizeBinaryOperators(withNegations);
  },

  convertExpressionToFormula(expression: PropositionalExpression): PropositionalFormula {
    const mainSymbol = parser.findMainOperator(expression);
    if (validator.isIncorrectMainSymbol(mainSymbol)) {
      throw new PropositionalError(`Cannot convert this expression to a formula.`, errorsTexts.semanticError);
    }
    const operator = factory.createOperator(mainSymbol);

    if (validator.isBinaryOperator(operator)) {
      const { firstArgument, secondArgument } = parser.splitExpressionByPosition(mainSymbol.position, expression);

      return factory.createBinary(
        operator,
        this.convertExpressionToFormula(firstArgument),
        this.convertExpressionToFormula(secondArgument),
      );
    } else if (operator === PropositionalOperator.Not) {
      const argument = expression.slice(2, expression.length - 1);

      return factory.createNegation(this.convertExpressionToFormula(argument));
    } else {
      return factory.createAtom(mainSymbol);
    }
  },

  convertToICExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const output = [
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      ...secondExpression,
      preparedSymbols.implication,
      ...firstExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToIDExpression(firstVariable: string, secondVariable: string, thirdVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length || !thirdVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const thirdExpression = this.convertStringToExpression(thirdVariable);

    const output = [
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      ...secondExpression,
      preparedSymbols.implication,
      ...thirdExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.implication,
      ...secondExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.implication,
      ...thirdExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToCRExpression(firstVariable: string, secondVariable: string): PropositionalExpression {
    if (!firstVariable.length || !secondVariable.length) {
      return [];
    }

    const firstExpression = this.convertStringToExpression(firstVariable);
    const secondExpression = this.convertStringToExpression(secondVariable);
    const output = [
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      preparedSymbols.negation,
      ...firstExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      ...secondExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      preparedSymbols.openParenthesis,
      preparedSymbols.negation,
      ...firstExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      preparedSymbols.openParenthesis,
      preparedSymbols.negation,
      ...secondExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
      preparedSymbols.implication,
      ...firstExpression,
      preparedSymbols.closeParenthesis,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToDisjunctionExpression(
    firstExpression: PropositionalExpression,
    secondExpression: PropositionalExpression,
  ): PropositionalExpression {
    const output = [
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.disjunction,
      ...secondExpression,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertToConjunctionExpression(
    firstExpression: PropositionalExpression,
    secondExpression: PropositionalExpression,
  ): PropositionalExpression {
    const output = [
      preparedSymbols.openParenthesis,
      ...firstExpression,
      preparedSymbols.conjunction,
      ...secondExpression,
      preparedSymbols.closeParenthesis,
    ];

    return parenthesizer.renumberPositions(output);
  },

  convertStringToUserFriendlyExpression(input: string): PropositionalExpression {
    const convertedInput = converter.convertStringToExpression(input);
    const formula = converter.convertExpressionToFormula(convertedInput);

    return converter.convertFormulaToUserFriendlyExpression(formula);
  },

  convertFormulaToUserFriendlyExpression(formula: PropositionalFormula): PropositionalExpression {
    let expression = this._convertFormulaToDraftFriendlyExpression(formula);

    if (validator.isOpenParenthesisSymbol(expression[0]) && validator.isCloseParenthesisSymbol(expression[expression.length - 1])) {
      expression = parser.removeSurroundingElements(expression);
    }

    return parenthesizer.renumberPositions(expression);
  },

  convertFormulaToExpression(formula: PropositionalFormula): PropositionalExpression {
    const expression = this._convertFormulaToDraftExpression(formula);

    return parenthesizer.renumberPositions(expression);
  },

  _convertFormulaToDraftExpression(formula: PropositionalFormula): PropositionalExpression {
    let output: PropositionalExpression = [];

    if (formula.operator === PropositionalOperator.Not) {
      output = parenthesizer.wrapWithParenthesis([
        preparedSymbols.negation,
        ...this._convertFormulaToDraftExpression(formula.values[0] as PropositionalFormula),
      ]);
    } else if (validator.isBinaryOperator(formula.operator)) {
      const operator = factory.createBinarySymbol(formula.operator);
      const leftOperand = this._convertFormulaToDraftExpression(formula.values[0] as PropositionalFormula);
      const rightOperand = this._convertFormulaToDraftExpression(formula.values[1] as PropositionalFormula);
      output = parenthesizer.wrapWithParenthesis([...leftOperand, operator, ...rightOperand]);
    } else if (formula.operator === PropositionalOperator.Var) {
      output = parenthesizer.wrapWithParenthesis([
        {
          input: formula.values as string,
          representation: formula.values as string,
          type: 'variable',
          position: 0,
        },
      ]);
    }

    return output;
  },

  _convertFormulaToDraftFriendlyExpression(formula: PropositionalFormula): PropositionalExpression {
    let output: PropositionalExpression = [];

    if (formula.operator === PropositionalOperator.Not) {
      output = [preparedSymbols.negation, ...this._convertFormulaToDraftFriendlyExpression(formula.values[0] as PropositionalFormula)];
    } else if (validator.isBinaryOperator(formula.operator)) {
      const operator = factory.createBinarySymbol(formula.operator);
      const leftOperand = this._convertFormulaToDraftFriendlyExpression(formula.values[0] as PropositionalFormula);
      const rightOperand = this._convertFormulaToDraftFriendlyExpression(formula.values[1] as PropositionalFormula);
      output = [preparedSymbols.openParenthesis, ...leftOperand, operator, ...rightOperand, preparedSymbols.closeParenthesis];
    } else if (formula.operator === PropositionalOperator.Var) {
      output = [
        {
          input: formula.values as string,
          representation: formula.values as string,
          type: 'variable',
          position: 0,
        },
      ];
    }

    return output;
  },
};

export default Object.freeze(converter);
