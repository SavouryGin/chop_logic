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
      <Tooltip
        text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt necessitatibus, maxime dolores impedit
          minus consequatur vero vitae accusantium nulla error, eaque harum excepturi sequi consequuntur pariatur, fugit architecto a
          dignissimos?'
      >
        <span>Test div for tooltip</span>
      </Tooltip>
    </div>
  );
};

export default Home;
