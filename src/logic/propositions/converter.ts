import factory from './factory';
import parenthesizer from './parenthesizer';
import parser from './parser';
import propositionsElementsTexts from 'assets/texts/propositions/elements';
import validator from './validator';
import { PropositionalError } from 'utils/errors/propositional-error';
import { PropositionalExpression, PropositionalFormula } from 'types';
import { PropositionalOperator } from 'enums';
import { preparedSymbols } from 'pages/propositions/constants';

const convertToICExpression = (firstVariable: string, secondVariable: string): PropositionalExpression => {
  if (!firstVariable.length || !secondVariable.length) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
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
};

const convertToIDExpression = (firstVariable: string, secondVariable: string, thirdVariable: string): PropositionalExpression => {
  if (!firstVariable.length || !secondVariable.length || !thirdVariable.length) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
  const thirdExpression = convertStringToExpression(thirdVariable);

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
};

const convertToCRExpression = (firstVariable: string, secondVariable: string): PropositionalExpression => {
  if (!firstVariable.length || !secondVariable.length) {
    return [];
  }

  const firstExpression = convertStringToExpression(firstVariable);
  const secondExpression = convertStringToExpression(secondVariable);
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
};

const convertToDisjunctionExpression = (
  firstExpression: PropositionalExpression,
  secondExpression: PropositionalExpression,
): PropositionalExpression => {
  const output = [
    preparedSymbols.openParenthesis,
    ...firstExpression,
    preparedSymbols.disjunction,
    ...secondExpression,
    preparedSymbols.closeParenthesis,
  ];

  return parenthesizer.renumberPositions(output);
};

const convertToConjunctionExpression = (
  firstExpression: PropositionalExpression,
  secondExpression: PropositionalExpression,
): PropositionalExpression => {
  const output = [
    preparedSymbols.openParenthesis,
    ...firstExpression,
    preparedSymbols.conjunction,
    ...secondExpression,
    preparedSymbols.closeParenthesis,
  ];

  return parenthesizer.renumberPositions(output);
};

const convertFormulaToDraftExpression = (formula: PropositionalFormula): PropositionalExpression => {
  let output: PropositionalExpression = [];

  if (formula.operator === PropositionalOperator.Not) {
    output = parenthesizer.wrapWithParenthesis([
      preparedSymbols.negation,
      ...convertFormulaToDraftExpression(formula.values[0] as PropositionalFormula),
    ]);
  } else if (validator.isBinaryOperator(formula.operator)) {
    const operator = factory.createBinarySymbol(formula.operator);
    const leftOperand = convertFormulaToDraftExpression(formula.values[0] as PropositionalFormula);
    const rightOperand = convertFormulaToDraftExpression(formula.values[1] as PropositionalFormula);
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
};

const convertFormulaToDraftFriendlyExpression = (formula: PropositionalFormula): PropositionalExpression => {
  let output: PropositionalExpression = [];

  if (formula.operator === PropositionalOperator.Not) {
    output = [preparedSymbols.negation, ...convertFormulaToDraftFriendlyExpression(formula.values[0] as PropositionalFormula)];
  } else if (validator.isBinaryOperator(formula.operator)) {
    const operator = factory.createBinarySymbol(formula.operator);
    const leftOperand = convertFormulaToDraftFriendlyExpression(formula.values[0] as PropositionalFormula);
    const rightOperand = convertFormulaToDraftFriendlyExpression(formula.values[1] as PropositionalFormula);
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
};

const convertStringToExpression = (input: string): PropositionalExpression => {
  const charsArray = parser.getCharsArray(input);
  const preparedArray = parser.joinLogicalSymbols(charsArray);
  const expression = preparedArray.map((char, index) => factory.createPropositionalSymbol(char, index));
  const withVariables = parenthesizer.parenthesizeVariables(expression);
  const withNegations = parenthesizer.parenthesizeNegations(withVariables);

  return parenthesizer.parenthesizeBinaryOperators(withNegations);
};

const convertExpressionToFormula = (expression: PropositionalExpression): PropositionalFormula => {
  const mainSymbol = parser.findMainOperator(expression);
  if (validator.isIncorrectMainSymbol(mainSymbol)) {
    throw new PropositionalError(`Cannot convert this expression to a formula.`, propositionsElementsTexts.semanticError);
  }
  const operator = factory.createOperator(mainSymbol);

  if (validator.isBinaryOperator(operator)) {
    const { firstArgument, secondArgument } = parser.splitExpressionByPosition(mainSymbol.position, expression);

    return factory.createBinary(operator, convertExpressionToFormula(firstArgument), convertExpressionToFormula(secondArgument));
  } else if (operator === PropositionalOperator.Not) {
    const argument = expression.slice(2, expression.length - 1);

    return factory.createNegation(convertExpressionToFormula(argument));
  } else {
    return factory.createAtom(mainSymbol);
  }
};

const convertFormulaToExpression = (formula: PropositionalFormula): PropositionalExpression => {
  const expression = convertFormulaToDraftExpression(formula);

  return parenthesizer.renumberPositions(expression);
};

const convertStringToUserFriendlyExpression = (input: string): PropositionalExpression => {
  const convertedInput = convertStringToExpression(input);
  const formula = convertExpressionToFormula(convertedInput);

  return convertFormulaToUserFriendlyExpression(formula);
};

const convertFormulaToUserFriendlyExpression = (formula: PropositionalFormula): PropositionalExpression => {
  let expression = convertFormulaToDraftFriendlyExpression(formula);

  if (validator.isOpenParenthesisSymbol(expression[0]) && validator.isCloseParenthesisSymbol(expression[expression.length - 1])) {
    expression = parser.removeSurroundingElements(expression);
  }

  return parenthesizer.renumberPositions(expression);
};

const convertUserFriendlyExpressionToString = (expression: PropositionalExpression): string => {
  const symbolsArray = expression.map((item) => item.representation || item.input);

  return symbolsArray.join(' ');
};

const converter = {
  convertToICExpression,
  convertToIDExpression,
  convertToCRExpression,
  convertToDisjunctionExpression,
  convertToConjunctionExpression,
  convertStringToExpression,
  convertExpressionToFormula,
  convertFormulaToExpression,
  convertFormulaToUserFriendlyExpression,
  convertStringToUserFriendlyExpression,
  convertUserFriendlyExpressionToString,
};

export default Object.freeze(converter);
