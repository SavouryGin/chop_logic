import React from 'react';
import TabList from 'components/tab-list';
import { TabItem } from 'types';

import './styles.scss';

const testTabs: TabItem[] = [
  { tabContent: <>Tab content 1</>, tabId: 'tab-1', tabTitle: 'Title 1' },
  { tabContent: <>Tab content 2</>, tabId: 'tab-2', tabTitle: 'Title 2' },
  { tabContent: <>Tab content 3</>, tabId: 'tab-3', tabTitle: 'Title 3' },
  { tabContent: <>Tab content 4</>, tabId: 'tab-4', tabTitle: 'Title 4' },
];

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <br></br>
      <TabList tabs={testTabs} defaultTabId='tab-3' />
    </div>
  );
}

export default Home;
