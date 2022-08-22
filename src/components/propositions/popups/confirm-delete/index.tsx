import Button from 'components/controls/button';
import React from 'react';
import Table from 'components/table';
import constants from 'presets/propositions';
import { ButtonID } from 'enums';
import { popupsTexts } from 'texts';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const ConfirmDeleteProofStepsPopup = () => {
  const dependencies = useAppSelector(selectors.getDependentItems);
  const language = useAppSelector(settingsSelectors.getLanguage);

  return (
    <div className='confirm-delete-formulas'>
      <div className='confirm-delete-formulas__text'>{popupsTexts.deleteConfirmation[language]}</div>
      <Table
        className='confirm-delete-formulas__table'
        columns={constants.directProofsEditorTableColumns}
        data={dependencies}
        hasCheckboxColumn={false}
      />
      <Button buttonId={ButtonID.Apply} size='large' />
    </div>
  );
};

export default ConfirmDeleteProofStepsPopup;
