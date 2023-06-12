import PropositionsDPTools from './buttons/direct-proofs';
import PropositionsNPTools from './buttons/natural-proofs';
import React, { useRef } from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { dpActions } from 'store/propositions/direct-proofs';
import { npActions } from 'store/propositions/natural-proofs';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppDispatch, useAppSelector, useClickOutside, useMount } from 'hooks';
import './styles.scss';

const PropositionsToolbar = ({ mode, isVisible }: { mode: 'natural' | 'direct'; isVisible: boolean }): React.ReactElement | null => {
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isMounted = useMount(isVisible);
  const clickRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  const onClickOutside = () => {
    if (mode === 'direct') {
      dispatch(dpActions.setUpFlag({ flag: 'isToolbarOpened', value: false }));
    }

    if (mode === 'natural') {
      dispatch(npActions.setUpFlag({ flag: 'isToolbarOpened', value: false }));
    }
  };

  useClickOutside(clickRef, onClickOutside);

  if (!isMounted) {
    return null;
  }

  const isClosing = isMounted && !isVisible;
  const toolbarClass = formatClass([
    'propositions-toolbar',
    { 'propositions-toolbar_dark': isDarkMode, 'propositions-toolbar_closing': isClosing },
  ]);

  return (
    <aside className={toolbarClass} ref={clickRef}>
      <ul className='propositions-toolbar__list'>{mode === 'direct' ? <PropositionsDPTools /> : <PropositionsNPTools />}</ul>
    </aside>
  );
};

export default PropositionsToolbar;
