import Latex from 'react-latex';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import latex from 'texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPDefinitionsEn = ({ className }: CommonProps): React.ReactElement => {
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);

  const derivationProperties = (
    <div className={definitionClass}>
      <dfn>Properties of the derivability relation</dfn>. Let <Latex>{latex.Gamma}</Latex> and <Latex>{latex.Delta}</Latex> be some subsets
      of the set of formulas of formal theory, <Latex>{latex.F}</Latex> and <Latex>{latex.G}</Latex> be some formulas of that theory. Then:
      <ol>
        <li>
          if <Latex>{latex.GammaDashF}</Latex> and <Latex>{latex.GammaSubsetDelta}</Latex>, then <Latex>{latex.DeltaDashF}</Latex>;
        </li>
        <li>
          <Latex>{latex.GammaDashF}</Latex> if and only if <Latex>{latex.Gamma}</Latex> contains such finite subset{' '}
          <Latex>{latex.Delta}</Latex> that <Latex>{latex.DeltaDashF}</Latex>;
        </li>
        <li>
          if for any formula <Latex>{latex.G}</Latex> of the set <Latex>{latex.Delta}</Latex> it is true that{' '}
          <Latex>{latex.GammaDashG}</Latex> and <Latex>{latex.DeltaDashF}</Latex>, then <Latex>{latex.GammaDashF}</Latex>.
        </li>
      </ol>
    </div>
  );

  const deductionTheorem = (
    <div className={definitionClass}>
      <dfn>The deduction theorem</dfn>. If, in some formal theory, formula <Latex>{latex.G}</Latex> is deductible from the set{' '}
      <Latex>{latex.F1FnMinus1Fn}</Latex>, then formula <Latex>{latex.FnToG}</Latex> is deductible from the set{' '}
      <Latex>{latex.F1FnMinus1}</Latex>. The brief notation:
      <div>
        If <Latex>{latex.F1FnMinus1FnDashG}</Latex>, then <Latex>{latex.F1FnMinus1FnDashToG}</Latex>.
      </div>
      In particular, if <Latex>{latex.FdashG}</Latex>, then <Latex>{latex.dashFtoG}</Latex>.
    </div>
  );

  return (
    <section>
      {derivationProperties}
      <hr></hr>
      {deductionTheorem}
      <hr></hr>
    </section>
  );
};

export default NPDefinitionsEn;
