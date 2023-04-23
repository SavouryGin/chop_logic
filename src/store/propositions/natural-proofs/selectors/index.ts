import { LocalText, PropositionalFormula, RootState } from 'types';
import { NaturalProofsTableItem, PropositionsNaturalProofsFlags } from '../interfaces';
import { createSelector } from '@reduxjs/toolkit';

const flags = (state: RootState): PropositionsNaturalProofsFlags => state.propositionsNP.flags;

const tableData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.tableData;

const dependentItems = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.dependentItems;

const tableDataLength = (state: RootState): number => state.propositionsNP.tableData.length;

const selectedIds = (state: RootState): string[] => state.propositionsNP.selectedIds;

const isPremiseOpened = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isPremiseOpened);

const isShortcutOpened = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isShortcutOpened);

const isAssumptionOpened = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isAssumptionOpened);

const isReplacerFormOpened = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isReplacerFormOpened);

const isNameInputPopupVisible = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isNameInputPopupVisible);

const isOrIntroductionFormOpened = createSelector(
  flags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isOrIntroductionFormOpened,
);

const isConfirmDeletePopupOpened = createSelector(
  flags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isConfirmDeletePopupOpened,
);

const isConfirmCutPopupOpened = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isConfirmCutPopupOpened);

const selectedTableItems = createSelector(
  selectedIds,
  tableData,
  (selectedIds: string[], data: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
    return data.filter((item) => selectedIds.includes(item.id));
  },
);

const selectedFormulas = createSelector(
  selectedIds,
  tableData,
  (selectedIds: string[], data: NaturalProofsTableItem[]): PropositionalFormula[] => {
    return data.filter((item) => selectedIds.includes(item.id)).map((item) => item.formula);
  },
);

const allSubProofsItems = createSelector(
  selectedTableItems,
  tableData,
  (selectedItems: NaturalProofsTableItem[], data: NaturalProofsTableItem[]): NaturalProofsTableItem[] => {
    const selectedSubProofId = selectedItems[0].assumptionId;

    return data.filter((item) => item.assumptionId !== null && item.assumptionId === selectedSubProofId);
  },
);

const lastTableItemLevel = createSelector(tableData, (data: NaturalProofsTableItem[]): number => data[data.length - 1]?.level || 0);

const lastTableItem = createSelector(
  tableData,
  (data: NaturalProofsTableItem[]): NaturalProofsTableItem | undefined => data[data.length - 1],
);

const lastItemAssumptionId = createSelector(
  tableData,
  (data: NaturalProofsTableItem[]): string | null => data[data.length - 1]?.assumptionId,
);

const previousLevelAssumptionId = createSelector(tableData, (data: NaturalProofsTableItem[]): string | null => {
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

const isUserFileFormVisible = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isUserFileFormVisible);

const isLoading = createSelector(flags, (data: PropositionsNaturalProofsFlags): boolean => data.isLoading);

const error = (state: RootState): LocalText | null => state.propositionsDP.error;

const clipboardData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.clipboardData;

export const propositionsNPSelectors = {
  flags,
  tableData,
  tableDataLength,
  selectedIds,
  dependentItems,
  error,
  clipboardData,
  isPremiseOpened,
  isShortcutOpened,
  isAssumptionOpened,
  isReplacerFormOpened,
  isConfirmDeletePopupOpened,
  isOrIntroductionFormOpened,
  isConfirmCutPopupOpened,
  selectedTableItems,
  lastTableItemLevel,
  selectedFormulas,
  lastTableItem,
  allSubProofsItems,
  lastItemAssumptionId,
  previousLevelAssumptionId,
  isNameInputPopupVisible,
  isUserFileFormVisible,
  isLoading,
};
