import React, { useState } from 'react';
import Form from 'components/form';
import { FormValues } from 'types';
import { ButtonID, GreekSymbol, InputID, LogicalSymbol } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { formsTexts } from 'assets/texts/propositions';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import TextInput from 'components/inputs/text-input';
import { settingsSelectors } from 'store/settings/selectors';

function ImplicationCreationForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const implicationCreationInitialValues = { firstVariable: '', secondVariable: '' };
  const [formValue, setFormValue] = useState(implicationCreationInitialValues);
  const isDisabled = formValue.firstVariable.length === 0 || formValue.secondVariable.length === 0;
  const language = useAppSelector(settingsSelectors.getLanguage);

  const closePopup = () => {
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    // wait for closing CSS animation
    setTimeout(() => {
      dispatch(propositionsActions.setUpFlag({ flag: 'isImplicationCreationOpened', value: false }));
      dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    }, 900);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the formula to the store
    dispatch(propositionsActions.createImplication({ ...formValue }));
    // Close the modal window
    closePopup();
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof implicationCreationInitialValues);

  const inputs = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} />
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} />
    </>
  );

  return (
    <>
      <p>{formsTexts.implicationCreation[language]}</p>
      <p>{`${GreekSymbol.Phi} ${LogicalSymbol.Implication} ( ${GreekSymbol.Psi} ${LogicalSymbol.Implication} ${GreekSymbol.Phi} )`}</p>
      <Form
        onSubmit={onSubmit}
        initialValues={implicationCreationInitialValues}
        inputs={inputs}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </>
  );
}

export default ImplicationCreationForm;
