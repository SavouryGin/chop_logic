import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';

const PropositionsNPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
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
    </>
  );
};

export default PropositionsNPSidebarButtons;
