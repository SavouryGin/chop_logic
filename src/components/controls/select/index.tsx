import Label from '../label';
import React, { useContext, useState } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { FormContext } from 'components/controls/form';
import { SelectProps } from 'types';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

function Select({
  options,
  className,
  inputId,
  id,
  isDisabled,
  label,
  isRequired,
  defaultOption,
  formId,
  onChange,
  ...rest
}: SelectProps): React.ReactElement {
  const formContext = useContext(FormContext);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [selectedValue, setSelectedValue] = useState(defaultOption);

  const { onChangeInput } = formContext;
  const calculatedId = id || `select_id_${inputId}`;
  const labelText = label || inputTexts[inputId].label[language];
  const wrapperClassNames = formatClass(['select', className, { select_disabled: !!isDisabled, select_dark: isDarkMode }]);
  const selectClassNames = formatClass(['select__field', { select__field_dark: isDarkMode }]);

  const optionList = options.map((item) => {
    const key = crypto.randomUUID();

    return (
      <option value={item.value} key={key}>
        {item.option[language]}
      </option>
    );
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    const selected = options.filter((item) => item.value.toString() === selectedOption);
    setSelectedValue(selected[0] || undefined);
    if (isSoundEnabled) {
      soundPlayer.switch.play();
    }
    if (onChangeInput) {
      onChangeInput(e);
    }
    if (onChange) {
      onChange();
    }
  };

  return (
    <div className={wrapperClassNames}>
      <select
        id={calculatedId}
        value={selectedValue?.value}
        form={formId}
        disabled={isDisabled}
        required={isRequired}
        className={selectClassNames}
        onChange={onSelectChange}
        {...rest}
      >
        {optionList}
      </select>
      <Label id={calculatedId} text={labelText} isRequired={isRequired} isDarkMode={isDarkMode} className={'select__label'} />
    </div>
  );
}

export default Select;
