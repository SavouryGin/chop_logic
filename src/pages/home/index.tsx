import React from 'react';
import TabList from 'components/tab-list';
import { TabItem } from 'types';

import './styles.scss';

const testTabs: TabItem[] = [
  { tabContent: <>Tab content 1</>, tabId: 'tab-1', tabTitle: { en: 'Title 1', ru: 'Заголовок 1' } },
  { tabContent: <>Tab content 2</>, tabId: 'tab-2', tabTitle: { en: 'Title 2', ru: 'Заголовок 2' } },
  { tabContent: <>Tab content 3</>, tabId: 'tab-3', tabTitle: { en: 'Title 3', ru: 'Заголовок 3' } },
  { tabContent: <>Tab content 4</>, tabId: 'tab-4', tabTitle: { en: 'Title 4', ru: 'Заголовок 4' } },
];

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <br></br>
      <TabList tabs={testTabs} defaultTabId='tab-3' />
      <div>Test div</div>
    </div>
  );
}

export default Home;
