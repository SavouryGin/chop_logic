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
  const triggerClass = formatClass(['propositions-toolbar__button', Icon.Sidebar]);
  const cancelClass = formatClass(['propositions-toolbar__button', Icon.Cancel]);

  return (
    <Popover preferredPosition='bottom-center'>
      <Popover.Trigger>
        <button className={triggerClass}></button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close>
          <button className={cancelClass}></button>
        </Popover.Close>
        <aside className={toolbarClass}>
          <ul className='propositions-toolbar__list'>{mode === 'direct' ? <PropositionsDPTools /> : <PropositionsNPTools />}</ul>
        </aside>
      </Popover.Content>
    </Popover>
  );
};

export default PropositionsToolbar;
