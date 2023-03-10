import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPHeuristicsRu = (props: CommonProps): React.ReactElement => {
  return <div className={formatClass([props.className])}>Heuristics Ru</div>;
};

export default NPHeuristicsRu;
