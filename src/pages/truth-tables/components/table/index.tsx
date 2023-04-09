import React from 'react';
import Table from 'components/table';
import truthTablesSelectors from 'store/propositions/truth-tables/selectors';
import { useAppSelector } from 'hooks';

const TruthTablesTable = (): React.ReactElement => {
  const columns = useAppSelector(truthTablesSelectors.columns);
  console.log(columns);

  return (
    <div className='truth-tables-table'>
      <Table columns={columns} data={[]} key={columns.length} id='propositions-truth-table' />
    </div>
  );
};

export default TruthTablesTable;
