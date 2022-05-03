import { settingsActions } from 'store/settings/slice';
import { propositionsActions } from 'store/propositions/slice';
import { PropositionsFlag } from 'store/propositions/interfaces';
import { AppDispatch } from 'types';

export function closePropositionsPopup(dispatch: AppDispatch, flag: PropositionsFlag) {
  dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  // wait for closing CSS animation
  setTimeout(() => {
    dispatch(propositionsActions.setUpFlag({ flag, value: false }));
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
  }, 900);
}
