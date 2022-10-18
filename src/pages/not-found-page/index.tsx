import AppLink from 'components/app-link';
import React from 'react';
import { Icon, Page } from 'enums';
import { paths } from 'router/paths';
import './styles.scss';

const NotFoundPage = () => {
  return (
    <div className='not-found-page' data-testid='not-found-page'>
      <h2 className='not-found-page__header'>404 Page not found</h2>
      <AppLink path={paths[Page.Home]} text={'Go Home'} isNavigation icon={Icon.Home} />
    </div>
  );
};

export default NotFoundPage;
