import ConfirmDeleteProofStepsPopup from 'pages/propositions/components/forms/confirm-delete';
import ContradictionRealizationForm from 'pages/propositions/components/forms/contradiction-realization';
import DPEditorButtons from 'pages/propositions/components/buttons/direct-proofs';
import DirectProofsEditorTable from 'pages/propositions/components/tables/direct-proofs';
import ErrorPopup from 'components/error-popup';
import FileNameForm from 'pages/propositions/components/forms/file-name';
import ImplicationCreationForm from 'pages/propositions/components/forms/implication-creation';
import ImplicationDistributionForm from 'pages/propositions/components/forms/implication-distribution';
import InputFileForm from 'pages/propositions/components/forms/input-file';
import ModalWindow from 'components/modal-window';
import PremiseForm from 'pages/propositions/components/forms/premise';
import React from 'react';
import ReplacerForm from 'pages/propositions/components/forms/replacer';
import formatClass from 'utils/formatters/format-class-name';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'utils/texts/ui-elements';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsEditor = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const isPremiseOpened = useAppSelector(selectors.isPremiseOpened);
  const isImplicationCreationOpened = useAppSelector(selectors.isImplicationCreationOpened);
  const isImplicationDistributionOpened = useAppSelector(selectors.isImplicationDistributionOpened);
  const isContradictionRealizationOpened = useAppSelector(selectors.isContradictionRealizationOpened);
  const isReplacerFormOpened = useAppSelector(selectors.isReplacerFormOpened);
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isConfirmDeletePopupOpened = useAppSelector(selectors.isConfirmDeletePopupOpened);
  const isNameInputVisible = useAppSelector(selectors.isNameInputPopupVisible);
  const isUserFileFormVisible = useAppSelector(selectors.isUserFileFormVisible);
  const dependencies = useAppSelector(selectors.dependentItems);
  const error = useAppSelector(selectors.error);

  const editorClass = formatClass(['direct-proofs-editor', { 'direct-proofs-editor_dark': isDarkMode }]);

  const closePremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
  };

  const closeIC = () => {
    dispatch(actions.setUpFlag({ flag: 'isImplicationCreationOpened', value: false }));
  };

  const closeID = () => {
    dispatch(actions.setUpFlag({ flag: 'isImplicationDistributionOpened', value: false }));
  };

  const closeCR = () => {
    dispatch(actions.setUpFlag({ flag: 'isContradictionRealizationOpened', value: false }));
  };

  const closeReplacer = () => {
    dispatch(actions.setUpFlag({ flag: 'isReplacerFormOpened', value: false }));
  };

  const closeDeleteSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: false }));
    dispatch(actions.setDependentItems([]));
  };

  const confirmDeleteSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: false }));
    dispatch(actions.deleteSteps({ isConfirmed: true }));
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
      <DirectProofsEditorTable />
      <DPEditorButtons />
      <ErrorPopup error={error} onClose={resetError} />
      <ModalWindow
        isOpened={isPremiseOpened}
        onClose={closePremise}
        title={uiElementTexts.premise[language]}
        content={<PremiseForm mode='direct' />}
      />
      <ModalWindow
        isOpened={isImplicationCreationOpened}
        onClose={closeIC}
        title={uiElementTexts.implicationCreation[language]}
        content={<ImplicationCreationForm />}
      />
      <ModalWindow
        isOpened={isImplicationDistributionOpened}
        onClose={closeID}
        title={uiElementTexts.implicationDistribution[language]}
        content={<ImplicationDistributionForm />}
      />
      <ModalWindow
        isOpened={isContradictionRealizationOpened}
        onClose={closeCR}
        title={uiElementTexts.contradictionRealization[language]}
        content={<ContradictionRealizationForm />}
      />
      <ModalWindow
        isOpened={isReplacerFormOpened}
        onClose={closeReplacer}
        title={uiElementTexts.replacerForm[language]}
        content={<ReplacerForm mode='direct' />}
      />
      <ModalWindow
        isOpened={isConfirmDeletePopupOpened}
        onClose={closeDeleteSteps}
        title={uiElementTexts.confirmation[language]}
        content={<ConfirmDeleteProofStepsPopup onConfirm={confirmDeleteSteps} dependencies={dependencies} />}
      />
      <ModalWindow
        isOpened={isNameInputVisible}
        onClose={closeFileNameForm}
        title={uiElementTexts.nameInput[language]}
        content={<FileNameForm mode='direct' />}
      />
      <ModalWindow
        isOpened={isUserFileFormVisible}
        onClose={closeFileInputForm}
        title={uiElementTexts.fileInput[language]}
        content={<InputFileForm mode='direct' />}
      />
    </div>
  );
};

export default DirectProofsEditor;
