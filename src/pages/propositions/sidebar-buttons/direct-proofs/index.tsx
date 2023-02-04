import Button from 'components/controls/button';
import ConfirmDeleteProofStepsPopup from 'pages/propositions/components/forms/confirm-delete';
import ModalWindow from 'components/modal-window';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { propositionsDPActions as actions } from 'store/propositions/direct-proofs';
import { propositionsDPSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector } from 'hooks';

const PropositionsDPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.getLanguage);
  const tableDataLength = useAppSelector(selectors.getTableDataLength);
  const selectedIds = useAppSelector(selectors.getSelectedIds);
  const clipboardData = useAppSelector(selectors.getClipboardData);
  const dependencies = useAppSelector(selectors.getDependentItems);
  const isConfirmCutPopupOpened = useAppSelector(selectors.getIsConfirmCutPopupOpened);

  if (!isVisible) {
    return null;
  }

  const isExportToXMLDisabled = !tableDataLength;
  const isCopyDisabled = !selectedIds.length;
  const isPasteDisabled = !clipboardData.length;
  const isCutDisabled = !selectedIds.length;

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
    dispatch(actions.pasteSubProof());
  };

  const onCutSteps = () => {
    dispatch(actions.cutSubProof({ isConfirmed: false }));
  };

  const closeCutSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmCutPopupOpened', value: false }));
    dispatch(actions.setDependentItems([]));
  };

  const confirmCutSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmCutPopupOpened', value: false }));
    dispatch(actions.cutSubProof({ isConfirmed: true }));
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
        <Button buttonId={ButtonID.CopyProof} icon={Icon.Copy} size='large' onClick={onCopySteps} isDisabled={isCopyDisabled} />
      </li>
      <li>
        <Button buttonId={ButtonID.CutProof} icon={Icon.Cut} size='large' onClick={onCutSteps} isDisabled={isCutDisabled} />
      </li>
      <li>
        <Button buttonId={ButtonID.PasteProof} icon={Icon.Paste} size='large' onClick={onPasteSteps} isDisabled={isPasteDisabled} />
      </li>
      <ModalWindow
        isOpened={isConfirmCutPopupOpened}
        onClose={closeCutSteps}
        title={uiElementTexts.confirmation[language]}
        content={<ConfirmDeleteProofStepsPopup onConfirm={confirmCutSteps} dependencies={dependencies} />}
      />
    </>
  );
};

export default PropositionsDPSidebarButtons;
