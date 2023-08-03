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
      <dfn>Тождественно-истинная формула логики высказываний</dfn> (тавтология) &#8212; это такая формула, которая принимает значение{' '}
      <Latex>1</Latex> (<em>истина</em>) на любом наборе значений входящих в нее переменных. Иными словами, формула называется тавтологией,
      если она истинна при любых интерпретациях. Для их обозначения используется особый символ <Latex>{latex.Dash}</Latex> и запись{' '}
      <Latex>{latex.dashFtoP}</Latex> читается как:{' '}
      <em>
        Формула <Latex>{latex.FtoP}</Latex> является тавтологией.
      </em>
    </div>
  );

  return (
    <div className={wrapperClass}>
      {tautologyDefinition}
      <hr></hr>
    </div>
  );
};

export default TTDefinitionsRu;
