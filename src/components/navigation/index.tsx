import React from 'react';
import { Link } from 'react-router-dom';
import routesMap from 'constants/pages/map';

function Navigation(): React.ReactElement {
  const links = routesMap.map((item) => {
    return (
      <li key={item.id}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    );
  });

  return (
    <nav className='navigation'>
      <ul>{links}</ul>
    </nav>
  );
}

export default Navigation;