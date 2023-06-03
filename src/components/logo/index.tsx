import React from 'react';
import darkLogo from 'assets/images/chop-logic-logo-dark.svg';
import lightLogo from 'assets/images/chop-logic-logo.svg';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const ChopLogicLogo = (): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const src = isDarkMode ? darkLogo : lightLogo;

  return (
    <div className={'chop-logic-logo'}>
      <img src={typeof src === 'string' ? src : undefined} className='country_logo_img' alt={'Chop Logic Logo'} role='img' />
    </div>
  );
};

export default ChopLogicLogo;
