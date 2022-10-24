import React, { memo } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { getNavigationLinksList } from './helpers';
import { routesMap } from 'router/map';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppSelector } from 'hooks';
import './styles.scss';

const Navigation = (props: CommonProps) => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const navigationClassNames = formatClassName(['navigation', props.className]);

  return (
    <nav className={navigationClassNames}>
      <h2 className='navigation__header'>{uiElementTexts.navHeader[language]}</h2>
      {getNavigationLinksList(routesMap, language)}
    </nav>
  );
};

export default memo(Navigation);
