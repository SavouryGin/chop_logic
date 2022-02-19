import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import AppLink from 'components/app-link';
import { routesMap } from 'components/app-router/map';
import { ClassNameProp } from 'types';
import { useAppSelector } from 'store/hooks';
import { settingsSelectors } from 'store/settings/selectors';

import './styles.scss';

export type NavigationProps = {
  className?: ClassNameProp;
};

function Navigation(props: NavigationProps): React.ReactElement {
  const isClosingAnimationActive = useAppSelector(settingsSelectors.getIsMenuAnimationActive);
  const navigationClassNames = formatClassName(['navigation', props.className, { navigation_closing: isClosingAnimationActive }]);

  const links = routesMap.map((item) => {
    return (
      <li key={item.key}>
        <AppLink path={item.url} text={item.title} isNavigation icon={item.icon} />
      </li>
    );
  });

  return (
    <nav className={navigationClassNames}>
      <h2 className='navigation__header'>Navigation</h2>
      <ul className='navigation__list'>{links}</ul>
    </nav>
  );
}

export default Navigation;
