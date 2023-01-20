import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs/slice';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';

import { useAppDispatch, useAppSelector } from 'hooks';

const PropositionsDPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const tableDataLength = useAppSelector(selectors.getTableDataLength);

  if (!isVisible) {
    return null;
  }

  // const isPDFSaveDisabled = true;
  const isExportToXMLDisabled = !tableDataLength;

  const onClickExportToXML = () => {
    dispatch(actions.exportToXML());
  };

  const openFileInputForm = () => {
    dispatch(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: true }));
  };

  const onCopySteps = () => {
    console.log('Copy');
  };

  const onPasteSteps = () => {
    console.log('Paste');
  };

  return (
    <>
      {/* <li>
        <Button buttonId={ButtonID.SavePDF} icon={Icon.SavePDF} isDisabled={isPDFSaveDisabled} />
        <span className='sidebar__button-span'>Save</span>
      </li> */}
      <li>
        <Button
          buttonId={ButtonID.ExportXML}
          icon={Icon.ExportXML}
          isDisabled={isExportToXMLDisabled}
          onClick={onClickExportToXML}
          size='large'
        />
      </li>
      <li>
        <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} size='large' onClick={openFileInputForm} />
      </li>
      <li>
        <Button buttonId={ButtonID.CopyProof} icon={Icon.ImportXML} size='large' onClick={onCopySteps} />
      </li>
      <li>
        <Button buttonId={ButtonID.PasteProof} icon={Icon.ImportXML} size='large' onClick={onPasteSteps} />
      </li>
    </>
  );
};

export default PropositionsDPSidebarButtons;
