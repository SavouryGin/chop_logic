import React, { memo } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonProps } from 'types';
import { buttonTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Button = ({ onClick, icon, sound, size = 'normal', buttonId, isDisabled, ...rest }: ButtonProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const language = useAppSelector(settingsSelectors.language);
  const buttonTitle = rest.title || buttonTexts[buttonId].title[language];
  const buttonText = rest.text || buttonTexts[buttonId].innerText?.[language];

  const shadowClassNames = formatClass(['button__shadow', { button__shadow_dark: isDarkMode }]);
  const edgeClassNames = formatClass(['button__edge', { button__edge_dark: isDarkMode }]);
  const frontClassNames = formatClass(['button__front', icon, { button__front_dark: isDarkMode }]);
  const buttonClassNames = formatClass([
    'button',
    rest.className,
    { button_dark: isDarkMode, button_small: size === 'small', button_large: size === 'large', button_disabled: !!isDisabled },
  ]);

  const onButtonClick = () => {
    if (sound && isSoundEnabled) {
      sound.play();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={rest.type || 'button'}
      title={buttonTitle}
      className={buttonClassNames}
      onClick={!isDisabled ? onButtonClick : undefined}
      id={`button_id_${buttonId}`}
      disabled={isDisabled}
    >
      <span className={shadowClassNames}></span>
      <span className={edgeClassNames}></span>
      <span className={frontClassNames} data-testid={`button_id_${buttonId}`}>
        {buttonText}
      </span>
    </button>
  );
};

export default memo(Button);
