import ConfirmDeleteProofStepsPopup from 'pages/propositions/components/popups/confirm-delete';
import ContradictionRealizationForm from 'pages/propositions/components/forms/contradiction-realization';
import DirectProofsEditorTable from 'pages/propositions/components/tables/direct-proofs';
import DirectProofsEditorToolbar from 'pages/propositions/components/toolbars/direct-proofs';
import ImplicationCreationForm from 'pages/propositions/components/forms/implication-creation';
import ImplicationDistributionForm from 'pages/propositions/components/forms/implication-distribution';
import ModalWindow from 'components/modal-window';
import PremiseForm from 'pages/propositions/components/forms/premise';
import React from 'react';
import ReplacerForm from 'pages/propositions/components/forms/replacer';
import formatClass from 'helpers/formatters/format-class-name';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts/ui-elements';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const DirectProofsEditor = () => {
  const dispatch = useAppDispatch();
  const isPremiseOpened = useAppSelector(selectors.getIsPremiseOpened);
  const isImplicationCreationOpened = useAppSelector(selectors.getIsImplicationCreationOpened);
  const isImplicationDistributionOpened = useAppSelector(selectors.getIsImplicationDistributionOpened);
  const isContradictionRealizationOpened = useAppSelector(selectors.getIsContradictionRealizationOpened);
  const isReplacerFormOpened = useAppSelector(selectors.getIsReplacerFormOpened);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isConfirmDeletePopupOpened = useAppSelector(selectors.getIsConfirmDeletePopupOpened);
  const dependencies = useAppSelector(selectors.getDependentItems);

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
  };

  const confirmDeleteSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmDeletePopupOpened', value: false }));
    dispatch(actions.deleteSteps({ isConfirmed: true }));
  };

  return (
    <div className={editorClass}>
      <DirectProofsEditorTable />
      <DirectProofsEditorToolbar />
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
        content={<ReplacerForm />}
      />
      <ModalWindow
        isOpened={isConfirmDeletePopupOpened}
        onClose={closeDeleteSteps}
        title={uiElementTexts.confirmation[language]}
        content={<ConfirmDeleteProofStepsPopup onConfirm={confirmDeleteSteps} dependencies={dependencies} />}
      />
    </div>
  );
};

export default DirectProofsEditor;
