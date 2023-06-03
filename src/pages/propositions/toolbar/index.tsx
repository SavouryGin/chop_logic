import PropositionsDPTools from './buttons/direct-proofs';
import PropositionsNPTools from './buttons/natural-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import './styles.scss';

const PropositionsToolbar = ({ mode, isVisible }: { mode: 'natural' | 'direct'; isVisible: boolean }): React.ReactElement | null => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isMounted = useMount(isVisible);

  if (!isMounted) {
    return null;
  }

  const isClosing = isMounted && !isVisible;
  const toolbarClass = formatClass([
    'propositions-toolbar',
    { 'propositions-toolbar_dark': isDarkMode, 'propositions-toolbar_closing': isClosing },
  ]);

  return (
    <aside className={toolbarClass}>
      <ul className='propositions-toolbar__list'>{mode === 'direct' ? <PropositionsDPTools /> : <PropositionsNPTools />}</ul>
    </aside>
  );
};

export default PropositionsToolbar;
