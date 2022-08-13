import { DirectProofsTableItem, PropositionsDirectProofsFlags } from './interfaces';
import { PropositionalFormula, RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getFlags = (state: RootState): PropositionsDirectProofsFlags => state.propositionsDirectProofs.flags;

const getIsPremiseOpened = createSelector(getFlags, (data: PropositionsDirectProofsFlags): boolean => data.isPremiseOpened);

const getTableData = (state: RootState): DirectProofsTableItem[] => state.propositionsDirectProofs.tableData;

const getTableDataLength = (state: RootState): number => state.propositionsDirectProofs.tableData.length;

const getSelectedIds = (state: RootState): string[] => state.propositionsDirectProofs.selectedIds;

const getIsImplicationCreationOpened = createSelector(
  getFlags,
  (data: PropositionsDirectProofsFlags): boolean => data.isImplicationCreationOpened,
);

const getIsImplicationDistributionOpened = createSelector(
  getFlags,
  (data: PropositionsDirectProofsFlags): boolean => data.isImplicationDistributionOpened,
);

const getIsContradictionRealizationOpened = createSelector(
  getFlags,
  (data: PropositionsDirectProofsFlags): boolean => data.isContradictionRealizationOpened,
);

const getIsReplacerFormOpened = createSelector(getFlags, (data: PropositionsDirectProofsFlags): boolean => data.isReplacerFormOpened);

const getSelectedFormulas = (state: RootState): PropositionalFormula[] => {
  const selectedIds = state.propositionsDirectProofs.selectedIds;
  const selectedItems = state.propositionsDirectProofs.tableData.filter((item) => selectedIds.includes(item.id));

  return selectedItems.map((item) => item.formula);
};

const getSelectedTableItems = (state: RootState): DirectProofsTableItem[] => {
  const selectedIds = state.propositionsDirectProofs.selectedIds;

  return state.propositionsDirectProofs.tableData.filter((item) => selectedIds.includes(item.id));
};

export const propositionsDirectProofsSelectors = {
  getFlags,
  getTableData,
  getSelectedIds,
  getSelectedFormulas,
  getSelectedTableItems,
  getTableDataLength,
  getIsPremiseOpened,
  getIsImplicationCreationOpened,
  getIsImplicationDistributionOpened,
  getIsContradictionRealizationOpened,
  getIsReplacerFormOpened,
};
