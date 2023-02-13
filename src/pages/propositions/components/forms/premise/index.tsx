import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDPActions } from 'store/propositions/direct-proofs';
import { propositionsNPActions } from 'store/propositions/natural-proofs';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const PremiseForm = ({ mode }: { mode: 'natural' | 'direct' | 'assumption' }): React.ReactElement => {
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
      dispatch(propositionsDPActions.addPremise(formValue.premise));
      dispatch(propositionsDPActions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
    }

    if (mode === 'natural') {
      dispatch(propositionsNPActions.addPremise(formValue.premise));
      dispatch(propositionsNPActions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
    }

    if (mode === 'assumption') {
      dispatch(propositionsNPActions.addAssumption(formValue.premise));
      dispatch(propositionsNPActions.setUpFlag({ flag: 'isAssumptionOpened', value: false }));
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
