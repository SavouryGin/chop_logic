import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'assets/texts';
import { useAppSelector } from 'hooks';

import './styles.scss';

export type FooterProps = ComponentProps;

function Footer({ className }: FooterProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const footerClassNames = formatClassName(['footer', className]);
  const linkClassNames = formatClassName(['footer__links', { footer__links_dark: isDarkMode }]);

  const onLinkHover = () => {
    isSoundsEnabled && soundPlayer.snap.play();
  };

  return (
    <footer className={footerClassNames}>
      <span className='footer__copyright'>{`© ${uiElementTexts.footer[language]}, 2022`}</span>
      <span className={linkClassNames}>
        <a href='mailto:savourygin@gmail.com' target='_blank' rel='noreferrer' className={Icon.Mail} onMouseOver={onLinkHover}>
          Mail
        </a>
        <a href='https://telegram.me/savoury_gin' target='_blank' rel='noreferrer' className={Icon.Telegram} onMouseOver={onLinkHover}>
          Telegram
        </a>
        <a href='https://github.com/SavouryGin' target='_blank' rel='noreferrer' className={Icon.Github} onMouseOver={onLinkHover}>
          GitHub
        </a>
      </span>
    </footer>
  );
}

export default Footer;
