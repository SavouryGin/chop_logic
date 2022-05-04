import React, { useState } from 'react';
import Form from 'components/form';
import { FormValues } from 'types';
import { ButtonID, GreekSymbol, InputID, LogicalSymbol } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { formsTexts } from 'assets/texts/propositions';
import { useAppDispatch, useAppSelector } from 'hooks';
import TextInput from 'components/inputs/text-input';
import { settingsSelectors } from 'store/settings/selectors';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';

import './styles.scss';

function ImplicationCreationForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const implicationCreationInitialValues = { firstVariable: '', secondVariable: '' };
  const [formValue, setFormValue] = useState(implicationCreationInitialValues);
  const isDisabled = formValue.firstVariable.length === 0 || formValue.secondVariable.length === 0;
  const language = useAppSelector(settingsSelectors.getLanguage);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the formula to the store
    dispatch(propositionsActions.createImplication({ ...formValue }));
    // Close the modal window
    closePropositionsPopup(dispatch, 'isImplicationCreationOpened');
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof implicationCreationInitialValues);

  const inputs = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} className='implication-creation-form__input' />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} className='implication-creation-form__input' />
    </>
  );

  return (
    <div className='implication-creation-form'>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p className='implication-creation-form__formula'>{`${GreekSymbol.Phi} ${LogicalSymbol.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbol.Implication} ${GreekSymbol.Phi} )`}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={implicationCreationInitialValues}
        inputs={inputs}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </div>
  );
}

export default ImplicationCreationForm;
