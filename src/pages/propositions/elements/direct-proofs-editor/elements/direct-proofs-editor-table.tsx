import React from 'react';
import Table from 'components/table';
import { TableColumnProps } from 'types';
import { useAppSelector } from 'hooks';
import { propositionsSelectors } from 'store/propositions/selectors';

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
  const tableData = useAppSelector(propositionsSelectors.getDirectProofsTableData);

  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={directProofsEditorTableColumns} data={tableData} hasCheckboxColumn />
    </div>
  );
}

export default DirectProofsEditorTable;
