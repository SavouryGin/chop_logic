import React, { memo } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import './styles.scss';

type LabelProps = CommonProps & {
  id?: string;
  text?: string;
  isRequired?: boolean;
  isDarkMode?: boolean;
};

function Label({ text, isRequired, isDarkMode, className, id }: LabelProps): React.ReactElement {
  const labelClassNames = formatClass(['label', className, { label_required: !!isRequired, label_dark: !!isDarkMode }]);
  const requiredClassNames = formatClass(['label__asterisk', Icon.Required, { label__asterisk_dark: !!isDarkMode }]);

  return (
    <label htmlFor={id} className={labelClassNames} data-testid='label-test-id'>
      <span className='label__text'>{text || ''}</span>
      {isRequired && <abbr className={requiredClassNames} title='required'></abbr>}
    </label>
  );
}

export default memo(Label);
