import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { FormulaProps } from 'types';
import { getPreformattedSymbol } from './helpers';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

function Formula({ content, className, level }: FormulaProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const classNames = formatClassName(['formula', className, { formula_dark: isDarkMode }]);

  const indentation = level ? <div>{'*'.repeat(level)}</div> : null;

  const formula = <pre className={classNames}>{content.map((item, index) => getPreformattedSymbol(item, index))}</pre>;

  return indentation ? (
    <div className='formula__'>
      {indentation}
      {formula}
    </div>
  ) : (
    formula
  );
}

export default Formula;
