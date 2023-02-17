import Latex from 'react-latex';
import React from 'react';
import latex from 'texts/propositions/latex-expressions';
import './styles.scss';

const DPDefinitionsEn = (): React.ReactElement => {
  const formalTheoryDefinition = (
    <div>
      <dfn>Формальная (аксиоматическая) теория</dfn> <Latex>{latex.T}</Latex> считается определенной, если соблюдены следующие требования:
      <ol>
        <li>
          задано некоторое счетное множество символов теории <Latex>{latex.T}</Latex>, в качестве которых могут быть выбраны произвольные
          объекты (не обязательно лингвистические). Конечные последовательности символов называются <em>выражениями</em>{' '}
          <Latex>{latex.T}</Latex>;
        </li>
        <li>
          задано счетное подмножество выражений, именуемых <em>формулами</em> теории <Latex>{latex.T}</Latex>. Если имеется возможность
          выяснить, является ли данная формула аксиомой, то теория <Latex>{latex.T}</Latex> называется <em>аксиоматической теорией</em>;
        </li>
        <li>
          задано множество <Latex>{latex.R1Rn}</Latex> отношений между формулами, которые называются <em>правилами вывода</em>. Причем для
          каждого <Latex>{latex.Ri}</Latex> существует целое положительное число <Latex>{latex.k}</Latex> такое, что для каждого множества,
          состоящего из <Latex>{latex.k}</Latex> формул, и для каждой формулы <Latex>{latex.F}</Latex> эффективно решается вопрос о том,
          состоят ли данные <Latex>{latex.k}</Latex> формул в отношении <Latex>{latex.Ri}</Latex> с формулой <Latex>{latex.F}</Latex> или
          нет. Если состоят, то <Latex>{latex.F}</Latex> называется непосредственным следствием из <Latex>{latex.k}</Latex> формул по
          правилу <Latex>{latex.Ri}</Latex>.
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
    <section className='dp-definitions-ru'>
      {formalTheoryDefinition}
      <hr></hr>
      {proofDefinition}
    </section>
  );
};

export default DPDefinitionsEn;
