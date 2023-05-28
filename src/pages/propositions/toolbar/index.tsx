import Popover from 'components/popover';
import PropositionsDPTools from './buttons/direct-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsToolbar = ({ className }: CommonProps & { isAllButtonsVisible?: boolean }): React.ReactElement | null => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  // const dispatch = useAppDispatch();

  // const toggleToolbar = () => {
  //   dispatch(propositionsDPActions.setUpFlag({ flag: 'isToolbarOpened', value: !isToolbarOpened }));
  // };

  const toolbarClass = formatClass(['propositions-toolbar', className, { 'propositions-toolbar_dark': isDarkMode }]);

  return (
    <Popover preferredPosition='bottom-center'>
      <Popover.Trigger>
        {/* <Button buttonId={ButtonID.Tools} icon={Icon.Sidebar} sound={soundPlayer.keyboard} view='flat' /> */}
        <button className={Icon.Sidebar}></button>
      </Popover.Trigger>
      <Popover.Content>
        <aside className={toolbarClass}>
          <ul className='propositions-toolbar__list'>
            <PropositionsDPTools />
          </ul>
        </aside>
        <Popover.Close>
          <button>close</button>
        </Popover.Close>
      </Popover.Content>
    </Popover>
  );
};

export default PropositionsToolbar;
