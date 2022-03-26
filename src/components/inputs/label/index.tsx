import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type LabelProps = ComponentProps & {
  text: string;
  id: string;
  isRequired?: boolean;
  isDarkMode?: boolean;
};

function Label(props: LabelProps): React.ReactElement {
  const { text, isRequired, isDarkMode, className, id } = props;
  const labelClassNames = formatClassName(['label', className, { label_required: !!isRequired, label_dark: !!isDarkMode }]);
  const requiredClassNames = formatClassName(['label__asterisk', Icon.Required, { label__asterisk_dark: !!isDarkMode }]);

  return (
    <label htmlFor={id} className={labelClassNames} data-testid='label-test-id'>
      <span className='label__text'>{text}</span>
      {isRequired && <abbr className={requiredClassNames} title='required'></abbr>}
    </label>
  );
}

export default Label;
