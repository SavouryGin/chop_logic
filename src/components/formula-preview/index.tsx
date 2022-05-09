import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

import './styles.scss';
import PropositionsParser from 'helpers/parsers/propositions-parser';
import Formula from 'components/formula';

export type FormulaPreviewProps = ComponentProps & {
  text: string;
};

function FormulaPreview({ text, className }: FormulaPreviewProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const sidebarClassNames = formatClassName(['formula-preview', className, { 'formula-preview_dark': isDarkMode }]);

  const parsedText = PropositionsParser.parsePropositionalFormula(text);

  return (
    <p className={sidebarClassNames}>
      <Formula content={parsedText} />
    </p>
  );
}

export default FormulaPreview;
