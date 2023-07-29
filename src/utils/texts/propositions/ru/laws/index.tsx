import Latex from 'react-latex';
import React from 'react';
import { PROPOSITIONAL_LAWS_LIST } from 'utils/texts/propositions/latex-expressions/laws-list';

const PropositionLawsRu = (): React.ReactElement => {
  return (
    <section>
      <ol>
        {PROPOSITIONAL_LAWS_LIST.map((item) => {
          return (
            <li key={item.id}>
              <strong>{item.title.ru}</strong>
              <Latex>{item.latexExpression}</Latex>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default PropositionLawsRu;
