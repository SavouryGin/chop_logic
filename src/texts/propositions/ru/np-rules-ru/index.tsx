// import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';

const NPRulesRu = (props: CommonProps): React.ReactElement => {
  return (
    <table className={formatClass([props.className])}>
      <tr>
        <th>Правила введения связок</th>
        <th>Правила удаления связок</th>
      </tr>
      <tr>
        <td>Введение конъюнкции (ВК)</td>
        <td>Удаление конъюнкции (УК)</td>
      </tr>
      <tr>
        <td>Введение дизъюнкции (ВД)</td>
        <td>Удаление дизъюнкции (УД)</td>
      </tr>
      <tr>
        <td>Введение импликации (ВИ)</td>
        <td>Удаление импликации (УИ)</td>
      </tr>
      <tr>
        <td>Введение эквивалентности (ВЭ)</td>
        <td>Удаление эквивалентности (УЭ)</td>
      </tr>
      <tr>
        <td>Введение отрицания (ВО)</td>
        <td>Удаление отрицания (УО)</td>
      </tr>
    </table>
  );
};

export default NPRulesRu;
