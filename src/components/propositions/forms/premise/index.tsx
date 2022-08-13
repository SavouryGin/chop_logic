import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDirectProofsActions as actions } from 'store/propositions/direct-proofs/slice';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const PremiseForm = () => {
  const dispatch = useAppDispatch();
  const premiseInitialValue = { premise: '' };
  const [formValue, setFormValue] = useState(premiseInitialValue);

  const preview = usePropositionalFormulaPreview(formValue.premise);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.premise;
  const formContent = (
    <>
      <TextInput name='premise' inputId={InputID.Premise} className='premise-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof premiseInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.addPromise(formValue.premise));
    closePropositionsPopup(dispatch, 'isPremiseOpened');
  };

  return (
    <div className='premise-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={premiseInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(PremiseForm);
