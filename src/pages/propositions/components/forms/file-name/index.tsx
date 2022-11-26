import Form from 'components/controls/form';
import React, { memo, useMemo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import regularExpressions from 'helpers/regular-expressions';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
import { propositionsDPActions } from 'store/propositions/direct-proofs/slice';
import { propositionsNPActions } from 'store/propositions/natural-proofs/slice';
import { useAppDispatch } from 'hooks';
import './styles.scss';

const FileNameForm = ({ mode }: { mode: 'natural' | 'direct' }) => {
  const dispatch = useAppDispatch();
  const fileNameInitialValue = { fileName: '' };
  const [formValue, setFormValue] = useState(fileNameInitialValue);

  const isFormInvalid = useMemo(() => {
    return !formValue.fileName.match(regularExpressions.fileName);
  }, [formValue]);

  const formContent = <TextInput name='fileName' inputId={InputID.FileName} className='file-name-form__input' isRequired maxLength={100} />;

  const takeValues = (values: FormValues) => setFormValue(values as typeof fileNameInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'direct') {
      dispatch(propositionsDPActions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
      dispatch(propositionsDPActions.exportToXML(formValue.fileName));
    }

    if (mode === 'natural') {
      dispatch(propositionsNPActions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
    }
  };

  return (
    <div className='file-name-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={fileNameInitialValue}
        inputs={formContent}
        submitButtonId={ButtonID.Apply}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(FileNameForm);
