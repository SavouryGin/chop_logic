import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPRulesEn = (props: CommonProps): React.ReactElement => {
  return (
    <table className={formatClass([props.className])}>
      <thead>
        <tr>
          <th>
            <h3>Introduction rules</h3>
          </th>
          <th>
            <h3>Elimination rules</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>Conjunction Introduction (CI)</h3>
            <span>
              If <Latex>{latex.dashF}</Latex> and <Latex>{latex.dashG}</Latex>, then <Latex>{latex.dashFandG}</Latex>
            </span>
          </td>
          <td>
            <h3>Conjunction Elimination (CE)</h3>
            <span>
              If <Latex>{latex.dashFandG}</Latex>, then <Latex>{latex.dashF}</Latex> and <Latex>{latex.dashG}</Latex>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Disjunction Introduction (DI)</h3>
            <span>
              If <Latex>{latex.dashF}</Latex> или <Latex>{latex.dashG}</Latex>, then <Latex>{latex.dashForG}</Latex>
            </span>
          </td>
          <td>
            <h3>Disjunction Elimination (DE)</h3>
            <span>
              If <Latex>{latex.dashForG}</Latex>, <Latex>{latex.dashFtoH}</Latex> and <Latex>{latex.dashGtoH}</Latex>, then{' '}
              <Latex>{latex.dashH}</Latex>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Implication Introduction (II)</h3>
            <span>
              If <Latex>{latex.FdashG}</Latex>, then <Latex>{latex.dashFtoG}</Latex>
            </span>
          </td>
          <td>
            <h3>Implication Elimination (IE)</h3>
            <span>
              If <Latex>{latex.dashF}</Latex> and <Latex>{latex.dashFtoG}</Latex>, then <Latex>{latex.dashG}</Latex>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Equivalence Introduction (EI)</h3>
            <span>
              If <Latex>{latex.dashFtoG}</Latex> and <Latex>{latex.dashGtoF}</Latex>, then <Latex>{latex.dashFequivG}</Latex>
            </span>
          </td>
          <td>
            <h3>Equivalence Elimination (EE)</h3>
            <span>
              If <Latex>{latex.dashFequivG}</Latex>, then <Latex>{latex.dashFtoG}</Latex> and <Latex>{latex.dashGtoF}</Latex>
            </span>
          </td>
        </tr>
        <tr>
          <td>
            <h3>Negation Introduction (NI)</h3>
            <span>
              If <Latex>{latex.dashFtoG}</Latex> and <Latex>{latex.dashFtoNotG}</Latex>, then <Latex>{latex.dashNotF}</Latex>
            </span>
          </td>
          <td>
            <h3>Negation Elimination (NE)</h3>
            <span>
              If <Latex>{latex.dashNotNotF}</Latex>, then <Latex>{latex.dashNotF}</Latex>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default NPRulesEn;
