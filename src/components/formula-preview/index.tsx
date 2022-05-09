import React from 'react';
import Formula from 'components/formula';
import Label from 'components/inputs/label';
import PropositionsParser from 'helpers/parsers/propositions-parser';
import formatClassName from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import { ComponentProps } from 'types';
import { inputTexts } from 'assets/texts';
import { InputID } from 'enums';

import './styles.scss';

export type FormulaPreviewProps = ComponentProps & {
  text: string;
};

function FormulaPreview({ text, className }: FormulaPreviewProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const classNames = formatClassName(['formula-preview', className, { 'formula-preview_dark': isDarkMode }]);
  const labelText = inputTexts[InputID.Preview].label[language];

  const parsedText = PropositionsParser.parsePropositionalFormula(text);

  return (
    <div className={classNames}>
      <Label text={labelText} id={'formula-preview'} isDarkMode={isDarkMode} />
      <Formula content={parsedText} />
    </div>
  );
}

export default FormulaPreview;
