import Button from 'components/controls/button';
import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { propositionsDPActions } from 'store/propositions/direct-proofs';
import { propositionsDPSelectors } from 'store/propositions/direct-proofs/selectors';
import { propositionsDirectProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsDirectProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  const isToolbarOpened = useAppSelector(propositionsDPSelectors.isToolbarOpened);
  const dispatch = useAppDispatch();

  const toggleToolbar = () => {
    dispatch(propositionsDPActions.setUpFlag({ flag: 'isToolbarOpened', value: !isToolbarOpened }));
  };

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-direct-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.direct[language]}`}</h2>
      <Button buttonId={ButtonID.Tools} onClick={toggleToolbar} icon={Icon.Sidebar} sound={soundPlayer.keyboard} view='flat' />
    </>
  );

  return (
    <article className='propositions-direct-proofs'>
      <TabList tabs={propositionsDirectProofsTabs} className='propositions-direct-proofs__tabs' toolBar={toolBar} />
      <PropositionsToolbar isOpened={isToolbarOpened} />
    </article>
  );
};

export default PropositionsDirectProofs;
