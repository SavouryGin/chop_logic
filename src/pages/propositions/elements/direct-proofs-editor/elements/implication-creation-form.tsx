import React, { useState } from 'react';
import Form from 'components/form';
import { FormValues } from 'types';
import { ButtonID, InputID } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch } from 'hooks';
import TextInput from 'components/inputs/text-input';

function ImplicationCreationForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const implicationCreationInitialValues = { firstVariable: '', secondVariable: '' };
  const [formValue, setFormValue] = useState(implicationCreationInitialValues);
  const isDisabled = formValue.firstVariable.length === 0 || formValue.secondVariable.length === 0;

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
    // Dispatch the premise to the store
    //
    // Close the modal window
    closePopup();
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof implicationCreationInitialValues);

  const content = (
    <>
      <TextInput name='firstVariable' inputId={InputID.FirstMetaVariable} /> <br></br>{' '}
      <TextInput name='secondVariable' inputId={InputID.SecondMetaVariable} />
    </>
  );

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={implicationCreationInitialValues}
        inputs={content}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isDisabled}
      />
    </>
  );
}

export default ImplicationCreationForm;
