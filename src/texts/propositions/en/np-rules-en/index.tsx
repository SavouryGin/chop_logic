import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPRulesEn = (props: CommonProps): React.ReactElement => {
  return (
    <table className={formatClass([props.className])}>
      <tr>
        <th>Introduction rules</th>
        <th>Elimination rules</th>
      </tr>
      <tr>
        <td>Conjunction Introduction (CI)</td>
        <td>Conjunction Elimination (CE)</td>
      </tr>
      <tr>
        <td>Disjunction Introduction (DI)</td>
        <td>Disjunction Elimination (DE)</td>
      </tr>
      <tr>
        <td>Implication Introduction (II)</td>
        <td>Implication Elimination (IE)</td>
      </tr>
      <tr>
        <td>Equivalence Introduction (EI)</td>
        <td>Equivalence Elimination (EE)</td>
      </tr>
      <tr>
        <td>Negation Introduction (NI)</td>
        <td>Negation Elimination (NE)</td>
      </tr>
    </table>
  );
};

export default NPRulesEn;
