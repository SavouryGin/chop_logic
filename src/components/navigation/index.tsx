import React from 'react';
import routesMap from 'constants/pages/map';
import { Link } from 'react-router-dom';

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
