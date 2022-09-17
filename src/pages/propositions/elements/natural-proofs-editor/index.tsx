import AndIntroductionForm from 'components/propositions/forms/and-introduction';
import ConfirmDeleteProofStepsPopup from 'components/propositions/popups/confirm-delete';
import ModalWindow from 'components/modal-window';
import NaturalProofsEditorTable from 'components/propositions/tables/natural-proofs';
import NaturalProofsEditorToolbar from 'components/propositions/toolbars/natural-proofs';
import OrIntroductionForm from 'components/propositions/forms/or-introduction';
import PremiseForm from 'components/propositions/forms/premise';
import React, { memo } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const NaturalProofsEditor = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isPremiseOpened = useAppSelector(selectors.getIsPremiseOpened);
  const isAssumptionOpened = useAppSelector(selectors.getIsAssumptionOpened);
  const isConfirmDeletePopupOpened = useAppSelector(selectors.getIsConfirmDeletePopupOpened);
  const isOrIntroductionFormOpened = useAppSelector(selectors.getIsOrIntroductionFormOpened);
  const isAndIntroductionFormOpened = useAppSelector(selectors.getIsAndIntroductionFormOpened);
  const dependencies = useAppSelector(selectors.getDependentItems);

  const editorClass = formatClassName(['natural-proofs-editor', { 'natural-proofs-editor_dark': isDarkMode }]);

  const closePremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
  };

  const closeAssumption = () => {
    dispatch(actions.setUpFlag({ flag: 'isAssumptionOpened', value: false }));
  };

  const closeDeleteSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: false }));
  };

  const confirmDeleteSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: false }));
    dispatch(actions.deleteSteps({ isConfirmed: true }));
  };

  const closeOrIntroduction = () => {
    dispatch(actions.setUpFlag({ flag: 'isOrIntroductionFormOpened', value: false }));
  };

  const closeAndIntroduction = () => {
    dispatch(actions.setUpFlag({ flag: 'isAndIntroductionFormOpened', value: false }));
  };

  return (
    <div className={editorClass}>
      <NaturalProofsEditorTable />
      <NaturalProofsEditorToolbar />
      <ModalWindow
        isOpened={isPremiseOpened}
        onClose={closePremise}
        title={uiElementTexts.premise[language]}
        content={<PremiseForm mode='natural' />}
      />
      <ModalWindow
        isOpened={isAssumptionOpened}
        onClose={closeAssumption}
        title={uiElementTexts.assumption[language]}
        content={<PremiseForm mode='assumption' />}
      />
      <ModalWindow
        isOpened={isConfirmDeletePopupOpened}
        onClose={closeDeleteSteps}
        title={uiElementTexts.confirmation[language]}
        content={<ConfirmDeleteProofStepsPopup onConfirm={confirmDeleteSteps} dependencies={dependencies} />}
      />
      <ModalWindow
        isOpened={isOrIntroductionFormOpened}
        onClose={closeOrIntroduction}
        title={uiElementTexts.orIntroduction[language]}
        content={<OrIntroductionForm />}
      />
      <ModalWindow
        isOpened={isAndIntroductionFormOpened}
        onClose={closeAndIntroduction}
        title={uiElementTexts.andIntroduction[language]}
        content={<AndIntroductionForm />}
      />
    </div>
  );
};

export default memo(NaturalProofsEditor);
