import React from 'react';
import { NavLink } from 'react-router-dom';
import formatClassName from 'helpers/formatters/format-class-name';
import { routesMap } from 'components/app-router/map';
import { ClassNameProp } from 'types';

import './styles.scss';

export type NavigationProps = {
  className?: ClassNameProp;
};

function Navigation(props: NavigationProps): React.ReactElement {
  const links = routesMap.map((item) => {
    return (
      <li key={item.key}>
        <NavLink to={item.url}>{item.title}</NavLink>
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
