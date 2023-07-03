import Button from 'components/controls/button';
import FileInput from 'components/controls/file-input';
import React, { memo, useState } from 'react';
import Spinner from 'components/spinner';
import { ButtonID, Icon, InputID } from 'enums';
import { FileAcceptType } from 'enums/file-accept-type';
import { dpActions } from 'store/propositions/direct-proofs';
import { dpSelectors } from 'store/propositions/direct-proofs/selectors';
import { npActions } from 'store/propositions/natural-proofs';
import { npSelectors } from 'store/propositions/natural-proofs/selectors';
import { soundPlayer } from 'utils/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const InputFileForm = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement => {
  const [userFile, setUserFile] = useState<File>();
  const dispatch = useAppDispatch();
  const isLoadingNP = useAppSelector(npSelectors.isLoading);
  const isLoadingDP = useAppSelector(dpSelectors.isLoading);
  const isLoading = isLoadingNP || isLoadingDP;

  const takeFile = (value: File) => setUserFile(value);

  const onSubmit = () => {
    if (mode === 'direct' && userFile) {
      dispatch(dpActions.importFromXML({ file: userFile }));
    }

    if (mode === 'natural' && userFile) {
      dispatch(npActions.importFromXML({ file: userFile }));
    }
  };

  return (
    <div className='input-file-form'>
      {isLoading && <Spinner />}
      <FileInput
        name='file'
        inputId={InputID.FileInput}
        label='XML File:'
        className='input-file-form__input'
        isRequired
        accept={FileAcceptType.XML}
        passFile={takeFile}
      />
      <Button
        buttonId={ButtonID.Apply}
        type='submit'
        icon={Icon.Default}
        sound={soundPlayer.slideClick}
        view='large'
        onClick={onSubmit}
        isDisabled={!userFile}
      />
    </div>
  );
};

export default memo(InputFileForm);
