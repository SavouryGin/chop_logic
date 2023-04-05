import PropositionsDPSidebarButtons from 'pages/propositions/sidebar-buttons/direct-proofs';
import PropositionsNPSidebarButtons from 'pages/propositions/sidebar-buttons/natural-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Page } from 'enums';
import { paths } from 'router/paths';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import { useMatch } from 'react-router';
import './styles.scss';

const Sidebar = ({
  className,
  isOpened,
  isAllButtonsVisible,
}: CommonProps & { isOpened: boolean; isAllButtonsVisible?: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isNPButtonsVisible = !!useMatch(paths[Page.PropositionsNaturalProofs]) || !!isAllButtonsVisible;
  const isDPButtonsVisible = !!useMatch(paths[Page.PropositionsDirectProofs]) || !!isAllButtonsVisible;

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
