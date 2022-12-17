import React from 'react';
import Spinner from 'components/spinner';
import './styles.scss';

const Home = (): React.ReactElement => {
  return (
    <article className='home'>
      <Spinner />
    </article>
  );
};

export default Home;
