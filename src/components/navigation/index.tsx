import AppLink from 'components/app-link';
import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { groupArrayOfObjectsBy } from 'helpers/formatters/group-array-of-objects-by';
import { routesMap } from 'router/map';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Navigation = (props: CommonProps) => {
  const isClosingAnimationActive = useAppSelector(settingsSelectors.getIsMenuAnimationActive);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const navigationClassNames = formatClassName(['navigation', props.className, { navigation_closing: isClosingAnimationActive }]);

  const topLinksMap = routesMap.filter((item) => !item.parentPageId);

  const nestedLinks = groupArrayOfObjectsBy(routesMap, 'parentPageId');
  console.log(nestedLinks);

  const topLinks = topLinksMap.map((item) => {
    return (
      <li key={item.key}>
        <AppLink path={item.url} text={item.title[language]} isNavigation icon={item.icon} />
      </li>
    );
  });

  return (
    <nav className={navigationClassNames}>
      <h2 className='navigation__header'>{uiElementTexts.navHeader[language]}</h2>
      <ul className='navigation__list'>{topLinks}</ul>
    </nav>
  );
};

export default Navigation;
