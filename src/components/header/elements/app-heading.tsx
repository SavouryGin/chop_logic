import React from 'react';
import AppLink from 'components/app-link';
import { paths } from 'components/app-router/paths';
import { Page } from 'enums';

function AppHeading(): React.ReactElement {
  return (
    <h1 className='header__heading'>
      <AppLink path={paths[Page.Home]} text='Chop Logic' isNavigation />
    </h1>
  );
}

export default AppHeading;
