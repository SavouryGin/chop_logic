import React from 'react';
import Table from 'components/table';
import selectors from 'store/propositions/truth-tables/selectors';
import { useAppSelector } from 'hooks';

const TruthTablesTable = (): React.ReactElement => {
  const columns = useAppSelector(selectors.columns);
  const data = useAppSelector(selectors.data);

  return (
    <div className='truth-tables_table'>
      <Table columns={columns} data={data} key={columns.length} id='propositions-truth-table' />
    </div>
  );
};

export default TruthTablesTable;
