import converter from 'logic/propositions/converter';
import validator from 'logic/propositions/validator';
import { PropositionalError } from 'utils/errors/propositional-error';
import { PropositionalExpression } from 'types';
import { dpSelectors } from 'store/propositions/direct-proofs/selectors';
import { isLatinLetter } from 'utils/checkers';
import { npSelectors } from 'store/propositions/natural-proofs/selectors';
import { useAppSelector } from './common';
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

export const useIsImplicationEliminationPossible = (selectedIds: string[]): boolean => {
  const [isEnabled, setIsEnabled] = useState(false);
  const formulas = useAppSelector(dpSelectors.selectedFormulas);

  useEffect(() => {
    if (formulas.length !== 2) {
      setIsEnabled(false);
    } else {
      setIsEnabled(validator.isIEApplicable(formulas[0], formulas[1]));
    }
  }, [selectedIds.length]);

  return isEnabled;
};

export const useIsPremisePossible = (): boolean => {
  const [isEnabled, setIsEnabled] = useState(false);
  const data = useAppSelector(npSelectors.tableData);

  useEffect(() => {
    if (!data.length) {
      setIsEnabled(true);
    } else {
      const lastItemLevel = data[data.length - 1].level;

      setIsEnabled(lastItemLevel === 0);
    }
  }, [data.length]);

  return isEnabled;
};

export const useIsReplacePossible = (variable: string, mode: 'direct' | 'natural'): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const directData = useAppSelector(dpSelectors.tableData);
  const naturalData = useAppSelector(npSelectors.tableData);
  const data = mode === 'direct' ? directData : naturalData;

  useEffect(() => {
    if (!variable.trim().length || !data.length) {
      setIsPossible(false);
    } else if (!isLatinLetter(variable)) {
      setIsPossible(false);
    } else {
      const input = variable.trim().toUpperCase();
      let isMatch = false;

      for (const item of data) {
        isMatch = item.friendlyExpression.some((symbol) => symbol.representation === input);
        if (isMatch) {
          setIsPossible(true);
          break;
        }
      }
    }
  }, [variable]);

  return isPossible;
};

export const useIsOrEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    // if F | G, F => H, G => H then H
    const isValid = validator.isDEItemsCompatible(items, currentLevel) && validator.isDEApplicable(formulas[0], formulas[1], formulas[2]);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsAndEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isCEItemsCompatible(items, currentLevel) && validator.isCEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsNotIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isNIItemsCompatible(items, currentLevel) && validator.isNIApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsNotEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isNEItemsCompatible(items, currentLevel) && validator.isNEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsEquivalenceIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isEIItemsCompatible(items, currentLevel) && validator.isEIApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsEquivalenceEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isEEItemsCompatible(items, currentLevel) && validator.isEEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsImpliesEliminationForNPPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(npSelectors.selectedFormulas);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const currentLevel = useAppSelector(npSelectors.lastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isIEItemsCompatible(items, currentLevel) && validator.isIEforNPApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsImpliesIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const items = useAppSelector(npSelectors.selectedTableItems);
  const lastItem = useAppSelector(npSelectors.lastTableItem);

  useEffect(() => {
    const isValid = validator.isIIItemsCompatible(items, lastItem);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};
