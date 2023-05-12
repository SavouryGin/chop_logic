import Button from 'components/controls/button';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  // const isSidebarOpened = useAppSelector(settingsSelectors.isSidebarOpened);

  //   const onClickSidebarButton = () => {
  //     dispatch(settingsActions.toggleFlag('isSidebarOpen'));
  //   };

  //   const tools =         <Button
  //   buttonId={ButtonID.Tools}
  //   onClick={onClickSidebarButton}
  //   icon={isSidebarOpened ? Icon.Right : Icon.Sidebar}
  //   sound={soundPlayer.keyboard}
  //   view='flat'
  // />

  const tools = (
    <>
      <h2
        className={formatClass(['propositions-direct-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.direct[language]}`}</h2>
      <Button
        buttonId={ButtonID.Tools}
        // onClick={onClickSidebarButton}
        icon={Icon.Sidebar}
        sound={soundPlayer.keyboard}
        view='flat'
      />
    </>
  );

  return (
    <article className='propositions-direct-proofs'>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' toolsPanel={tools} />
    </article>
  );
};

export default PropositionsDirectProofs;
