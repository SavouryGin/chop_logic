import FileInput from 'components/controls/file-input';
import Form from 'components/controls/form';
import React, { memo, useState } from 'react';
import { ButtonID, InputID } from 'enums';
import { FormValues } from 'types';
// import { useAppDispatch } from 'hooks';
import { FileAcceptType } from 'enums/file-accept-type';
import './styles.scss';

const InputFileForm = ({ mode }: { mode: 'natural' | 'direct' }) => {
  // const dispatch = useAppDispatch();
  const fileNameInitialValue = { file: null };
  const [userFile, setUserFile] = useState(fileNameInitialValue);

  const formContent = (
    <FileInput
      name='file'
      inputId={InputID.FileInput}
      label='XML File:'
      className='file-name-form__input'
      isRequired
      accept={FileAcceptType.XML}
    />
  );

  const takeValues = (value: FormValues) => setUserFile(value as typeof fileNameInitialValue);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('File', userFile);
    if (mode === 'direct') {
      console.log('Direct');
    }

    if (mode === 'natural') {
      console.log('Natural');
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
      />
    </div>
  );
};

export default memo(InputFileForm);
