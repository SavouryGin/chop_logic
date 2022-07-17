import validator from './validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalFormula } from 'types';
import { PropositionalOperator } from 'enums';
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
};

export default Object.freeze(executor);
