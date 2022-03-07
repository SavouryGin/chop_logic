import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Guid } from 'guid-typescript';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type SelectProps = ComponentProps & {
  name: string;
  label: string;
  options: string[] | { option: string; value: string | number }[];
  isRequired?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  size?: number;
  formId?: string;
};

function Select(props: SelectProps): React.ReactElement {
  const { options, isRequired, className, id, name } = props;
  const inputId = id || Guid.create().toString();
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const wrapperClassNames = formatClassName(['select', className, { select_required: !!isRequired, select_dark: isDarkMode }]);
  const selectClassNames = formatClassName(['select__field', { select__field_dark: isDarkMode }]);

  const optionList = options.map((item) => {
    const key = Guid.create().toString();
    if (typeof item === 'string') {
      return (
        <option value={item} key={key}>
          {item}
        </option>
      );
    } else {
      return (
        <option value={item.value} key={key}>
          {item.option}
        </option>
      );
    }
  });

  return (
    <div className={wrapperClassNames}>
      <select
        name={name}
        id={inputId}
        size={props.size || 0}
        form={props.formId}
        disabled={props.isDisabled}
        required={props.isRequired}
        className={selectClassNames}
      >
        {optionList}
      </select>
    </div>
  );
}

export default Select;
