import ContradictionRealizationForm from 'components/propositions/contradiction-realization-form';
import DirectProofsEditorTable from 'components/propositions/direct-proofs-editor-table';
import DirectProofsEditorToolbar from 'components/propositions/direct-proofs-editor-toolbar';
import ImplicationCreationForm from 'components/propositions/implication-creation-form';
import ImplicationDistributionForm from 'components/propositions/implication-distribution-form';
import ModalWindow from 'components/modal-window';
import PremiseForm from 'components/propositions/premise-form';
import React from 'react';
import ReplacerForm from 'components/propositions/replacer-form';
import formatClassName from 'helpers/formatters/format-class-name';
import { propositionsActions as actions } from 'store/propositions/slice';
import { propositionsSelectors as selectors } from 'store/propositions/selectors';
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

  const editorClass = formatClassName(['direct-proofs-editor', { 'direct-proofs-editor_dark': isDarkMode }]);

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

  return (
    <div className={editorClass}>
      <DirectProofsEditorTable />
      <DirectProofsEditorToolbar />
      <ModalWindow isOpened={isPremiseOpened} onClose={closePremise} title={uiElementTexts.premise[language]} content={<PremiseForm />} />
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
    </div>
  );
};

export default DirectProofsEditor;
