import React from 'react';
import TextInput from 'components/inputs/text-input';

import './styles.scss';

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <div>
        <TextInput name='test-input' id='test-input' label='Type here' isRequired defaultValue='hello' />
      </div>
    </div>
  );
}

export default Home;
