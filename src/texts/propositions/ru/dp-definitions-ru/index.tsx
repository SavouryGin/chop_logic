import Latex from 'react-latex';
import React from 'react';
import './styles.scss';

const DPDefinitionsRu = (): React.ReactElement => {
  const T = `$$\\mathfrak{T}$$`;
  const R1Rn = `$\\{R_{1}, R_{2}, ..., R_{n}\\}$`;
  const Ri = `$$R_{i}$$`;
  const k = `$$k$$`;
  const F = `$$F$$`;

  const formalTheoryDefinition = (
    <div>
      <dfn>Формальная (аксиоматическая) теория</dfn> <Latex>{T}</Latex> считается определенной, если соблюдены следующие требования:
      <ul>
        <li>
          задано некоторое счетное множество символов теории <Latex>{T}</Latex>, в качестве которых могут быть выбраны произвольные объекты
          (не обязательно лингвистические). Конечные последовательности символов называются <em>выражениями</em> <Latex>{T}</Latex>;
        </li>
        <li>
          задано счетное подмножество выражений, именуемых <em>формулами</em> теории <Latex>{T}</Latex>. Если имеется возможность выяснить,
          является ли данная формула аксиомой, то теория <Latex>{T}</Latex> называется <em>аксиоматической теорией</em>;
        </li>
        <li>
          задано множество <Latex>{R1Rn}</Latex> отношений между формулами, которые называются <em>правилами вывода</em>. Причем для каждого{' '}
          <Latex>{Ri}</Latex> существует целое положительное число <Latex>{k}</Latex> такое, что для каждого множества, состоящего из{' '}
          <Latex>{k}</Latex> формул, и для каждой формулы <Latex>{F}</Latex> эффективно решается вопрос о том, состоят ли данные{' '}
          <Latex>{k}</Latex> формул в отношении <Latex>{Ri}</Latex> с формулой <Latex>{F}</Latex> или нет. Если состоят, то{' '}
          <Latex>{F}</Latex> называется непосредственным следствием из <Latex>{k}</Latex> формул по правилу <Latex>{Ri}</Latex>.
        </li>
      </ul>
    </div>
  );

  return <section className='dp-definitions-ru'>{formalTheoryDefinition}</section>;
};

export default DPDefinitionsRu;
