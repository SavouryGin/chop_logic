import { NaturalProofsTableItem, PropositionsNaturalProofsFlags } from './interfaces';
import { PropositionalFormula, RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getFlags = (state: RootState): PropositionsNaturalProofsFlags => state.propositionsNP.flags;

const getTableData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.tableData;

const getDependentItems = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.dependentItems;

const getTableDataLength = (state: RootState): number => state.propositionsNP.tableData.length;

const getSelectedIds = (state: RootState): string[] => state.propositionsNP.selectedIds;

const getIsPremiseOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isPremiseOpened);

const getIsAssumptionOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isAssumptionOpened);

const getIsReplacerFormOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isReplacerFormOpened);

const getIsOrIntroductionFormOpened = createSelector(
  getFlags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isOrIntroductionFormOpened,
);

const getIsConfirmDeletePopupOpened = createSelector(
  getFlags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isConfirmDeletePopupOpened,
);

const getSelectedTableItems = createSelector(
  getSelectedIds,
  getTableData,
  (selectedIds: string[], data: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
    return data.filter((item) => selectedIds.includes(item.id));
  },
);

const getSelectedFormulas = createSelector(
  getSelectedIds,
  getTableData,
  (selectedIds: string[], data: NaturalProofsTableItem[]): PropositionalFormula[] => {
    return data.filter((item) => selectedIds.includes(item.id)).map((item) => item.formula);
  },
);

const getAllSubProofsItems = createSelector(
  getSelectedTableItems,
  getTableData,
  (selectedItems: NaturalProofsTableItem[], data: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
    const isAllSelectedItemsInOneSubProof = selectedItems.every((item) => item.level === selectedItems[0].level);

    if (!isAllSelectedItemsInOneSubProof) {
      return [];
    }

    const itemsSplittedByLevel: NaturalProofsTableItem[][] = [];
    let accumulator: NaturalProofsTableItem[] = [];

    for (let i = 0; i < data.length; i++) {
      const previousLevel = i > 1 ? data[i - 1].level : 0;
      const currentLevel = data[i].level;

      if (currentLevel === previousLevel) {
        accumulator.push(data[i]);
      } else {
        itemsSplittedByLevel.push(accumulator);
        accumulator = [data[i]];
      }
    }

    itemsSplittedByLevel.push(accumulator);

    return itemsSplittedByLevel.find((array) => array.includes(selectedItems[0])) || [];
  },
);

const getLastTableItemLevel = createSelector(getTableData, (data: NaturalProofsTableItem[]): number => data[data.length - 1]?.level || 0);

const getLastItemAssumptionId = createSelector(
  getTableData,
  (data: NaturalProofsTableItem[]): string | null => data[data.length - 1]?.assumptionId,
);

const getPreviousLevelAssumptionId = createSelector(getTableData, (data: NaturalProofsTableItem[]): string | null => {
  const lastItemLevel = data[data.length - 1]?.level || 0;
  if (lastItemLevel === 0) {
    return null;
  }

  for (let i = data.length - 2; i >= 0; i--) {
    if (data[i].level < lastItemLevel) {
      return data[i].assumptionId;
    }
  }

  return data[0].assumptionId;
});

const getAreSelectedItemsIncompatible = createSelector(getSelectedTableItems, (selectedItems: NaturalProofsTableItem[]): boolean => {
  let areIncompatible = false;

  if (!selectedItems.length) {
    return areIncompatible;
  }

  const firstSelectedItem = selectedItems.reduce((prev, current) => {
    return prev.step < current.step ? prev : current;
  });

  const initialLevel = firstSelectedItem.level;

  selectedItems.forEach((item) => {
    if (item.assumptionId !== firstSelectedItem.assumptionId && item.level >= initialLevel) {
      areIncompatible = true;
    }
  });

  return areIncompatible;
});

export const propositionsNPSelectors = {
  getFlags,
  getTableData,
  getTableDataLength,
  getSelectedIds,
  getDependentItems,
  getIsPremiseOpened,
  getIsAssumptionOpened,
  getIsReplacerFormOpened,
  getIsConfirmDeletePopupOpened,
  getIsOrIntroductionFormOpened,
  getSelectedTableItems,
  getLastTableItemLevel,
  getSelectedFormulas,
  getAllSubProofsItems,
  getLastItemAssumptionId,
  getPreviousLevelAssumptionId,
  getAreSelectedItemsIncompatible,
};
