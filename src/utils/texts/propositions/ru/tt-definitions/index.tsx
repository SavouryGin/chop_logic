import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const TTDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  // const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

  const ttDefinition = (
    <div>
      <dfn>Таблица истинности</dfn> &#8212; это один из способов задания логической функции. Любая формула логики высказывания &#8212; это
      функция, которая каждому упорядоченному набору (кортежу) из нулей и единиц сопоставляет ровно одно значение из множества{' '}
      <Latex>{latex.set01}</Latex>. Значение выбирается в соответствии с определениями логических связок. Длина набора значений зависит от
      количества переменных в формуле. Если в формуле логики высказываний <Latex>{latex.F}</Latex> содержится только одна переменная, то ее
      областью определения является множество, состоящее из двух однокомпонентных кортежей: <Latex>{latex.tuple01}</Latex>. Если же в{' '}
      <Latex>{latex.F}</Latex> две переменные, то область ее определения равна второй декартовой степени множества:{' '}
      <Latex>{latex.tuple0101}</Latex>. В общем случае, если в формуле <Latex>{latex.n}</Latex> различных переменных, то область определения
      этой логической функции состоит из <Latex>{latex.nPow2}</Latex> различных наборов значений.
    </div>
  );

  const tautologyDefinition = (
    <div className={definitionClass}>
      <dfn>Тождественно-истинная формула логики высказываний (тавтология)</dfn> &#8212; это такая формула, которая принимает значение{' '}
      <strong>1</strong> (<em>истина</em>) на любом наборе значений входящих в нее переменных. Иными словами, формула называется
      тавтологией, если она истинна при любых интерпретациях. Для обозначения такой формулы используется особый символ{' '}
      <Latex>{latex.Dash}</Latex> и запись <Latex>{latex.DashFtoP}</Latex> читается как:{' '}
      <em>
        Формула <Latex>{latex.FtoP}</Latex> является тавтологией.
      </em>
    </div>
  );

  const contradictionDefinition = (
    <div className={definitionClass}>
      <dfn>Тождественно-ложная формула логики высказываний (противоречие)</dfn> &#8212; это такая формула, которая принимает значение{' '}
      <strong>0</strong> (<em>ложь</em>) на любом наборе значений входящих в нее переменных. Иными словами, формула называется
      противоречием, если она ложна при любых интерпретациях.
    </div>
  );

  const satisfiableFormulaDefinition = (
    <div className={definitionClass}>
      <dfn>Выполнимая формула логики высказываний</dfn> &#8212; это такая формула, которая принимает значение <strong>1</strong> (
      <em>истина</em>) по крайней мере на одном наборе значений входящих в нее переменных. Иными словами, формула выполнима, если при
      какой-либо её интерпретации можно получить истинное высказывание.
    </div>
  );

  return (
    <div className={wrapperClass}>
      {ttDefinition}
      <hr></hr>
      {tautologyDefinition}
      <hr></hr>
      {contradictionDefinition}
      <hr></hr>
      {satisfiableFormulaDefinition}
    </div>
  );
};

export default TTDefinitionsRu;
