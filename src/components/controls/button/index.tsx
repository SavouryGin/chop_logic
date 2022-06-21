import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ButtonProps } from 'types';
import { buttonTexts } from 'assets/texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Button = ({ onClick, icon, sound, size = 'normal', buttonId, ...rest }: ButtonProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const buttonTitle = rest.title || buttonTexts[buttonId].title[language];
  const buttonText = rest.text || buttonTexts[buttonId].innerText?.[language];

  const shadowClassNames = formatClassName(['button__shadow', { button__shadow_dark: isDarkMode }]);
  const edgeClassNames = formatClassName(['button__edge', { button__edge_dark: isDarkMode }]);
  const frontClassNames = formatClassName(['button__front', icon, { button__front_dark: isDarkMode }]);
  const buttonClassNames = formatClassName([
    'button',
    rest.className,
    { button_dark: isDarkMode, button_small: size === 'small', button_large: size === 'large', button_disabled: !!rest.isDisabled },
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
      onClick={onButtonClick}
      id={`button_id_${buttonId}`}
      disabled={rest.isDisabled}
    >
      <span className={shadowClassNames}></span>
      <span className={edgeClassNames}></span>
      <span className={frontClassNames} data-testid={`button_id_${buttonId}`}>
        {buttonText}
      </span>
    </button>
  );
};

export default Button;
