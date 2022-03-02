import Checkbox from 'components/inputs/checkbox';
import React from 'react';

import './styles.scss';

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <div>
        <Checkbox id='test-id' name='test-name' label='Test checkbox' />
      </div>
      <div>
        <Checkbox id='test-id' name='test-name' label='Test checkbox isRequired' isRequired />
      </div>
      <div>
        <Checkbox id='test-id' name='test-name' label='Test checkbox isDisabled' isDisabled />
      </div>
      <div>
        <Checkbox id='test-id' name='test-name' label='Test checkbox isReadOnly' isReadOnly defaultValue={true} />
      </div>
    </div>
  );
}

export default Home;
