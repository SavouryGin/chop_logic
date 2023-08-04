import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const TTDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  // const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

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

  return (
    <div className={wrapperClass}>
      {tautologyDefinition}
      <hr></hr>
      {contradictionDefinition}
    </div>
  );
};

export default TTDefinitionsRu;
