import Latex from 'react-latex';
import React from 'react';
import latex from 'assets/texts/propositions/latex-expressions';

const DPAxiomsEn = (): React.ReactElement => {
  return (
    <section>
      <ol>
        <li>
          <strong>Implication Creation:</strong>
          <br></br>
          <Latex>{latex.IC}</Latex>
        </li>
        <li>
          <strong>Implication Distribution:</strong>
          <br></br>
          <Latex>{latex.ID}</Latex>
        </li>
        <li>
          <strong>Contradiction Realization:</strong>
          <br></br>
          <Latex>{latex.CR}</Latex>
        </li>
      </ol>
    </section>
  );
};

export default DPAxiomsEn;
