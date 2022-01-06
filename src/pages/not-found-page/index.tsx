import React from 'react';
import { Pages, paths } from 'constants/pages';
import { Link } from 'react-router-dom';

function NotFoundPage(): React.ReactElement {
  return (
    <main className='not-found-page'>
      404 Page not found <Link to={paths[Pages.Home]}>Go Home</Link>
    </main>
  );
}

export default NotFoundPage;
