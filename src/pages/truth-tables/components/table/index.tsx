import React from 'react';
import Table from 'components/table';

const TruthTablesTable = (): React.ReactElement => {
  return (
    <div className='truth-tables-table'>
      <Table columns={[]} data={[]} id='propositions-truth-table' />
    </div>
  );
};

export default TruthTablesTable;
