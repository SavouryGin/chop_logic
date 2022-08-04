import { DirectProofsTableItem, PropositionsFlags } from './interfaces';
import { PropositionalFormula, RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';

const getPropositionsFlags = (state: RootState): PropositionsFlags => state.propositions.flags;

const getIsPremiseOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isPremiseOpened);

const getDirectProofsTableData = (state: RootState): DirectProofsTableItem[] => state.propositions.directProofsTableData;

const getDirectProofsTableDataLength = (state: RootState): number => state.propositions.directProofsTableData.length;

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

const getIsReplacerFormOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isReplacerFormOpened);

const getSelectedFormulas = (state: RootState): PropositionalFormula[] => {
  const selectedIds = state.propositions.selectedIds;
  const selectedItems = state.propositions.directProofsTableData.filter((item) => selectedIds.includes(item.id));

  return selectedItems.map((item) => item.formula);
};

const getSelectedTableItems = (state: RootState): DirectProofsTableItem[] => {
  const selectedIds = state.propositions.selectedIds;

  return state.propositions.directProofsTableData.filter((item) => selectedIds.includes(item.id));
};

export const propositionsSelectors = {
  getPropositionsFlags,
  getDirectProofsTableData,
  getSelectedIds,
  getSelectedFormulas,
  getSelectedTableItems,
  getDirectProofsTableDataLength,
  getIsPremiseOpened,
  getIsImplicationCreationOpened,
  getIsImplicationDistributionOpened,
  getIsContradictionRealizationOpened,
  getIsReplacerFormOpened,
};
