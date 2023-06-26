import Button from 'components/controls/button';
import React from 'react';
import selectors from 'store/propositions/truth-tables/selectors';
import { ButtonID, Icon } from 'enums';
import { truthTablesActions as actions } from 'store/propositions/truth-tables';
import { useAppDispatch, useAppSelector } from 'hooks';

const TruthTableFormButtons = (): React.ReactElement => {
  const columns = useAppSelector(selectors.columns);
  const data = useAppSelector(selectors.data);
  const isExportDisabled = !columns.length || !data.length;
  const isImportDisabled = false;
  const dispatch = useAppDispatch();

  const handleExportXML = () => {
    dispatch(actions.exportXML());
  };

  return (
    <>
      <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} view='large' isDisabled={isExportDisabled} onClick={handleExportXML} />
      <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} view='large' isDisabled={isImportDisabled} />
    </>
  );
};

export default TruthTableFormButtons;
