import { AppDispatch } from 'types';
import { PropositionsDirectProofsFlag } from 'store/propositions/direct-proofs/interfaces';
import { PropositionsNaturalProofsFlag } from 'store/propositions/natural-proofs/interfaces';
import { propositionsDirectProofsActions } from 'store/propositions/direct-proofs/slice';
import { propositionsNaturalProofsActions } from 'store/propositions/natural-proofs/slice';
import { settingsActions } from 'store/settings/slice';

export function closeDirectProofsPopup(dispatch: AppDispatch, flag: PropositionsDirectProofsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsDirectProofsActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}

export function closeNaturalProofsPopup(dispatch: AppDispatch, flag: PropositionsNaturalProofsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsNaturalProofsActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}
