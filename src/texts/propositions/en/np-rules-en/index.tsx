import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPRulesEn = (props: CommonProps): React.ReactElement => {
  return <div className={formatClass([props.className])}>Rules En</div>;
};

export default NPRulesEn;
