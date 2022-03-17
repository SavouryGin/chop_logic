import React from 'react';
import { paths } from 'components/app-router/paths';
import AppLink from 'components/app-link';
import { Icon, Page } from 'enums';

import './styles.scss';

function NotFoundPage(): React.ReactElement {
  return (
    <div className='not-found-page' data-testid='not-found-page'>
      <h2 className='not-found-page__header'>404 Page not found</h2>
      <AppLink path={paths[Page.Home]} text={'Go Home'} isNavigation icon={Icon.Home} />
    </div>
  );
}

export default NotFoundPage;
