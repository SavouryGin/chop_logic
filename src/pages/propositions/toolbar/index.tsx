import Popover from 'components/popover';
import PropositionsDPTools from './buttons/direct-proofs';
import PropositionsNPTools from './buttons/natural-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { Icon } from 'enums';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsToolbar = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement | null => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);

  const toolbarClass = formatClass(['propositions-toolbar', { 'propositions-toolbar_dark': isDarkMode }]);

  return (
    <Popover preferredPosition='bottom-center'>
      <Popover.Trigger>
        <button className={Icon.Sidebar}></button>
      </Popover.Trigger>
      <Popover.Content>
        <aside className={toolbarClass}>
          <ul className='propositions-toolbar__list'>{mode === 'direct' ? <PropositionsDPTools /> : <PropositionsNPTools />}</ul>
        </aside>
        <Popover.Close>
          <button className={Icon.Cancel}></button>
        </Popover.Close>
      </Popover.Content>
    </Popover>
  );
};

export default PropositionsToolbar;
