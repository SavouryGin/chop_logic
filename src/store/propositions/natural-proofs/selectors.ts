import { NaturalProofsTableItem, PropositionsNaturalProofsFlags } from './interfaces';
import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getFlags = (state: RootState): PropositionsNaturalProofsFlags => state.propositionsNP.flags;

const getTableData = (state: RootState): NaturalProofsTableItem[] => state.propositionsNP.tableData;

const getTableDataLength = (state: RootState): number => state.propositionsNP.tableData.length;

const getSelectedIds = (state: RootState): string[] => state.propositionsNP.selectedIds;

const getIsPremiseOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isPremiseOpened);

const getIsAssumptionOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isAssumptionOpened);

const getIsReplacerFormOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isReplacerFormOpened);

export const propositionsNPSelectors = {
  getFlags,
  getTableData,
  getTableDataLength,
  getSelectedIds,
  getIsPremiseOpened,
  getIsAssumptionOpened,
  getIsReplacerFormOpened,
};
