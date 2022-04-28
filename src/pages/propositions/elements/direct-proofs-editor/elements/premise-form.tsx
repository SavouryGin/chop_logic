import React, { useState } from 'react';
import Form from 'components/form';
import { FormValues } from 'types';
import { ButtonID, InputID } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { settingsActions } from 'store/settings/slice';
import { useAppDispatch } from 'hooks';
import TextInput from 'components/inputs/text-input';

function PremiseForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const premiseInitialValue = { premise: '' };
  const [formValue, setFormValue] = useState(premiseInitialValue);

  const closePopup = () => {
    dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    // wait for closing CSS animation
    setTimeout(() => {
      dispatch(propositionsActions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
      dispatch(settingsActions.toggleFlag('isModalWindowClosingAnimationActive'));
    }, 900);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the premise to the store
    dispatch(propositionsActions.addPromise(formValue.premise));
    // Close the modal window
    closePopup();
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof premiseInitialValue);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={premiseInitialValue}
        inputs={<TextInput name='premise' inputId={InputID.Premise} />}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={formValue.premise.length === 0}
      />
    </>
  );
}

export default PremiseForm;
