import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const TTDefinitionsEn = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

  const derivationProperties = (
    <div className={definitionClass}>
      <dfn>Properties of the derivability relation</dfn>.
    </div>
  );

  const deductionTheorem = (
    <div className={definitionClass}>
      <dfn>The deduction theorem</dfn>
      <div className={centeredClass}>
        If <Latex>{latex.F1FnMinus1FnDashG}</Latex>, then <Latex>{latex.F1FnMinus1FnDashToG}</Latex>.
      </div>
    </div>
  );

  return (
    <div className={wrapperClass}>
      {derivationProperties}
      <hr></hr>
      {deductionTheorem}
    </div>
  );
};

export default TTDefinitionsEn;
