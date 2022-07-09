import React, { memo } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { LabelProps } from 'types';
import './styles.scss';

function Label({ text, isRequired, isDarkMode, className, id }: LabelProps): React.ReactElement {
  const labelClassNames = formatClassName(['label', className, { label_required: !!isRequired, label_dark: !!isDarkMode }]);
  const requiredClassNames = formatClassName(['label__asterisk', Icon.Required, { label__asterisk_dark: !!isDarkMode }]);

  return (
    <label htmlFor={id} className={labelClassNames} data-testid='label-test-id'>
      <span className='label__text'>{text || ''}</span>
      {isRequired && <abbr className={requiredClassNames} title='required'></abbr>}
    </label>
  );
}

export default memo(Label);
