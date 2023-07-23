import React from 'react';
import Table from 'components/table';
import { TRUTH_TABLES_OPERANDS_COLUMNS } from './columns';
import { TRUTH_TABLES_OPERANDS_VALUES } from './values';

const TruthTablesOperands = (): React.ReactElement => {
  return (
    <div className='truth-tables_operands'>
      <Table columns={TRUTH_TABLES_OPERANDS_COLUMNS} data={TRUTH_TABLES_OPERANDS_VALUES} id='propositions-truth-table-operands' />
    </div>
  );
};

export default TruthTablesOperands;
