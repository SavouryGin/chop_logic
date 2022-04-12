import React from 'react';
import { TabContentProps } from 'types';

function TabContent({ content, tabId }: TabContentProps): React.ReactElement {
  return (
    <section role='tabpanel' aria-labelledby={tabId} className='tab-list__content'>
      {content}
    </section>
  );
}

export default TabContent;
