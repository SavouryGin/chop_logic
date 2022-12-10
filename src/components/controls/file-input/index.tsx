import Label from '../label';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { FileInputProps } from 'types';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const FileInput = ({
  inputId,
  isDisabled,
  isReadOnly,
  isRequired,
  isInvalid,
  className,
  id,
  label,
  placeholder,
}: FileInputProps): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
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
  const fieldClassNames = formatClass(['file-input__field', { 'file-input__field_dark': isDarkMode }]);
  const calculatedId = id || `text_input_id_${inputId}`;
  const labelText = label || inputTexts[inputId].label[language];
  const placeholderText = placeholder || inputTexts[inputId]?.placeholder?.[language];

  return (
    <div className={inputClassNames}>
      <Label text={labelText} id={calculatedId} isRequired={isRequired} isDarkMode={isDarkMode} />
      <input
        type='file'
        id={calculatedId}
        placeholder={placeholderText}
        className={fieldClassNames}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default FileInput;
