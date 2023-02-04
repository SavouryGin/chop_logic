import { PropositionsDirectProofsInitialState } from './interfaces';

export const propositionsDPInitialState: PropositionsDirectProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isImplicationCreationOpened: false,
    isImplicationDistributionOpened: false,
    isContradictionRealizationOpened: false,
    isReplacerFormOpened: false,
    isConfirmDeletePopupOpened: false,
    isConfirmCutPopupOpened: false,
    isNameInputPopupVisible: false,
    isUserFileFormVisible: false,
    isLoading: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
  clipboardData: [],
};
