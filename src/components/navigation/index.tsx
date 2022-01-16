import React from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from 'constants/pages';
import formatClassName from 'helpers/formatters/format-class-name';

export type NavigationProps = {
  className?: string;
};

function Navigation(props: NavigationProps): React.ReactElement {
  const links = routesMap.map((item) => {
    return (
      <li key={item.key}>
        <Link to={item.url}>{item.title}</Link>
      </li>
    );
  });

  return (
    <nav className={formatClassName(['navigation', props.className])}>
      <h2 className='navigation__header'>Navigation</h2>
      <ul className='navigation__list'>{links}</ul>
    </nav>
  );
}

export default Navigation;
