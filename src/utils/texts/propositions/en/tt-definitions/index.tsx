import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'utils/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const TTDefinitionsEn = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);

  const ttDefinition = (
    <div className={definitionClass}>
      <dfn>Truth table</dfn> is one way of specifying a logical function. Any propositional logic formula is a function that maps exactly
      one value from the set <Latex>{latex.set01}</Latex> to each ordered set (tuple) of zeros and ones. The value is chosen according to
      the definitions of logical connectives. The length of the value set depends on the number of variables in the formula. If formula{' '}
      <Latex>{latex.F}</Latex> contains only one variable, its domain of definition is the set of two one-component tuples:{' '}
      <Latex>{latex.tuple01}</Latex>. If in
      <Latex>{latex.F}</Latex> there are two variables, then its domain of definition is equal to the second Cartesian degree of the set:{' '}
      <Latex>{latex.tuple0101}</Latex>. In general, if there are <Latex>{latex.n}</Latex> different variables in the formula, then the
      domain of definition of of this logical function consists of <Latex>{latex.nPow2}</Latex> different sets of values.
    </div>
  );

  return (
    <div className={wrapperClass}>
      {ttDefinition}
      <hr></hr>
    </div>
  );
};

export default TTDefinitionsEn;
