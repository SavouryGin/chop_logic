import Button from 'components/controls/button';
import React from 'react';
import { ButtonID, Icon } from 'enums';

const TruthTableFormButtons = (): React.ReactElement => {
  const isExportDisabled = true;
  const isImportDisabled = false;

  return (
    <>
      <Button buttonId={ButtonID.ExportXML} icon={Icon.ExportXML} view='large' isDisabled={isExportDisabled} />
      <Button buttonId={ButtonID.ImportXML} icon={Icon.ImportXML} view='large' isDisabled={isImportDisabled} />
    </>
  );
};

export default TruthTableFormButtons;
