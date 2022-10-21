import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { getNavigationLinksList } from './helpers';
import { routesMap } from 'router/map';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Navigation = (props: CommonProps) => {
  const isClosingAnimationActive = useAppSelector(settingsSelectors.getIsMenuAnimationActive);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const navigationClassNames = formatClassName(['navigation', props.className, { navigation_closing: isClosingAnimationActive }]);

  return (
    <nav className={navigationClassNames}>
      <h2 className='navigation__header'>{uiElementTexts.navHeader[language]}</h2>
      <ul className='navigation__list'>{getNavigationLinksList(routesMap, language)}</ul>
    </nav>
  );
};

export default Navigation;
