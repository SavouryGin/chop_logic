import { AppDispatch } from 'types';
import { PropositionsDirectProofsFlag } from 'store/propositions/direct-proofs/interfaces';
import { propositionsDirectProofsActions as actions } from 'store/propositions/direct-proofs/slice';
import { settingsActions } from 'store/settings/slice';

export function closePropositionsPopup(dispatch: AppDispatch, flag: PropositionsDirectProofsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(actions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}
