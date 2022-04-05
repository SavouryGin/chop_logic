import Table from 'components/table';
import React from 'react';
import { TableColumnProps, TableDataItem } from 'types/table';

import './styles.scss';

const testColumns: TableColumnProps[] = [
  { title: 'Col 1', field: 'field1' },
  { title: 'Col 2', field: 'field2' },
  { title: 'Col 3', field: 'field3' },
  { title: 'Col 4', field: 'field4' },
];
const testData: TableDataItem[] = [
  { id: 'row1', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row2', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row3', field1: 1, field2: 2, field3: 3, field4: 4 },
  { id: 'row4', field1: 1, field2: 2, field3: 3, field4: 4 },
];

function Home(): React.ReactElement {
  const takeSelectedIds = (ids: string[]) => console.log(ids);

  return (
    <div className='home'>
      Home page
      <br></br>
      <Table columns={testColumns} data={testData} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
    </div>
  );
}

export default Home;
