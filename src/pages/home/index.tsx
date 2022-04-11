import Table from 'components/table';
import TabList from 'components/tab-list';
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
const testTabs: TabItem[] = [
  { tabContent: <>Tab content 1</>, tabTitle: 'Title 1' },
  { tabContent: <>Tab content 2</>, tabId: 'tab-2', tabTitle: 'Title 2' },
  { tabContent: <>Tab content 3</>, tabId: 'tab-3', tabTitle: 'Title 3' },
];

function Home(): React.ReactElement {
  const takeSelectedIds = (ids: string[]) => console.log(ids);

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
