import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ClassNameProp } from 'types';

export type AppLinkProps = {
  path: string;
  text?: string;
  isNavigation?: boolean;
  className?: ClassNameProp;
};

function AppLink(props: AppLinkProps): React.ReactElement {
  const { path, text, isNavigation } = props;

  const navLink = <NavLink to={path}>{text}</NavLink>;
  const link = <Link to={path}>{text}</Link>;
  return isNavigation ? navLink : link;
}

export default AppLink;
