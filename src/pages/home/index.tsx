import React from 'react';

import './styles.scss';

function Home(): React.ReactElement {
  return (
    <div className='home'>
      {' '}
      <span>
        {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at vero eaque facilis sint obcaecati veritatis maiores, veniam quisquam ex? Dolores consequatur cumque iste minima doloremque deserunt esse aliquam ut? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa enim vitae veritatis facilis ratione eius quod, perferendis itaque accusantium velit quia doloribus, architecto libero! Earum, odio. Nulla illo maiores sed?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis delectus beatae quasi earum maxime, sunt, quidem tenetur praesentium fugiat dolorem sed hic minima odio voluptates architecto cumque atque voluptatibus? Ab!Lorem'.repeat(
          100,
        )}
      </span>
    </div>
  );
}

export default Home;
