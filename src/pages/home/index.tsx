import Table from 'components/table';
import TabList from 'components/tabs';
import React from 'react';
import { TabItem, TableColumnProps, TableDataItem } from 'types';

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
  const testTabs: TabItem[] = [
    { tabContent: <>Tab 1</>, tabKey: 1 },
    { tabContent: <>Tab 2</>, tabKey: 2 },
    { tabContent: <>Tab 3</>, tabKey: 3 },
  ];

  return (
    <div className='home'>
      Home page
      <br></br>
      <Table columns={testColumns} data={testData} hasCheckboxColumn passSelectedIds={takeSelectedIds} />
      <br></br>
      <TabList tabs={testTabs} />
    </div>
  );
}

export default Home;
