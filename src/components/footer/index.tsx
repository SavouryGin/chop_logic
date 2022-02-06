import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

import './styles.scss';

export type FooterProps = {
  className?: ClassNameProp;
};

function Footer(props: FooterProps): React.ReactElement {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const footerClassNames = formatClassName(['footer', props.className]);
  const linkClassNames = formatClassName(['footer__links', { footer__links_dark: isDarkMode }]);

  return (
    <footer className={footerClassNames} data-testid='footer'>
      <span className='footer__copyright'>© Dmitrii Suroviagin, 2022</span>
      <span className={linkClassNames}>
        <a href='mailto:savourygin@gmail.com' target='_blank' rel='noreferrer' className={Icon.Mail}>
          Mail
        </a>
        <a href='https://telegram.me/savoury_gin' target='_blank' rel='noreferrer' className={Icon.Telegram}>
          Telegram
        </a>
        <a href='https://github.com/SavouryGin' target='_blank' rel='noreferrer' className={Icon.Github}>
          GitHub
        </a>
      </span>
    </footer>
  );
}

export default Footer;
