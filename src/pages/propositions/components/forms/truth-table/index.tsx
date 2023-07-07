import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { ttActions as actions } from 'store/propositions/truth-tables';
import { useAppDispatch, usePropositionalFormulaPreview } from 'hooks';

const TruthTableForm = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const tableInput = { input: '' };
  const [formValue, setFormValue] = useState(tableInput);

  const preview = usePropositionalFormulaPreview(formValue.input);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.input;
  const formContent = (
    <>
      <TextInput name='input' inputId={InputID.Premise} className='truth-table-form__input' isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof tableInput);

  const onSubmit = () => {
    dispatch(actions.generateTruthTable(formValue));
  };

  const onReset = () => {
    dispatch(actions.resetState());
  };

  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      initialValues={tableInput}
      inputs={formContent}
      passValues={takeValues}
      isSubmitDisabled={isFormInvalid}
      className='truth-tables_form'
    />
  );
};

export default TruthTableForm;
