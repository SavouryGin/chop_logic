import { PropositionsDirectProofsInitialState } from './interfaces';

export const propositionsDPInitialState: PropositionsDirectProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isImplicationCreationOpened: false,
    isImplicationDistributionOpened: false,
    isContradictionRealizationOpened: false,
    isReplacerFormOpened: false,
    isConfirmDeletePopupOpened: false,
    isNameInputPopupVisible: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
};
