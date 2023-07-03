import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import { Link, NavLink } from 'react-router-dom';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'utils/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

type AppLinkProps = CommonProps & {
  path: string;
  text?: string;
  icon?: Icon;
  isNavigation?: boolean;
  onHover?: () => void;
};

const AppLink = ({ path, text, isNavigation, icon, onHover, ...rest }: AppLinkProps): React.ReactElement => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isSoundsEnabled = useAppSelector(settingsSelectors.isSoundsEnabled);
  const classNames = formatClass(['app-link', rest.className, { 'app-link_dark': isDarkMode }]);

  const onLinkHover = () => {
    isSoundsEnabled && soundPlayer.snap.play();
    if (onHover) {
      onHover();
    }
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
