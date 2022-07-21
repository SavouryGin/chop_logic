import React from 'react';
import Tooltip from 'components/tooltip';

import './styles.scss';

const Home = () => {
  return (
    <div className='home'>
      Home page
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Tooltip text='test tooltip text'>
        <div>Test div for tooltip</div>
      </Tooltip>
    </div>
  );
};

export default Home;
