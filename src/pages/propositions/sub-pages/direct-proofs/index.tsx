import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { Icon } from 'enums';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  // const isDarkMode = useAppSelector(settingsSelectors.isDarkMode);
  // const isNPButtonsVisible = !!useMatch(paths[Page.PropositionsNaturalProofs]);
  // const isDPButtonsVisible = !!useMatch(paths[Page.PropositionsDirectProofs]);
  // const toolbarClass = formatClass(['propositions-toolbar', { 'propositions-toolbar_dark': isDarkMode }]);

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-direct-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.direct[language]}`}</h2>
      <PropositionsToolbar />
      {/* <Popover preferredPosition='bottom-center'>
        <Popover.Trigger>
          {/* <Button buttonId={ButtonID.Tools} icon={Icon.Sidebar} sound={soundPlayer.keyboard} view='flat' /> */}
      {/* <button>show</button>
        </Popover.Trigger>
        <Popover.Content>
          <aside className={toolbarClass}>
            <ul className='propositions-toolbar__list'>
              <PropositionsDPTools isVisible={isDPButtonsVisible} />
              <PropositionsNPTools isVisible={isNPButtonsVisible} />
            </ul>
          </aside>
          <Popover.Close>
            <button>close</button>
          </Popover.Close>
        </Popover.Content>
      </Popover> */}
    </>
  );

  return (
    <article className='propositions-direct-proofs'>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' toolBar={toolBar} />
    </article>
  );
};

export default PropositionsDirectProofs;
