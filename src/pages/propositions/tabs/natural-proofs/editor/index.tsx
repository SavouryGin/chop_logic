import ConfirmDeleteProofStepsPopup from 'pages/propositions/components/forms/confirm-delete';
import ErrorPopup from 'components/error-popup';
import FileNameForm from 'pages/propositions/components/forms/file-name';
import InputFileForm from 'pages/propositions/components/forms/input-file';
import ModalWindow from 'components/modal-window';
import NaturalProofsEditorTable from 'pages/propositions/components/tables/natural-proofs';
import NaturalProofsEditorToolbar from 'pages/propositions/components/toolbars/natural-proofs';
import OrIntroductionForm from 'pages/propositions/components/forms/or-introduction';
import PremiseForm from 'pages/propositions/components/forms/premise';
import React, { memo } from 'react';
import ReplacerForm from 'pages/propositions/components/forms/replacer';
import ShortcutNPForm from 'pages/propositions/components/forms/shortcut';
import formatClass from 'helpers/formatters/format-class-name';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const NaturalProofsEditor = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isPremiseOpened = useAppSelector(selectors.isPremiseOpened);
  const isAssumptionOpened = useAppSelector(selectors.isAssumptionOpened);
  const isConfirmDeletePopupOpened = useAppSelector(selectors.isConfirmDeletePopupOpened);
  const isOrIntroductionFormOpened = useAppSelector(selectors.isOrIntroductionFormOpened);
  const isShortcutOpened = useAppSelector(selectors.isShortcutOpened);
  const isReplacerOpened = useAppSelector(selectors.isReplacerFormOpened);
  const dependencies = useAppSelector(selectors.dependentItems);
  const isNameInputVisible = useAppSelector(selectors.isNameInputPopupVisible);
  const isUserFileFormVisible = useAppSelector(selectors.isUserFileFormVisible);
  const error = useAppSelector(selectors.error);

  const editorClass = formatClass(['natural-proofs-editor', { 'natural-proofs-editor_dark': isDarkMode }]);

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

  const closeShortcut = () => {
    dispatch(actions.setUpFlag({ flag: 'isShortcutOpened', value: false }));
  };

  const closeReplacer = () => {
    dispatch(actions.setUpFlag({ flag: 'isReplacerFormOpened', value: false }));
  };

  const closeFileNameForm = () => {
    dispatch(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
  };

  const closeFileInputForm = () => {
    dispatch(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: false }));
  };

  const resetError = () => {
    dispatch(actions.resetError());
  };

  return (
    <div className={editorClass}>
      <NaturalProofsEditorTable />
      <NaturalProofsEditorToolbar />
      <ErrorPopup error={error} onClose={resetError} />
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
        isOpened={isShortcutOpened}
        onClose={closeShortcut}
        title={uiElementTexts.shortcut[language]}
        content={<ShortcutNPForm />}
      />
      <ModalWindow
        isOpened={isReplacerOpened}
        onClose={closeReplacer}
        title={uiElementTexts.replacerForm[language]}
        content={<ReplacerForm mode='natural' />}
      />
      <ModalWindow
        isOpened={isNameInputVisible}
        onClose={closeFileNameForm}
        title={uiElementTexts.nameInput[language]}
        content={<FileNameForm mode='natural' />}
      />
      <ModalWindow
        isOpened={isUserFileFormVisible}
        onClose={closeFileInputForm}
        title={uiElementTexts.fileInput[language]}
        content={<InputFileForm mode='natural' />}
      />
    </div>
  );
};

export default memo(NaturalProofsEditor);
