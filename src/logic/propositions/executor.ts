import converter from './converter';
import validator from './validator';
import { Guid } from 'guid-typescript';
import { NPFormulaBase, PropositionalOperator } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalFormula } from 'types';
import { errorsTexts } from 'texts/propositions';
import { removeArrayItemByIndex } from 'helpers/formatters/remove-array-item';

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
        id: Guid.create().toString(),
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
        id: Guid.create().toString(),
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

  performDE(data: { level: number; dataLength: number; selectedItems: NaturalProofsTableItem[] }): NaturalProofsTableItem {
    const { level, dataLength, selectedItems } = data;
    const step = dataLength + 1;
    const [item1, item2, item3] = selectedItems;
    const firstFormula = item1.formula;
    const secondFormula = item2.formula;
    const thirdFormula = item3.formula;
    if (!firstFormula || !secondFormula || !thirdFormula) {
      throw new PropositionalError('Cannot perform Disjunction Introduction.', errorsTexts.semanticError);
    }

    const formulasArray = [firstFormula, secondFormula, thirdFormula];
    const disjunctionFormulaIndex = formulasArray.findIndex((item) => item.operator === PropositionalOperator.Or);
    const implications = removeArrayItemByIndex(formulasArray, disjunctionFormulaIndex);
    const newFormula = implications[0].values[1] as PropositionalFormula;
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      step,
      id: Guid.create().toString(),
      rawInput: `${item1.rawInput}, ${item2.rawInput}, ${item3.rawInput}`,
      formulaBase: NPFormulaBase.DE,
      dependentOn: [item1.id, item2.id, item3.id],
      comment: { en: `DE: ${item1.step}, ${item2.step}, ${item3.step}`, ru: `УД: ${item1.step}, ${item2.step}, ${item3.step}` },
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },
};

export default Object.freeze(executor);
