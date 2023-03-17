import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPDefinitionsRu = (props: CommonProps): React.ReactElement => {
  console.log(props);

  const derivationProperties = <div className={formatClass([{ [`${props.className}_definition-block`]: !!props.className }])}></div>;

  return <div className={formatClass([props.className])}>{derivationProperties}</div>;
};

export default NPDefinitionsRu;
