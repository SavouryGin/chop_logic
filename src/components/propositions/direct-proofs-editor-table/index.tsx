import React, { useEffect, useState } from 'react';
import Table from 'components/table';
import constants from 'assets/const/propositions';
import { propositionsActions as actions } from 'store/propositions/slice';
import { fillerText } from 'assets/texts/propositions';
import { propositionsSelectors } from 'store/propositions/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector } from 'hooks';

function DirectProofsEditorTable(): React.ReactElement {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(propositionsSelectors.getDirectProofsTableData);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [selectedIds, setSelectedIds] = useState<string[]>(useAppSelector(propositionsSelectors.getSelectedIds));
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    dispatch(actions.setSelectedIds(selectedIds));
  }, [selectedIds]);

  const noStepsFiller = <div className='direct-proofs-editor__filler'>{fillerText[language]}</div>;

  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={constants.directProofsEditorTableColumns} data={tableData} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
      {tableData.length === 0 && noStepsFiller}
    </div>
  );
}

export default DirectProofsEditorTable;
