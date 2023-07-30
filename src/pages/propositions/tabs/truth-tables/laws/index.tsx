import Latex from 'react-latex';
import React from 'react';
import { PROPOSITIONAL_LAWS_LIST } from 'utils/texts/propositions/latex-expressions/laws-list';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';

const TruthTablesLaws = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);

  return (
    <section className='truth-tables_laws'>
      <ol>
        {PROPOSITIONAL_LAWS_LIST.map((item) => {
          return (
            <li key={item.id}>
              <strong>{item.title[language]}</strong>
              <br></br>
              <Latex>{item.latexExpression}</Latex>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TruthTablesLaws;
