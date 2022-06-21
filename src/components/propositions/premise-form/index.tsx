import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { propositionsActions } from 'store/propositions/slice';
import { useAppDispatch } from 'hooks';
import './styles.scss';

function PremiseForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const premiseInitialValue = { premise: '' };
  const [formValue, setFormValue] = useState(premiseInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(propositionsActions.addPromise(formValue.premise));
    closePropositionsPopup(dispatch, 'isPremiseOpened');
  };

  const takeValues = (values: FormValues) => setFormValue(values as typeof premiseInitialValue);

  const content = (
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
        inputs={content}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={formValue.premise.length === 0}
      />
    </div>
  );
}

export default PremiseForm;
