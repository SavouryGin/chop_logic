import { DirectProofsTableItem, PropositionsFlags } from './interfaces';
import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getPropositionsFlags = (state: RootState): PropositionsFlags => state.propositions.flags;

const getIsPremiseOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isPremiseOpened);
const getIsImplicationCreationOpened = createSelector(
  getPropositionsFlags,
  (data: PropositionsFlags): boolean => data.isImplicationCreationOpened,
);
const getDirectProofsTableData = (state: RootState): DirectProofsTableItem[] => state.propositions.directProofsTableData;
const getSelectedIds = (state: RootState): string[] => state.propositions.selectedIds;

export const propositionsSelectors = {
  getPropositionsFlags,
  getDirectProofsTableData,
  getIsPremiseOpened,
  getIsImplicationCreationOpened,
  getSelectedIds,
};
