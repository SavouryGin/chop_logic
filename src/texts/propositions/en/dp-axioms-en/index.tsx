import Latex from 'react-latex';
import React from 'react';
import latex from 'texts/propositions/latex-expressions';
import './styles.scss';

const DPAxiomsEn = (): React.ReactElement => {
  return (
    <section className='dp-axioms-en'>
      <ol>
        <li>
          <Latex>{latex.IC}</Latex>
        </li>
        <li>
          <Latex>{latex.ID}</Latex>
        </li>
        <li>
          <Latex>{latex.CR}</Latex>
        </li>
      </ol>
    </section>
  );
};

export default DPAxiomsEn;
