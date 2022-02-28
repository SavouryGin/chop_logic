import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Link, NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';
import { soundPlayer } from 'helpers/sounds';

import './styles.scss';

export type AppLinkProps = {
  path: string;
  text?: string;
  icon?: Icon;
  isNavigation?: boolean;
  className?: ClassNameProp;
};

function AppLink(props: AppLinkProps): React.ReactElement {
  const { path, text, isNavigation, className, icon } = props;
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.getIsSoundsEnabled);
  const classNames = formatClassName(['app-link', className, { 'app-link_dark': isDarkMode }]);
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
    <span data-testid='app-link' className={classNames} onMouseOver={onLinkHover}>
      {isNavigation ? navLink : link}
    </span>
  );
}

export default AppLink;
