import Label from '../label';
import React, { useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, InputHandlersProps, SelectEntity } from 'types';
import { FormContext } from 'components/form';
import { Guid } from 'guid-typescript';
import { InputID } from 'enums';
import { inputTexts } from 'assets/texts';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';

import './styles.scss';

export type SelectProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    options: SelectEntity[];
    inputId: InputID;
    label?: string;
    defaultOption?: SelectEntity;
    isRequired?: boolean;
    isDisabled?: boolean;
    formId?: string;
  };

function Select({ options, className, inputId, name, defaultOption, onChange, ...rest }: SelectProps): React.ReactElement {
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const id = rest.id || `select_id_${inputId}`;
  const labelText = rest.label || inputTexts[inputId].label[language];
  const wrapperClassNames = formatClassName(['select', className, { select_disabled: !!rest.isDisabled, select_dark: isDarkMode }]);
  const selectClassNames = formatClassName(['select__field', { select__field_dark: isDarkMode }]);
  const [selectedValue, setSelectedValue] = useState(defaultOption);

  const optionList = options.map((item) => {
    const key = Guid.create().toString();

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
        name={name}
        id={id}
        value={selectedValue?.value}
        form={rest.formId}
        disabled={rest.isDisabled}
        required={rest.isRequired}
        className={selectClassNames}
        onChange={onSelectChange}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
      >
        {optionList}
      </select>
      <Label id={id} text={labelText} isRequired={rest.isRequired} isDarkMode={isDarkMode} className={'select__label'} />
    </div>
  );
}

export default Select;
