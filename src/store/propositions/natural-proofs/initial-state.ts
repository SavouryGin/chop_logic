import { PropositionsNaturalProofsInitialState } from './interfaces';

export const propositionsNPInitialState: PropositionsNaturalProofsInitialState = {
  flags: {
    isPremiseOpened: false,
    isReplacerFormOpened: false,
    isAssumptionOpened: false,
    isConfirmDeletePopupOpened: false,
    isOrIntroductionFormOpened: false,
    isShortcutOpened: false,
    isNameInputPopupVisible: false,
  },
  tableData: [],
  selectedIds: [],
  dependentItems: [],
  error: null,
};