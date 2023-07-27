import React from 'react';
import Table from 'components/table';
import { TRUTH_TABLES_LAWS_COLUMNS } from './columns';
import { TRUTH_TABLES_LAWS_VALUES } from './values';

const TruthTablesLaws = (): React.ReactElement => {
  return (
    <div className='truth-tables_laws'>
      <Table columns={TRUTH_TABLES_LAWS_COLUMNS} data={TRUTH_TABLES_LAWS_VALUES} id='propositions-truth-table-laws' />
    </div>
  );
};

export default TruthTablesLaws;
