import Latex from 'react-latex';
import React from 'react';
import latex from 'utils/texts/propositions/latex-expressions';

const PropositionLawsRu = (): React.ReactElement => {
  return (
    <section>
      <ol>
        <li>
          <strong>Закон тождества:</strong>
          <br></br>
          <Latex>{latex.IC}</Latex>
        </li>
      </ol>
    </section>
  );
};

export default PropositionLawsRu;
