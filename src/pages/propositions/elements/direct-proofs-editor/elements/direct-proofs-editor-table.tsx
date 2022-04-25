import React from 'react';
import Table from 'components/table';
import { TableColumnProps } from 'types';
import { useAppSelector } from 'hooks';
import { propositionsSelectors } from 'store/propositions/selectors';
import { settingsSelectors } from 'store/settings/selectors';
import { fillerText } from 'assets/texts/propositions';

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
  const language = useAppSelector(settingsSelectors.getLanguage);
  const isFillerShown = tableData.length === 0;
  const noStepsFiller = <div className='direct-proofs-editor__filler'>{fillerText[language]}</div>;

  return (
    <div className='direct-proofs-editor__table'>
      <Table columns={directProofsEditorTableColumns} data={tableData} hasCheckboxColumn />
      {isFillerShown && noStepsFiller}
    </div>
  );
}

export default DirectProofsEditorTable;
