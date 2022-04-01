import Table, { TableColumnProps, TableDataItem } from 'components/table';
import React from 'react';

import './styles.scss';

const testColumns: TableColumnProps[] = [
  { title: 'Col 1', field: 'field1' },
  { title: 'Col 2', field: 'field2' },
  { title: 'Col 3', field: 'field3' },
];
const testData: TableDataItem[] = [
  { id: '1', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: '2', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: '3', field1: 1, field2: 2, field3: 3, field4: 4 },
];

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <br></br>
      <Table columns={testColumns} data={testData} />
    </div>
  );
}

export default Home;
