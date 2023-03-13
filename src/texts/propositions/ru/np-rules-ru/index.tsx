import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPRulesRu = (props: CommonProps): React.ReactElement => {
  return (
    <table className={formatClass([props.className])}>
      <tr>
        <th>Правила введения связок</th>
        <th>Правила удаления связок</th>
      </tr>
      <tr>
        <td>
          <h3>Введение конъюнкции (ВК)</h3>
          <span>
            Если <Latex>{latex.dashF}</Latex> и <Latex>{latex.dashG}</Latex>, то <Latex>{latex.dashFandG}</Latex>
          </span>
        </td>
        <td>
          <h3>Удаление конъюнкции (УК)</h3>
          <span>
            Если <Latex>{latex.dashFandG}</Latex>, то <Latex>{latex.dashF}</Latex> и <Latex>{latex.dashG}</Latex>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Введение дизъюнкции (ВД)</h3>
          <span>
            Если <Latex>{latex.dashF}</Latex> или <Latex>{latex.dashG}</Latex>, то <Latex>{latex.dashForG}</Latex>
          </span>
        </td>
        <td>
          <h3>Удаление дизъюнкции (УД)</h3>
          <span>
            Если <Latex>{latex.dashForG}</Latex>, <Latex>{latex.dashFtoH}</Latex> и <Latex>{latex.dashGtoH}</Latex>, то{' '}
            <Latex>{latex.dashH}</Latex>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Введение импликации (ВИ)</h3>
          <span>
            Если <Latex>{latex.FdashG}</Latex>, то <Latex>{latex.dashFtoG}</Latex>
          </span>
        </td>
        <td>
          <h3>Удаление импликации (УИ)</h3>
          <span>
            Если <Latex>{latex.dashF}</Latex> и <Latex>{latex.dashFtoG}</Latex>, то <Latex>{latex.dashG}</Latex>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Введение эквивалентности (ВЭ)</h3>
          <span>
            Если <Latex>{latex.dashFtoG}</Latex> и <Latex>{latex.dashGtoF}</Latex>, то <Latex>{latex.dashFequivG}</Latex>
          </span>
        </td>
        <td>
          <h3>Удаление эквивалентности (УЭ)</h3>
          <span>
            Если <Latex>{latex.dashFequivG}</Latex>, то <Latex>{latex.dashFtoG}</Latex> и <Latex>{latex.dashGtoF}</Latex>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <h3>Введение отрицания (ВО)</h3>
          <span>
            Если <Latex>{latex.dashFtoG}</Latex> и <Latex>{latex.dashFtoNotG}</Latex>, то <Latex>{latex.dashNotF}</Latex>
          </span>
        </td>
        <td>
          <h3>Удаление отрицания (УО)</h3>
          <span>
            Если <Latex>{latex.dashNotNotF}</Latex>, то <Latex>{latex.dashNotF}</Latex>
          </span>
        </td>
      </tr>
    </table>
  );
};

export default NPRulesRu;
