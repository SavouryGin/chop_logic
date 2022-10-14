import converter from 'logic/propositions/converter';
import validator from 'logic/propositions/validator';
import { PropositionalError } from 'errors/propositional-error';
import { PropositionalExpression } from 'types';
import { isLatinLetter } from 'helpers/checkers';
import { propositionsDPSelectors } from 'store/propositions/direct-proofs/selectors';
import { propositionsNPSelectors } from 'store/propositions/natural-proofs/selectors';
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
  const formulas = useAppSelector(propositionsDPSelectors.getSelectedFormulas);

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
  const data = useAppSelector(propositionsNPSelectors.getTableData);

  useEffect(() => {
    if (!data.length) {
      setIsEnabled(true);
    } else {
      const lastItemLevel = data[data.length - 1].level;

      setIsEnabled(lastItemLevel === 0 ? true : false);
    }
  }, [data.length]);

  return isEnabled;
};

export const useIsDPReplacePossible = (variable: string): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const data = useAppSelector(propositionsDPSelectors.getTableData);

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
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    // if F | G, F => H, G => H then H
    const isValid = validator.isDEItemsCompatible(items, currentLevel) && validator.isDEApplicable(formulas[0], formulas[1], formulas[2]);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsAndEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isCEItemsCompatible(items, currentLevel) && validator.isCEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsNotIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isNIItemsCompatible(items, currentLevel) && validator.isNIApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsNotEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isNEItemsCompatible(items, currentLevel) && validator.isNEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsEquivalenceIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isEIItemsCompatible(items, currentLevel) && validator.isEIApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsEquivalenceEliminationPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isEEItemsCompatible(items, currentLevel) && validator.isEEApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsImpliesEliminationForNPPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const formulas = useAppSelector(propositionsNPSelectors.getSelectedFormulas);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);
  const currentLevel = useAppSelector(propositionsNPSelectors.getLastTableItemLevel);

  useEffect(() => {
    const isValid = validator.isIEItemsCompatible(items, currentLevel) && validator.isIEforNPApplicable(formulas);
    setIsPossible(isValid);
  }, [selectedIds.length]);

  return isPossible;
};

export const useIsImpliesIntroductionPossible = (selectedIds: string[]): boolean => {
  const [isPossible, setIsPossible] = useState(false);
  const items = useAppSelector(propositionsNPSelectors.getSelectedTableItems);

  useEffect(() => {
    if (!items.length || items[0]?.level === 0) {
      setIsPossible(false);
    } else {
      const isAllItemsInOneAssumption = items.every((item) => item.level === items[0].level);
      setIsPossible(isAllItemsInOneAssumption);
    }
  }, [selectedIds.length]);

  return isPossible;
};
