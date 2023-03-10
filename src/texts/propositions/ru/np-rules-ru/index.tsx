import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPRulesRu = (props: CommonProps): React.ReactElement => {
  return <div className={formatClass([props.className])}>Rules Ru</div>;
};

export default NPRulesRu;
