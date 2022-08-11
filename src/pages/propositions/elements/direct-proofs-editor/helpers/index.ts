import { AppDispatch } from 'types';
import { PropositionsFlag } from 'store/propositions/direct-proofs/interfaces';
import { propositionsActions } from 'store/propositions/direct-proofs/slice';
import { settingsActions } from 'store/settings/slice';

export function closePropositionsPopup(dispatch: AppDispatch, flag: PropositionsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 500);
}
