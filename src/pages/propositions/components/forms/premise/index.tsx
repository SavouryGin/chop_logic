import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { dpActions } from 'store/propositions/direct-proofs';
import { npActions } from 'store/propositions/natural-proofs';
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
      dispatch(dpActions.addPremise(formValue.premise));
      dispatch(dpActions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
    }

    if (mode === 'natural') {
      dispatch(npActions.addPremise(formValue.premise));
      dispatch(npActions.setUpFlag({ flag: 'isPremiseOpened', value: false }));
    }

    if (mode === 'assumption') {
      dispatch(npActions.addAssumption(formValue.premise));
      dispatch(npActions.setUpFlag({ flag: 'isAssumptionOpened', value: false }));
    }
  };

  return (
    <div className='premise-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={premiseInitialValue}
        inputs={formContent}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(PremiseForm);
