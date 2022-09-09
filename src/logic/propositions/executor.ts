import converter from './converter';
import validator from './validator';
import { NPFormulaBase, PropositionalOperator } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalFormula } from 'types';
import { errorsTexts } from 'texts/propositions';

const executor = {
  performIE(firstFormula: PropositionalFormula, secondFormula: PropositionalFormula): PropositionalFormula {
    const isFirstImplication = firstFormula.operator === PropositionalOperator.Implies && firstFormula.values.length === 2;
    const isSecondImplication = secondFormula.operator === PropositionalOperator.Implies && secondFormula.values.length === 2;

    if (isFirstImplication && !isSecondImplication) {
      const antecedent = firstFormula.values[0] as PropositionalFormula;
      const consequent = firstFormula.values[1] as PropositionalFormula;

      if (validator.areTwoFormulasEqual(antecedent, secondFormula)) {
        return consequent;
      }
    }

    if (!isFirstImplication && isSecondImplication) {
      const antecedent = secondFormula.values[0] as PropositionalFormula;
      const consequent = secondFormula.values[1] as PropositionalFormula;

      if (validator.areTwoFormulasEqual(antecedent, firstFormula)) {
        return consequent;
      }
    }

    const firstAntecedent = firstFormula.values[0] as PropositionalFormula;
    const firstConsequent = firstFormula.values[1] as PropositionalFormula;
    const secondAntecedent = secondFormula.values[0] as PropositionalFormula;
    const secondConsequent = secondFormula.values[1] as PropositionalFormula;

    if (validator.areTwoFormulasEqual(firstAntecedent, secondFormula)) {
      return firstConsequent;
    } else if (validator.areTwoFormulasEqual(secondAntecedent, firstFormula)) {
      return secondConsequent;
    } else {
      throw new PropositionalError('Cannot perform the implication elimination.', errorsTexts.semanticError);
    }
  },

  performDI(data: {
    rawInput: string;
    level: number;
    dataLength: number;
    selectedItems: NaturalProofsTableItem[];
  }): NaturalProofsTableItem[] {
    const { rawInput, level, dataLength, selectedItems } = data;
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;
    const operand = converter.convertStringToExpression(rawInput);

    for (const item of selectedItems) {
      const firstExpression = converter.convertToDisjunctionExpression(operand, item.expression);
      const secondExpression = converter.convertToDisjunctionExpression(item.expression, operand);
      const firstFormula = converter.convertExpressionToFormula(firstExpression);
      const secondFormula = converter.convertExpressionToFormula(secondExpression);
      const firstFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(firstFormula);
      const secondFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(secondFormula);

      const firstNewItem: NaturalProofsTableItem = {
        level,
        rawInput: `${rawInput}, ${item.rawInput}`,
        step: itemsCounter,
        id: `proof-step-${itemsCounter}`,
        expression: firstExpression,
        formula: firstFormula,
        friendlyExpression: firstFriendlyExpression,
        comment: { en: `DI: ${item.step}`, ru: `ВД: ${item.step}` },
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.DI,
      };

      const secondNewItem: NaturalProofsTableItem = {
        level,
        rawInput: `${item.rawInput}, ${rawInput}`,
        step: itemsCounter + 1,
        id: `proof-step-${itemsCounter + 1}`,
        expression: secondExpression,
        formula: secondFormula,
        friendlyExpression: secondFriendlyExpression,
        comment: { en: `DI: ${item.step}`, ru: `ВД: ${item.step}` },
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.DI,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },
};

export default Object.freeze(executor);
