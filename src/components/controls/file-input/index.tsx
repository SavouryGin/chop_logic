import Label from '../label';
import React, { useEffect, useState } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { FileInputProps } from 'types';
import { inputTexts } from 'assets/texts';
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
  passFile,
}: FileInputProps): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const fieldClassNames = formatClass(['file-input__field', { 'file-input__field_dark': isDarkMode }]);
  const calculatedId = id || `text_input_id_${inputId}`;
  const labelText = label || inputTexts[inputId].label[language];
  const placeholderText = placeholder || inputTexts[inputId]?.placeholder?.[language];
  const [userFile, setUserFile] = useState<File | null>(null);
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

  const handleFile = (e: any) => {
    const [file] = e.target.files;
    if (file && file.name) {
      setUserFile(file);
    }
  };

  useEffect(() => {
    if (passFile && userFile) {
      passFile(userFile);
    }
  }, [userFile]);

  return (
    <div className={inputClassNames}>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} />
      <input
        type='file'
        role='button'
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
