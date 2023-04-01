import React from 'react';
import TruthTableInput from './components/input';
import TruthTablesTable from './components/table';

const TruthTables = (): React.ReactElement => {
  return (
    <div className='truth-tables'>
      <TruthTableInput />
      <TruthTablesTable />
    </div>
  );
};

export default TruthTables;
