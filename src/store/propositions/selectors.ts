import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { PropositionsFlags } from './interfaces';

const getPropositionsFlags = (state: RootState): PropositionsFlags => state.propositions.flags;

const getIsPremiseOpened = createSelector(getPropositionsFlags, (data: PropositionsFlags): boolean => data.isPremiseOpened);

export const propositionsSelectors = {
  getPropositionsFlags,
  getIsPremiseOpened,
};
