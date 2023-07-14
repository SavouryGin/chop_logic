import ErrorPopup from 'components/error-popup';
import FileNameForm from 'pages/propositions/components/forms/file-name';
import ModalWindow from 'components/modal-window';
import React from 'react';
import TruthTableForm from 'pages/propositions/components/forms/truth-table';
import TruthTablesTable from 'pages/propositions/components/tables/truth-table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { ttActions as actions } from 'store/propositions/truth-tables';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'utils/texts';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';
import 'pages/propositions/sub-pages/truth-tables/styles.scss';

const TruthTablesEditor = (): React.ReactElement => {
  const error = useAppSelector(truthTablesSelectors.error);
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.language);

  const resetError = () => {
    dispatch(actions.setError(null));
  };

  const closeFileNameForm = () => {
    dispatch(actions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
  };

  return (
    <div className='truth-tables-editor'>
      <TruthTableForm />
      <TruthTablesTable />
      <ErrorPopup onClose={resetError} error={error} />
      <ModalWindow
        isOpened={false}
        onClose={closeFileNameForm}
        title={uiElementTexts.nameInput[language]}
        content={<FileNameForm mode='natural' />}
      />
    </div>
  );
};

export default TruthTablesEditor;
