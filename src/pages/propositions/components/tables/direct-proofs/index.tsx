import React, { memo, useEffect, useState } from 'react';
import Table from 'components/table';
import constants from 'pages/propositions/constants';
import texts from 'texts/propositions/elements';
import { dpActions as actions } from 'store/propositions/direct-proofs';
import { dpSelectors as selectors } from 'store/propositions/direct-proofs/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

const DirectProofsEditorTable = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(selectors.tableData);
  const language = useAppSelector(settingsSelectors.language);
  const [selectedIds, setSelectedIds] = useState<string[]>(useAppSelector(selectors.selectedIds));
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    dispatch(actions.setSelectedIds(selectedIds));
  }, [selectedIds]);

  const noStepsFiller = <div className='direct-proofs-editor__filler'>{texts.fillerText[language]}</div>;

  return (
    <div className='direct-proofs-editor__table'>
      <Table
        columns={constants.directProofsEditorTableColumns}
        data={tableData}
        hasCheckboxColumn
        passSelectedIds={takeSelectedIds}
        id='propositions-dp-editor-table'
      />
      {tableData.length === 0 && noStepsFiller}
    </div>
  );
};

export default memo(DirectProofsEditorTable);
