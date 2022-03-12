import Checkbox from 'components/inputs/checkbox';
import Select from 'components/inputs/select';
import TextInput from 'components/inputs/text-input';
import { SelectEntity } from 'types';
import React from 'react';

import './styles.scss';

function Home(): React.ReactElement {
  const selectOptions: SelectEntity[] = [
    { option: 'One', value: 1, add: 123 },
    { option: 'Two', value: 2, asdf: 'asdf' },
    { option: 'Three', value: 3, asdf: {} },
  ];

  return (
    <div className='home'>
      Home page
      <div>
        <Checkbox id='test-id-1' name='test-name' label='Test checkbox' />
      </div>
      <div>
        <TextInput name='text' label='Text Label' id='test-input' />
      </div>
      <br />
      <br />
      <div>
        <Select name='select1' label='Label1' options={selectOptions} defaultOption={selectOptions[2]} isRequired id='test-select' />
      </div>
    </div>
  );
}

export default Home;
