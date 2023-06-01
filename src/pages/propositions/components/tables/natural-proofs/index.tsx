import React, { useEffect, useState } from 'react';
import Table from 'components/table';
import constants from 'pages/propositions/constants';
import propositionsElementsTexts from 'texts/propositions/elements';
import { propositionsNPActions as actions } from 'store/propositions/natural-proofs';
import { npSelectors as selectors } from 'store/propositions/natural-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

const NaturalProofsEditorTable = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(settingsSelectors.language);
  const tableData = useAppSelector(selectors.tableData);
  const [selectedIds, setSelectedIds] = useState<string[]>(useAppSelector(selectors.selectedIds));
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    dispatch(actions.setSelectedIds(selectedIds));
  }, [selectedIds]);

  const noStepsFiller = <div className='natural-proofs-editor__filler'>{propositionsElementsTexts.fillerNaturalText[language]}</div>;

  return (
    <div className='natural-proofs-editor__table'>
      <Table
        columns={constants.naturalProofsEditorTableColumns}
        data={tableData}
        hasCheckboxColumn
        passSelectedIds={takeSelectedIds}
        id='propositions-np-editor-table'
      />
      {tableData.length === 0 && noStepsFiller}
    </div>
  );
};

export default NaturalProofsEditorTable;
