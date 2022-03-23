import React, { useContext, useState } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, InputHandlersProps, SelectEntity } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import { soundPlayer } from 'helpers/sounds';
import { FormContext } from 'components/form';
import Label from '../label';

import './styles.scss';

export type SelectProps = ComponentProps &
  InputHandlersProps & {
    name: string;
    label: string;
    options: SelectEntity[];
    defaultOption?: SelectEntity;
    isRequired?: boolean;
    isDisabled?: boolean;
    formId?: string;
  };

function Select(props: SelectProps): React.ReactElement {
  const { options, className, id, name, label, defaultOption, onChange } = props;
  const inputId = id || Guid.create().toString();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const wrapperClassNames = formatClassName(['select', className, { select_disabled: !!props.isDisabled, select_dark: isDarkMode }]);
  const selectClassNames = formatClassName(['select__field', { select__field_dark: isDarkMode }]);
  const [selectedValue, setSelectedValue] = useState(defaultOption);
  const formContext = useContext(FormContext);
  const { onChangeInput } = formContext;

  const optionList = options.map((item) => {
    const key = Guid.create().toString();
    return (
      <option value={item.value} key={key}>
        {item.option}
      </option>
    );
  });

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeInput(e);
    const selectedOption = e.target.value;
    const selected = options.filter((item) => item.value.toString() === selectedOption);
    setSelectedValue(selected[0] || undefined);
    if (isSoundEnabled) soundPlayer.switch.play();
    if (onChange) onChange(e);
  };

  return (
    <div className={wrapperClassNames}>
      <select
        name={name}
        id={inputId}
        value={selectedValue?.value}
        form={props.formId}
        disabled={props.isDisabled}
        required={props.isRequired}
        className={selectClassNames}
        onChange={onSelectChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      >
        {optionList}
      </select>
      <Label inputId={inputId} text={label} isRequired={props.isRequired} isDarkMode={isDarkMode} className={'select__label'} />
    </div>
  );
}

export default Select;
