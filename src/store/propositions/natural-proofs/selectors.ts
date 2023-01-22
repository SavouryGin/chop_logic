import { LocalText, PropositionalFormula, RootState } from 'types';
import { NaturalProofsTableItem, PropositionsNaturalProofsFlags } from './interfaces';
import { createSelector } from '@reduxjs/toolkit';

const getFlags = (state: RootState): PropositionsNaturalProofsFlags => state.propositionsNP.flags;

const getTableData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.tableData;

const getDependentItems = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.dependentItems;

const getTableDataLength = (state: RootState): number => state.propositionsNP.tableData.length;

const getSelectedIds = (state: RootState): string[] => state.propositionsNP.selectedIds;

const getIsPremiseOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isPremiseOpened);

const getIsShortcutOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isShortcutOpened);

const getIsAssumptionOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isAssumptionOpened);

const getIsReplacerFormOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isReplacerFormOpened);

const getIsNameInputPopupVisible = createSelector(
  getFlags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isNameInputPopupVisible,
);

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
    const selectedSubProofId = selectedItems[0].assumptionId;

    return data.filter((item) => item.assumptionId !== null && item.assumptionId === selectedSubProofId);
  },
);

const getLastTableItemLevel = createSelector(getTableData, (data: NaturalProofsTableItem[]): number => data[data.length - 1]?.level || 0);

const getLastTableItem = createSelector(
  getTableData,
  (data: NaturalProofsTableItem[]): NaturalProofsTableItem | undefined => data[data.length - 1],
);

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

const getIsUserFileFormVisible = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isUserFileFormVisible);

const getIsLoading = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isLoading);

const getError = (state: RootState): LocalText | null => state.propositionsDP.error;

const getClipboardData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.clipboardData;

export const propositionsNPSelectors = {
  getFlags,
  getTableData,
  getTableDataLength,
  getSelectedIds,
  getDependentItems,
  getError,
  getClipboardData,
  getIsPremiseOpened,
  getIsShortcutOpened,
  getIsAssumptionOpened,
  getIsReplacerFormOpened,
  getIsConfirmDeletePopupOpened,
  getIsOrIntroductionFormOpened,
  getSelectedTableItems,
  getLastTableItemLevel,
  getSelectedFormulas,
  getLastTableItem,
  getAllSubProofsItems,
  getLastItemAssumptionId,
  getPreviousLevelAssumptionId,
  getIsNameInputPopupVisible,
  getIsUserFileFormVisible,
  getIsLoading,
};
