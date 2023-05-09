import Button from 'components/controls/button';
import ConfirmDeleteProofStepsPopup from 'pages/propositions/components/forms/confirm-delete';
import ModalWindow from 'components/modal-window';
import React from 'react';
import { ButtonID, Icon } from 'enums';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { propositionsNPSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { uiElementTexts } from 'texts';
import { useAppDispatch, useAppSelector } from 'hooks';

const PropositionsNPSidebarButtons = ({ isVisible }: { isVisible: boolean }): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.language);
  const tableDataLength = useAppSelector(selectors.tableDataLength);
  const selectedIds = useAppSelector(selectors.selectedIds);
  const clipboardData = useAppSelector(selectors.clipboardData);
  const dependencies = useAppSelector(selectors.dependentItems);
  const isConfirmCutPopupOpened = useAppSelector(selectors.isConfirmCutPopupOpened);

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
    dispatch(actions.copySteps());
  };

  const onPasteSteps = () => {
    dispatch(actions.pasteSteps());
  };

  const onCutSteps = () => {
    dispatch(actions.cutSteps({ isConfirmed: false }));
  };

  const closeCutSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmCutPopupOpened', value: false }));
    dispatch(actions.setDependentItems([]));
  };

  const confirmCutSteps = () => {
    dispatch(actions.setUpFlag({ flag: 'isConfirmCutPopupOpened', value: false }));
    dispatch(actions.cutSteps({ isConfirmed: true }));
  };

  return (
    <>
      <li>
        <Button
          buttonId={ButtonID.ExportXML}
          icon={Icon.ExportXML}
          isDisabled={isExportToXMLDisabled}
          onClick={onClickExportToXML}
          view='large'
        />
      </li>
      <li>
        <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} view='large' onClick={openFileInputForm} />
      </li>
      <li>
        <Button buttonId={ButtonID.CopyProof} icon={Icon.Copy} view='large' onClick={onCopySteps} isDisabled={isCopyDisabled} />
      </li>
      <li>
        <Button buttonId={ButtonID.CutProof} icon={Icon.Cut} view='large' onClick={onCutSteps} isDisabled={isCutDisabled} />
      </li>
      <li>
        <Button buttonId={ButtonID.PasteProof} icon={Icon.Paste} view='large' onClick={onPasteSteps} isDisabled={isPasteDisabled} />
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

export default PropositionsNPSidebarButtons;
