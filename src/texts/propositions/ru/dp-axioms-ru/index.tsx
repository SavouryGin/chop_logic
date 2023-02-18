import Latex from 'react-latex';
import React from 'react';
import latex from 'texts/propositions/latex-expressions';
import './styles.scss';

const DPAxiomsRu = (): React.ReactElement => {
  return (
    <section className='dp-axioms-ru'>
      <ol>
        <li>
          <strong>Введение импликации:</strong>
          <br></br>
          <Latex>{latex.IC}</Latex>
        </li>
        <li>
          <strong>Дистрибуция импликации:</strong>
          <br></br>
          <Latex>{latex.ID}</Latex>
        </li>
        <li>
          <strong>Создание противоречия:</strong>
          <br></br>
          <Latex>{latex.CR}</Latex>
        </li>
      </ol>
    </section>
  );
};

export default DPAxiomsRu;
