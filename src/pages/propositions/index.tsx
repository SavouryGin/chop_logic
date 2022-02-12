import React from 'react';

function Propositions(): React.ReactElement {
  const test =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, hic illo. Qui alias quasi repudiandae dignissimos unde, id sit molestiae ducimus numquam nihil, sint impedit molestias perferendis ipsa nobis reiciendis!';
  return <div className='propositions'>{test.repeat(100)}</div>;
}

export default Propositions;
