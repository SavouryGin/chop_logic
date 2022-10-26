import React, { memo } from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { getNavigationLinksList } from './helpers';
import { routesMap } from 'router/map';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const Navigation = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isMounted = useMount(isOpened);
  const isClosing = isMounted && !isOpened;
  if (!isMounted) {
    return null;
  }

  const navigationClassNames = formatClassName(['navigation', className, { navigation_closing: isClosing }]);

  return (
    <nav className={navigationClassNames}>
      <h2 className='navigation__header'>{uiElementTexts.navHeader[language]}</h2>
      {getNavigationLinksList(routesMap, language)}
    </nav>
  );
};

export default memo(Navigation);
