import { PropositionsDirectProofsInitialState } from './interfaces';

export const DP_INITIAL_STATE: PropositionsDirectProofsInitialState = {
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
    isToolbarOpened: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
  clipboardData: [],
};
