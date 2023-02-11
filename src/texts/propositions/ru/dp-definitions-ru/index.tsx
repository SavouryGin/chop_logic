import Latex from 'react-latex';
import React from 'react';
import './styles.scss';

const DPDefinitionsRu = (): React.ReactElement => {
  const test = `$$\\lambda (F(A_{1}, A_{2}, ..., A_{n}) \\leftrightarrow G(A_{1}, A_{2}, ..., A_{n})) = 1$$`;

  return (
    <section className='dp-definitions-ru'>
      <Latex displayMode={true}>{test}</Latex>
    </section>
  );
};

export default DPDefinitionsRu;
