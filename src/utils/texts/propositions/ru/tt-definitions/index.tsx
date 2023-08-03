import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const TTDefinitionsRu = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

  const formalTheoryDefinition = (
    <div className={definitionClass}>
      <dfn>Формальная (аксиоматическая) теория</dfn>
    </div>
  );

  const proofDefinition = (
    <div className={definitionClass}>
      <dfn>Выводом</dfn>
      <div className={centeredClass}>
        <Latex>{latex.DeltaToG}</Latex>
      </div>
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

export default TTDefinitionsRu;
