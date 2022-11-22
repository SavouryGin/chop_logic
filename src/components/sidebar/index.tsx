import Button from 'components/controls/button';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon } from 'enums';
import { CommonProps } from 'types';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const Sidebar = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const isClosing = isMounted && !isOpened;
  if (!isMounted) {
    return null;
  }

  const sidebarClassNames = formatClass(['sidebar', className, { sidebar_dark: isDarkMode, sidebar_closing: isClosing }]);

  return (
    <aside className={sidebarClassNames}>
      <ul>
        <li>
          <Button buttonId={ButtonID.SaveXML} icon={Icon.SaveXML} />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
