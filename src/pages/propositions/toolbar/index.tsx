import PropositionsDPTools from './buttons/direct-proofs';
import PropositionsNPTools from './buttons/natural-proofs';
import React from 'react';
import formatClass from 'helpers/formatters/format-class-name';
import { CommonProps } from 'types';
import { Page } from 'enums';
import { paths } from 'router/paths';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector, useMount } from 'hooks';
import { useMatch } from 'react-router';
import './styles.scss';

const PropositionsToolbar = ({
  className,
  isOpened,
  isAllButtonsVisible,
}: CommonProps & { isOpened: boolean; isAllButtonsVisible?: boolean }): React.ReactElement | null => {
  const isMounted = useMount(isOpened);
  const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  const isNPButtonsVisible = !!useMatch(paths[Page.PropositionsNaturalProofs]) || !!isAllButtonsVisible;
  const isDPButtonsVisible = !!useMatch(paths[Page.PropositionsDirectProofs]) || !!isAllButtonsVisible;

  if (!isMounted) {
    return null;
  }
  const isClosing = isMounted && !isOpened;
  const toolbarClass = formatClass([
    'propositions-toolbar',
    className,
    { 'propositions-toolbar_dark': isDarkMode, 'propositions-toolbar_closing': isClosing },
  ]);

  return (
    <aside className={toolbarClass}>
      <ul className='propositions-toolbar__list'>
        <PropositionsDPTools isVisible={isDPButtonsVisible} />
        <PropositionsNPTools isVisible={isNPButtonsVisible} />
      </ul>
    </aside>
  );
};

export default PropositionsToolbar;
