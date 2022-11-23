import Button from 'components/controls/button';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { ButtonID, Icon, Page } from 'enums';
import { CommonProps } from 'types';
import { paths } from 'router/paths';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import { useLocation } from 'react-router';
import './styles.scss';

const Sidebar = ({ className, isOpened }: CommonProps & { isOpened: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.getIsDarkMode);
  const location = useLocation();
  if (!isMounted) {
    return null;
  }
  console.log(location);
  const isClosing = isMounted && !isOpened;
  const sidebarClassNames = formatClass(['sidebar', className, { sidebar_dark: isDarkMode, sidebar_closing: isClosing }]);
  const isSaveDPToPDFVisible = location.pathname === paths[Page.PropositionsDirectProofs];
  const isSaveNPToPDFVisible = location.pathname === paths[Page.PropositionsNaturalProofs];
  const isExportDPToXMLVisible = location.pathname === paths[Page.PropositionsDirectProofs];
  const isExportNPToXMLVisible = location.pathname === paths[Page.PropositionsNaturalProofs];
  const isImportDPFromXMLVisible = location.pathname === paths[Page.PropositionsDirectProofs];
  const isImportNPFromXMLVisible = location.pathname === paths[Page.PropositionsNaturalProofs];

  const saveNPToPDF = (
    <li>
      <Button buttonId={ButtonID.SavePDF} icon={Icon.SavePDF} />
      <span className='sidebar__button-span'>Save</span>
    </li>
  );

  const exportNPToXML = (
    <li>
      <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} />
      <span className='sidebar__button-span'>Export</span>
    </li>
  );

  const importNPFromXML = (
    <li>
      <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} />
      <span className='sidebar__button-span'>Import</span>
    </li>
  );

  const saveDPToPDF = (
    <li>
      <Button buttonId={ButtonID.SavePDF} icon={Icon.SavePDF} />
      <span className='sidebar__button-span'>Save</span>
    </li>
  );

  const exportDPToXML = (
    <li>
      <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} />
      <span className='sidebar__button-span'>Export</span>
    </li>
  );

  const importDPFromXML = (
    <li>
      <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} />
      <span className='sidebar__button-span'>Import</span>
    </li>
  );

  return (
    <aside className={sidebarClassNames}>
      <ul className='sidebar__list'>
        {isSaveDPToPDFVisible && saveDPToPDF}
        {isSaveNPToPDFVisible && saveNPToPDF}
        {isExportDPToXMLVisible && exportDPToXML}
        {isExportNPToXMLVisible && exportNPToXML}
        {isImportDPFromXMLVisible && importDPFromXML}
        {isImportNPFromXMLVisible && importNPFromXML}
      </ul>
    </aside>
  );
};

export default Sidebar;
