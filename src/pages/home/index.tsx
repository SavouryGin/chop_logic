import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
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
        <TextInput name='text' label='Text Label' />
      </div>
      <br />
      <div>
        <Select name='select1' label='Label1' options={['one', 'two', 'three']} />
      </div>
      <br />
      <div>
        <Select
          name='select1'
          label='Label1'
          options={[
            { option: 'one', value: 1 },
            { option: 'two', value: 2 },
            { option: 'three', value: 3 },
          ]}
        />
      </div>
      <br />
      <div>
        <Select
          name='select1'
          label='Label1'
          options={[
            { option: 'one', value: 1 },
            { option: 'two', value: 2 },
            { option: 'three', value: 3 },
            { option: 'four', value: 4 },
            { option: 'five', value: 5 },
          ]}
          size={3}
        />
      </div>
      <br />
      <div>
        <Select name='select1' label='Label1' options={['one', 'two', 'three']} isRequired />
      </div>
      <br />
      <div>
        <Select name='select1' label='Label1' options={['one', 'two', 'three']} isDisabled />
      </div>
    </div>
  );
}

export default Home;
