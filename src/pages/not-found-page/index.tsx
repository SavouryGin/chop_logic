import React from 'react';
import { paths } from 'components/app-router/paths';
import { Page } from 'enums';
import { Link } from 'react-router-dom';

function NotFoundPage(): React.ReactElement {
  return (
    <div className='not-found-page'>
      404 Page not found <Link to={paths[Page.Home]}>Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
