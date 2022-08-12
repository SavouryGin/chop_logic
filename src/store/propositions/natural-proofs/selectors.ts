import { NaturalProofsTableDataItem, PropositionsNaturalProofsFlags } from './interfaces';
import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getFlags = (state: RootState): PropositionsNaturalProofsFlags => state.propositionsNaturalProofs.flags;

const getIsPremiseOpened = createSelector(getFlags, (data: PropositionsNaturalProofsFlags): boolean => data.isPremiseOpened);

const getTableData = (state: RootState): NaturalProofsTableDataItem[] => state.propositionsNaturalProofs.tableData;

const getTableDataLength = (state: RootState): number => state.propositionsNaturalProofs.tableData.length;

const getSelectedIds = (state: RootState): string[] => state.propositionsNaturalProofs.selectedIds;

export const propositionsDirectProofsSelectors = {
  getFlags,
  getIsPremiseOpened,
  getTableData,
  getTableDataLength,
  getSelectedIds,
};
