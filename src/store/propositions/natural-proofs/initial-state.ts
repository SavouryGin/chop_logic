import { PropositionsNaturalProofsInitialState } from './interfaces';

export const NP_INITIAL_STATE: PropositionsNaturalProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isReplacerFormOpened: false,
    isAssumptionOpened: false,
    isConfirmDeletePopupOpened: false,
    isOrIntroductionFormOpened: false,
    isShortcutOpened: false,
    isNameInputPopupVisible: false,
    isUserFileFormVisible: false,
    isLoading: false,
    isConfirmCutPopupOpened: false,
    isToolbarOpened: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
  clipboardData: [],
};
