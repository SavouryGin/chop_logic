import Formula from 'components/controls/formula';
import Label from 'components/controls/label';
import React, { memo } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { FormulaPreviewProps } from 'types';
import { InputID } from 'enums';
import { inputTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const FormulaPreview = ({ preview, className }: FormulaPreviewProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const classNames = formatClassName(['formula-preview', className, { 'formula-preview_dark': isDarkMode }]);
  const errorClassNames = formatClassName(['formula-preview__error', { 'formula-preview__error_dark': isDarkMode }]);
  const labelText = inputTexts[InputID.Preview].label[language];

  return (
    <div className={classNames}>
      <Label id='formula-preview' text={labelText} isDarkMode={isDarkMode} />
      {Array.isArray(preview) ? (
        <Formula id='formula-preview' content={preview} className='formula-preview__formula' />
      ) : (
        <p className={errorClassNames}>{preview.displayedErrorMessage[language]}</p>
      )}
    </div>
  );
};

export default memo(FormulaPreview);
