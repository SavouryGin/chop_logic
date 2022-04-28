import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { DirectProofsTableItem, PropositionsFlags } from './interfaces';

const getPropositionsFlags = (state: RootState): PropositionsFlags => state.propositions.flags;

const getIsPremiseOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isPremiseOpened);
const getDirectProofsTableData = (state: RootState): DirectProofsTableItem[] => state.propositions.directProofsTableData;
const getSelectedIds = (state: RootState): string[] => state.propositions.selectedIds;

export const propositionsSelectors = {
  getPropositionsFlags,
  getDirectProofsTableData,
  getIsPremiseOpened,
  getSelectedIds,
};
