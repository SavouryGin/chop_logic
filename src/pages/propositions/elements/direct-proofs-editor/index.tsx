import React from 'react';
import ModalWindow from 'components/modal-window';
import { useAppDispatch, useAppSelector } from 'hooks';
import DirectProofsEditorTable from './elements/direct-proofs-editor-table';
import DirectProofsEditorToolbar from './elements/direct-proofs-editor-toolbar';
import PremiseForm from './elements/premise-form';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'assets/texts/ui-elements';
import { propositionsSelectors } from 'store/propositions/selectors';
import { propositionsActions as actions } from 'store/propositions/slice';

import './styles.scss';

function DirectProofsEditor(): React.ReactElement {
  const dispatch = useAppDispatch();
  const isPremiseOpened = useAppSelector(propositionsSelectors.getIsPremiseOpened);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const closePremise = () => {
    dispatch(actions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
  };

  return (
    <div className='direct-proofs-editor'>
      <DirectProofsEditorTable />
      <DirectProofsEditorToolbar />
      <ModalWindow
        className='direct-proofs-editor__premise'
        isOpened={isPremiseOpened}
        onClose={closePremise}
        title={uiElementTexts.premise[language]}
        content={<PremiseForm />}
      />
    </div>
  );
}

export default DirectProofsEditor;
