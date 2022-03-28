import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { ButtonID, Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import { buttonTexts } from 'assets/texts';

import './styles.scss';

export type ButtonProps = ComponentProps & {
  buttonId: ButtonID;
  title?: string;
  icon?: Icon;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'normal' | 'large';
  onClick?: () => void;
  sound?: HTMLAudioElement;
};

function Button({ className, onClick, icon, sound, size = 'normal', buttonId, ...rest }: ButtonProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const buttonTitle = rest.title || buttonTexts[buttonId].title[language];
  const buttonText = rest.text || buttonTexts[buttonId].innerText?.[language];
  const buttonClassNames = formatClassName([
    'button',
    className,
    { button_dark: isDarkMode, button_small: size === 'small', button_large: size === 'large' },
  ]);
  const shadowClassNames = formatClassName(['button__shadow', { button__shadow_dark: isDarkMode }]);
  const edgeClassNames = formatClassName(['button__edge', { button__edge_dark: isDarkMode }]);
  const frontClassNames = formatClassName(['button__front', icon, { button__front_dark: isDarkMode }]);

  const onButtonClick = () => {
    if (sound && isSoundEnabled) {
      sound.play();
    }
    if (onClick) onClick();
  };

  return (
    <button
      type={rest.type || 'button'}
      title={buttonTitle}
      className={buttonClassNames}
      onClick={onButtonClick}
      id={`button_id_${buttonId}`}
    >
      <span className={shadowClassNames}></span>
      <span className={edgeClassNames}></span>
      <span className={frontClassNames}>{buttonText}</span>
    </button>
  );
}

export default Button;
