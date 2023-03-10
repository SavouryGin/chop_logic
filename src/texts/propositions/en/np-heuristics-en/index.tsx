import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPHeuristicsEn = (props: CommonProps): React.ReactElement => {
  return <div className={formatClass([props.className])}>Heuristics En</div>;
};

export default NPHeuristicsEn;
