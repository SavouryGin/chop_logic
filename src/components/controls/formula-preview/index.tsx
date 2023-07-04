import Formula from 'components/controls/formula';
import Label from 'components/controls/label';
import React, { memo } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps, PropositionalExpression } from 'types';
import { InputID } from 'enums';
import { PropositionalError } from 'utils/errors/propositional-error';
import { inputTexts } from 'assets/texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

type FormulaPreviewProps = CommonProps & {
  preview: PropositionalExpression | PropositionalError;
};

const FormulaPreview = ({ preview, className }: FormulaPreviewProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const language = useAppSelector(settingsSelectors.language);

  const classNames = formatClass(['formula-preview', className, { 'formula-preview_dark': isDarkMode }]);
  const errorClassNames = formatClass(['formula-preview__error', { 'formula-preview__error_dark': isDarkMode }]);
  const labelText = inputTexts[InputID.Preview].label[language];

  return (
    <div className={classNames}>
      <Label text={labelText} isDarkMode={isDarkMode} />
      {Array.isArray(preview) ? (
        <Formula content={preview} className='formula-preview__formula' />
      ) : (
        <p className={errorClassNames}>{preview.displayedErrorMessage[language]}</p>
      )}
    </div>
  );
};

export default memo(FormulaPreview);
