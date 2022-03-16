import React from 'react';
import { paths } from 'components/app-router/paths';
import AppLink from 'components/app-link';
import { Icon, Page } from 'enums';

function NotFoundPage(): React.ReactElement {
  return (
    <div className='not-found-page'>
      404 Page not found <br></br>
      <AppLink path={paths[Page.Home]} text={'Go Home'} isNavigation icon={Icon.Home} />
    </div>
  );
}

export default NotFoundPage;
