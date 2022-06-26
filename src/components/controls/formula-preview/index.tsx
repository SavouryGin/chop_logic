import Formula from 'components/controls/formula';
import Label from 'components/controls/label';
import React, { useEffect, useState } from 'react';
import converter from 'logic/propositions/converter';
import formatClassName from 'helpers/formatters/format-class-name';
import { FormulaPreviewProps, PropositionalExpression } from 'types';
import { InputID } from 'enums';
import { PropositionalError } from 'errors/propositional-error';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const FormulaPreview = ({ text, className, passError }: FormulaPreviewProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [error, setError] = useState<PropositionalError | null>(null);
  const [expression, setExpression] = useState<PropositionalExpression>([]);

  const classNames = formatClassName(['formula-preview', className, { 'formula-preview_dark': isDarkMode }]);
  const errorClassNames = formatClassName(['formula-preview__error', { 'formula-preview__error_dark': isDarkMode }]);
  const labelText = inputTexts[InputID.Preview].label[language];

  useEffect(() => {
    if (text.length) {
      try {
        const convertedInput = converter.convertStringToExpression(text);
        converter.convertExpressionToFormula(convertedInput);
        setError(null);
        setExpression(convertedInput);
      } catch (err: unknown) {
        setError(err as PropositionalError);
      }
    } else {
      setExpression([]);
      setError(null);
    }
  }, [text]);

  useEffect(() => {
    if (passError) {
      passError(error);
    }
  }, [error]);

  return (
    <div className={classNames}>
      <Label id='formula-preview' text={labelText} isDarkMode={isDarkMode} />
      {error ? (
        <p className={errorClassNames}>{error.displayedErrorMessage[language]}</p>
      ) : (
        <Formula id='formula-preview' content={expression} className='formula-preview__formula' />
      )}
    </div>
  );
};

export default FormulaPreview;
