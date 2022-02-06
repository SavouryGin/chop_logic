import React from 'react';
import formatClassName from 'helpers/formatters/format-class-name';
import { Link, NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'store/hooks';

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

  const navLink = <NavLink to={path}>{text}</NavLink>;
  const link = <Link to={path}>{text}</Link>;
  const classNames = formatClassName(['app-link', icon, className, { 'app-link_dark': isDarkMode }]);

  return (
    <span data-testid='app-link' className={classNames}>
      {isNavigation ? navLink : link}
    </span>
  );
}

export default AppLink;
