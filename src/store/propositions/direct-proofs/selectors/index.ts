import { DirectProofsTableItem, PropositionsDirectProofsFlags } from '../interfaces';
import { LocalText, PropositionalFormula, RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const flags = (state: RootState): PropositionsDirectProofsFlags => state.propositionsDP.flags;

const isPremiseOpened = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isPremiseOpened);

const error = (state: RootState): LocalText | null => state.propositionsDP.error;

const tableData = (state: RootState): DirectProofsTableItem[] => state.propositionsDP.tableData;

const dependentItems = (state: RootState): DirectProofsTableItem[] => state.propositionsDP.dependentItems;

const tableDataLength = (state: RootState): number => state.propositionsDP.tableData.length;

const selectedIds = (state: RootState): string[] => state.propositionsDP.selectedIds;

const isImplicationCreationOpened = createSelector(
  flags,
  (data: PropositionsDirectProofsFlags): boolean => data.isImplicationCreationOpened,
);

const isImplicationDistributionOpened = createSelector(
  flags,
  (data: PropositionsDirectProofsFlags): boolean => data.isImplicationDistributionOpened,
);

const isContradictionRealizationOpened = createSelector(
  flags,
  (data: PropositionsDirectProofsFlags): boolean => data.isContradictionRealizationOpened,
);

const isReplacerFormOpened = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isReplacerFormOpened);

const isConfirmDeletePopupOpened = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isConfirmDeletePopupOpened);

const isConfirmCutPopupOpened = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isConfirmCutPopupOpened);

const isUserFileFormVisible = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isUserFileFormVisible);

const isNameInputPopupVisible = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isNameInputPopupVisible);

const isToolbarOpened = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isToolbarOpened);

const selectedFormulas = (state: RootState): PropositionalFormula[] => {
  const selectedIds = state.propositionsDP.selectedIds;
  const selectedItems = state.propositionsDP.tableData.filter((item) => selectedIds.includes(item.id));

  return selectedItems.map((item) => item.formula);
};

const selectedTableItems = (state: RootState): DirectProofsTableItem[] => {
  const selectedIds = state.propositionsDP.selectedIds;

  return state.propositionsDP.tableData.filter((item) => selectedIds.includes(item.id));
};

const isLoading = createSelector(flags, (data: PropositionsDirectProofsFlags): boolean => data.isLoading);

const clipboardData = (state: RootState): DirectProofsTableItem[] => state.propositionsDP.clipboardData;

export const dpSelectors = {
  flags,
  tableData,
  dependentItems,
  selectedIds,
  selectedFormulas,
  selectedTableItems,
  tableDataLength,
  clipboardData,
  error,
  isPremiseOpened,
  isImplicationCreationOpened,
  isImplicationDistributionOpened,
  isContradictionRealizationOpened,
  isReplacerFormOpened,
  isConfirmDeletePopupOpened,
  isNameInputPopupVisible,
  isUserFileFormVisible,
  isLoading,
  isConfirmCutPopupOpened,
  isToolbarOpened,
};
