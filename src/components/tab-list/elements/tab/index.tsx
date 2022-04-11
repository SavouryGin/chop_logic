import React from 'react';
import { TabProps } from 'types';

function Tab({ content, title, ...rest }: TabProps): React.ReactElement {
  return (
    <>
      <h3 role='tab' id={rest.tabId}>
        {title}
      </h3>
      <section role='tabpanel' aria-labelledby={rest.tabId}>
        {content}
      </section>
    </>
  );
}

export default Tab;
