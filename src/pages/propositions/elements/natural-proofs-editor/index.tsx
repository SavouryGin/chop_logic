import NaturalProofsEditorTable from 'components/propositions/tables/natural-proofs';
import NaturalProofsEditorToolbar from 'components/propositions/toolbars/natural-proofs';
import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const NaturalProofsEditor = () => {
  // const dispatch = useAppDispatch();
  // const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);

  const editorClass = formatClassName(['natural-proofs-editor', { 'natural-proofs-editor_dark': isDarkMode }]);

  return (
    <div className={editorClass}>
      <NaturalProofsEditorTable />
      <NaturalProofsEditorToolbar />
    </div>
  );
};

export default NaturalProofsEditor;
