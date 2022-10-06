import converter from './converter';
import factory from './factory';
import validator from './validator';
import { Guid } from 'guid-typescript';
import { NPExecutorData, PropositionalFormula } from 'types';
import { NPFormulaBase, PropositionalOperator } from 'enums';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { PropositionalError } from 'errors/propositional-error';
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

  performDI({ rawInput, level, dataLength, selectedItems }: NPExecutorData & { rawInput: string }): NaturalProofsTableItem[] {
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

  performCI({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem[] {
    let itemsCounter = dataLength + 1;
    const isOneItemSelected = selectedItems.length === 1;
    const isEqualItemsSelected =
      selectedItems.length === 2 && validator.areTwoFormulasEqual(selectedItems[0].formula, selectedItems[1].formula);

    if (isOneItemSelected || isEqualItemsSelected) {
      const operand = selectedItems[0].expression;
      const expression = converter.convertToConjunctionExpression(operand, operand);
      const formula = converter.convertExpressionToFormula(expression);
      const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);

      return [
        {
          level,
          rawInput: `${selectedItems[0].rawInput}, ${selectedItems[0].rawInput}`,
          step: itemsCounter,
          id: Guid.create().toString(),
          expression,
          formula,
          friendlyExpression,
          comment: { en: `CI: ${selectedItems[0].step}`, ru: `ВК: ${selectedItems[0].step}` },
          dependentOn: [selectedItems[0].id],
          formulaBase: NPFormulaBase.CI,
        },
      ];
    } else {
      const newItems: NaturalProofsTableItem[] = [];

      for (const item of selectedItems) {
        const restItems = selectedItems.filter((x) => x.id !== item.id);

        for (const restItem of restItems) {
          const expression = converter.convertToConjunctionExpression(restItem.expression, item.expression);
          const formula = converter.convertExpressionToFormula(expression);
          const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);

          newItems.push({
            level,
            rawInput: `${restItem.rawInput}, ${item.rawInput}`,
            step: itemsCounter,
            id: Guid.create().toString(),
            expression,
            formula,
            friendlyExpression,
            comment: { en: `CI: ${item.step}, ${restItem.step}`, ru: `ВК: ${item.step}, ${restItem.step}` },
            dependentOn: [item.id, restItem.id],
            formulaBase: NPFormulaBase.CI,
          });

          itemsCounter += 1;
        }
      }

      return newItems;
    }
  },

  performDE({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem {
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

  performCE({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem[] {
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;

    for (const item of selectedItems) {
      if (item.formula.operator !== PropositionalOperator.And) {
        throw new PropositionalError('Cannot perform Conjunction Elimination.', errorsTexts.semanticError);
      }

      const firstConjunct = item.formula.values[0] as PropositionalFormula;
      const secondConjunct = item.formula.values[1] as PropositionalFormula;

      const firstExpression = converter.convertFormulaToExpression(firstConjunct);
      const secondExpression = converter.convertFormulaToExpression(secondConjunct);
      const firstFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(firstConjunct);
      const secondFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(secondConjunct);

      const firstNewItem: NaturalProofsTableItem = {
        level,
        rawInput: `${item.rawInput}`,
        step: itemsCounter,
        id: Guid.create().toString(),
        expression: firstExpression,
        formula: firstConjunct,
        friendlyExpression: firstFriendlyExpression,
        comment: { en: `CE: ${item.step}`, ru: `УК: ${item.step}` },
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.CE,
      };

      const secondNewItem: NaturalProofsTableItem = {
        level,
        rawInput: `${item.rawInput}`,
        step: itemsCounter + 1,
        id: Guid.create().toString(),
        expression: secondExpression,
        formula: secondConjunct,
        friendlyExpression: secondFriendlyExpression,
        comment: { en: `CE: ${item.step}`, ru: `УК: ${item.step}` },
        dependentOn: [item.id],
        formulaBase: NPFormulaBase.CE,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },

  performNI({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const [item1, item2] = selectedItems;
    const firstFormula = item1.formula;
    const secondFormula = item2.formula;

    if (!firstFormula || !secondFormula) {
      throw new PropositionalError('Cannot perform Negation Introduction.', errorsTexts.semanticError);
    }

    if (!validator.isNIApplicable([firstFormula, secondFormula])) {
      throw new PropositionalError('Cannot perform Negation Introduction.', errorsTexts.semanticError);
    }

    // if F => G and F => ~G, then ~F
    const antecedent = firstFormula.values[0] as PropositionalFormula;
    const newFormula = factory.createNegation(antecedent);
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      step,
      id: Guid.create().toString(),
      rawInput: `${item1.rawInput}, ${item2.rawInput}`,
      formulaBase: NPFormulaBase.NI,
      dependentOn: [item1.id, item2.id],
      comment: { en: `NI: ${item1.step}, ${item2.step}`, ru: `ВО: ${item1.step}, ${item2.step}` },
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performNE({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const item = selectedItems[0];
    const selectedFormula = item.formula;

    if (!selectedFormula) {
      throw new PropositionalError('Cannot perform Negation Elimination.', errorsTexts.semanticError);
    }

    if (!validator.isNEApplicable([selectedFormula])) {
      throw new PropositionalError('Cannot perform Negation Elimination.', errorsTexts.semanticError);
    }

    const newFormula = (selectedFormula.values[0] as PropositionalFormula).values[0] as PropositionalFormula;
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      step,
      id: Guid.create().toString(),
      rawInput: `${item.rawInput}`,
      formulaBase: NPFormulaBase.NE,
      dependentOn: [item.id],
      comment: { en: `NE: ${item.step}`, ru: `УО: ${item.step}` },
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performEI({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem[] {
    // If F=>G and G=>F then F<=>G
    const step = dataLength + 1;
    const firstSelectedFormula = selectedItems[0].formula;
    const secondSelectedFormula = selectedItems[1].formula;

    if (!validator.isEIApplicable([firstSelectedFormula, secondSelectedFormula])) {
      throw new PropositionalError('Cannot perform Equivalence Introduction.', errorsTexts.semanticError);
    }

    const firstOperand = firstSelectedFormula.values[0] as PropositionalFormula;
    const secondOperand = firstSelectedFormula.values[1] as PropositionalFormula;

    const firstEquivalence = factory.createBinary(PropositionalOperator.Equiv, firstOperand, secondOperand);
    const secondEquivalence = factory.createBinary(PropositionalOperator.Equiv, secondOperand, firstOperand);
    const firstExpression = converter.convertFormulaToExpression(firstEquivalence);
    const secondExpression = converter.convertFormulaToExpression(secondEquivalence);
    const firstFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(firstEquivalence);
    const secondFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(secondEquivalence);
    const comment = {
      en: `EI: ${selectedItems[0].step}, ${selectedItems[1].step}`,
      ru: `ВЭ: ${selectedItems[0].step}, ${selectedItems[1].step}`,
    };
    const dependentOn = [selectedItems[0].id, selectedItems[1].id];

    const firstNewItem: NaturalProofsTableItem = {
      level,
      rawInput: `${selectedItems[0].rawInput}, ${selectedItems[1].rawInput}`,
      step: step,
      id: Guid.create().toString(),
      expression: firstExpression,
      formula: firstEquivalence,
      friendlyExpression: firstFriendlyExpression,
      comment,
      dependentOn,
      formulaBase: NPFormulaBase.EI,
    };

    const secondNewItem: NaturalProofsTableItem = {
      level,
      rawInput: `${selectedItems[1].rawInput}, ${selectedItems[0].rawInput}`,
      step: step + 1,
      id: Guid.create().toString(),
      expression: secondExpression,
      formula: secondEquivalence,
      friendlyExpression: secondFriendlyExpression,
      comment,
      dependentOn,
      formulaBase: NPFormulaBase.EI,
    };

    return [firstNewItem, secondNewItem];
  },

  performEE({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem[] {
    const newItems: NaturalProofsTableItem[] = [];
    let itemsCounter = dataLength + 1;

    for (const item of selectedItems) {
      if (item.formula.operator !== PropositionalOperator.Equiv) {
        throw new PropositionalError('Cannot perform Equivalence Elimination.', errorsTexts.semanticError);
      }

      const firstOperand = item.formula.values[0] as PropositionalFormula;
      const secondOperand = item.formula.values[1] as PropositionalFormula;

      const firstFormula = factory.createBinary(PropositionalOperator.Implies, firstOperand, secondOperand);
      const secondFormula = factory.createBinary(PropositionalOperator.Implies, secondOperand, firstOperand);

      const firstExpression = converter.convertFormulaToExpression(firstFormula);
      const secondExpression = converter.convertFormulaToExpression(secondFormula);
      const firstFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(firstFormula);
      const secondFriendlyExpression = converter.convertFormulaToUserFriendlyExpression(secondFormula);
      const comment = { en: `EE: ${item.step}`, ru: `УЭ: ${item.step}` };
      const dependentOn = [item.id];
      const formulaBase = NPFormulaBase.EE;
      const rawInput = `${item.rawInput}`;

      const firstNewItem: NaturalProofsTableItem = {
        step: itemsCounter,
        id: Guid.create().toString(),
        formula: firstFormula,
        expression: firstExpression,
        friendlyExpression: firstFriendlyExpression,
        level,
        rawInput,
        comment,
        dependentOn,
        formulaBase,
      };

      const secondNewItem: NaturalProofsTableItem = {
        step: itemsCounter + 1,
        id: Guid.create().toString(),
        formula: secondFormula,
        expression: secondExpression,
        friendlyExpression: secondFriendlyExpression,
        level,
        rawInput,
        comment,
        dependentOn,
        formulaBase,
      };

      newItems.push(firstNewItem, secondNewItem);
      itemsCounter += 2;
    }

    return newItems;
  },

  performIEforNP({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem {
    const step = dataLength + 1;
    const firstFormula = selectedItems[0].formula;
    const secondFormula = selectedItems[1].formula;

    const newFormula = this.performIE(firstFormula, secondFormula);
    const expression = converter.convertFormulaToExpression(newFormula);
    const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(newFormula);

    return {
      level,
      step,
      id: Guid.create().toString(),
      rawInput: `${selectedItems[0].rawInput}, ${selectedItems[1].rawInput}`,
      formulaBase: NPFormulaBase.IE,
      dependentOn: [selectedItems[0].id, selectedItems[1].id],
      comment: {
        en: `IE: ${selectedItems[0].step}, ${selectedItems[1].step}`,
        ru: `УИ: ${selectedItems[0].step}, ${selectedItems[1].step}`,
      },
      formula: newFormula,
      expression,
      friendlyExpression,
    };
  },

  performII({ level, dataLength, selectedItems }: NPExecutorData): NaturalProofsTableItem[] {
    console.log(level, dataLength, selectedItems);

    return [];
  },
};

export default Object.freeze(executor);
