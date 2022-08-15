import ModalWindow from 'components/modal-window';
import NaturalProofsEditorTable from 'components/propositions/tables/natural-proofs';
import NaturalProofsEditorToolbar from 'components/propositions/toolbars/natural-proofs';
import PremiseForm from 'components/propositions/forms/premise';
import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { propositionsNaturalProofsActions as actions } from 'store/propositions/natural-proofs/slice';
import { propositionsNaturalProofsSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const NaturalProofsEditor = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isPremiseOpened = useAppSelector(selectors.getIsPremiseOpened);
  const isAssumptionOpened = useAppSelector(selectors.getIsAssumptionOpened);

  const editorClass = formatClassName(['natural-proofs-editor', { 'natural-proofs-editor_dark': isDarkMode }]);

  const closePremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
  };

  const closeAssumption = () => {
    dispatch(actions.setUpFlag({ flag: 'isAssumptionOpened', value: false }));
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
    </div>
  );
};

export default NaturalProofsEditor;
