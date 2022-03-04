import Checkbox from 'components/inputs/checkbox';
import TextInput from 'components/inputs/text-input';
import React from 'react';

import './styles.scss';

function Home(): React.ReactElement {
  return (
    <div className='home'>
      Home page
      <div>
        <Checkbox id='test-id-1' name='test-name' label='Test checkbox' />
      </div>
      <div>
        <Checkbox id='test-id-2' name='test-name' label='Test checkbox isRequired' isRequired />
      </div>
      <div>
        <Checkbox id='test-id-3' name='test-name' label='Test checkbox isDisabled' isDisabled />
      </div>
      <div>
        <Checkbox id='test-id-4' name='test-name' label='Test checkbox defaultValue' defaultValue={true} />
      </div>
      <div>
        <Checkbox id='test-id-4' name='test-name' label='Test checkbox isDisabled Default' isDisabled defaultValue={true} />
      </div>
      <div>
        <TextInput name='text' label='Text Label' />
      </div>
    </div>
  );
}

export default Home;
