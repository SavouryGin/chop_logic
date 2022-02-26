import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ComponentProps } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type FooterProps = ComponentProps & {
  isDarkMode: boolean;
};

function Footer(props: FooterProps): React.ReactElement {
  const { className, isDarkMode } = props;
  const footerClassNames = formatClassName(['footer', className]);
  const linkClassNames = formatClassName(['footer__links', { footer__links_dark: isDarkMode }]);

  return (
    <footer className={footerClassNames}>
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
