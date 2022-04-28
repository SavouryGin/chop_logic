import React, { useEffect, useState } from 'react';
import Table from 'components/table';
import { TableColumnProps } from 'types';
import { useAppDispatch, useAppSelector } from 'hooks';
import { propositionsSelectors } from 'store/propositions/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { fillerText } from 'assets/texts/propositions';
import { propositionsActions as actions } from 'store/propositions/slice';

const directProofsEditorTableColumns: TableColumnProps[] = [
  {
    field: 'step',
    title: { en: 'Step', ru: 'Шаг' },
  },
  {
    field: 'formula',
    title: { en: 'Formula', ru: 'Формула' },
  },
  {
    field: 'comment',
    title: { en: 'Comment', ru: 'Комментарий' },
  },
];

function DirectProofsEditorTable(): React.ReactElement {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(propositionsSelectors.getDirectProofsTableData);
  const language = useAppSelector(settingsSelectors.getLanguage);
  const [selectedIds, setSelectedIds] = useState<Array<string>>(useAppSelector(propositionsSelectors.getSelectedIds));
  const takeSelectedIds = (ids: string[]) => setSelectedIds(ids);

  useEffect(() => {
    dispatch(actions.setSelectedIds(selectedIds));
  }, [selectedIds]);

  const noStepsFiller = <div className='direct-proofs-editor__filler'>{fillerText[language]}</div>;

  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={directProofsEditorTableColumns} data={tableData} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
      {tableData.length === 0 && noStepsFiller}
    </div>
  );
}

export default DirectProofsEditorTable;
