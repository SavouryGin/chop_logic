import FileInput from 'components/controls/file-input';
import React from 'react';
import { InputID } from 'enums';

import './styles.scss';

const Home = () => {
  return (
    <article className='home'>
      Home page
      <br></br>
      <br></br>
      <br></br>
      <FileInput name='file-input' inputId={InputID.FileInput} isRequired={true} />
    </article>
  );
};

export default Home;
