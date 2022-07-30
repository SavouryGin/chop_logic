import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { memo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { closePropositionsPopup } from 'pages/propositions/elements/direct-proofs-editor/helpers';
import { propositionsActions } from 'store/propositions/slice';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';
import './styles.scss';

const ReplacerForm = () => {
  const dispatch = useAppDispatch();
  const replacerInitialValue = { symbol: '' };
  const [formValue, setFormValue] = useState(replacerInitialValue);

  const preview = usePropositionalFormulaPreview(formValue.symbol);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.symbol;
  const formContent = (
    <>
      <TextInput name='symbol' inputId={InputID.Variable} className='replacer-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof replacerInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(propositionsActions.addPromise(formValue.symbol));
    closePropositionsPopup(dispatch, 'isPremiseOpened');
  };

  return (
    <div className='replacer-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={replacerInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.ApplySettings}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(ReplacerForm);
