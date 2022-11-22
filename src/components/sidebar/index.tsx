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
  if (!isMounted) {
    return null;
  }

  const isClosing = isMounted && !isOpened;
  const sidebarClassNames = formatClass(['sidebar', className, { sidebar_dark: isDarkMode, sidebar_closing: isClosing }]);

  return (
    <aside className={sidebarClassNames}>
      <ul className='sidebar__list'>
        <li>
          <Button buttonId={ButtonID.SavePDF} icon={Icon.SavePDF} />
          <span className='sidebar__button-span'>Save</span>
        </li>
        <li>
          <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} />
          <span className='sidebar__button-span'>Export</span>
        </li>
        <li>
          <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} />
          <span className='sidebar__button-span'>Import</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
