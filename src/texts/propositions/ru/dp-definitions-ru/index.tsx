import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const DPDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

  const formalTheoryDefinition = (
    <div className={definitionClass}>
      <dfn>Формальная (аксиоматическая) теория</dfn> <Latex>{latex.T}</Latex> считается определенной, если соблюдены следующие требования:
      <ol>
        <li>
          задано некоторое счетное множество символов теории <Latex>{latex.T}</Latex>, в качестве которых могут быть выбраны произвольные
          объекты (не обязательно лингвистические). Конечные последовательности символов называются <em>выражениями</em>{' '}
          <Latex>{latex.T}</Latex>;
        </li>
        <li>
          задано счетное подмножество выражений, именуемых <em>формулами</em> теории <Latex>{latex.T}</Latex>. Если имеется возможность
          выяснить, является ли данная формула аксиомой, то теория <Latex>{latex.T}</Latex> называется <em>аксиоматической теорией</em>;
        </li>
        <li>
          задано множество <Latex>{latex.R1Rn}</Latex> отношений между формулами, которые называются <em>правилами вывода</em>. Причем для
          каждого <Latex>{latex.Ri}</Latex> существует целое положительное число <Latex>{latex.k}</Latex> такое, что для каждого множества,
          состоящего из <Latex>{latex.k}</Latex> формул, и для каждой формулы <Latex>{latex.F}</Latex> эффективно решается вопрос о том,
          состоят ли данные <Latex>{latex.k}</Latex> формул в отношении <Latex>{latex.Ri}</Latex> с формулой <Latex>{latex.F}</Latex> или
          нет. Если состоят, то <Latex>{latex.F}</Latex> называется непосредственным следствием из <Latex>{latex.k}</Latex> формул по
          правилу <Latex>{latex.Ri}</Latex>.
        </li>
      </ol>
    </div>
  );

  const proofDefinition = (
    <div className={definitionClass}>
      <dfn>Выводом</dfn> формулы <Latex>{latex.G}</Latex> из множества формул <Latex>{latex.Delta}</Latex> называется такая конечная
      последовательность формул <Latex>{latex.F1Fn}</Latex>, в которой каждая формула <Latex>{latex.Fi}</Latex> является либо
      <ol style={{ listStyleType: 'lower-alpha' }}>
        <li>
          формулой из множества <Latex>{latex.Delta}</Latex>, либо
        </li>
        <li>аксиомой формальной теории, либо</li>
        <li>получена из предыдущих формул последовательности по правилу вывода;</li>
      </ol>
      при этом последняя формула <Latex>{latex.Fn}</Latex> совпадает с <Latex>{latex.G}</Latex>.<br></br>
      Отношение выводимости обозначается следующим образом:
      <div className={centeredClass}>
        <Latex>{latex.DeltaToG}</Latex>
      </div>
      Эта запись читается как{' '}
      <em>
        формула <Latex>{latex.G}</Latex> выводима из множества формул <Latex>{latex.Delta}</Latex>
      </em>{' '}
      или{' '}
      <em>
        <Latex>{latex.Delta}</Latex> выводит <Latex>{latex.G}</Latex>.
      </em>
      <br></br>
      Элементы <Latex>{latex.Delta}</Latex> называются <em>посылками</em>. Если <Latex>{latex.DeltaToNothing}</Latex>, то есть не содержит
      ни одной посылки, то говорят, что <Latex>{latex.G}</Latex> выводима из аксиом, или <Latex>{latex.G}</Latex> доказуема в данной
      формальной теории. Саму последовательность <Latex>{latex.F1Fn}</Latex> называют <em>доказательством</em> формулы{' '}
      <Latex>{latex.G}</Latex>. Запись
      <div className={centeredClass}>
        <Latex>{latex.toG}</Latex>
      </div>
      означает:{' '}
      <em>
        <Latex>{latex.G}</Latex> доказана
      </em>{' '}
      или{' '}
      <em>
        <Latex>{latex.G}</Latex> - теорема.
      </em>
    </div>
  );

  return (
    <div className={wrapperClass}>
      {formalTheoryDefinition}
      <hr></hr>
      {proofDefinition}
    </div>
  );
};

export default DPDefinitionsRu;
