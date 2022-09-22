import searcher from './searcher';
import { LogicalSymbolRawInput, PropositionalOperator } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression, PropositionalFormula, PropositionalSymbol } from 'types';
import { errorsTexts } from 'texts';
import { removeArrayItemByIndex } from 'helpers/formatters/remove-array-item';

const validator = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isPropositionalExpression(array: any): array is PropositionalExpression {
    if (!array || !Array.isArray(array)) {
      return false;
    }

    for (const item of array) {
      if (item.input === undefined || item.type === undefined) {
        return false;
      }
    }

    return true;
  },

  isIncorrectMainSymbol(symbol: PropositionalSymbol): boolean {
    if (symbol.type === 'variable' || symbol.type === 'operator') {
      return false;
    }

    return true;
  },

  isOpenParenthesisSymbol(symbol: PropositionalSymbol | undefined): boolean {
    if (!symbol) {
      return false;
    }

    if (symbol.type === 'parentheses' && symbol.input === LogicalSymbolRawInput.OpenParenthesis) {
      return true;
    }

    return false;
  },

  isCloseParenthesisSymbol(symbol: PropositionalSymbol | undefined): boolean {
    if (!symbol) {
      return false;
    }

    if (symbol.type === 'parentheses' && symbol.input === LogicalSymbolRawInput.CloseParenthesis) {
      return true;
    }

    return false;
  },

  isBinaryOperator(operator: PropositionalOperator): boolean {
    if (operator === PropositionalOperator.Var || operator === PropositionalOperator.Not) {
      return false;
    }

    return true;
  },

  isNegationSymbol(symbol: PropositionalSymbol): boolean {
    if (symbol.type === 'operator' && symbol.input === LogicalSymbolRawInput.Negation) {
      return true;
    }

    return false;
  },

  isBinarySymbol(symbol: PropositionalSymbol): boolean {
    const isBinaryInput =
      symbol.input === LogicalSymbolRawInput.Conjunction ||
      symbol.input === LogicalSymbolRawInput.Disjunction ||
      symbol.input === LogicalSymbolRawInput.Implication ||
      symbol.input === LogicalSymbolRawInput.Equivalence;
    if (symbol.type === 'operator' && isBinaryInput) {
      return true;
    }

    return false;
  },

  checkNumberOfParenthesis(openIndexes: number[], closeIndexes: number[]): void {
    if (openIndexes.length !== closeIndexes.length) {
      throw new PropositionalError(
        'The number of open parenthesis does not match with the number of close parenthesis.',
        errorsTexts.parenthesisError,
      );
    }
  },

  isVariableParenthesized(variable: PropositionalSymbol, expression: PropositionalExpression): boolean {
    const leftSymbol = expression.find((symbol) => symbol.position === variable.position - 1);
    const rightSymbol = expression.find((symbol) => symbol.position === variable.position + 1);

    if (this.isOpenParenthesisSymbol(leftSymbol) && this.isCloseParenthesisSymbol(rightSymbol)) {
      return true;
    }

    return false;
  },

  isNegationParenthesized(operator: PropositionalSymbol, expression: PropositionalExpression): boolean {
    const leftSymbol = expression.find((symbol) => symbol.position === operator.position - 1);
    if (!this.isOpenParenthesisSymbol(leftSymbol) || !leftSymbol) {
      return false;
    }

    const rightSymbol = searcher.findMatchingCloseParenthesis(expression, leftSymbol);

    if (this.isCloseParenthesisSymbol(rightSymbol) && rightSymbol) {
      if (rightSymbol.position - leftSymbol.position > 5) {
        return false;
      } else {
        return true;
      }
    }

    return false;
  },

  isBinaryOperatorParenthesized(operator: PropositionalSymbol, expression: PropositionalExpression): boolean {
    const leftSymbol = expression.find((symbol) => symbol.position === operator.position - 1);
    if (!this.isCloseParenthesisSymbol(leftSymbol) || !leftSymbol) {
      return false;
    }

    const rightSymbol = expression.find((symbol) => symbol.position === operator.position + 1);
    if (!this.isOpenParenthesisSymbol(rightSymbol) || !rightSymbol) {
      return false;
    }

    const leftOpenParenthesis = searcher.findMatchingOpenParenthesis(expression, leftSymbol);
    const rightCloseParenthesis = searcher.findMatchingCloseParenthesis(expression, rightSymbol);

    if (!leftOpenParenthesis || !rightCloseParenthesis) {
      return false;
    }

    const leftOpenSecondParenthesis = expression.find((symbol) => symbol.position === leftOpenParenthesis.position - 1);
    const rightCloseSecondParenthesis = expression.find((symbol) => symbol.position === rightCloseParenthesis.position + 1);

    if (this.isOpenParenthesisSymbol(leftOpenSecondParenthesis) && this.isCloseParenthesisSymbol(rightCloseSecondParenthesis)) {
      return true;
    }

    return false;
  },

  isIEApplicable(first: PropositionalFormula, second: PropositionalFormula): boolean {
    const isFirstImplication = first.operator === PropositionalOperator.Implies && first.values.length === 2;
    const isSecondImplication = second.operator === PropositionalOperator.Implies && second.values.length === 2;

    // One implication in the first formula
    if (isFirstImplication && !isSecondImplication) {
      const antecedent = first.values[0];

      return this.areTwoFormulasEqual(antecedent, second);
    }

    // One implication in the second formula
    if (!isFirstImplication && isSecondImplication) {
      const antecedent = second.values[0];

      return this.areTwoFormulasEqual(antecedent, first);
    }

    // Two implications
    if (isFirstImplication && isSecondImplication) {
      const firstAntecedent = first.values[0];
      const secondAntecedent = second.values[0];

      return this.areTwoFormulasEqual(firstAntecedent, second) || this.areTwoFormulasEqual(secondAntecedent, first);
    }

    return false;
  },

  areTwoFormulasEqual(first: string | PropositionalFormula, second: string | PropositionalFormula): boolean {
    return JSON.stringify(first) === JSON.stringify(second);
  },

  isDEApplicable(firstFormula: PropositionalFormula, secondFormula: PropositionalFormula, thirdFormula: PropositionalFormula): boolean {
    // if F | G, F => H, G => H, then H
    const formulasArray = [firstFormula, secondFormula, thirdFormula];
    const disjunctionFormulaIndex = formulasArray.findIndex((item) => item.operator === PropositionalOperator.Or);

    if (disjunctionFormulaIndex === -1) {
      return false;
    }

    const disjunction = formulasArray[disjunctionFormulaIndex];

    const [firstImplication, secondImplication] = removeArrayItemByIndex(formulasArray, disjunctionFormulaIndex);

    if (firstImplication.operator !== PropositionalOperator.Implies || secondImplication.operator !== PropositionalOperator.Implies) {
      return false;
    }

    const firstAntecedent = firstImplication.values[0];
    const secondAntecedent = secondImplication.values[0];
    const firstClose = disjunction.values[0];
    const secondClose = disjunction.values[1];

    const firstMatch = this.areTwoFormulasEqual(firstAntecedent, firstClose) && this.areTwoFormulasEqual(secondAntecedent, secondClose);
    const secondMatch = this.areTwoFormulasEqual(firstAntecedent, secondClose) && this.areTwoFormulasEqual(secondAntecedent, firstClose);

    if (!firstMatch && !secondMatch) {
      return false;
    }

    const firstConsequent = firstImplication.values[1];
    const secondConsequent = secondImplication.values[1];
    const areConsequencesDifferent = !this.areTwoFormulasEqual(firstConsequent, secondConsequent);

    if (areConsequencesDifferent) {
      return false;
    }

    return true;
  },

  isCEApplicable(formulas: PropositionalFormula[]): boolean {
    return formulas.every((item) => item.operator === PropositionalOperator.And);
  },

  isNIApplicable(formulas: PropositionalFormula[]): boolean {
    // if F => G and F => ~G, then ~F
    const [firstFormula, secondFormula] = formulas;
    const isTwoImplications =
      firstFormula.operator === PropositionalOperator.Implies && secondFormula.operator === PropositionalOperator.Implies;

    if (!isTwoImplications) {
      return false;
    }

    const firstConsequent = firstFormula.values[1] as PropositionalFormula;
    const secondConsequent = secondFormula.values[1] as PropositionalFormula;

    if (firstConsequent.operator === PropositionalOperator.Not && secondConsequent.operator !== PropositionalOperator.Not) {
      const firstSubFormula = firstConsequent.values[0] as PropositionalFormula;

      if (this.areTwoFormulasEqual(firstSubFormula, secondConsequent)) {
        return true;
      }
    }

    if (secondConsequent.operator === PropositionalOperator.Not && firstConsequent.operator !== PropositionalOperator.Not) {
      const secondSubFormula = secondConsequent.values[0] as PropositionalFormula;

      if (this.areTwoFormulasEqual(secondSubFormula, firstConsequent)) {
        return true;
      }
    }

    return false;
  },
};

export default Object.freeze(validator);
