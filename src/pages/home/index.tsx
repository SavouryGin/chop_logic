import ErrorPopup from 'components/error-popup';
import React, { useState } from 'react';
import './styles.scss';

const Home = (): React.ReactElement => {
  const [error, setError] = useState<string | null>('error text');

  return (
    <article className='home'>
      <ErrorPopup error={error} onClose={() => setError(null)} />
    </article>
  );
};

export default Home;
