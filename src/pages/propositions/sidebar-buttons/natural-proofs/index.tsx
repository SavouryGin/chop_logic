import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs/slice';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

const PropositionsNPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const tableDataLength = useAppSelector(selectors.getTableDataLength);

  if (!isVisible) {
    return null;
  }

  const isExportToXMLDisabled = !tableDataLength;

  const onClickExportToXML = () => {
    dispatch(actions.exportToXML());
  };

  const openFileInputForm = () => {
    dispatch(actions.setUpFlag({ flag: 'isUserFileFormVisible', value: true }));
  };

  const onCopySteps = () => {
    dispatch(actions.copySubProof());
  };

  const onPasteSteps = () => {
    dispatch(actions.pasteSubProof);
  };

  return (
    <>
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
        <Button buttonId={ButtonID.CopyProof} icon={Icon.Copy} size='large' onClick={onCopySteps} />
      </li>
      <li>
        <Button buttonId={ButtonID.PasteProof} icon={Icon.Paste} size='large' onClick={onPasteSteps} />
      </li>
    </>
  );
};

export default PropositionsNPSidebarButtons;
