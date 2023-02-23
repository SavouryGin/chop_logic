import Latex from 'react-latex';
import React from 'react';
import latex from 'texts/propositions/latex-expressions';

const DPDefinitionsEn = (): React.ReactElement => {
  const formalTheoryDefinition = (
    <div>
      A <dfn>formal (axiomatic) theory</dfn> <Latex>{latex.T}</Latex> is considered defined if the following requirements are met:
      <ol>
        <li>
          some countable set of symbols of the theory <Latex>{latex.T}</Latex> is given, as which any objects (not necessarily linguistic)
          can be chosen. Finite sequences of symbols are called <em>expressions</em> of the <Latex>{latex.T}</Latex>;
        </li>
        <li>
          a countable subset of expressions called <em>formulas</em> of the theory <Latex>{latex.T}</Latex> is given. If it is possible to
          find out whether a given formula is an axiom, then the theory <Latex>{latex.T}</Latex> is called an <em>axiomatic theory</em>;
        </li>
        <li>
          the set <Latex>{latex.R1Rn}</Latex> of relations between formulas, which are called <em>derivation rules</em>, is given. And for
          each <Latex>{latex.Ri}</Latex> there exists a positive integer <Latex>{latex.k}</Latex> such that for each set consisting of{' '}
          <Latex>{latex.k}</Latex> formulas and for each formula <Latex>{latex.F}</Latex> the question whether or not the given{' '}
          <Latex>{latex.k}</Latex> formulas are in relation <Latex>{latex.Ri}</Latex> with formula <Latex>{latex.F}</Latex> is effectively
          solved. If they are, then <Latex>{latex.F}</Latex> is called the direct consequence of <Latex>{latex.k}</Latex> formulas with
          respect to <Latex>{latex.Ri}</Latex>.
        </li>
      </ol>
    </div>
  );

  const proofDefinition = (
    <div>
      The <dfn>derivation</dfn> of formula <Latex>{latex.G}</Latex> from set <Latex>{latex.Delta}</Latex> is such finite sequence of
      formulas <Latex>{latex.F1Fn}</Latex> in which each formula <Latex>{latex.Fi}</Latex> is either
      <ol style={{ listStyleType: 'lower-alpha' }}>
        <li>
          a formula from set <Latex>{latex.Delta}</Latex>
        </li>
        <li>or an axiom of formal theory,</li>
        <li>or is derived from previous formulas of the sequence by the derivation rule;</li>
      </ol>
      in this case, the last formula <Latex>{latex.Fn}</Latex> coincides with <Latex>{latex.G}</Latex>.<br></br>
      The derivability relation is denoted as follows:
      <div>
        <Latex>{latex.DeltaToG}</Latex>
      </div>
      This entry reads as{' '}
      <em>
        the formula <Latex>{latex.G}</Latex> is derivable from the set of formulas <Latex>{latex.Delta}</Latex>
      </em>{' '}
      or{' '}
      <em>
        <Latex>{latex.Delta}</Latex> derives <Latex>{latex.G}</Latex>.
      </em>
      <br></br>
      The elements of <Latex>{latex.Delta}</Latex> are called <em>premises</em>. If <Latex>{latex.DeltaToNothing}</Latex>, i.e. does not
      contain any premise, then <Latex>{latex.G}</Latex> is derivable from axioms, or <Latex>{latex.G}</Latex> is provable in this formal
      theory. The sequence <Latex>{latex.F1Fn}</Latex> itself is called a <em>proof</em> of formula <Latex>{latex.G}</Latex>. The entry
      <div>
        <Latex>{latex.toG}</Latex>
      </div>
      means:{' '}
      <em>
        <Latex>{latex.G}</Latex> is proved
      </em>{' '}
      or{' '}
      <em>
        <Latex>{latex.G}</Latex> is a theorem.
      </em>
    </div>
  );

  return (
    <section>
      {formalTheoryDefinition}
      <hr></hr>
      {proofDefinition}
    </section>
  );
};

export default DPDefinitionsEn;
