import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { useAppDispatch } from 'hooks';

const PropositionsNPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  if (!isVisible) {
    return null;
  }

  const isSaveToPDFDisabled = true;
  const isExportToXMLDisabled = false;

  const onClickExportToXML = () => {
    dispatch(actions.exportToXML());
  };

  return (
    <>
      <li>
        <Button buttonId={ButtonID.SavePDF} icon={Icon.SavePDF} isDisabled={isSaveToPDFDisabled} />
        <span className='sidebar__button-span'>Save</span>
      </li>
      <li>
        <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} isDisabled={isExportToXMLDisabled} onClick={onClickExportToXML} />
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
