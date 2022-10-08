import Button from 'components/controls/button';
import React, { memo } from 'react';
import { ButtonID } from 'enums';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector, useIsImplicationEliminationPossible } from 'hooks';

const DirectProofsEditorToolbar = () => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectors.getSelectedIds);
  const tableDataLength = useAppSelector(selectors.getTableDataLength);
  const isReiterationDisabled = selectedIds.length !== 1;
  const isDeleteDisabled = selectedIds.length === 0;
  const isImplicationEliminationEnabled = useIsImplicationEliminationPossible(selectedIds);
  const isReplacerDisabled = tableDataLength === 0;
  const selectedItems = useAppSelector(selectors.getSelectedTableItems);

  const deleteSteps = () => {
    dispatch(actions.deleteSteps({ isConfirmed: false }));
  };

  const reiterateStep = () => {
    dispatch(actions.reiterateStep());
  };

  const openPremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: true }));
  };

  const openIC = () => {
    dispatch(actions.setUpFlag({ flag: 'isImplicationCreationOpened', value: true }));
  };

  const openID = () => {
    dispatch(actions.setUpFlag({ flag: 'isImplicationDistributionOpened', value: true }));
  };

  const openCR = () => {
    dispatch(actions.setUpFlag({ flag: 'isContradictionRealizationOpened', value: true }));
  };

  const performIE = () => {
    dispatch(actions.eliminateImplication(selectedItems));
  };

  const openReplacer = () => {
    dispatch(actions.setUpFlag({ flag: 'isReplacerFormOpened', value: true }));
  };

  return (
    <div className='direct-proofs-editor__toolbar'>
      <Button buttonId={ButtonID.Premise} sound={soundPlayer.keyboard} size='large' onClick={openPremise} />
      <Button
        buttonId={ButtonID.Reiteration}
        sound={soundPlayer.keyboard}
        size='large'
        isDisabled={isReiterationDisabled}
        onClick={reiterateStep}
      />
      <Button
        buttonId={ButtonID.Replace}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={openReplacer}
        isDisabled={isReplacerDisabled}
      />
      <Button buttonId={ButtonID.Delete} sound={soundPlayer.keyboard} size='large' isDisabled={isDeleteDisabled} onClick={deleteSteps} />
      <Button buttonId={ButtonID.ImplicationCreation} sound={soundPlayer.slideClick} size='large' onClick={openIC} />
      <Button buttonId={ButtonID.ImplicationDistribution} sound={soundPlayer.slideClick} size='large' onClick={openID} />
      <Button buttonId={ButtonID.ContradictionRealization} sound={soundPlayer.slideClick} size='large' onClick={openCR} />
      <Button
        buttonId={ButtonID.ImplicationElimination}
        sound={soundPlayer.slideClick}
        isDisabled={!isImplicationEliminationEnabled}
        size='large'
        onClick={performIE}
      />
    </div>
  );
};

export default memo(DirectProofsEditorToolbar);
