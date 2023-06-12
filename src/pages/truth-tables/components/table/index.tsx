import React from 'react';
import Table from 'components/table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { useAppSelector } from 'hooks';

const TruthTablesTable = (): React.ReactElement => {
  const columns = useAppSelector(truthTablesSelectors.columns);
  const data = useAppSelector(truthTablesSelectors.data);

  return (
    <div className='truth-tables_table'>
      <Table columns={columns} data={data} key={columns.length} id='propositions-truth-table' />
    </div>
  );
};

export default TruthTablesTable;
