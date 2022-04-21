import React from 'react';
import Table from 'components/table';
import { TableColumnProps } from 'types';

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
  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={directProofsEditorTableColumns} data={[]} hasCheckboxColumn />
    </div>
  );
}

export default DirectProofsEditorTable;
