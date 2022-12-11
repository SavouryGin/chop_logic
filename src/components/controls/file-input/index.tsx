import Label from '../label';
import React, { useContext, useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { FileInputProps } from 'types';
import { FormContext } from '../form';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const FileInput = ({
  inputId,
  isDisabled,
  isRequired,
  isInvalid,
  className,
  id,
  label,
  placeholder,
  accept,
}: FileInputProps): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const fieldClassNames = formatClass(['file-input__field', { 'file-input__field_dark': isDarkMode }]);
  const calculatedId = id || `text_input_id_${inputId}`;
  const labelText = label || inputTexts[inputId].label[language];
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const placeholderText = placeholder || inputTexts[inputId]?.placeholder?.[language];
  const inputClassNames = formatClass([
    className,
    'file-input',
    {
      'file-input_dark': isDarkMode,
      'file-input_invalid': !!isInvalid,
      'file-input_invalid_dark': !!isInvalid && isDarkMode,
      'file-input_disabled': !!isDisabled,
    },
  ]);

  const [userFile, setUserFile] = useState<File | null>(null);

  const handleFile = (e: any) => {
    const [file] = e.target.files;
    if (file && file.name) {
      setUserFile(file);
    }

    if (file && file.name && onChangeInput) {
      onChangeInput(e);
    }
  };
  console.log(userFile);

  return (
    <div className={inputClassNames}>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} />
      <input
        type='file'
        id={calculatedId}
        placeholder={placeholderText}
        className={fieldClassNames}
        disabled={isDisabled}
        accept={accept}
        onChange={handleFile}
      />
    </div>
  );
};

export default FileInput;
