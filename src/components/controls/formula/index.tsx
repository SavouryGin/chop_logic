import React, { memo, useMemo } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps, PropositionalSymbol } from 'types';
import { CommonSymbolHexCode } from 'enums';
import { getPreformattedSymbol } from 'utils/formatters/get-preformatted-symbol';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

type FormulaProps = CommonProps & {
  content: PropositionalSymbol[];
  level?: number;
};

function Formula({ content, className, level, id }: FormulaProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const classNames = formatClass(['formula', className, { formula_dark: isDarkMode }]);
  const indentationClass = formatClass(['formula__indentation', { formula__indentation_dark: isDarkMode }]);

  const formula = useMemo(
    () => (
      <pre id={id} className={classNames} role='math'>
        {content.map((item, index) => getPreformattedSymbol(item, index))}
      </pre>
    ),
    [content.length, isDarkMode],
  );

  const indentation = useMemo(
    () =>
      [...Array(level)].map((_i: any, index: number) => (
        <div className={indentationClass} key={`indentation-${index}`}>{`${CommonSymbolHexCode.Space}`}</div>
      )),
    [level, isDarkMode],
  );

  return level ? (
    <div className='formula__wrapper'>
      {indentation}
      {formula}
    </div>
  ) : (
    formula
  );
}

export default memo(Formula);
