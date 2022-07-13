import converter from 'logic/propositions/converter';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression } from 'types';
import { useEffect, useState } from 'react';

export const usePropositionalFormulaPreview = (input: string): PropositionalExpression | PropositionalError => {
  const [output, setOutput] = useState<PropositionalExpression | PropositionalError>([]);

  useEffect(() => {
    if (input.length) {
      try {
        setOutput(converter.convertStringToUserFriendlyExpression(input));
      } catch (err: unknown) {
        setOutput(err as PropositionalError);
      }
    } else {
      setOutput([]);
    }
  }, [input]);

  return output;
};

export const useImplicationCreationPreview = (
  firstVariable: string,
  secondVariable: string,
): PropositionalExpression | PropositionalError => {
  const [output, setOutput] = useState<PropositionalExpression | PropositionalError>([]);

  useEffect(() => {
    if (firstVariable && secondVariable) {
      try {
        const expression = converter.convertToICExpression(firstVariable, secondVariable);
        const formula = converter.convertExpressionToFormula(expression);
        const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
        setOutput(friendlyExpression);
      } catch (err: unknown) {
        setOutput(err as PropositionalError);
      }
    } else {
      setOutput([]);
    }
  }, [firstVariable, secondVariable]);

  return output;
};

export const useContradictionRealizationPreview = (
  firstVariable: string,
  secondVariable: string,
): PropositionalExpression | PropositionalError => {
  const [output, setOutput] = useState<PropositionalExpression | PropositionalError>([]);

  useEffect(() => {
    if (firstVariable && secondVariable) {
      try {
        const expression = converter.convertToCRExpression(firstVariable, secondVariable);
        const formula = converter.convertExpressionToFormula(expression);
        const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
        setOutput(friendlyExpression);
      } catch (err: unknown) {
        setOutput(err as PropositionalError);
      }
    } else {
      setOutput([]);
    }
  }, [firstVariable, secondVariable]);

  return output;
};

export const useImplicationDistributionPreview = (
  firstVariable: string,
  secondVariable: string,
  thirdVariable: string,
): PropositionalExpression | PropositionalError => {
  const [output, setOutput] = useState<PropositionalExpression | PropositionalError>([]);

  useEffect(() => {
    if (firstVariable && secondVariable && thirdVariable) {
      try {
        const expression = converter.convertToIDExpression(firstVariable, secondVariable, thirdVariable);
        const formula = converter.convertExpressionToFormula(expression);
        const friendlyExpression = converter.convertFormulaToUserFriendlyExpression(formula);
        setOutput(friendlyExpression);
      } catch (err: unknown) {
        setOutput(err as PropositionalError);
      }
    } else {
      setOutput([]);
    }
  }, [firstVariable, secondVariable, thirdVariable]);

  return output;
};
