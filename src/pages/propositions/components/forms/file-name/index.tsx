import Form from 'components/controls/form';
import React, { memo, useMemo, useState } from 'react';
import TextInput from 'components/controls/text-input';
import regularExpressions from 'helpers/regular-expressions';
import { FormValues } from 'types';
import { InputID } from 'enums';
import { dpActions } from 'store/propositions/direct-proofs';
import { npActions } from 'store/propositions/natural-proofs';
import { useAppDispatch } from 'hooks';
import './styles.scss';

const FileNameForm = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const initialName = mode === 'direct' ? 'MyDirectProof' : 'MyNaturalProof';
  const fileNameInitialValue = { fileName: initialName };
  const [formValue, setFormValue] = useState(fileNameInitialValue);

  const isFormInvalid = useMemo(() => {
    return !formValue.fileName.match(regularExpressions.fileName);
  }, [formValue.fileName]);

  const formContent = (
    <TextInput
      name='fileName'
      inputId={InputID.FileName}
      className='file-name-form__input'
      isRequired
      maxLength={100}
      defaultValue={initialName}
    />
  );

  const takeValues = (values: FormValues) => setFormValue(values as typeof fileNameInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === 'direct') {
      dispatch(dpActions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
      dispatch(dpActions.exportToXML(formValue.fileName));
    }

    if (mode === 'natural') {
      dispatch(npActions.setUpFlag({ flag: 'isNameInputPopupVisible', value: false }));
      dispatch(npActions.exportToXML(formValue.fileName));
    }
  };

  return (
    <div className='file-name-form'>
      <Form
        onSubmit={onSubmit}
        initialValues={fileNameInitialValue}
        inputs={formContent}
        passValues={takeValues}
        isSubmitDisabled={isFormInvalid}
      />
    </div>
  );
};

export default memo(FileNameForm);
