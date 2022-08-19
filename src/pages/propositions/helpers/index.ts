import { AppDispatch } from 'types';
import { PropositionsDirectProofsFlag } from 'store/propositions/direct-proofs/interfaces';
import { PropositionsNaturalProofsFlag } from 'store/propositions/natural-proofs/interfaces';
import { propositionsDPActions } from 'store/propositions/direct-proofs/slice';
import { propositionsNPActions } from 'store/propositions/natural-proofs/slice';
import { settingsActions } from 'store/settings/slice';

export function closeDirectProofsPopup(dispatch: AppDispatch, flag: PropositionsDirectProofsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsDPActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}

export function closeNaturalProofsPopup(dispatch: AppDispatch, flag: PropositionsNaturalProofsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsNPActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}
