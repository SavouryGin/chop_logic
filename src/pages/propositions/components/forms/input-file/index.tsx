import Button from 'components/controls/button';
import FileInput from 'components/controls/file-input';
import React, { memo, useState } from 'react';
import { ButtonID, Icon, InputID } from 'enums';
import { FileAcceptType } from 'enums/file-accept-type';
import { soundPlayer } from 'helpers/sounds';
import './styles.scss';

const InputFileForm = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement => {
  const [userFile, setUserFile] = useState<File>();

  const takeFile = (value: File) => setUserFile(value);

  const onSubmit = () => {
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
      <FileInput
        name='file'
        inputId={InputID.FileInput}
        label='XML File:'
        className='file-name-form__input'
        isRequired
        accept={FileAcceptType.XML}
        passFile={takeFile}
      />
      <Button
        buttonId={ButtonID.Apply}
        type='submit'
        icon={Icon.Default}
        sound={soundPlayer.slideClick}
        size='large'
        onClick={onSubmit}
        isDisabled={!userFile}
      />
    </div>
  );
};

export default memo(InputFileForm);
