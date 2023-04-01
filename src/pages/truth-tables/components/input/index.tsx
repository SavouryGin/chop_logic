import Form from 'components/controls/form';
import FormulaPreview from 'components/controls/formula-preview';
import React, { useState } from 'react';
import TextInput from 'components/controls/text-input';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { usePropositionalFormulaPreview } from 'hooks';

const TruthTablesInput = (): React.ReactElement => {
  // const dispatch = useAppDispatch();
  const tableInput = { input: '' };
  const [formValue, setFormValue] = useState(tableInput);

  const preview = usePropositionalFormulaPreview(formValue.input);
  const hasError = !Array.isArray(preview);
  const isFormInvalid = hasError || !formValue.input;
  const formContent = (
    <>
      <TextInput name='input' inputId={InputID.Premise} isRequired />
      <FormulaPreview preview={preview} />
    </>
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof tableInput);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue);
  };

  return (
    <div className='truth-tables-input'>
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

export default TruthTablesInput;
