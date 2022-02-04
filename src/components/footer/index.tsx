import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';

import './styles.scss';

export type FooterProps = {
  className?: ClassNameProp;
};

function Footer(props: FooterProps): React.ReactElement {
  return (
    <footer className={formatClassName(['footer', props.className])} data-testid='footer'>
      <span className='footer__copyright'>© Dmitrii Suroviagin, 2022</span>
      <span className='footer__links'>
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
