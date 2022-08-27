import Button from 'components/controls/button';
import Formula from 'components/controls/formula';
import React from 'react';
import { ButtonID } from 'enums';
import { LocalText } from 'types';
import { popupsTexts } from 'texts';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const ConfirmDeleteProofStepsPopup = ({ onConfirm }: { onConfirm: () => void }) => {
  const dependencies = useAppSelector(selectors.getDependentItems);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const formulas = dependencies.map((item) => {
    return (
      <div className='confirm-delete-popup__formula' key={item.id}>
        <div>{`Step ${item.step} (${(item.comment as LocalText)[language]}) - `}</div>
        <Formula content={item.friendlyExpression} />
      </div>
    );
  });

  return (
    <div className='confirm-delete-popup'>
      <div className='confirm-delete-popup__text'>{popupsTexts.deleteConfirmation[language]}</div>
      {formulas}
      <Button buttonId={ButtonID.Apply} size='large' className='confirm-delete-popup__button' onClick={onConfirm} />
    </div>
  );
};

export default ConfirmDeleteProofStepsPopup;
