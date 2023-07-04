import Latex from 'react-latex';
import React from 'react';
import formatClass from 'utils/formatters/format-class-name';
import latex from 'assets/texts/propositions/latex-expressions';
import { CommonProps } from 'types';

const NPHeuristicsEn = (props: CommonProps): React.ReactElement => {
  return (
    <ol className={formatClass([props.className])}>
      <li>
        If the goal is to prove a formula like <Latex>{latex.FtoG}</Latex>, you should enter the assumption <Latex>{latex.F}</Latex> and in
        the the sub-proof try to derive <Latex>{latex.G}</Latex>. Then you have to use the{' '}
        <abbr
          title='Implication
        Introduction'
        >
          II
        </abbr>{' '}
        rule on the first and last formulas of the sub-proof to get <Latex>{latex.FtoG}</Latex>.
      </li>
      <li>
        If the goal is to prove a formula like <Latex>{latex.FandG}</Latex>, you should first derive the formula <Latex>{latex.F}</Latex>{' '}
        and then the formula <Latex>{latex.G}</Latex>. If the derivation of both formulas succeeds, you need to apply the{' '}
        <abbr title='Conjunction Introduction'>CI</abbr> rule on them to get <Latex>{latex.FandG}</Latex>.
      </li>
      <li>
        If the goal is to prove the formula like <Latex>{latex.ForG}</Latex>, then at least one of the formulas
        <Latex>{latex.F}</Latex> or <Latex>{latex.G}</Latex> must be derived. Once the derivation of one of the formulas is obtained, you
        can get a disjunction of that formula with any other formula by the <abbr title='Disjunction Introduction'>DI</abbr> rule.
      </li>
      <li>
        If the goal is to prove a formula like <Latex>{latex.notF}</Latex>, you should introduce the assumtion <Latex>{latex.F}</Latex> and
        derive a contradiction in the sub-proof, i.e., two formulas: <Latex>{latex.FtoG}</Latex> и <Latex>{latex.FtoNotG}</Latex>. Once the
        contradiction is obtained, the <abbr title='Negation Introduction'>NI</abbr> rule will give you the desired{' '}
        <Latex>{latex.notF}</Latex>.
      </li>
      <li>
        If a premise is given as <Latex>{latex.FtoG}</Latex> and the goal is to prove <Latex>{latex.G}</Latex>, you must first derive{' '}
        <Latex>{latex.F}</Latex>. If the derivation succeeds, the formula <Latex>{latex.G}</Latex> can be obtained by the{' '}
        <abbr title='Implication Elimination'>IE</abbr> rule.
      </li>
      <li>
        If a premise is given as <Latex>{latex.ForG}</Latex> and the goal is to derive <Latex>{latex.H}</Latex>, then you should first prove{' '}
        <Latex>{latex.FtoH}</Latex> and then <Latex>{latex.GtoH}</Latex>. On these two formulas and the original disjunctive premise, use
        the <abbr title='Disjunction Elimination'>DE</abbr> rule to get <Latex>{latex.H}</Latex>.
      </li>
    </ol>
  );
};

export default NPHeuristicsEn;
