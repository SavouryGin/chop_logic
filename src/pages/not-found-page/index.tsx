import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): React.ReactElement {
  return (
    <div className='not-found-page'>
      404 Page not found <Link to={'/'}>Go Home</Link>
    </div>
  );
}

export default NotFoundPage;
