import PropositionsDPSidebarButtons from './elements/propositions-dp-buttons';
import PropositionsNPSidebarButtons from './elements/propositions-np-buttons';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Page } from 'enums';
import { paths } from 'router/paths';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import { useMatch } from 'react-router';
import './styles.scss';

const Sidebar = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isNPButtonsVisible = !!useMatch(paths[Page.PropositionsNaturalProofs]);
  const isDPButtonsVisible = !!useMatch(paths[Page.PropositionsDirectProofs]);

  if (!isMounted) {
    return null;
  }
  const isClosing = isMounted && !isOpened;
  const sidebarClassNames = formatClass(['sidebar', className, { sidebar_dark: isDarkMode, sidebar_closing: isClosing }]);

  return (
    <aside className={sidebarClassNames}>
      <ul className='sidebar__list'>
        <PropositionsDPSidebarButtons isVisible={isDPButtonsVisible} />
        <PropositionsNPSidebarButtons isVisible={isNPButtonsVisible} />
      </ul>
    </aside>
  );
};

export default Sidebar;
