import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(actions.generateTruthTable(formValue));
  };

  return (
    <div className='truth-tables_form'>
      <Form
        onSubmit={onSubmit}
        initialValues={tableInput}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default TruthTableForm;