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

const data = [
  {
    id: '1',
    step: '1',
    formula: 'asdfddddddddAAAAAAAsssss',
    comment: 'A1',
  },
  {
    id: '2',
    step: '32',
    formula: 'fghdf',
    comment: 'A2',
  },
];

function DirectProofsEditorTable(): React.ReactElement {
  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={directProofsEditorTableColumns} data={data} hasCheckboxColumn />
    </div>
  );
}

export default DirectProofsEditorTable;
