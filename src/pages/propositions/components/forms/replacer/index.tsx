import Form from 'components/controls/form';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDPActions } from 'store/propositions/direct-proofs';
import { propositionsNPActions } from 'store/propositions/natural-proofs';
import { useAppDispatch, useIsReplacePossible } from 'hooks';
import './styles.scss';

const ReplacerForm = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const replacerInitialValue = { newVariable: '', oldVariable: '' };
  const [formValues, setFormValues] = useState(replacerInitialValue);
  const isReplacePossible = useIsReplacePossible(formValues.oldVariable, mode);
  const isReplaceDisabled = !isReplacePossible || formValues.newVariable.length !== 1;

  const formContent = (
    <>
      <TextInput name='oldVariable' inputId={InputID.OldVariable} className='replacer-form__input' isRequired />
      <TextInput name='newVariable' inputId={InputID.NewVariable} className='replacer-form__input' isRequired />
    </>
  );

  const takeValues = (values: FormValues) => setFormValues(values as typeof replacerInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'direct') {
      dispatch(propositionsDPActions.replacePropositionalVariable(formValues));
      dispatch(propositionsDPActions.setUpFlag({ flag: 'isReplacerFormOpened', value: false }));
    }

    if (mode === 'natural') {
      dispatch(propositionsNPActions.replacePropositionalVariable(formValues));
      dispatch(propositionsNPActions.setUpFlag({ flag: 'isReplacerFormOpened', value: false }));
    }
  };

  return (
    <div className='replacer-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={replacerInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isReplaceDisabled}
      />
    </div>
  );
};

export default memo(ReplacerForm);
