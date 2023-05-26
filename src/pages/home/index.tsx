import Popover from 'components/popover';
import React from 'react';
import './styles.scss';

const Home = (): React.ReactElement => {
  return (
    <article className='home'>
      <div>
        <Popover preferredPosition='bottom-center'>
          <Popover.Trigger>
            <button>show popover</button>
          </Popover.Trigger>
          <Popover.Content>
            <input type='text' />
            <Popover.Close>
              <button>close</button>
            </Popover.Close>

            <Popover preferredPosition='bottom-center'>
              <Popover.Trigger>
                <button>show popover</button>
              </Popover.Trigger>
              <Popover.Content>
                <input type='text' />
                <Popover.Close>
                  <button>close</button>
                </Popover.Close>
              </Popover.Content>
            </Popover>
          </Popover.Content>
        </Popover>

        <Popover preferredPosition='bottom-center'>
          <Popover.Trigger>
            <button>show popover</button>
          </Popover.Trigger>
          <Popover.Content>
            <input type='text' />
            <Popover.Close>
              <button>close</button>
            </Popover.Close>
          </Popover.Content>
        </Popover>
      </div>
    </article>
  );
};

export default Home;
