import Button from 'components/controls/button';
import Formula from 'components/controls/formula';
import React from 'react';
import { ButtonID } from 'enums';
import { ConfirmDeleteProofStepsPopupProps, LocalText } from 'types';
import { DirectProofsTableItem } from 'store/propositions/direct-proofs/interfaces';
import { NaturalProofsTableItem } from 'store/propositions/natural-proofs/interfaces';
import { popupsTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const ConfirmDeleteProofStepsPopup = ({
  onConfirm,
  dependencies,
}: ConfirmDeleteProofStepsPopupProps<DirectProofsTableItem | NaturalProofsTableItem>) => {
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
