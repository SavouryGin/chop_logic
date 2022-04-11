import React from 'react';
import { TabProps } from 'types';

function Tab({ content, ...rest }: TabProps): React.ReactElement {
  return <li key={rest.key}>{content}</li>;
}

export default Tab;
