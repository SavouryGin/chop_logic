import PropositionsDPTools from './buttons/direct-proofs';
import PropositionsNPTools from './buttons/natural-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsToolbar = ({ mode }: { mode: 'natural' | 'direct' }): React.ReactElement | null => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);

  const toolbarClass = formatClass(['propositions-toolbar', { 'propositions-toolbar_dark': isDarkMode }]);

  return (
    <aside className={toolbarClass}>
      <ul className='propositions-toolbar__list'>{mode === 'direct' ? <PropositionsDPTools /> : <PropositionsNPTools />}</ul>
    </aside>
  );
};

export default PropositionsToolbar;
