import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps, PropositionalSymbol } from 'types';
import { getPreformattedSymbol } from './helpers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

import './styles.scss';

export type FormulaProps = ComponentProps & {
  content: PropositionalSymbol[];
};

function Formula({ content, className }: FormulaProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const classNames = formatClassName(['formula', className, { formula_dark: isDarkMode }]);

  const formula = content.map((item, index) => getPreformattedSymbol(item, index));

  return <pre className={classNames}>{formula}</pre>;
}

export default Formula;
