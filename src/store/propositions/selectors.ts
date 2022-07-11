import { DirectProofsTableItem, PropositionsFlags } from './interfaces';
import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getPropositionsFlags = (state: RootState): PropositionsFlags => state.propositions.flags;

const getIsPremiseOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isPremiseOpened);
const getDirectProofsTableData = (state: RootState): DirectProofsTableItem[] => state.propositions.directProofsTableData;
const getSelectedIds = (state: RootState): string[] => state.propositions.selectedIds;
const getIsImplicationCreationOpened = createSelector(
  getPropositionsFlags,
  (data: PropositionsFlags): boolean => data.isImplicationCreationOpened,
);
const getIsImplicationDistributionOpened = createSelector(
  getPropositionsFlags,
  (data: PropositionsFlags): boolean => data.isImplicationDistributionOpened,
);
const getIsContradictionRealizationOpened = createSelector(
  getPropositionsFlags,
  (data: PropositionsFlags): boolean => data.isContradictionRealizationOpened,
);

export const propositionsSelectors = {
  getPropositionsFlags,
  getDirectProofsTableData,
  getSelectedIds,
  getIsPremiseOpened,
  getIsImplicationCreationOpened,
  getIsImplicationDistributionOpened,
  getIsContradictionRealizationOpened,
};
