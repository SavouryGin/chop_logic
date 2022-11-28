import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import { externalLinks } from 'presets/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Footer = ({ className }: CommonProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const language = useAppSelector(settingsSelectors.getLanguage);

  const footerClassNames = formatClass(['footer', className]);
  const linkClassNames = formatClass(['footer__links', { footer__links_dark: isDarkMode }]);

  const onLinkHover = () => {
    isSoundsEnabled && soundPlayer.snap.play();
  };

  return (
    <footer className={footerClassNames}>
      <span className='footer__copyright'>{`© ${uiElementTexts.footer[language]}, 2022`}</span>
      <span className={linkClassNames}>
        <a href={externalLinks.mail} target='_blank' rel='noreferrer' className={Icon.Mail} onMouseOver={onLinkHover} title='Mail'></a>
        <a
          href={externalLinks.telegram}
          target='_blank'
          rel='noreferrer'
          className={Icon.Telegram}
          onMouseOver={onLinkHover}
          title='Telegram'
        ></a>
        <a
          href={externalLinks.linkedIn}
          target='_blank'
          rel='noreferrer'
          className={Icon.LinkedIn}
          onMouseOver={onLinkHover}
          title='LinkedIn'
        ></a>
        <a
          href={externalLinks.facebook}
          target='_blank'
          rel='noreferrer'
          className={Icon.Facebook}
          onMouseOver={onLinkHover}
          title='Facebook'
        ></a>
        <a
          href={externalLinks.gitHub}
          target='_blank'
          rel='noreferrer'
          className={Icon.Github}
          onMouseOver={onLinkHover}
          title='GitHub'
        ></a>
      </span>
    </footer>
  );
};

export default Footer;
