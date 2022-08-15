import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { closeDirectProofsPopup, closeNaturalProofsPopup } from 'pages/propositions/helpers';
import { propositionsDirectProofsActions } from 'store/propositions/direct-proofs/slice';
import { propositionsNaturalProofsActions } from 'store/propositions/natural-proofs/slice';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const PremiseForm = ({ mode }: { mode: 'natural' | 'direct' | 'assumption' }) => {
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
    if (mode === 'direct') {
      dispatch(propositionsDirectProofsActions.addPremise(formValue.premise));
      closeDirectProofsPopup(dispatch, 'isPremiseOpened');
    }

    if (mode === 'natural') {
      dispatch(propositionsNaturalProofsActions.addPremise(formValue.premise));
      closeNaturalProofsPopup(dispatch, 'isPremiseOpened');
    }

    if (mode === 'assumption') {
      dispatch(propositionsNaturalProofsActions.addAssumption(formValue.premise));
      closeNaturalProofsPopup(dispatch, 'isAssumptionOpened');
    }
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
