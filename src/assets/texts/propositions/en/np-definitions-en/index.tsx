import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'assets/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPDefinitionsEn = ({ className }: CommonProps): React.ReactElement => {
  const wrapperClass = formatClass([className]);
  const definitionClass = formatClass([{ [`${className}_definition-block`]: !!className }]);
  const centeredClass = formatClass([{ [`${className}__centered`]: !!className }]);

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
      <div className={centeredClass}>
        If <Latex>{latex.F1FnMinus1FnDashG}</Latex>, then <Latex>{latex.F1FnMinus1FnDashToG}</Latex>.
      </div>
      In particular, if <Latex>{latex.FdashG}</Latex>, then <Latex>{latex.dashFtoG}</Latex>.
    </div>
  );

  const npTheory = (
    <div className={definitionClass}>
      The natural deduction calculus differs from the axiomatic calculus, because has no formulas considered as axioms, and it has more
      rules of derivation which compensate the absence of axioms. All the necessary premises for applying derivation rules can be set inside
      the proof as hypotheses. By introducing a hypothesis, you open a sub-proof, that is, a nested branch of logical proof.<br></br>The
      same rules apply to the nested proof as to the main proof. You can get out of a sub-proof to the main proof by implementing the{' '}
      <abbr title='Implication Introduction'>II</abbr> derivation rule. This rule is a special case of the deduction theorem: if, having
      made the assumption <Latex>{latex.F}</Latex>, we were able to deduce <Latex>{latex.G}</Latex> from it, then we have proved{' '}
      <Latex>{latex.FtoG}</Latex>.<br></br>Within a sub-proof, you can make another hypothesis and thus open a sub-sub-proof. Inside it
      another sub-proof, etc. There can be as many levels of nesting as you like. Nevertheless, at the end you have to get out of all the
      nested proofs into the main branch of reasoning.<br></br>
      Because proofs in the natural calculus, unlike linear proofs of axiomatic theories, have levels of nesting, they are called{' '}
      <em>structural proofs</em>.
    </div>
  );

  return (
    <div className={wrapperClass}>
      {derivationProperties}
      <hr></hr>
      {deductionTheorem}
      <hr></hr>
      {npTheory}
    </div>
  );
};

export default NPDefinitionsEn;
