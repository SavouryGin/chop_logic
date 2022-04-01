import Table from 'components/table';
import React from 'react';

import './styles.scss';

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <br></br>
      <Table />
    </div>
  );
}

export default Home;
