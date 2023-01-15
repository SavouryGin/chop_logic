import ErrorPopup from 'components/error-popup';
import React from 'react';
import './styles.scss';

const Home = (): React.ReactElement => {
  return (
    <article className='home'>
      <ErrorPopup error='Error text' onClose={() => console.log('close')} />
    </article>
  );
};

export default Home;
