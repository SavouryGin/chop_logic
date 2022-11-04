import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { AppLinkProps } from 'types';
import { Link, NavLink } from 'react-router-dom';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

const AppLink = ({ path, text, isNavigation, icon, ...rest }: AppLinkProps) => {
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const classNames = formatClass(['app-link', rest.className, { 'app-link_dark': isDarkMode }]);

  const onLinkHover = () => {
    isSoundsEnabled && soundPlayer.snap.play();
  };

  const navLink = (
    <NavLink className={icon} to={path}>
      {text}
    </NavLink>
  );

  const link = (
    <Link className={icon} to={path}>
      {text}
    </Link>
  );

  return (
    <span data-testid={rest.id || 'app-link'} className={classNames} onMouseOver={onLinkHover}>
      {isNavigation ? navLink : link}
    </span>
  );
};

export default AppLink;
