import React from 'react';
import TruthTablesInput from './components/input';
import TruthTablesTable from './components/table';

const TruthTables = (): React.ReactElement => {
  return (
    <div className='truth-tables'>
      <TruthTablesInput />
      <TruthTablesTable />
    </div>
  );
};

export default TruthTables;
