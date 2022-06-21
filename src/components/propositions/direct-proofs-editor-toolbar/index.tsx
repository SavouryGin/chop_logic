import Button from 'components/controls/button';
import React from 'react';
import { ButtonID } from 'enums';
import { PropositionsFlag } from 'store/propositions/interfaces';
import { propositionsActions as actions } from 'store/propositions/slice';
import { propositionsSelectors } from 'store/propositions/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';

function DirectProofsEditorToolbar(): React.ReactElement {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(propositionsSelectors.getSelectedIds);
  const isReiterationDisabled = selectedIds.length !== 1;
  const isDeleteDisabled = selectedIds.length === 0;

  // Handlers
  const deleteSteps = () => {
    dispatch(actions.deleteSteps());
  };

  const reiterateStep = () => {
    dispatch(actions.reiterateStep());
  };

  const openPropositionsPopup = (flag: PropositionsFlag) => {
    dispatch(actions.setUpFlag({ flag, value: true }));
  };

  return (
    <div className='direct-proofs-editor__toolbar'>
      <Button
        buttonId={ButtonID.Premise}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={() => openPropositionsPopup('isPremiseOpened')}
      />
      <Button
        buttonId={ButtonID.Reiteration}
        sound={soundPlayer.keyboard}
        size='large'
        isDisabled={isReiterationDisabled}
        onClick={reiterateStep}
      />
      <Button buttonId={ButtonID.Replace} sound={soundPlayer.keyboard} size='large' />
      <Button buttonId={ButtonID.Delete} sound={soundPlayer.keyboard} size='large' isDisabled={isDeleteDisabled} onClick={deleteSteps} />
      <Button
        buttonId={ButtonID.ImplicationCreation}
        sound={soundPlayer.slideClick}
        size='large'
        onClick={() => openPropositionsPopup('isImplicationCreationOpened')}
      />
      <Button buttonId={ButtonID.ImplicationDistribution} sound={soundPlayer.slideClick} size='large' />
      <Button buttonId={ButtonID.ImplicationReversal} sound={soundPlayer.slideClick} size='large' />
      <Button buttonId={ButtonID.ImplicationElimination} sound={soundPlayer.slideClick} size='large' />
    </div>
  );
}

export default DirectProofsEditorToolbar;
