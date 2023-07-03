import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import { externalLinks } from 'settings';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Footer = ({ className }: CommonProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const language = useAppSelector(settingsSelectors.language);

  const footerClassNames = formatClass(['footer', className]);
  const linkClassNames = formatClass(['footer__links', { footer__links_dark: isDarkMode }]);

  const onLinkHover = () => {
    isSoundsEnabled && soundPlayer.snap.play();
  };

  return (
    <footer className={footerClassNames}>
      <span className='footer__copyright'>{`© ${uiElementTexts.footer[language]}, 2023`}</span>
      <span className={linkClassNames}>
        <a href={externalLinks.mail} target='_blank' rel='noreferrer' className={Icon.Mail} onMouseOver={onLinkHover} title='Mail'></a>
        <a
          href={externalLinks.linkedIn}
          target='_blank'
          rel='noreferrer'
          className={Icon.LinkedIn}
          onMouseOver={onLinkHover}
          title='LinkedIn'
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
