import React from 'react';

import './styles.scss';

export type ITab = {
  label: string;
  content: React.ReactElement;
  isDisabled?: boolean;
};

function Tab({ content }: ITab): React.ReactElement {
  return <li>{content}</li>;
}

export default Tab;
