import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, PropositionalSymbol } from 'types';
import { getPropositionalSymbolClassName } from './helpers';

import './styles.scss';

export type FormulaProps = ComponentProps & {
  content: PropositionalSymbol[];
};

function Formula({ content, className }: FormulaProps): React.ReactElement {
  const sidebarClassNames = formatClassName(['formula', className]);

  const formula = content.map((item, index) => {
    const symbol = item.type === 'operator' ? ` ${item.representation} ` : item.representation;
    return (
      <span key={`symbol-${index}`} className={getPropositionalSymbolClassName(item)}>
        {symbol}
      </span>
    );
  });

  return <p className={sidebarClassNames}>{formula}</p>;
}

export default Formula;
