import Latex from 'react-latex';
import React from 'react';
import './styles.scss';

const DPDefinitionsRu = (): React.ReactElement => {
  const T = `$$\\mathfrak{T}$$`;
  const R1Rn = `$\\{R_{1}, R_{2}, ..., R_{n}\\}$`;
  const Ri = `$$R_{i}$$`;
  const k = `$$k$$`;
  const F = `$$F$$`;
  const F1Fn = `$$F_{1}, F_{2}, ..., F_{n}$$`;
  const G = `$$G$$`;
  const Delta = `$$\\Delta$$`;
  const Fi = `$$F_{i}$$`;
  const Fn = `$$F_{n}$$`;
  const DeltaToG = `$$\\Delta \\vdash G.$$`;
  const DeltaToNothing = `$$\\Delta~=~\\varnothing$$`;
  const toG = `$$\\vdash G$$`;

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

  const proofDefinitions = (
    <div>
      <dfn>Выводом</dfn> формулы <Latex>{G}</Latex> из множества формул <Latex>{Delta}</Latex> называется такая конечная последовательность
      формул <Latex>{F1Fn}</Latex>, в которой каждая формула <Latex>{Fi}</Latex> является либо
      <ol>
        <li>формулой из множества, либо</li>
        <li>аксиомой формальной теории, либо</li>
        <li>получена из предыдущих формул последовательности по правилу вывода;</li>
      </ol>
      при этом последняя формула <Latex>{Fn}</Latex> совпадает с <Latex>{G}</Latex>. Отношение выводимости обозначается следующим образом:{' '}
      <Latex>{DeltaToG}</Latex>
      Эта запись читается как "формула <Latex>{G}</Latex> выводима из множества формул <Latex>{Delta}</Latex>" или "<Latex>{Delta}</Latex>{' '}
      выводит <Latex>{G}</Latex>".<br></br> Элементы <Latex>{Delta}</Latex> называются <em>посылками</em>. Если{' '}
      <Latex>{DeltaToNothing}</Latex>, то есть не содержит ни одной посылки, то говорят, что <Latex>{G}</Latex> выводима из аксиом, или{' '}
      <Latex>{G}</Latex> доказуема в данной формальной теории. Саму последовательность <Latex>{F1Fn}</Latex> называют{' '}
      <em>доказательством</em> формулы <Latex>{G}</Latex>. Запись <Latex>{toG}</Latex>
      означает: "<Latex>{G}</Latex> доказана" или "<Latex>{G}</Latex> - теорема".
    </div>
  );

  return (
    <section className='dp-definitions-ru'>
      {formalTheoryDefinition}
      <br></br>
      {proofDefinitions}
    </section>
  );
};

export default DPDefinitionsRu;
