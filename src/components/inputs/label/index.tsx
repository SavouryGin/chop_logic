import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';

import './styles.scss';

export type LabelProps = ComponentProps & {
  text: string;
  inputId: string;
  isRequired?: boolean;
  isDarkMode?: boolean;
};

function Label(props: LabelProps): React.ReactElement {
  const { text, isRequired, isDarkMode, className, inputId } = props;
  const labelClassNames = formatClassName(['label', className, { label_required: !!isRequired, label_dark: !!isDarkMode }]);

  return (
    <label htmlFor={inputId} className={labelClassNames}>
      <span className='label__text'>{text}</span>
      {isRequired && (
        <abbr className='label_asterisk' title='required'>
          *
        </abbr>
      )}
    </label>
  );
}

export default Label;
