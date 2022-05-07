import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, PropositionalSymbol } from 'types';

import './styles.scss';

export type FormulaProps = ComponentProps & {
  content: PropositionalSymbol[];
};

function Formula({ content, className }: FormulaProps): React.ReactElement {
  const sidebarClassNames = formatClassName(['formula', className]);

  return (
    <h1 className={sidebarClassNames}>
      {content.map((item, index) => {
        return <span key={index}>{item.representation}</span>;
      })}
    </h1>
  );
}

export default Formula;
