import React from 'react';
import { testText } from '__mocks__/test-data/texts';

function Propositions(): React.ReactElement {
  return <div className='propositions'>{testText.repeat(100)}</div>;
}

export default Propositions;
