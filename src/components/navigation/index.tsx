import React, { memo, useRef } from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps } from 'types';
import { getNavigationLinksList } from './helpers';
import { routesMap } from 'router/map';
import { settingsActions } from 'store/settings';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector, useClickOutside, useMount } from 'hooks';
import './styles.scss';

const Navigation = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const language = useAppSelector(settingsSelectors.language);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isMounted = useMount(isOpened);
  const isClosing = isMounted && !isOpened;
  const dispatch = useAppDispatch();
  const clickRef = useRef<HTMLElement>(null);
  const onClickOutside = () => {
    dispatch(settingsActions.setUpFlag({ flag: 'isNavigationOpened', value: false }));
  };

  useClickOutside(clickRef, onClickOutside);

  if (!isMounted) {
    return null;
  }

  const navigationClassNames = formatClass(['navigation', className, { navigation_dark: isDarkMode, navigation_closing: isClosing }]);

  return (
    <nav className={navigationClassNames} ref={clickRef}>
      <h2 className='navigation__header'>{uiElementTexts.navHeader[language]}</h2>
      {getNavigationLinksList(routesMap, language)}
    </nav>
  );
};

export default memo(Navigation);
