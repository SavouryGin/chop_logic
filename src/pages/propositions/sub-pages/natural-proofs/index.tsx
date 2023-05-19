import Button from 'components/controls/button';
import PropositionsToolbar from 'pages/propositions/toolbar';
import React from 'react';
import TabList from 'components/tab-list';
import formatClass from 'helpers/formatters/format-class-name';
import texts from 'texts/propositions/elements';
import { ButtonID, Icon } from 'enums';
import { propositionsNPActions } from 'store/propositions/natural-proofs';
import { propositionsNPSelectors } from 'store/propositions/natural-proofs/selectors';
import { propositionsNaturalProofsTabs } from 'pages/propositions/constants';
import { settingsSelectors } from 'store/settings/selectors';
import { soundPlayer } from 'helpers/sounds';
import { useAppDispatch, useAppSelector } from 'hooks';
import './styles.scss';

const PropositionsNaturalProofs = (): React.ReactElement => {
  const language = useAppSelector(settingsSelectors.language);
  const isToolbarOpened = useAppSelector(propositionsNPSelectors.isToolbarOpened);
  const dispatch = useAppDispatch();

  const toggleToolbar = () => {
    dispatch(propositionsNPActions.setUpFlag({ flag: 'isToolbarOpened', value: !isToolbarOpened }));
  };

  const toolBar = (
    <>
      <h2
        className={formatClass(['propositions-natural-proofs__title', Icon.Propositions])}
      >{`${texts.page[language]} > ${texts.natural[language]}`}</h2>
      <Button buttonId={ButtonID.Tools} onClick={toggleToolbar} icon={Icon.Sidebar} sound={soundPlayer.keyboard} view='flat' />
    </>
  );

  return (
    <article className='propositions-natural-proofs'>
      <TabList tabs={propositionsNaturalProofsTabs} className='propositions-natural-proofs__tabs' toolBar={toolBar} />
      <PropositionsToolbar isOpened={isToolbarOpened} />
    </article>
  );
};

export default PropositionsNaturalProofs;
