import Button from 'components/controls/button';
import React from 'react';
import { ButtonID } from 'enums';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { soundPlayer } from 'helpers/sounds';
import {
  useAppDispatch,
  useAppSelector,
  useIsAndEliminationPossible,
  useIsEquivalenceEliminationPossible,
  useIsEquivalenceIntroductionPossible,
  useIsImpliesEliminationForNPPossible,
  useIsNotEliminationPossible,
  useIsNotIntroductionPossible,
  useIsOrEliminationPossible,
  useIsPremisePossible,
} from 'hooks';

const NaturalProofsEditorToolbar = () => {
  const dispatch = useAppDispatch();
  const isPremiseDisabled = !useIsPremisePossible();
  const selectedIds = useAppSelector(selectors.getSelectedIds);
  const tableDataLength = useAppSelector(selectors.getTableDataLength);
  const isReplacerDisabled = tableDataLength === 0;
  const isReiterationDisabled = selectedIds.length !== 1;
  const isDeleteDisabled = selectedIds.length === 0;
  const isOrIntroductionDisabled = selectedIds.length === 0;
  const isOrEliminationDisabled = !useIsOrEliminationPossible(selectedIds);
  const isAndIntroductionDisabled = !selectedIds.length;
  const isAndEliminationDisabled = !useIsAndEliminationPossible(selectedIds);
  const isNotIntroductionDisabled = !useIsNotIntroductionPossible(selectedIds);
  const isNotEliminationDisabled = !useIsNotEliminationPossible(selectedIds);
  const isEquivIntroductionDisabled = !useIsEquivalenceIntroductionPossible(selectedIds);
  const isEquivEliminationDisabled = !useIsEquivalenceEliminationPossible(selectedIds);
  const isImpliesEliminationDisabled = !useIsImpliesEliminationForNPPossible(selectedIds);
  // TODO: replace with the real rules
  const isImpliesIntroductionDisabled = true;
  const isShortcutDisabled = true;

  const openPremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: true }));
  };

  const openAssumption = () => {
    dispatch(actions.setUpFlag({ flag: 'isAssumptionOpened', value: true }));
  };

  const deleteSteps = () => {
    dispatch(actions.deleteSteps({ isConfirmed: false }));
  };

  const openOrIntroduction = () => {
    dispatch(actions.setUpFlag({ flag: 'isOrIntroductionFormOpened', value: true }));
  };

  const eliminateDisjunction = () => {
    dispatch(actions.eliminateDisjunction());
  };

  const createConjunction = () => {
    dispatch(actions.createConjunction());
  };

  const eliminateConjunction = () => {
    dispatch(actions.eliminateConjunction());
  };

  const createNegation = () => {
    dispatch(actions.createNegation());
  };

  const eliminateNegation = () => {
    dispatch(actions.eliminateNegation());
  };

  const createEquivalence = () => {
    dispatch(actions.createEquivalence());
  };

  const eliminateEquivalence = () => {
    dispatch(actions.eliminateEquivalence());
  };

  return (
    <div className='natural-proofs-editor__toolbar'>
      <Button buttonId={ButtonID.Premise} sound={soundPlayer.keyboard} size='large' onClick={openPremise} isDisabled={isPremiseDisabled} />
      <Button buttonId={ButtonID.Reiteration} sound={soundPlayer.keyboard} size='large' isDisabled={isReiterationDisabled} />
      <Button buttonId={ButtonID.Replace} sound={soundPlayer.keyboard} size='large' isDisabled={isReplacerDisabled} />
      <Button
        buttonId={ButtonID.NotIntroduction}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={createNegation}
        isDisabled={isNotIntroductionDisabled}
      />
      <Button
        buttonId={ButtonID.AndIntroduction}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={createConjunction}
        isDisabled={isAndIntroductionDisabled}
      />
      <Button
        buttonId={ButtonID.OrIntroduction}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={openOrIntroduction}
        isDisabled={isOrIntroductionDisabled}
      />
      <Button
        buttonId={ButtonID.ImpliesIntroduction}
        sound={soundPlayer.keyboard}
        size='large'
        isDisabled={isImpliesIntroductionDisabled}
      />
      <Button
        buttonId={ButtonID.EquivIntroduction}
        sound={soundPlayer.keyboard}
        size='large'
        isDisabled={isEquivIntroductionDisabled}
        onClick={createEquivalence}
      />
      <Button buttonId={ButtonID.Assumption} sound={soundPlayer.keyboard} size='large' onClick={openAssumption} />
      <Button buttonId={ButtonID.Delete} sound={soundPlayer.keyboard} size='large' onClick={deleteSteps} isDisabled={isDeleteDisabled} />
      <Button buttonId={ButtonID.Shortcut} sound={soundPlayer.keyboard} size='large' isDisabled={isShortcutDisabled} />
      <Button
        buttonId={ButtonID.NotElimination}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={eliminateNegation}
        isDisabled={isNotEliminationDisabled}
      />
      <Button
        buttonId={ButtonID.AndElimination}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={eliminateConjunction}
        isDisabled={isAndEliminationDisabled}
      />
      <Button
        buttonId={ButtonID.OrElimination}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={eliminateDisjunction}
        isDisabled={isOrEliminationDisabled}
      />
      <Button buttonId={ButtonID.ImpliesElimination} sound={soundPlayer.keyboard} size='large' isDisabled={isImpliesEliminationDisabled} />
      <Button
        buttonId={ButtonID.EquivElimination}
        sound={soundPlayer.keyboard}
        size='large'
        onClick={eliminateEquivalence}
        isDisabled={isEquivEliminationDisabled}
      />
    </div>
  );
};

export default NaturalProofsEditorToolbar;
