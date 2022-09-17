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

const getIsAndIntroductionFormOpened = createSelector(
  getFlags,
  (data: PropositionsNaturalProofsFlags): boolean => data.isAndIntroductionFormOpened,
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

const getLastTableItemLevel = createSelector(getTableData, (data: NaturalProofsTableItem[]): number => data[data.length - 1]?.level || 0);

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
  getIsAndIntroductionFormOpened,
  getSelectedTableItems,
  getLastTableItemLevel,
  getSelectedFormulas,
};
