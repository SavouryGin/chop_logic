import Form from 'components/controls/form';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDirectProofsActions as actions } from 'store/propositions/direct-proofs/slice';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { useAppDispatch, useReplacePossibleStatus } from 'hooks';
import './styles.scss';

const ReplacerForm = () => {
  const dispatch = useAppDispatch();
  const replacerInitialValue = { newVariable: '', oldVariable: '' };
  const [formValues, setFormValues] = useState(replacerInitialValue);
  const isReplacePossible = useReplacePossibleStatus(formValues.oldVariable);
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
    dispatch(actions.replacePropositionalVariable(formValues));
    closePropositionsPopup(dispatch, 'isReplacerFormOpened');
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
