import AppLink from 'components/app-link';
import React from 'react';
import { Page } from 'enums';
import { paths } from 'presets/paths';

const AppHeading = () => {
  return (
    <h1 className='header__heading'>
      <AppLink path={paths[Page.Home]} text='Chop Logic' isNavigation />
    </h1>
  );
};

export default AppHeading;
