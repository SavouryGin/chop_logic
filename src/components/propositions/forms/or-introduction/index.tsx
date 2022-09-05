import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { closeNaturalProofsPopup } from 'pages/propositions/helpers';
// import { propositionsNPActions as action } from 'store/propositions/natural-proofs/slice';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const OrIntroductionForm = ({ mode }: { mode: 'natural' | 'direct' | 'assumption' }) => {
  const dispatch = useAppDispatch();
  const orIntroInitialValue = { orValue: '' };
  const [formValue, setFormValue] = useState(orIntroInitialValue);

  const preview = usePropositionalFormulaPreview(formValue.orValue);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.orValue;
  const formContent = (
    <>
      <TextInput name='orValue' inputId={InputID.Premise} className='or-introduction-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof orIntroInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue);
    closeNaturalProofsPopup(dispatch, 'isAssumptionOpened');
  };

  return (
    <div className='or-introduction-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={orIntroInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(OrIntroductionForm);
