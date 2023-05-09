import React, { memo } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps } from 'types';
import { buttonTexts } from 'texts';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

export type ButtonProps = CommonProps & {
  buttonId: ButtonID;
  title?: string;
  icon?: Icon;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  view?: 'small' | 'normal' | 'large' | 'flat';
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  sound?: HTMLAudioElement;
  isDisabled?: boolean;
};

const Button = ({ onClick, icon, sound, view = 'normal', buttonId, isDisabled, ...rest }: ButtonProps): React.ReactElement => {
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
    {
      button_dark: isDarkMode,
      button_small: view === 'small',
      button_large: view === 'large',
      button_flat: view === 'flat',
      button_disabled: !!isDisabled,
    },
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
      onMouseEnter={rest.onMouseEnter}
      onMouseLeave={rest.onMouseLeave}
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
