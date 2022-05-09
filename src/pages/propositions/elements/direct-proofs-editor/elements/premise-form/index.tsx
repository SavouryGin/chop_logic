import React, { useState } from 'react';
import Form from 'components/form';
import TextInput from 'components/inputs/text-input';
import FormulaPreview from 'components/formula-preview';
import { FormValues } from 'types';
import { ButtonID, InputID } from 'enums';
import { propositionsActions } from 'store/propositions/slice';
import { useAppDispatch } from 'hooks';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';

import './styles.scss';

function PremiseForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const premiseInitialValue = { premise: '' };
  const [formValue, setFormValue] = useState(premiseInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Dispatch the premise to the store
    dispatch(propositionsActions.addPromise(formValue.premise));
    // Close the modal window
    closePropositionsPopup(dispatch, 'isPremiseOpened');
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof premiseInitialValue);

  const inputs = (
    <>
      <TextInput name='premise' inputId={InputID.Premise} className='premise-form__input' isRequired />
      <FormulaPreview text={formValue.premise} />
    </>
  );

  return (
    <div className='premise-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={premiseInitialValue}
        inputs={inputs}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={formValue.premise.length === 0}
      />
    </div>
  );
}

export default PremiseForm;
